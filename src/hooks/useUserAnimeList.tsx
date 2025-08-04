import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AnimeSearchResult } from '@/lib/jikan-api';

export type AnimeStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export interface UserAnimeEntry {
  id: string;
  user_id: string;
  anime_id: string;
  status: AnimeStatus;
  score: number | null;
  episodes_watched: number;
  created_at: string;
  updated_at: string;
  animes: {
    id: string;
    mal_id: number;
    title: string;
    title_english: string | null;
    image_url: string | null;
    episodes: number | null;
    synopsis: string | null;
    type: string | null;
  };
}

// Hook para obtener la lista de animes del usuario con filtros
export const useUserAnimeList = (statusFilter?: AnimeStatus, typeFilter?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userAnimeList', user?.id, statusFilter, typeFilter],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('user_anime_lists')
        .select(`
          *,
          animes (
            id,
            mal_id,
            title,
            title_english,
            image_url,
            episodes,
            synopsis,
            type
          )
        `)
        .eq('user_id', user.id);
      
      // Aplicar filtro por estado si se proporciona
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // Aplicar filtro por tipo después de obtener los datos (ya que es de la tabla animes)
      let filteredData = data || [];
      if (typeFilter && typeFilter !== 'ALL') {
        filteredData = filteredData.filter(entry => 
          entry.animes?.type?.toUpperCase() === typeFilter.toUpperCase()
        );
      }
      
      return filteredData as UserAnimeEntry[];
    },
    enabled: !!user,
  });
};

export const useAddAnimeToList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      anime, 
      status,
      score 
    }: { 
      anime: AnimeSearchResult; 
      status: AnimeStatus;
      score?: number;
    }) => {
      if (!user) throw new Error('Usuario no autenticado');

      // Primero, verificar si el anime ya existe en la base de datos
      let { data: existingAnime } = await supabase
        .from('animes')
        .select('id')
        .eq('mal_id', anime.mal_id)
        .single();

      let animeId: string;

      if (!existingAnime) {
        // Crear nuevo anime en la base de datos
        const { data: newAnime, error: animeError } = await supabase
          .from('animes')
          .insert({
            mal_id: anime.mal_id,
            title: anime.title,
            title_english: anime.title_english,
            synopsis: anime.synopsis,
            image_url: anime.images?.jpg?.image_url,
            episodes: anime.episodes,
            status: anime.status,
            genre: anime.genres?.map(g => g.name) || [],
            rating: anime.score,
            type: anime.type,
          })
          .select('id')
          .single();

        if (animeError) throw animeError;
        animeId = newAnime.id;
      } else {
        animeId = existingAnime.id;
      }

      // Agregar a la lista del usuario
      const insertData: any = {
        user_id: user.id,
        anime_id: animeId,
        status,
        episodes_watched: 0,
      };
      
      if (score !== undefined) {
        insertData.score = score;
      }

      const { data, error } = await supabase
        .from('user_anime_lists')
        .upsert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { anime, status }) => {
      toast({
        title: "¡Anime agregado!",
        description: `"${anime.title}" se agregó a tu lista como "${status}".`,
      });
      
      // Invalidar queries para actualizar las listas
      queryClient.invalidateQueries({ queryKey: ['userAnimeList'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo agregar el anime a tu lista.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateAnimeStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      entryId, 
      status, 
      score, 
      episodesWatched 
    }: { 
      entryId: string; 
      status?: AnimeStatus;
      score?: number;
      episodesWatched?: number;
    }) => {
      const updateData: any = {};
      
      if (status !== undefined) updateData.status = status;
      if (score !== undefined) updateData.score = score;
      if (episodesWatched !== undefined) updateData.episodes_watched = episodesWatched;

      const { data, error } = await supabase
        .from('user_anime_lists')
        .update(updateData)
        .eq('id', entryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Actualizado",
        description: "El anime se actualizó correctamente.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['userAnimeList'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el anime.",
        variant: "destructive",
      });
    },
  });
};