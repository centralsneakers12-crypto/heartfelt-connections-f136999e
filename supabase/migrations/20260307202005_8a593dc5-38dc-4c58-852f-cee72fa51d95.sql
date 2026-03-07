CREATE TABLE public.trial_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL DEFAULT '',
  client_whatsapp text NOT NULL DEFAULT '',
  fingerprint text,
  ip text,
  generated_key text,
  is_duplicate boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.trial_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access" ON public.trial_keys
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to read trial_keys" ON public.trial_keys
  FOR SELECT
  TO anon
  USING (true);