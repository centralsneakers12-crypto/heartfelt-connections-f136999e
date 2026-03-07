import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Key, RefreshCw, Copy, User, Phone, Fingerprint, Globe, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TrialKey {
  id: string;
  client_name: string;
  client_whatsapp: string;
  fingerprint: string | null;
  ip: string | null;
  generated_key: string | null;
  is_duplicate: boolean;
  created_at: string;
}

const TestesGerados = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [trials, setTrials] = useState<TrialKey[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-access", {
        body: { password },
      });
      if (error || !data?.success) {
        toast.error("Senha incorreta!");
      } else {
        setAuthenticated(true);
        fetchTrials();
      }
    } catch {
      toast.error("Erro ao verificar senha.");
    }
    setChecking(false);
  };

  const fetchTrials = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("trial_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar dados.");
      console.error(error);
    } else {
      setTrials((data as TrialKey[]) || []);
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("pt-BR");
  };

  const formatWhatsapp = (wpp: string) => {
    if (wpp.startsWith("55") && wpp.length >= 12) {
      const ddd = wpp.slice(2, 4);
      const num = wpp.slice(4);
      return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
    }
    return wpp;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Área Restrita</h1>
            <p className="text-sm text-muted-foreground text-center">Digite a senha para acessar</p>
          </div>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-center text-lg"
          />
          <Button type="submit" className="w-full" disabled={checking || !password}>
            {checking ? "Verificando..." : "Entrar"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Testes Gerados</h1>
              <p className="text-sm text-muted-foreground">{trials.length} registro(s)</p>
            </div>
          </div>
          <Button variant="outline" onClick={fetchTrials} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Carregando...</div>
        ) : trials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Nenhum teste gerado ainda.</div>
        ) : (
          <div className="grid gap-4">
            {trials.map((trial) => (
              <div
                key={trial.id}
                className="bg-card border border-border rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{formatDate(trial.created_at)}</span>
                    {trial.is_duplicate && (
                      <span className="inline-flex items-center gap-1 text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Tentativa duplicada
                      </span>
                    )}
                  </div>
                  {trial.generated_key && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(trial.generated_key!)}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copiar Chave
                    </Button>
                  )}
                </div>

                {trial.generated_key && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                    <p className="text-xs text-muted-foreground">Chave</p>
                    <p className="font-mono font-bold text-foreground break-all">{trial.generated_key}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{trial.client_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{formatWhatsapp(trial.client_whatsapp)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{trial.ip || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground truncate max-w-[200px]" title={trial.fingerprint || ""}>
                      {trial.fingerprint ? trial.fingerprint.slice(0, 20) + "…" : "—"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestesGerados;
