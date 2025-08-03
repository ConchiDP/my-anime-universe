
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserAnimeList } from "@/hooks/useUserAnimeList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimeTypeBadge } from "@/components/AnimeTypeBadge";
import { Star, Play, CheckCircle, Pause, XCircle, Clock, Camera, Edit2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileEdit } from "@/components/ProfileEdit";

const statusConfig = {
  watching: { label: "Viendo", icon: Play, color: "bg-blue-500" },
  completed: { label: "Completado", icon: CheckCircle, color: "bg-green-500" },
  on_hold: { label: "En pausa", icon: Pause, color: "bg-yellow-500" },
  dropped: { label: "Abandonado", icon: XCircle, color: "bg-red-500" },
  plan_to_watch: { label: "Planificado", icon: Clock, color: "bg-purple-500" }
};

export default function Profile() {
  const { user, loading } = useAuth();
  const { data: animeList, error, isLoading } = useUserAnimeList();
  const [showEditProfile, setShowEditProfile] = useState(false);

  if (loading) return <div className="p-4">Cargando usuario...</div>;
  if (!user) return <div className="p-4">No estás autenticado.</div>;

  if (isLoading) return <div className="p-4">Cargando lista de animes...</div>;
  if (error) return <div className="p-4">Error al cargar lista: {error.message}</div>;

  const groupedAnimes = animeList?.reduce((acc, entry) => {
    if (!acc[entry.status]) acc[entry.status] = [];
    acc[entry.status].push(entry);
    return acc;
  }, {} as Record<string, typeof animeList>) || {};

  const totalAnimes = animeList?.length || 0;
  const averageScore = animeList?.filter(entry => entry.score).length 
    ? (animeList.filter(entry => entry.score).reduce((sum, entry) => sum + (entry.score || 0), 0) / animeList.filter(entry => entry.score).length).toFixed(1)
    : "N/A";

  const AnimeCard = ({ entry }: { entry: typeof animeList[0] }) => {
    const statusInfo = statusConfig[entry.status as keyof typeof statusConfig];
    const Icon = statusInfo?.icon || Play;

    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <img
            src={entry.animes.image_url || "/placeholder.svg"}
            alt={entry.animes.title}
            className="w-16 h-20 object-cover"
          />
          <div className="flex-1 p-3">
            <h4 className="font-semibold text-sm mb-1 line-clamp-2">{entry.animes.title}</h4>
            <div className="flex items-center gap-1 flex-wrap mb-2">
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Icon className="w-3 h-3" />
                {statusInfo?.label}
              </Badge>
              <AnimeTypeBadge type={entry.animes.type || 'Unknown'} />
            </div>
            {entry.score && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{entry.score}/10</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="md:w-1/3">
            <CardHeader className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback className="text-2xl">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                {user.email}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total animes:</span>
                  <span className="font-semibold">{totalAnimes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Puntuación media:</span>
                  <span className="font-semibold">{averageScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completados:</span>
                  <span className="font-semibold">{groupedAnimes.completed?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Viendo:</span>
                  <span className="font-semibold">{groupedAnimes.watching?.length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:w-2/3">
            <CardHeader>
              <CardTitle>Mi Lista de Anime</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">Todos ({totalAnimes})</TabsTrigger>
                  {Object.entries(statusConfig).map(([key, config]) => {
                    const count = groupedAnimes[key]?.length || 0;
                    return (
                      <TabsTrigger key={key} value={key} className="text-xs">
                        {config.label} ({count})
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {animeList && animeList.length > 0 ? (
                      animeList.slice(0, 6).map((entry) => (
                        <AnimeCard key={entry.id} entry={entry} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No tienes animes en tu lista aún.
                      </p>
                    )}
                    {animeList && animeList.length > 6 && (
                      <Button variant="outline" className="mt-2" asChild>
                        <a href="/my-list">Ver todos los animes</a>
                      </Button>
                    )}
                  </div>
                </TabsContent>

                {Object.entries(statusConfig).map(([key, config]) => (
                  <TabsContent key={key} value={key} className="mt-4">
                    <div className="grid gap-3 max-h-96 overflow-y-auto">
                      {groupedAnimes[key]?.length > 0 ? (
                        groupedAnimes[key].slice(0, 6).map((entry) => (
                          <AnimeCard key={entry.id} entry={entry} />
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          No tienes animes en "{config.label}" todavía.
                        </p>
                      )}
                      {groupedAnimes[key]?.length > 6 && (
                        <Button variant="outline" className="mt-2" asChild>
                          <a href="/my-list">Ver todos</a>
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
      
      {showEditProfile && (
        <ProfileEdit 
          open={showEditProfile} 
          onClose={() => setShowEditProfile(false)} 
        />
      )}
    </div>
  );
}
