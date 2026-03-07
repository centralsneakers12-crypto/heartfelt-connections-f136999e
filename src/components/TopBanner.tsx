import { Sparkles, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const TopBanner = () => {
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((m) => (m === 0 ? 14 : m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-primary/15 to-accent/15 border-b border-primary/30 py-3 px-4 text-center">
      <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 flex-wrap">
        <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
          Oferta Limitada
        </span>
        <Sparkles className="w-4 h-4" />
        Desbloqueie o LovaZero com desconto exclusivo!
        <span className="inline-flex items-center gap-1 bg-background/50 border border-primary/30 rounded-md px-2 py-0.5 text-xs font-mono tabular-nums">
          <Clock className="w-3 h-3" />
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
};

export default TopBanner;
