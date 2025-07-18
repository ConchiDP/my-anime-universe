import { useAuth } from "@/hooks/useAuth";
import { useUserAnimeList, useUpdateAnimeStatus, AnimeStatus } from "@/hooks/useUserAnimeList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Edit, Play, Pause, CheckCircle, XCircle, Clock } from "lucide-react";

const statusConfig = {
  watching: { label: "Viendo", icon: Play, color: "bg-blue-500" },
  completed: { label: "Completado", icon: CheckCircle, color: "bg-green-500" },
  on_hold: { label: "En pausa", icon: Pause, color: "bg-yellow-500" },
  dropped: { label: "Abandonado", icon: XCircle, color: "bg-red-500" },
  plan_to_watch: { label: "Planificado", icon: Clock, color: "bg-purple-500" }
};

export default function MyList() {
  const { user, loading } = useAuth();
  const { data: animeList, error, isLoading } = useUserAnimeList();
  const updateStatus = useUpdateAnimeStatus();

  if (loading) return <div className="p-4">Cargando usuario...</div>;
  if (!user) return <div className="p-4">No estás autenticado.</div>;

  if (isLoading) return <div className="p-4">Cargando lista de animes...</div>;
  if (error) return <div className="p-4">Error al cargar lista: {error.message}</div>;

  const groupedAnimes = animeList?.reduce((acc, entry) => {
    if (!acc[entry.status]) acc[entry.status] = [];
    acc[entry.status].push(entry);
    return acc;
  }, {} as Record<AnimeStatus, typeof animeList>) || {};

  const handleStatusChange = (entryId: string, newStatus: AnimeStatus) => {
    updateStatus.mutate({ entryId, status: newStatus });
  };

  const AnimeCard = ({ entry }: { entry: typeof animeList[0] }) => {
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
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Icon className="w-3 h-3" />
                  {statusInfo.label}
                </Badge>
                {entry.score && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{entry.score}/10</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {entry.animes.episodes && (
                <p className="text-sm text-muted-foreground mb-2">
                  Episodios: {entry.episodes_watched || 0}/{entry.animes.episodes}
                </p>
              )}
              <Select onValueChange={(value) => handleStatusChange(entry.id, value as AnimeStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Cambiar estado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <config.icon className="w-4 h-4" />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mi Lista de Anime</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="all">Todos ({animeList?.length || 0})</TabsTrigger>
          {Object.entries(statusConfig).map(([key, config]) => {
            const count = groupedAnimes[key as AnimeStatus]?.length || 0;
            return (
              <TabsTrigger key={key} value={key}>
                {config.label} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4">
            {animeList && animeList.length > 0 ? (
              animeList.map((entry) => (
                <AnimeCard key={entry.id} entry={entry} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No tienes animes en tu lista aún. ¡Ve a buscar algunos!
              </p>
            )}
          </div>
        </TabsContent>

        {Object.entries(statusConfig).map(([key, config]) => (
          <TabsContent key={key} value={key}>
            <div className="grid gap-4">
              {groupedAnimes[key as AnimeStatus]?.length > 0 ? (
                groupedAnimes[key as AnimeStatus].map((entry) => (
                  <AnimeCard key={entry.id} entry={entry} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No tienes animes en "{config.label}" todavía.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}