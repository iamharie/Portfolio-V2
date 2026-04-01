import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT  = 50;
const CONNECTION_DIST = 120;
const MOUSE_RADIUS    = 140;
const BASE_SPEED      = 0.3;

export default function GlossyBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const { isDark }  = useTheme();
  const location    = useLocation();

  // Refs so the animation loop always sees the latest values without restarting
  const isDarkRef    = useRef(isDark);
  const locationRef  = useRef(location.pathname);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => { isDarkRef.current   = isDark;            }, [isDark]);
  useEffect(() => { locationRef.current = location.pathname; }, [location.pathname]);

  // Fade canvas in/out based on route + scroll position
  // On "/" at the top (hero / icon-cloud section) → hidden
  // Scrolled past hero, or any other route         → fully visible
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateOpacity = () => {
      if (locationRef.current !== "/") {
        canvas.style.opacity = "1";
        return;
      }
      const LANDING_OPACITY = 0.25; // mild on hero, full everywhere else
      const vh        = window.innerHeight;
      const fadeStart = vh * 0.45;
      const fadeEnd   = vh * 0.85;
      const progress  = Math.max(0, Math.min(1, (window.scrollY - fadeStart) / (fadeEnd - fadeStart)));
      canvas.style.opacity = String(LANDING_OPACITY + progress * (1 - LANDING_OPACITY));
    };

    updateOpacity();
    window.addEventListener("scroll", updateOpacity, { passive: true });
    return () => window.removeEventListener("scroll", updateOpacity);
  }, [location.pathname]);

  // Canvas + animation — runs once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      vx:     (Math.random() - 0.5) * BASE_SPEED * 2,
      vy:     (Math.random() - 0.5) * BASE_SPEED * 2,
      radius: Math.random() * 1.2 + 1.0,
    }));

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const dark   = isDarkRef.current;
      const mouse  = mouseRef.current;
      const pts    = particlesRef.current;

      const dotR  = dark ? "100, 180, 255" : "34, 139, 230";
      const lineR = dark ? "100, 180, 255" : "34, 139, 230";

      // Soft cursor glow — subtle halo, not a harsh circle
      if (mouse.x > -1000) {
        const g = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS,
        );
        g.addColorStop(0,   dark ? "rgba(100,180,255,0.10)" : "rgba(34,139,230,0.08)");
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of pts) {
        // Gentle repulsion from cursor
        const dx     = p.x - mouse.x;
        const dy     = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
          const d     = Math.sqrt(distSq);
          const force = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * 0.18;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Speed cap + gentle damping
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > BASE_SPEED * 3.5) {
          p.vx = (p.vx / spd) * BASE_SPEED * 3.5;
          p.vy = (p.vy / spd) * BASE_SPEED * 3.5;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Nudge if nearly stopped
        if (spd < BASE_SPEED * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.06;
          p.vy += (Math.random() - 0.5) * 0.06;
        }

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw node — slightly brighter near cursor
        const nodeDist  = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const nodeAlpha = nodeDist < MOUSE_RADIUS
          ? 0.55 + 0.35 * (1 - nodeDist / MOUSE_RADIUS)
          : 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotR}, ${nodeAlpha})`;
        ctx.fill();
      }

      // Draw connections — thin, elegant, opacity driven by distance only
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i].x - pts[j].x;
          const dy   = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= CONNECTION_DIST) continue;

          // Midpoint proximity to cursor lifts opacity
          const mx       = (pts[i].x + pts[j].x) / 2 - mouse.x;
          const my       = (pts[i].y + pts[j].y) / 2 - mouse.y;
          const midDist  = Math.sqrt(mx * mx + my * my);
          const boost    = midDist < MOUSE_RADIUS
            ? 1 + (1 - midDist / MOUSE_RADIUS) * 0.9
            : 1;

          const alpha = Math.min(
            (1 - dist / CONNECTION_DIST) * 0.22 * boost,
            0.55,
          );

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${lineR}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()               => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0"
      style={{ zIndex: 0, transition: "opacity 0.6s ease" }}
    />
  );
}
