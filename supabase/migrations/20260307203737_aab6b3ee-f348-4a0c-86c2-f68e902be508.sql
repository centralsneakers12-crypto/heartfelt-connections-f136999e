-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow service role full access" ON public.trial_keys;

-- Create proper PERMISSIVE policy for service_role only
CREATE POLICY "Service role full access" ON public.trial_keys
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);