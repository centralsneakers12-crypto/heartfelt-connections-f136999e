import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function getSupabase() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const action = body?.action || 'login';

    // --- ACTION: claim-license (public, no password needed) ---
    if (action === 'claim-license') {
      const { client_name, client_whatsapp, fingerprint, ip } = body;

      if (!client_name || typeof client_name !== 'string' || client_name.length > 100) {
        return jsonResponse({ error: 'Nome inválido' }, 400);
      }
      if (!client_whatsapp || typeof client_whatsapp !== 'string' || client_whatsapp.length > 20) {
        return jsonResponse({ error: 'WhatsApp inválido' }, 400);
      }

      const supabase = getSupabase();

      // Check if whatsapp already used
      const { data: existingByWpp } = await supabase
        .from('test_licenses')
        .select('license_key')
        .eq('assigned_to_whatsapp', client_whatsapp)
        .eq('is_used', true)
        .limit(1);

      if (existingByWpp && existingByWpp.length > 0) {
        return jsonResponse({ success: true, key: existingByWpp[0].license_key, already_claimed: true });
      }

      // Check if fingerprint already used
      if (fingerprint) {
        const { data: existingByFp } = await supabase
          .from('test_licenses')
          .select('license_key')
          .eq('assigned_to_fingerprint', fingerprint)
          .eq('is_used', true)
          .limit(1);

        if (existingByFp && existingByFp.length > 0) {
          return jsonResponse({ success: true, key: existingByFp[0].license_key, already_claimed: true });
        }
      }

      // Check if IP already used
      if (ip && ip !== 'unknown') {
        const { data: existingByIp } = await supabase
          .from('test_licenses')
          .select('license_key')
          .eq('assigned_to_ip', ip)
          .eq('is_used', true)
          .limit(1);

        if (existingByIp && existingByIp.length > 0) {
          return jsonResponse({ success: true, key: existingByIp[0].license_key, already_claimed: true });
        }
      }

      // Get an available license
      const { data: available, error: fetchErr } = await supabase
        .from('test_licenses')
        .select('id, license_key')
        .eq('is_used', false)
        .limit(1);

      if (fetchErr || !available || available.length === 0) {
        return jsonResponse({ error: 'Nenhuma chave de teste disponível no momento. Tente novamente mais tarde.' }, 503);
      }

      const license = available[0];

      // Assign the license
      const { error: updateErr } = await supabase
        .from('test_licenses')
        .update({
          is_used: true,
          assigned_to_name: client_name.trim().slice(0, 100),
          assigned_to_whatsapp: client_whatsapp.slice(0, 20),
          assigned_to_fingerprint: fingerprint ? String(fingerprint).slice(0, 500) : null,
          assigned_to_ip: ip ? String(ip).slice(0, 45) : null,
          assigned_at: new Date().toISOString(),
        })
        .eq('id', license.id);

      if (updateErr) {
        return jsonResponse({ error: 'Erro ao atribuir chave.' }, 500);
      }

      // Also log in trial_keys for historical tracking
      await supabase.from('trial_keys').insert({
        client_name: client_name.trim().slice(0, 100),
        client_whatsapp: client_whatsapp.slice(0, 20),
        fingerprint: fingerprint ? String(fingerprint).slice(0, 500) : null,
        ip: ip ? String(ip).slice(0, 45) : null,
        generated_key: license.license_key,
        is_duplicate: false,
      }).catch(() => {});

      return jsonResponse({ success: true, key: license.license_key });
    }

    // --- All other actions require password ---
    const password = typeof body?.password === 'string' ? body.password.trim() : '';
    if (!password || password.length > 100) {
      return jsonResponse({ error: 'Invalid request' }, 400);
    }

    const ACCESS_PASSWORD = Deno.env.get('ACCESS_PASSWORD');
    if (!ACCESS_PASSWORD) {
      return jsonResponse({ error: 'Server misconfigured' }, 500);
    }

    if (password !== ACCESS_PASSWORD) {
      return jsonResponse({ success: false, error: 'Senha incorreta' }, 401);
    }

    const supabase = getSupabase();

    // --- ACTION: add-licenses ---
    if (action === 'add-licenses') {
      const keys = body?.keys;
      if (!Array.isArray(keys) || keys.length === 0 || keys.length > 50) {
        return jsonResponse({ error: 'Envie entre 1 e 50 chaves' }, 400);
      }

      const rows = keys
        .filter((k: unknown) => typeof k === 'string' && k.trim().length > 0 && k.trim().length <= 100)
        .map((k: string) => ({ license_key: k.trim() }));

      if (rows.length === 0) {
        return jsonResponse({ error: 'Nenhuma chave válida' }, 400);
      }

      const { error: insertErr } = await supabase
        .from('test_licenses')
        .insert(rows);

      if (insertErr) {
        if (insertErr.message?.includes('duplicate')) {
          return jsonResponse({ error: 'Uma ou mais chaves já existem' }, 409);
        }
        return jsonResponse({ error: 'Erro ao adicionar chaves' }, 500);
      }

      return jsonResponse({ success: true, added: rows.length });
    }

    // --- ACTION: login (default) - fetch all data ---
    const { data: licenses, error: licErr } = await supabase
      .from('test_licenses')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: trials, error: triErr } = await supabase
      .from('trial_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (licErr || triErr) {
      return jsonResponse({ error: 'Database error' }, 500);
    }

    return jsonResponse({ success: true, licenses: licenses || [], trials: trials || [] });
  } catch {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
});
