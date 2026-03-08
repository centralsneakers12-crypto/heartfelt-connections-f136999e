import { motion } from "framer-motion";
import { ShieldCheck, Headphones, RefreshCw, Download, Globe } from "lucide-react";

const items = [
  { icon: Headphones, text: "Suporte dedicado" },
  { icon: RefreshCw, text: "Atualizações incluídas" },
  { icon: Download, text: "Instalação simples" },
  { icon: Globe, text: "Hospedagem grátis inclusa" },
];

const GuaranteeSection = () => {
  return (
    <section className="py-20 md:py-28" aria-label="Garantia do Lovable grátis e ilimitado">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Lovable Grátis com Garantia Total</h2>
          <p className="text-muted-foreground mb-10">
            Centenas de criadores já usam o Lovable de graça e ilimitado com o LovaZero. Hospedagem inclusa e suporte dedicado.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;