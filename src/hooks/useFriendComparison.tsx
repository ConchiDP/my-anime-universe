import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { UserAnimeEntry } from './useUserAnimeList';

// Hook para obtener la lista de animes de un amigo específico
export const useFriendAnimeList = (friendUserId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['friendAnimeList', friendUserId],
    queryFn: async () => {
      if (!user || !friendUserId) return [];
      
      const { data, error } = await supabase
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
        .eq('user_id', friendUserId)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as UserAnimeEntry[];
    },
    enabled: !!user && !!friendUserId,
  });
};

// Hook para comparar listas entre el usuario actual y un amigo
export const useCompareAnimeLists = (friendUserId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['compareAnimeLists', user?.id, friendUserId],
    queryFn: async () => {
      if (!user || !friendUserId) return { common: [], userOnly: [], friendOnly: [] };
      
      // Obtener lista del usuario
      const { data: userList, error: userError } = await supabase
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
      
      if (userError) throw userError;
      
      // Obtener lista del amigo
      const { data: friendList, error: friendError } = await supabase
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
        .eq('user_id', friendUserId);
      
      if (friendError) throw friendError;
      
      // Crear mapas para comparación eficiente
      const userAnimeMap = new Map(userList.map(entry => [entry.animes.mal_id, entry]));
      const friendAnimeMap = new Map(friendList.map(entry => [entry.animes.mal_id, entry]));
      
      // Encontrar animes en común
      const common: Array<{ user: UserAnimeEntry; friend: UserAnimeEntry }> = [];
      const userOnly: UserAnimeEntry[] = [];
      const friendOnly: UserAnimeEntry[] = [];
      
      // Procesar lista del usuario
      userList.forEach(userEntry => {
        const friendEntry = friendAnimeMap.get(userEntry.animes.mal_id);
        if (friendEntry) {
          common.push({ 
            user: userEntry as UserAnimeEntry, 
            friend: friendEntry as UserAnimeEntry 
          });
        } else {
          userOnly.push(userEntry as UserAnimeEntry);
        }
      });
      
      // Procesar lista del amigo (solo los que no están en común)
      friendList.forEach(friendEntry => {
        if (!userAnimeMap.has(friendEntry.animes.mal_id)) {
          friendOnly.push(friendEntry as UserAnimeEntry);
        }
      });
      
      return { common, userOnly, friendOnly };
    },
    enabled: !!user && !!friendUserId,
  });
};