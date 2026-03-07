import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const API_BASE_URL = 'https://api.leigosacademy.site';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const API_KEY = Deno.env.get('RESELLER_API_KEY');
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { endpoint, method, body } = await req.json();

    if (!endpoint || !endpoint.startsWith('/') || endpoint.includes('..')) {
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    // Save trial data to database if it's a trial endpoint
    if (endpoint.includes('/trial') && body) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from('trial_keys').insert({
          client_name: body.client_name || '',
          client_whatsapp: body.client_whatsapp || '',
          fingerprint: body.fingerprint || null,
          ip: body.ip || null,
          generated_key: body.is_duplicate ? null : (data?.key || null),
          is_duplicate: body.is_duplicate || false,
        });
      } catch (dbError) {
        console.error('Failed to save trial key:', dbError);
      }
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
