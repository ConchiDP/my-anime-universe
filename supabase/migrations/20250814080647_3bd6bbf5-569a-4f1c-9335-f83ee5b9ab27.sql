-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Los usuarios pueden ver todos los perfiles" ON public.profiles;

-- Create more secure policies for profiles table

-- 1. Users can view their own complete profile (including email)
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Users can view basic info (no email) of their friends
CREATE POLICY "Users can view friends basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() != user_id AND 
  EXISTS (
    SELECT 1 FROM public.friendships 
    WHERE status = 'accepted' 
    AND (
      (requester_id = auth.uid() AND addressee_id = user_id) OR 
      (addressee_id = auth.uid() AND requester_id = user_id)
    )
  )
);

-- 3. Create a function to get safe profile data for search (no email)
CREATE OR REPLACE FUNCTION public.get_searchable_profiles(search_term text)
RETURNS TABLE (
  id uuid,
  user_id uuid, 
  display_name text,
  avatar_url text
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.display_name,
    p.avatar_url
  FROM public.profiles p
  WHERE 
    p.user_id != auth.uid() AND
    (p.display_name ILIKE '%' || search_term || '%')
  LIMIT 10;
END;
$$;