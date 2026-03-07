import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const API_BASE_URL = 'https://api.leigosacademy.site';

const ALLOWED_ENDPOINTS = [
  '/reseller-api/licenses/trial',
  '/reseller-api/licenses/verify',
];

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
    const reqBody = await req.json();
    const { endpoint, method, body } = reqBody;

    // Validate endpoint
    if (!endpoint || typeof endpoint !== 'string' || !endpoint.startsWith('/') || endpoint.includes('..')) {
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Whitelist allowed endpoints
    if (!ALLOWED_ENDPOINTS.some(allowed => endpoint.startsWith(allowed))) {
      return new Response(JSON.stringify({ error: 'Endpoint not allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate method
    const allowedMethods = ['GET', 'POST'];
    const sanitizedMethod = (typeof method === 'string' ? method.toUpperCase() : 'GET');
    if (!allowedMethods.includes(sanitizedMethod)) {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate body fields if present
    if (body && typeof body === 'object') {
      if (body.client_name && (typeof body.client_name !== 'string' || body.client_name.length > 100)) {
        return new Response(JSON.stringify({ error: 'Invalid client_name' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (body.client_whatsapp && (typeof body.client_whatsapp !== 'string' || body.client_whatsapp.length > 20)) {
        return new Response(JSON.stringify({ error: 'Invalid client_whatsapp' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: sanitizedMethod,
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
          client_name: (body.client_name || '').slice(0, 100),
          client_whatsapp: (body.client_whatsapp || '').slice(0, 20),
          fingerprint: body.fingerprint ? String(body.fingerprint).slice(0, 500) : null,
          ip: body.ip ? String(body.ip).slice(0, 45) : null,
          generated_key: body.is_duplicate ? null : (data?.key || null),
          is_duplicate: !!body.is_duplicate,
        });
      } catch (dbError) {
        console.error('Failed to save trial key:', dbError);
      }
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
