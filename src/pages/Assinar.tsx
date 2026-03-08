import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, AlertTriangle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "1 Dia",
    description: "Teste rápido do LovaZero",
    price: "R$ 40",
    badge: null,
    checkoutUrl: "https://pay.cakto.com.br/3arjoap_797657",
    features: ["LovaZero por 24h", "Prompts ilimitados", "Todos os navegadores", "Ativação imediata", "Suporte via WhatsApp"],
    highlight: false,
  },
  {
    name: "7 Dias",
    description: "Ideal para projetos curtos",
    price: "R$ 70",
    badge: null,
    checkoutUrl: "https://pay.cakto.com.br/3dtnsiv_797667",
    features: ["LovaZero por 7 dias", "Prompts ilimitados", "Todos os navegadores", "Ativação imediata", "Suporte via WhatsApp"],
    highlight: false,
  },
  {
    name: "30 Dias",
    description: "Melhor custo-benefício",
    price: "R$ 97",
    badge: "Mais Popular",
    checkoutUrl: "https://pay.cakto.com.br/35bpeyx_797588",
    features: ["LovaZero por 30 dias", "Prompts ilimitados", "Todos os navegadores", "Ativação imediata", "Suporte via WhatsApp"],
    highlight: true,
    cta: "🔥 GARANTIR AGORA",
  },
  {
    name: "Vitalício",
    description: "Acesso para sempre",
    price: "R$ 297",
    badge: "Melhor Oferta",
    checkoutUrl: "https://pay.cakto.com.br/w7ithhf_797652",
    features: ["LovaZero para sempre", "Prompts ilimitados", "Todos os navegadores", "Ativação imediata", "Suporte via WhatsApp", "Sem renovação"],
    highlight: false,
  },
];

const Assinar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Oferta por Tempo Limitado
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Escolha seu plano e <span className="text-gradient-purple">desbloqueie agora</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pagamento seguro via PIX pelo checkout da Cakto. Ativação instantânea após confirmação.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">
                <span className="text-foreground font-semibold">47 pessoas</span> estão vendo esta página agora
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-primary bg-primary/5 glow-purple"
                    : "border-border bg-card"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    {plan.badge === "Melhor Oferta" ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Pagamento único via PIX</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-bold ${plan.highlight ? "bg-gradient-to-r from-primary to-accent hover:opacity-90" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    {plan.cta || (plan.name === "Vitalício" ? "GARANTIR ACESSO" : "DESBLOQUEAR")}
                  </a>
                </Button>

                {plan.highlight && (
                  <p className="text-[10px] text-center text-muted-foreground mt-2">
                    ⚡ Últimas vagas com este preço
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Pagamento Seguro</span>
            <span>⚡ Ativação Instantânea</span>
            <span>♾️ Uso Ilimitado</span>
            <span>💳 Pagamento Único</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assinar;
