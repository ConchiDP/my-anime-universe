-- Create the friend_invitations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.friend_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id UUID NOT NULL,
  email TEXT NOT NULL,
  invitation_code UUID NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.friend_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for friend_invitations
CREATE POLICY "Users can view their own sent invitations" 
ON public.friend_invitations 
FOR SELECT 
USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create their own invitations" 
ON public.friend_invitations 
FOR INSERT 
WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own invitations" 
ON public.friend_invitations 
FOR UPDATE 
USING (auth.uid() = inviter_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_friend_invitations_updated_at
BEFORE UPDATE ON public.friend_invitations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();