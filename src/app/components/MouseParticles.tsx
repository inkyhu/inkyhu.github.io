import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaBase: number;
  alphaSpeed: number;
  color: { r: number; g: number; b: number };
}

export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const colorPalette = [
      { r: 139, g: 92, b: 246 },
      { r: 99, g: 102, b: 241 },
      { r: 59, g: 130, b: 246 },
      { r: 168, g: 85, b: 247 },
      { r: 14, g: 165, b: 233 }
    ];

    const particleCount = 140;
    const speedPxPerSec = 34;
    const particles: Particle[] = [];

    for (let index = 0; index < particleCount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const alphaBase = Math.random() * 0.22 + 0.05;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speedPxPerSec,
        vy: Math.sin(angle) * speedPxPerSec,
        size: Math.random() * 1.6 + 0.4,
        alpha: alphaBase,
        alphaBase,
        alphaSpeed: Math.random() * 0.8 + 0.3,
        color
      });
    }

    let animationId = 0;
    let lastTime: number | null = null;
    let elapsed = 0;

    const animate = (timestamp: number) => {
      if (lastTime === null) {
        lastTime = timestamp;
      }

      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      elapsed += dt;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        particle.alpha =
          particle.alphaBase + Math.sin(elapsed * particle.alphaSpeed * Math.PI * 2) * 0.12;

        const { r, g, b } = particle.color;
        const glowRadius = particle.size * 2.5;
        const glow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        );
        glow.addColorStop(0, `rgba(${r},${g},${b},${particle.alpha})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(particle.alpha * 1.5, 1)})`;
        ctx.fill();
      });

      const connectionDistance = 110;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 0.14 * (1 - dist / connectionDistance);
            const colorA = particles[i].color;
            const colorB = particles[j].color;
            const r = Math.round((colorA.r + colorB.r) / 2);
            const g = Math.round((colorA.g + colorB.g) / 2);
            const b = Math.round((colorA.b + colorB.b) / 2);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mouse-particles"
      aria-hidden="true"
    />
  );
}
