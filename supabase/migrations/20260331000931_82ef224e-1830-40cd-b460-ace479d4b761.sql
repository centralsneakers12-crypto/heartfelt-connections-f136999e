
DROP POLICY IF EXISTS "Deny anon access" ON public.test_licenses;
DROP POLICY IF EXISTS "Deny authenticated access" ON public.test_licenses;

CREATE POLICY "Deny anon access" ON public.test_licenses AS RESTRICTIVE FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "Deny authenticated access" ON public.test_licenses AS RESTRICTIVE FOR ALL TO authenticated USING (false) WITH CHECK (false);
