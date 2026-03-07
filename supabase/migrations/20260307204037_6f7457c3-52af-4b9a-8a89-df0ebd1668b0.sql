-- Explicitly deny anon and authenticated roles
CREATE POLICY "Deny anon access" ON public.trial_keys
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny authenticated access" ON public.trial_keys
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);