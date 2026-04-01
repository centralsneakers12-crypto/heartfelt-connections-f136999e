import { motion } from "framer-motion";
import { Clock, Zap, Crown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type FeatureItem,
  PricingTable,
  PricingTableBody,
  PricingTableHeader,
  PricingTableHead,
  PricingTableRow,
  PricingTableCell,
  PricingTablePlan,
} from "@/components/ui/pricing-table";

const FEATURES: FeatureItem[] = [
  { label: "Duração", values: ["24 horas", "7 dias", "30 dias"] },
  { label: "Prompts ilimitados", values: [true, true, true] },
  { label: "Todos os navegadores", values: [true, true, true] },
  { label: "Hospedagem inclusa", values: [true, true, true] },
  { label: "Suporte via WhatsApp", values: [true, true, true] },
  { label: "Melhor custo-benefício", values: [false, false, true] },
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <PricingTable className="mx-auto max-w-5xl">
            <PricingTableHeader>
              <PricingTableRow>
                <th />
                <th className="p-1">
                  <PricingTablePlan
                    name="1 Dia"
                    badge="Teste Rápido"
                    price="R$ 50"
                    icon={Clock}
                  >
                    <Button variant="outline" className="w-full rounded-lg" size="lg" asChild>
                      <a
                        href={`https://wa.me/5511930105875?text=${encodeURIComponent("Olá, Gostaria de saber mais sobre o plano 1 Dia")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DESBLOQUEAR
                      </a>
                    </Button>
                  </PricingTablePlan>
                </th>
                <th className="p-1">
                  <PricingTablePlan
                    name="7 Dias"
                    badge="Mais Flexível"
                    price="R$ 75"
                    icon={Zap}
                  >
                    <Button variant="outline" className="w-full rounded-lg" size="lg" asChild>
                      <a
                        href={`https://wa.me/5511930105875?text=${encodeURIComponent("Olá, Gostaria de saber mais sobre o plano 7 Dias")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DESBLOQUEAR
                      </a>
                    </Button>
                  </PricingTablePlan>
                </th>
                <th className="p-1">
                  <PricingTablePlan
                    name="30 Dias"
                    badge="Mais Popular"
                    price="R$ 97"
                    icon={Crown}
                    className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-gradient-to-b after:from-primary/15 after:to-transparent after:blur-[2px]"
                  >
                    <Button
                      className="w-full rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                      size="lg"
                      asChild
                    >
                      <a
                        href={`https://wa.me/5511930105875?text=${encodeURIComponent("Olá, Gostaria de saber mais sobre o plano 30 Dias")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔥 GARANTIR AGORA
                      </a>
                    </Button>
                  </PricingTablePlan>
                </th>
              </PricingTableRow>
            </PricingTableHeader>
            <PricingTableBody>
              {FEATURES.map((feature, index) => (
                <PricingTableRow key={index}>
                  <PricingTableHead>{feature.label}</PricingTableHead>
                  {feature.values.map((value, i) => (
                    <PricingTableCell key={i}>{value}</PricingTableCell>
                  ))}
                </PricingTableRow>
              ))}
            </PricingTableBody>
          </PricingTable>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground">
          <span>🔒 Pagamento Seguro</span>
          <span>⚡ Ativação Instantânea</span>
          <span>♾️ Lovable Unlimited</span>
          <span>🌐 Hospedagem Grátis</span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
