-- Add policy to allow users to view other users' profiles for chat purposes
CREATE POLICY "Users can view other users' profiles for chat" 
ON public.profiles 
FOR SELECT 
USING (true);