-- Crear tabla para invitaciones pendientes
CREATE TABLE public.friend_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  invitation_code text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(inviter_id, email)
);

-- Enable RLS
ALTER TABLE public.friend_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invitations" 
ON public.friend_invitations 
FOR SELECT 
USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invitations" 
ON public.friend_invitations 
FOR INSERT 
WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own invitations" 
ON public.friend_invitations 
FOR UPDATE 
USING (auth.uid() = inviter_id);

-- Add trigger for updated_at
CREATE TRIGGER update_friend_invitations_updated_at
BEFORE UPDATE ON public.friend_invitations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();