import { motion } from "framer-motion";
import { ShieldCheck, Headphones, RefreshCw, Download, Globe } from "lucide-react";

const items = [
  { icon: Headphones, text: "Suporte dedicado" },
  { icon: RefreshCw, text: "Atualizações incluídas" },
  { icon: Download, text: "Instalação simples" },
  { icon: Globe, text: "Chrome, Firefox, Edge e Opera" },
];

const GuaranteeSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Garantia de Satisfação</h2>
          <p className="text-muted-foreground mb-10">
            Testado e aprovado por centenas de criadores que já transformaram suas ideias em projetos reais.
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
