import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface FriendInvitation {
  id: string;
  inviter_id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired';
  invitation_code: string;
  created_at: string;
  updated_at: string;
}

// Hook para buscar usuarios y detectar si existen o son emails nuevos
export const useSearchUsersAndEmails = (searchTerm: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['searchUsersAndEmails', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim() || searchTerm.length < 2) return { users: [], isEmail: false };
      
      // Verificar si es un email válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(searchTerm);
      
      if (isEmail) {
        // Buscar si el email ya está registrado
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', searchTerm.toLowerCase())
          .single();
        
        if (existingUser && existingUser.user_id !== user?.id) {
          return { users: [existingUser], isEmail: true, emailExists: true };
        } else {
          return { users: [], isEmail: true, emailExists: false, email: searchTerm.toLowerCase() };
        }
      } else {
        // Búsqueda normal por nombre
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .or(`display_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
          .neq('user_id', user?.id || '')
          .limit(10);
        
        if (error) throw error;
        return { users: data || [], isEmail: false };
      }
    },
    enabled: !!user && searchTerm.length >= 2,
  });
};

// Hook para obtener invitaciones enviadas
export const useSentInvitations = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['sentInvitations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('friend_invitations')
        .select('*')
        .eq('inviter_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FriendInvitation[];
    },
    enabled: !!user,
  });
};

// Hook para enviar invitación por email
export const useSendEmailInvitation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (email: string) => {
      if (!user) throw new Error('Usuario no autenticado');
      
      // Obtener perfil del usuario para el nombre
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .single();
      
      const inviterName = profile?.display_name || user.email || 'Un amigo';
      
      const response = await supabase.functions.invoke('send-invitation', {
        body: { 
          email: email.toLowerCase(),
          inviterName 
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      return response.data;
    },
    onSuccess: (_, email) => {
      toast({
        title: "¡Invitación enviada!",
        description: `Se ha enviado una invitación a ${email}`,
      });
      queryClient.invalidateQueries({ queryKey: ['sentInvitations'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar la invitación.",
        variant: "destructive",
      });
    },
  });
};