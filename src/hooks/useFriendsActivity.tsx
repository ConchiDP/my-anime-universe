import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface FriendActivity {
  id: string;
  user_id: string;
  anime_id: string;
  status: string;
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
    type: string | null;
  };
  profiles: {
    id: string;
    user_id: string;
    display_name: string;
  };
}

export const useFriendsActivity = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['friendsActivity', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Primero obtener los IDs de los amigos
      const { data: friendships, error: friendshipsError } = await supabase
        .from('friendships')
        .select('requester_id, addressee_id')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);
      
      if (friendshipsError) throw friendshipsError;
      
      // Extraer los IDs de los amigos (excluyendo al usuario actual)
      const friendIds = friendships
        .map(friendship => 
          friendship.requester_id === user.id 
            ? friendship.addressee_id 
            : friendship.requester_id
        )
        .filter(id => id !== user.id);
      
      if (friendIds.length === 0) return [];
      
      // Obtener las actividades recientes de los amigos
      const { data: activities, error: activitiesError } = await supabase
        .from('user_anime_lists')
        .select(`
          *,
          animes (
            id,
            mal_id,
            title,
            title_english,
            image_url,
            type
          )
        `)
        .in('user_id', friendIds)
        .order('updated_at', { ascending: false })
        .limit(20);
      
      if (activitiesError) throw activitiesError;
      
      // Obtener los perfiles de los usuarios para cada actividad
      const activitiesWithProfiles = await Promise.all(
        (activities || []).map(async (activity) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, user_id, display_name')
            .eq('user_id', activity.user_id)
            .single();
          
          return {
            ...activity,
            profiles: profile
          };
        })
      );
      
      return activitiesWithProfiles.filter(activity => activity.profiles) as FriendActivity[];
    },
    enabled: !!user,
  });
};