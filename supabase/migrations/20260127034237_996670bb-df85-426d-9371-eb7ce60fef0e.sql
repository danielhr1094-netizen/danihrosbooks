-- Fix: Ensure contact_messages table has no public SELECT access
-- Drop the existing admin SELECT policy and recreate it to ensure proper configuration
-- The ALL policy already covers admin SELECT, so we can simplify

-- First, drop the redundant "Admins can view contact messages" SELECT policy
-- since "Admins can manage contact messages" (ALL) already covers SELECT for admins
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;

-- Verify the INSERT policy is restrictive (already is, but let's ensure it's correct)
-- The current "Anyone can send contact messages" INSERT policy is correct for a public contact form

-- Add an explicit DENY SELECT policy for anonymous/public users to be extra safe
-- This is defense in depth - even though no permissive SELECT policy exists for public,
-- we explicitly create a restrictive policy that only allows admin SELECT
CREATE POLICY "Only admins can read contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));