'use client';

import { useEffect, useRef } from 'react';

export default function FireworksEffect({ trigger }: { trigger: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || trigger === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
    }> = [];

    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff6b9d', '#c44569', '#f8b500'];

    // Créer plusieurs feux d'artifice
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.5) + 50;

      for (let j = 0; j < 30; j++) {
        const angle = (Math.PI * 2 * j) / 30;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        });
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravité
        particle.life -= 0.02;

        if (particle.life > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.life;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-45"
    />
  );
}

