-- Remove public read access to site_settings table
-- Only admins should be able to view configuration settings
DROP POLICY IF EXISTS "Settings are publicly readable" ON public.site_settings;