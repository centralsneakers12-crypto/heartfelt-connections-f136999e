import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Key, User, Phone, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "lovazero_trial_generated";

function getBrowserFingerprint(): string {
  const nav = navigator;
  const screen = window.screen;
  return btoa([
    nav.userAgent,
    nav.language,
    nav.hardwareConcurrency,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    nav.platform,
  ].join("|"));
}

async function getPublicIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "unknown";
  }
}

const Teste = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const isAlreadyGenerated = (): boolean => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const data = JSON.parse(stored);
      return !!data.generated;
    } catch {
      return false;
    }
  };

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsapp(e.target.value);
    setWhatsapp(formatted);
  };

  const handleGenerate = async () => {
    if (!name.trim() || !whatsapp.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) {
      toast.error("Número de WhatsApp inválido.");
      return;
    }

    const alreadyGenerated = isAlreadyGenerated();

    setLoading(true);
    try {
      const fingerprint = getBrowserFingerprint();
      const ip = await getPublicIP();
      const fullWhatsapp = `55${digits}`;

      if (alreadyGenerated) {
        await supabase.functions.invoke("reseller-proxy", {
          body: {
            endpoint: "/reseller-api/licenses/trial",
            method: "POST",
            body: {
              client_name: name.trim(),
              client_whatsapp: fullWhatsapp,
              fingerprint,
              ip,
              is_duplicate: true,
            },
          },
        });
        toast.error("Você já gerou uma chave de teste. Limite de 1 por dispositivo.");
        return;
      }

      const { data, error } = await supabase.functions.invoke("reseller-proxy", {
        body: {
          endpoint: "/reseller-api/licenses/trial",
          method: "POST",
          body: {
            client_name: name.trim(),
            client_whatsapp: fullWhatsapp,
            fingerprint,
            ip,
          },
        },
      });

      if (error) throw error;

      if (data?.success && data?.key) {
        setGeneratedKey(data.key);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          generated: true,
          whatsapp: fullWhatsapp,
          fingerprint,
          ip,
          timestamp: Date.now(),
        }));
        toast.success("Chave de teste gerada com sucesso!");
      } else if (data?.error) {
        toast.error(data.error);
      } else {
        toast.error("Erro ao gerar chave. Tente novamente.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Chave de Teste</h1>
        </div>

        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent shrink-0" />
          <p className="text-sm text-foreground">
            ⏳ Sua chave de teste dura <strong>10 minutos</strong>.
          </p>
        </div>

        {generatedKey ? (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Sua chave:</p>
                <p className="text-lg font-mono font-bold text-foreground break-all">{generatedKey}</p>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(generatedKey);
                toast.success("Chave copiada!");
              }}
            >
              Copiar Chave
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <User className="w-4 h-4" /> Primeiro Nome
              </label>
              <Input
                placeholder="Seu primeiro nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp
              </label>
              <Input
                placeholder="(31) 99999-9999"
                value={whatsapp}
                onChange={handleWhatsappChange}
                maxLength={16}
              />
            </div>

            <Button
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Key className="w-5 h-5 mr-2" />
              )}
              {loading ? "Gerando..." : "Gerar Chave de Teste"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teste;
