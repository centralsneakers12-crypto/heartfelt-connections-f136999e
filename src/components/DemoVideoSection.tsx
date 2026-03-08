import { motion } from "framer-motion";
import demoScreenshot from "@/assets/demo-screenshot.png";

const DemoVideoSection = () => {
  return (
    <section className="relative z-10 py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-lg font-semibold flex items-center justify-center gap-2">
            🚀 Veja o LovaZero em ação
          </p>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto mt-1">
            Sim, isso mesmo. Esse site foi inteiramente feito e hospedado por essa extensão sem gastar um único crédito.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card/50 shadow-2xl shadow-primary/10">
            <img
              src={demoScreenshot}
              alt="Demonstração do LovaZero em ação"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
