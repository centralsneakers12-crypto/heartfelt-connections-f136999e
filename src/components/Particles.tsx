import { useEffect, useRef, memo } from "react";

const Particles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; z: number; pz: number; size: number; color: string }[] = [];
    const STAR_COUNT = 150; // Reduced for performance
    const colors = [
      "hsla(270,80%,70%,", "hsla(280,75%,65%,", "hsla(300,80%,75%,",
      "hsla(240,60%,80%,", "hsla(200,70%,80%,", "hsla(0,0%,100%,"
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * 1000,
        pz: 0,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= 0.15;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const r = Math.max(0.1, (1 - star.z / 1000) * star.size * 2.5);
        const opacity = (1 - star.z / 1000) * 0.9;

        const twinkle = 0.6 + Math.sin(currentTime * 0.003 + star.x) * 0.4;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${(opacity * twinkle).toFixed(2)})`;
        ctx.fill();

        // Only add glow for larger stars
        if (r > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, r * 2.5, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 2.5);
          grad.addColorStop(0, `${star.color}${(opacity * 0.25 * twinkle).toFixed(2)})`);
          grad.addColorStop(1, `${star.color}0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        star.pz = star.z;
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent", willChange: "transform" }}
    />
  );
});

Particles.displayName = "Particles";

export default Particles;
