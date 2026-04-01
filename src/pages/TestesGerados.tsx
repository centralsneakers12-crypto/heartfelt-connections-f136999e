import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Key, RefreshCw, Copy, User, Phone, Fingerprint, Globe, Lock, Plus, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface License {
  id: string;
  license_key: string;
  is_used: boolean;
  assigned_to_name: string | null;
  assigned_to_whatsapp: string | null;
  assigned_to_fingerprint: string | null;
  assigned_to_ip: string | null;
  created_at: string;
  assigned_at: string | null;
}

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
  const [licenses, setLicenses] = useState<License[]>([]);
  const [trials, setTrials] = useState<TrialKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [newKeys, setNewKeys] = useState("");
  const [adding, setAdding] = useState(false);

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
        setLicenses(data.licenses || []);
        setTrials(data.trials || []);
      }
    } catch {
      toast.error("Erro ao verificar senha.");
    }
    setChecking(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-access", {
        body: { password },
      });
      if (error || !data?.success) {
        toast.error("Erro ao carregar dados.");
      } else {
        setLicenses(data.licenses || []);
        setTrials(data.trials || []);
      }
    } catch {
      toast.error("Erro ao carregar dados.");
    }
    setLoading(false);
  };

  const handleAddKeys = async () => {
    const keys = newKeys
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    if (keys.length === 0) {
      toast.error("Cole pelo menos uma chave.");
      return;
    }
    if (keys.length > 50) {
      toast.error("Máximo de 50 chaves por vez.");
      return;
    }

    setAdding(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-access", {
        body: { password, action: "add-licenses", keys },
      });
      if (error) throw error;
      if (data?.success) {
        toast.success(`${data.added} chave(s) adicionada(s)!`);
        setNewKeys("");
        fetchData();
      } else {
        toast.error(data?.error || "Erro ao adicionar chaves.");
      }
    } catch {
      toast.error("Erro ao adicionar chaves.");
    }
    setAdding(false);
  };

  const handleDeleteLicense = async (licenseId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta licença?")) return;
    try {
      const { data, error } = await supabase.functions.invoke("verify-access", {
        body: { password, action: "delete-license", licenseId },
      });
      if (error || !data?.success) {
        toast.error("Erro ao excluir licença.");
      } else {
        toast.success("Licença excluída!");
        fetchData();
      }
    } catch {
      toast.error("Erro ao excluir licença.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString("pt-BR");

  const formatWhatsapp = (wpp: string) => {
    if (wpp?.startsWith("55") && wpp.length >= 12) {
      const ddd = wpp.slice(2, 4);
      const num = wpp.slice(4);
      return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
    }
    return wpp || "—";
  };

  const availableCount = licenses.filter((l) => !l.is_used).length;
  const usedCount = licenses.filter((l) => l.is_used).length;

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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
              <p className="text-sm text-muted-foreground">
                {availableCount} disponíveis · {usedCount} usadas · {trials.length} logs
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <Tabs defaultValue="licenses" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="licenses">Licenças ({licenses.length})</TabsTrigger>
            <TabsTrigger value="add">Adicionar</TabsTrigger>
            <TabsTrigger value="logs">Logs ({trials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="licenses" className="space-y-4 mt-4">
            {licenses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">Nenhuma licença cadastrada.</div>
            ) : (
              <div className="grid gap-3">
                {licenses.map((lic) => (
                  <div key={lic.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {lic.is_used ? (
                          <XCircle className="w-4 h-4 text-destructive" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <span className="font-mono font-bold text-foreground text-sm break-all">
                          {lic.license_key}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(lic.license_key)}>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Copiar
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{lic.is_used ? "Usada" : "Disponível"}</span>
                      <span>·</span>
                      <span>Criada: {formatDate(lic.created_at)}</span>
                      {lic.assigned_at && (
                        <>
                          <span>·</span>
                          <span>Atribuída: {formatDate(lic.assigned_at)}</span>
                        </>
                      )}
                    </div>

                    {lic.is_used && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm pt-1">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-foreground">{lic.assigned_to_name || "—"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-foreground">{formatWhatsapp(lic.assigned_to_whatsapp || "")}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-foreground">{lic.assigned_to_ip || "—"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Fingerprint className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-foreground truncate max-w-[150px]">
                            {lic.assigned_to_fingerprint ? lic.assigned_to_fingerprint.slice(0, 20) + "…" : "—"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-4 mt-4">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Adicionar Licenças</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Cole as chaves de licença, uma por linha (máx. 50 por vez).
              </p>
              <textarea
                className="w-full min-h-[200px] bg-background border border-border rounded-lg p-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={"LAC-XXXX-XXXX-XXXX-XXXX\nLAC-YYYY-YYYY-YYYY-YYYY"}
                value={newKeys}
                onChange={(e) => setNewKeys(e.target.value)}
              />
              <Button onClick={handleAddKeys} disabled={adding || !newKeys.trim()} className="w-full">
                {adding ? "Adicionando..." : "Adicionar Chaves"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4 mt-4">
            {trials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">Nenhum log registrado.</div>
            ) : (
              <div className="grid gap-3">
                {trials.map((trial) => (
                  <div key={trial.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground">{formatDate(trial.created_at)}</span>
                      {trial.is_duplicate && (
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
                          Duplicada
                        </span>
                      )}
                    </div>
                    {trial.generated_key && (
                      <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5">
                        <p className="font-mono text-sm font-bold text-foreground break-all">{trial.generated_key}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{trial.client_name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{formatWhatsapp(trial.client_whatsapp)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{trial.ip || "—"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fingerprint className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground truncate max-w-[150px]">
                          {trial.fingerprint ? trial.fingerprint.slice(0, 20) + "…" : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestesGerados;
