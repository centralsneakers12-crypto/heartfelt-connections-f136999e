
CREATE TABLE public.test_licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key text NOT NULL UNIQUE,
  is_used boolean NOT NULL DEFAULT false,
  assigned_to_name text,
  assigned_to_whatsapp text,
  assigned_to_fingerprint text,
  assigned_to_ip text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  assigned_at timestamp with time zone
);

ALTER TABLE public.test_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny anon access" ON public.test_licenses FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "Deny authenticated access" ON public.test_licenses FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Service role full access" ON public.test_licenses FOR ALL TO service_role USING (true) WITH CHECK (true);
