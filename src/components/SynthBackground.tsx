import React, { useEffect, useRef } from "react";

interface SynthBackgroundProps {
  showGrid?: boolean;
}

export const SynthBackground: React.FC<SynthBackgroundProps> = ({ showGrid = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Synthwave stars & floating neon laser particles
    interface Star {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      twinkle: number;
    }

    const starColors = ["#ffffff", "#00f0ff", "#ff2a85", "#ffe600", "#9b2bfb"];
    const stars: Star[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.65), // Top 65% above the sunset grid
      size: Math.random() * 2 + 0.6,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      speed: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));

    // Floating laser neon particles drifting upwards
    interface FloatingNeon {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      color: string;
    }
    const neons: FloatingNeon[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.8 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.5 ? "#ff2a85" : "#00f0ff",
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep Synthwave sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#080114");
      skyGrad.addColorStop(0.35, "#150228");
      skyGrad.addColorStop(0.65, "#2d083e");
      skyGrad.addColorStop(1, "#0d0221");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.twinkle += 0.04;
        const currentAlpha = 0.35 + Math.sin(star.twinkle) * 0.55;
        ctx.globalAlpha = Math.max(0.1, currentAlpha);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Floating neon dust rising from the cyber grid
      neons.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(time + p.x) * 0.4);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Star & Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Retro Sunset Silhouette (Center Horizon) */}
      <div className="absolute top-[32%] md:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-85">
        <div className="synth-sun">
          {/* Neon inner aura */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/30 to-white/40 mix-blend-overlay" />
        </div>
      </div>

      {/* Cyber Mountain Silhouettes in background */}
      <svg
        viewBox="0 0 1440 280"
        className="absolute top-[40%] md:top-[38%] left-0 w-full h-44 md:h-64 object-cover opacity-60 pointer-events-none"
        preserveAspectRatio="none"
      >
        <polygon
          points="0,280 80,180 180,240 320,110 460,260 620,80 780,240 940,90 1080,250 1240,120 1360,210 1440,160 1440,280"
          fill="#110526"
          stroke="#ff2a85"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <polygon
          points="0,280 120,210 240,250 420,160 580,260 720,130 880,250 1040,150 1180,260 1340,190 1440,230 1440,280"
          fill="#0a0218"
          stroke="#00f0ff"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
      </svg>

      {/* Horizon Light Beam */}
      <div className="absolute top-[52%] left-0 right-0 horizon-beam" />

      {/* 3D Wireframe Perspective Grid Floor */}
      {showGrid && <div className="synth-grid-floor" />}
    </div>
  );
};
