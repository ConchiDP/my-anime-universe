import { PlayCircle, Star, TrendingUp, Users, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useUserAnimeList } from '@/hooks/useUserAnimeList';
import { useAnimeSearch } from '@/hooks/useAnimeSearch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: userAnimeList, isLoading: isLoadingList } = useUserAnimeList();
  const [trendingAnimes, setTrendingAnimes] = useState<any[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  // Obtener animes trending al cargar
  useEffect(() => {
    const fetchTrendingAnimes = async () => {
      setIsLoadingTrending(true);
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=6');
        const data = await response.json();
        // Filtrar duplicados por mal_id
        const uniqueAnimes = data.data?.filter((anime: any, index: number, self: any[]) => 
          index === self.findIndex((a: any) => a.mal_id === anime.mal_id)
        ) || [];
        setTrendingAnimes(uniqueAnimes);
      } catch (error) {
        console.error('Error fetching trending animes:', error);
      } finally {
        setIsLoadingTrending(false);
      }
    };

    fetchTrendingAnimes();
  }, []);

  // Calcular estadísticas del usuario
  const watchingCount = userAnimeList?.filter(anime => anime.status === 'watching').length || 0;
  const completedCount = userAnimeList?.filter(anime => anime.status === 'completed').length || 0;
  const planToWatchCount = userAnimeList?.filter(anime => anime.status === 'plan_to_watch').length || 0;

  const handleDiscoverTrends = () => {
    navigate('/search?trending=true');
  };

  const handleExploreAnime = () => {
    navigate('/search');
  };

  const handleMyList = () => {
    navigate('/my-list');
  };

  const handleAddAnime = () => {
    navigate('/search');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Welcome Section for Logged Users */}
      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
            ¡Bienvenido de vuelta,
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              {user?.email?.split('@')[0] || 'Otaku'}!
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Continúa explorando tu mundo anime. Descubre nuevos títulos y mantén al día tu colección.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={handleMyList}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary">{watchingCount}</h3>
              <p className="text-sm text-muted-foreground mt-1">Viendo Actualmente</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={handleMyList}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-secondary text-accent-foreground group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-secondary">{completedCount}</h3>
              <p className="text-sm text-muted-foreground mt-1">Completados</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={handleMyList}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-primary">{planToWatchCount}</h3>
              <p className="text-sm text-muted-foreground mt-1">Pendientes</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
            onClick={handleAddAnime}
          >
            <Plus className="mr-2 h-5 w-5" />
            Agregar Anime
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/5"
            onClick={handleDiscoverTrends}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Descubre Tendencias
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/5"
            onClick={handleExploreAnime}
          >
            <Star className="mr-2 h-5 w-5" />
            Explorar Anime
          </Button>
        </div>
      </div>
      
      {/* Trending Anime Section */}
      <div className="container relative z-10 mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🔥 Animes en Tendencia</h2>
          <p className="text-muted-foreground">Los animes más populares en emisión actualmente</p>
        </div>
        
        {isLoadingTrending ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="animate-pulse">
                <CardContent className="p-2">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
                  <div className="h-4 bg-muted rounded mb-1" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingAnimes.map((anime) => (
              <Card 
                key={anime.mal_id} 
                className="group cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              >
                <CardContent className="p-2">
                  <div className="aspect-[3/4] rounded-lg mb-2 overflow-hidden">
                    {anime.images?.jpg?.image_url ? (
                      <img 
                        src={anime.images.jpg.image_url} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <PlayCircle className="h-8 w-8 text-primary/60" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-medium truncate" title={anime.title}>
                    {anime.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {anime.score ? anime.score.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!isLoadingTrending && trendingAnimes.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={handleDiscoverTrends}
              className="border-primary/20 hover:bg-primary/5"
            >
              Ver Más Tendencias
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="container relative z-10 mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Acciones Rápidas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={handleMyList}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mi Lista</h3>
              <p className="text-sm text-muted-foreground">
                Gestiona tu colección personal de animes
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={() => navigate('/friends')}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-secondary text-accent-foreground group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Amigos</h3>
              <p className="text-sm text-muted-foreground">
                Conecta y compara listas con otros otakus
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow/50 group cursor-pointer" onClick={handleExploreAnime}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Explorar</h3>
              <p className="text-sm text-muted-foreground">
                Descubre nuevos animes por género y popularidad
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}