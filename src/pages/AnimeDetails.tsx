import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useAddAnimeToList, AnimeStatus } from '@/hooks/useUserAnimeList';
import { ArrowLeft, Star, Calendar, TvIcon, Users } from 'lucide-react';
import { toast } from 'sonner';

interface AnimeDetails {
  mal_id: number;
  title: string;
  title_english?: string;
  synopsis?: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score?: number;
  episodes?: number;
  status?: string;
  aired?: {
    string?: string;
  };
  genres?: Array<{ name: string }>;
  studios?: Array<{ name: string }>;
}

const statusConfig = {
  watching: "Viendo",
  completed: "Completado", 
  on_hold: "En pausa",
  dropped: "Abandonado",
  plan_to_watch: "Planificado"
};

export default function AnimeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addToList = useAddAnimeToList();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    const fetchAnimeDetails = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!response.ok) throw new Error('Error al cargar detalles');
        
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los detalles del anime');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id, user, loading, navigate]);

  const handleAddToList = (status: AnimeStatus) => {
    if (!anime) return;
    
    const animeData = {
      mal_id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english || null,
      images: {
        jpg: {
          image_url: anime.images.jpg.large_image_url,
          small_image_url: anime.images.jpg.large_image_url,
          large_image_url: anime.images.jpg.large_image_url,
        }
      },
      episodes: anime.episodes || null,
      synopsis: anime.synopsis || null,
      score: anime.score || null,
      status: anime.status || null,
      genres: anime.genres || [],
      year: anime.aired?.string ? new Date(anime.aired.string).getFullYear() : null,
      type: 'TV', // valor por defecto
    };
    
    addToList.mutate({
      anime: animeData,
      status: status,
    });
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Anime no encontrado</h1>
            <Button asChild className="mt-4">
              <Link to="/search">Volver a buscar</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/search" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imagen y acciones */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Agregar a mi lista:</label>
                    <Select onValueChange={(value) => handleAddToList(value as AnimeStatus)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información del anime */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-xl text-muted-foreground mb-4">{anime.title_english}</p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {anime.score && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{anime.score}/10</span>
                  </div>
                )}
                {anime.episodes && (
                  <div className="flex items-center gap-2">
                    <TvIcon className="w-5 h-5 text-muted-foreground" />
                    <span>{anime.episodes} episodios</span>
                  </div>
                )}
                {anime.status && (
                  <Badge variant="secondary">{anime.status}</Badge>
                )}
                {anime.aired?.string && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{anime.aired.string}</span>
                  </div>
                )}
              </div>
            </div>

            {anime.synopsis && (
              <Card>
                <CardHeader>
                  <CardTitle>Sinopsis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {anime.synopsis}
                  </p>
                </CardContent>
              </Card>
            )}

            {anime.genres && anime.genres.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Géneros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {anime.studios && anime.studios.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Estudios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span>{anime.studios.map(studio => studio.name).join(', ')}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}