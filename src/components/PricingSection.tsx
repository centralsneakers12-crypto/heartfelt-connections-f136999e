import { motion } from "framer-motion";
import { Clock, Zap, Crown, AlertTriangle, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "1 Dia",
    icon: Clock,
    badge: "Teste Rápido",
    price: "R$ 50",
    features: ["LovaZero por 24h", "Prompts ilimitados", "Todos os navegadores", "Hospedagem inclusa", "Suporte via WhatsApp"],
    highlight: false,
    whatsappMsg: "Olá, Gostaria de saber mais sobre o plano 1 Dia",
  },
  {
    name: "7 Dias",
    icon: Zap,
    badge: "Mais Flexível",
    price: "R$ 75",
    features: ["LovaZero por 7 dias", "Prompts ilimitados", "Todos os navegadores", "Hospedagem inclusa", "Suporte via WhatsApp"],
    highlight: false,
    whatsappMsg: "Olá, Gostaria de saber mais sobre o plano 7 Dias",
  },
  {
    name: "30 Dias",
    icon: Crown,
    badge: "Mais Popular",
    price: "R$ 97",
    features: ["LovaZero por 30 dias", "Prompts ilimitados", "Todos os navegadores", "Hospedagem inclusa", "Suporte via WhatsApp", "Melhor custo-benefício"],
    highlight: true,
    whatsappMsg: "Olá, Gostaria de saber mais sobre o plano 30 Dias",
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-20 md:py-28 relative z-10" aria-label="Preços para usar Lovable grátis e ilimitado">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Oferta por Tempo Limitado
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Lovable Grátis e <span className="text-gradient-purple">Unlimited</span>
          </h2>
          <p className="text-muted-foreground">Desbloqueie o Lovable ilimitado. Pagamento único. Sem surpresas. Hospedagem inclusa.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">
              <span className="text-foreground font-semibold">47 pessoas</span> estão vendo esta página agora
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] scale-[1.02]"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                    <Crown className="w-3 h-3" />
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  {!plan.highlight && (
                    <span className="ml-auto text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Pagamento único via PIX</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-bold text-base py-5 ${plan.highlight ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <a
                    href={`https://wa.me/5511930105875?text=${encodeURIComponent(plan.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.highlight ? "🔥 GARANTIR AGORA" : "DESBLOQUEAR"}
                  </a>
                </Button>

                {plan.highlight && (
                  <p className="text-[10px] text-center text-muted-foreground mt-2">
                    ⚡ Últimas vagas com este preço
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Pagamento Seguro</span>
          <span>⚡ Ativação Instantânea</span>
          <span>♾️ Lovable Unlimited</span>
          <span>🌐 Hospedagem Grátis</span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
