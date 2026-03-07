import { motion } from "framer-motion";

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
            Assista a demonstração e veja a extensão funcionando sem consumir nenhum crédito.
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
            <div className="aspect-video w-full flex items-center justify-center bg-secondary/30 relative">
              <iframe
                className="w-full h-full absolute inset-0"
                src=""
                title="Demonstração LovaZero"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="relative z-10 text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 border-2 border-primary/40">
                  <svg className="w-7 h-7 text-primary ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-xs">Cole a URL do vídeo aqui</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
