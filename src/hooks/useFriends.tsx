import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  email?: string; // Email solo disponible para el propio perfil
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchableProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  updated_at: string;
  requester?: Profile;
  addressee?: Profile;
}

// Hook para buscar usuarios
export const useSearchUsers = (searchTerm: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['searchUsers', searchTerm],
    queryFn: async (): Promise<SearchableProfile[]> => {
      if (!searchTerm.trim() || searchTerm.length < 2) return [];
      
      // Usar función segura para búsqueda (sin emails)
      const { data, error } = await supabase
        .rpc('get_searchable_profiles', { search_term: searchTerm });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user && searchTerm.length >= 2,
  });
};

// Hook para obtener amigos
export const useFriends = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['friends', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: friendships, error } = await supabase
        .from('friendships')
        .select('*')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);
      
      if (error) throw error;
      
      // Obtener profiles de los amigos
      const friendIds = friendships.map(f => 
        f.requester_id === user.id ? f.addressee_id : f.requester_id
      );
      
      if (friendIds.length === 0) return [];
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', friendIds);
      
      if (profilesError) throw profilesError;
      
      // Combinar datos
      const friendshipsWithProfiles = friendships.map(friendship => ({
        ...friendship,
        requester: profiles.find(p => p.user_id === friendship.requester_id),
        addressee: profiles.find(p => p.user_id === friendship.addressee_id),
      }));
      
      return friendshipsWithProfiles as Friendship[];
    },
    enabled: !!user,
  });
};

// Hook para obtener solicitudes pendientes
export const usePendingRequests = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['pendingRequests', user?.id],
    queryFn: async () => {
      if (!user) return { sent: [], received: [] };
      
      // Solicitudes enviadas
      const { data: sentRequests, error: sentError } = await supabase
        .from('friendships')
        .select('*')
        .eq('status', 'pending')
        .eq('requester_id', user.id);
      
      if (sentError) throw sentError;
      
      // Solicitudes recibidas
      const { data: receivedRequests, error: receivedError } = await supabase
        .from('friendships')
        .select('*')
        .eq('status', 'pending')
        .eq('addressee_id', user.id);
      
      if (receivedError) throw receivedError;
      
      // Obtener profiles para solicitudes enviadas
      const sentUserIds = sentRequests.map(r => r.addressee_id);
      const { data: sentProfiles } = sentUserIds.length > 0 ? await supabase
        .from('profiles')
        .select('*')
        .in('user_id', sentUserIds) : { data: [] };
      
      // Obtener profiles para solicitudes recibidas
      const receivedUserIds = receivedRequests.map(r => r.requester_id);
      const { data: receivedProfiles } = receivedUserIds.length > 0 ? await supabase
        .from('profiles')
        .select('*')
        .in('user_id', receivedUserIds) : { data: [] };
      
      // Combinar datos
      const sent = sentRequests.map(request => ({
        ...request,
        addressee: sentProfiles?.find(p => p.user_id === request.addressee_id),
      }));
      
      const received = receivedRequests.map(request => ({
        ...request,
        requester: receivedProfiles?.find(p => p.user_id === request.requester_id),
      }));
      
      return { 
        sent: sent as Friendship[], 
        received: received as Friendship[] 
      };
    },
    enabled: !!user,
  });
};

// Hook para enviar solicitud de amistad
export const useSendFriendRequest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user) throw new Error('Usuario no autenticado');
      
      // Verificar si ya existe una solicitud
      const { data: existing } = await supabase
        .from('friendships')
        .select('*')
        .or(`and(requester_id.eq.${user.id},addressee_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},addressee_id.eq.${user.id})`);
      
      if (existing && existing.length > 0) {
        throw new Error('Ya existe una solicitud de amistad con este usuario');
      }
      
      const { data, error } = await supabase
        .from('friendships')
        .insert({
          requester_id: user.id,
          addressee_id: targetUserId,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Solicitud enviada",
        description: "Se ha enviado la solicitud de amistad correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar la solicitud.",
        variant: "destructive",
      });
    },
  });
};

// Hook para responder a solicitudes
export const useRespondToRequest = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: 'accepted' | 'declined' }) => {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: action })
        .eq('id', requestId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { action }) => {
      const message = action === 'accepted' ? 'Solicitud aceptada' : 'Solicitud rechazada';
      toast({
        title: message,
        description: "La acción se ha completado correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo procesar la solicitud.",
        variant: "destructive",
      });
    },
  });
};

// Hook para remover amistad
export const useRemoveFriend = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (friendshipId: string) => {
      const { error } = await supabase
        .from('friendships')
        .delete()
        .eq('id', friendshipId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Amistad eliminada",
        description: "Se ha removido al usuario de tu lista de amigos.",
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la amistad.",
        variant: "destructive",
      });
    },
  });
};