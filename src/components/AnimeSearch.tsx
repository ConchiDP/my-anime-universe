import { useState, useEffect } from 'react';
import { Search, Plus, Star, Calendar, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimeTypeBadge } from '@/components/AnimeTypeBadge';
import { AnimeTypeFilter } from '@/components/AnimeTypeFilter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAnimeSearch } from '@/hooks/useAnimeSearch';
import { useAddAnimeToList, AnimeStatus } from '@/hooks/useUserAnimeList';
import { AnimeSearchResult } from '@/lib/jikan-api';

interface AnimeSearchProps {
  initialQuery?: string;
}

export const AnimeSearch = ({ initialQuery = "" }: AnimeSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);
  
  const { data: searchResults, isLoading, error } = useAnimeSearch(query, typeFilter);
  const addAnimeToList = useAddAnimeToList();

  const handleAddToList = (anime: AnimeSearchResult, status: AnimeStatus) => {
    addAnimeToList.mutate({ anime, status });
  };

  const getStatusLabel = (status: AnimeStatus) => {
    const labels = {
      watching: 'Viendo',
      completed: 'Completado',
      on_hold: 'En pausa',
      dropped: 'Abandonado',
      plan_to_watch: 'Planeo ver',
    };
    return labels[status];
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar anime por título..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <AnimeTypeFilter 
          value={typeFilter} 
          onValueChange={setTypeFilter}
        />
      </div>

      {/* Resultados de búsqueda */}
      {query.length > 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Resultados para "{query}"
          </h3>
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative">
                    <Skeleton className="h-48 w-full" />
                  </div>
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Error al buscar animes. Intenta de nuevo.</p>
            </div>
          )}

          {searchResults && searchResults.data.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron animes para "{query}"</p>
            </div>
          )}

          {searchResults && searchResults.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.data.map((anime) => (
                <Card key={anime.mal_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={anime.images?.jpg?.image_url || '/placeholder.svg'}
                      alt={anime.title}
                      className="w-full h-48 object-cover"
                    />
                    {anime.score && (
                      <Badge className="absolute top-2 right-2 bg-primary">
                        <Star className="h-3 w-3 mr-1" />
                        {anime.score}
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2">
                      {anime.title_english || anime.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground flex-wrap">
                        <AnimeTypeBadge type={anime.type} />
                        {anime.episodes && (
                          <span className="flex items-center gap-1">
                            <Tv className="h-3 w-3" />
                            {anime.episodes} eps
                          </span>
                        )}
                        {anime.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {anime.year}
                          </span>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                   <CardContent className="pt-0 space-y-2">
                     <div className="flex gap-2">
                       <Button
                         variant="outline"
                         size="sm"
                         className="flex-1"
                         asChild
                       >
                         <Link to={`/anime/${anime.mal_id}`}>
                           Ver Detalles
                         </Link>
                       </Button>
                     </div>
                     <Select onValueChange={(status) => handleAddToList(anime, status as AnimeStatus)}>
                       <SelectTrigger className="w-full">
                         <SelectValue placeholder="Agregar a lista" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="watching">
                           <div className="flex items-center gap-2">
                             <Plus className="h-4 w-4" />
                             Viendo
                           </div>
                         </SelectItem>
                         <SelectItem value="plan_to_watch">
                           <div className="flex items-center gap-2">
                             <Plus className="h-4 w-4" />
                             Planeo ver
                           </div>
                         </SelectItem>
                         <SelectItem value="completed">
                           <div className="flex items-center gap-2">
                             <Plus className="h-4 w-4" />
                             Completado
                           </div>
                         </SelectItem>
                         <SelectItem value="on_hold">
                           <div className="flex items-center gap-2">
                             <Plus className="h-4 w-4" />
                             En pausa
                           </div>
                         </SelectItem>
                         <SelectItem value="dropped">
                           <div className="flex items-center gap-2">
                             <Plus className="h-4 w-4" />
                             Abandonado
                           </div>
                         </SelectItem>
                       </SelectContent>
                     </Select>
                   </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};