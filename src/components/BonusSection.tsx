import { motion } from "framer-motion";
import { BookOpen, Video, MessageCircle, RefreshCw } from "lucide-react";

const bonuses = [
  { icon: BookOpen, text: "Tutorial completo de instalação" },
  { icon: Video, text: "Vídeos de uso avançado" },
  { icon: MessageCircle, text: "Suporte via WhatsApp" },
  { icon: RefreshCw, text: "Atualizações automáticas" },
];

const BonusSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Bônus Exclusivo
        </motion.h2>
        <p className="text-muted-foreground mb-12">Ao adquirir qualquer plano, você ganha acesso a:</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6"
            >
              <b.icon className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">{b.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
