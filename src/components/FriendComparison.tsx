import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimeTypeBadge } from '@/components/AnimeTypeBadge';
import { AnimeTypeFilter } from '@/components/AnimeTypeFilter';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Pause, 
  XCircle, 
  Clock, 
  TrendingUp,
  Eye,
  ArrowRight,
  Tv
} from 'lucide-react';
import { useCompareAnimeLists } from '@/hooks/useFriendComparison';
import { UserAnimeEntry, AnimeStatus } from '@/hooks/useUserAnimeList';
import { Profile } from '@/hooks/useFriends';
import { Link } from 'react-router-dom';

interface FriendComparisonProps {
  friend: Profile;
}

const statusConfig = {
  watching: { label: "Viendo", icon: Play, color: "bg-blue-500" },
  completed: { label: "Completado", icon: CheckCircle, color: "bg-green-500" },
  on_hold: { label: "En pausa", icon: Pause, color: "bg-yellow-500" },
  dropped: { label: "Abandonado", icon: XCircle, color: "bg-red-500" },
  plan_to_watch: { label: "Planificado", icon: Clock, color: "bg-purple-500" }
};

export const FriendComparison = ({ friend }: FriendComparisonProps) => {
  const [typeFilter, setTypeFilter] = useState('ALL');
  const { data: comparison, isLoading } = useCompareAnimeLists(friend.user_id);

  if (isLoading) {
    return <div className="text-center py-8">Comparando listas...</div>;
  }

  if (!comparison) {
    return <div className="text-center py-8">Error al cargar comparación.</div>;
  }

  // Filtrar por tipo
  const filterByType = (entries: any[]) => {
    if (typeFilter === 'ALL') return entries;
    return entries.filter(entry => {
      const anime = entry.user ? entry.user.animes : entry.animes;
      return anime?.type?.toUpperCase() === typeFilter.toUpperCase();
    });
  };

  const filteredCommon = filterByType(comparison.common);
  const filteredUserOnly = filterByType(comparison.userOnly);
  const filteredFriendOnly = filterByType(comparison.friendOnly);

  const CommonAnimeCard = ({ item }: { item: { user: UserAnimeEntry; friend: UserAnimeEntry } }) => {
    const userStatusInfo = statusConfig[item.user.status as keyof typeof statusConfig];
    const friendStatusInfo = statusConfig[item.friend.status as keyof typeof statusConfig];
    const UserIcon = userStatusInfo.icon;
    const FriendIcon = friendStatusInfo.icon;

    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <img
            src={item.user.animes.image_url || "/placeholder.svg"}
            alt={item.user.animes.title}
            className="w-20 h-28 object-cover"
          />
          <div className="flex-1 p-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">{item.user.animes.title}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <AnimeTypeBadge type={item.user.animes.type || 'Unknown'} />
                {item.user.animes.episodes && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    {item.user.animes.episodes} ep
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-0 space-y-2">
              {/* Comparación de estados */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tú:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <UserIcon className="w-3 h-3" />
                    {userStatusInfo.label}
                  </Badge>
                  {item.user.score && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.user.score}/10</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{friend.display_name}:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <FriendIcon className="w-3 h-3" />
                    {friendStatusInfo.label}
                  </Badge>
                  {item.friend.score && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.friend.score}/10</span>
                    </div>
                  )}
                </div>
              </div>

              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to={`/anime/${item.user.animes.mal_id}`}>
                  <Eye className="w-3 h-3 mr-1" />
                  Ver detalles
                </Link>
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  };

  const AnimeCard = ({ entry, showRecommendButton = false }: { entry: UserAnimeEntry; showRecommendButton?: boolean }) => {
    const statusInfo = statusConfig[entry.status as keyof typeof statusConfig];
    const Icon = statusInfo.icon;

    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <img
            src={entry.animes.image_url || "/placeholder.svg"}
            alt={entry.animes.title}
            className="w-20 h-28 object-cover"
          />
          <div className="flex-1 p-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg">{entry.animes.title}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Icon className="w-3 h-3" />
                  {statusInfo.label}
                </Badge>
                <AnimeTypeBadge type={entry.animes.type || 'Unknown'} />
                {entry.score && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{entry.score}/10</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-0 space-y-2">
              {entry.animes.episodes && (
                <p className="text-sm text-muted-foreground">
                  Episodios: {entry.episodes_watched || 0}/{entry.animes.episodes}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to={`/anime/${entry.animes.mal_id}`}>
                    <Eye className="w-3 h-3 mr-1" />
                    Ver detalles
                  </Link>
                </Button>
                
                {showRecommendButton && (
                  <Button size="sm" className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Recomendar
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con información del amigo */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-lg">
                  {friend.display_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">Comparación con {friend.display_name}</h2>
                <p className="text-muted-foreground">
                  {filteredCommon.length} en común • 
                  {filteredUserOnly.length} solo tuyos • 
                  {filteredFriendOnly.length} solo de {friend.display_name}
                </p>
              </div>
            </div>
            
            <AnimeTypeFilter 
              value={typeFilter} 
              onValueChange={setTypeFilter}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs de comparación */}
      <Tabs defaultValue="common" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="common" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            En Común ({filteredCommon.length})
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recomendaciones ({filteredFriendOnly.length})
          </TabsTrigger>
          <TabsTrigger value="your-unique" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Solo Tuyos ({filteredUserOnly.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="common" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Animes que ambos han visto</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Compara cómo calificaron los mismos animes
              </p>
            </div>
            
            {filteredCommon.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No tienen animes en común{typeFilter !== 'ALL' ? ` del tipo ${typeFilter}` : ''}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCommon.map((item) => (
                  <CommonAnimeCard key={item.user.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Recomendaciones de {friend.display_name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Animes que {friend.display_name} ha visto pero tú no
              </p>
            </div>
            
            {filteredFriendOnly.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Ya has visto todos los animes de {friend.display_name}{typeFilter !== 'ALL' ? ` del tipo ${typeFilter}` : ''}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFriendOnly.map((entry) => (
                  <AnimeCard key={entry.id} entry={entry} showRecommendButton={true} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="your-unique" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tus recomendaciones para {friend.display_name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Animes que tú has visto pero {friend.display_name} no
              </p>
            </div>
            
            {filteredUserOnly.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {friend.display_name} ya ha visto todos tus animes{typeFilter !== 'ALL' ? ` del tipo ${typeFilter}` : ''}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUserOnly.map((entry) => (
                  <AnimeCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};