import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";

// ── Types ─────────────────────────────────────────────────────────

interface Orb {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  points: number;
  colorIdx: number;
  opacity: number;
  dying: boolean;
  dyingT: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  colorIdx: number;
}

interface ScorePopup {
  x: number; y: number;
  text: string;
  opacity: number;
}

type GameState = "idle" | "playing" | "ended";

// ── Constants ──────────────────────────────────────────────────────

const DURATION      = 30;
const MAX_ORBS      = 9;
const SPAWN_DELAY   = 900;   // ms between spawns
const COMBO_WINDOW  = 1400;  // ms window to chain combos

// [minR, maxR, points, speed, colorIdx]
const ORB_DEFS = [
  { rMin: 22, rMax: 30, pts: 1, spd: 0.55, ci: 0 }, // large  – blue
  { rMin: 14, rMax: 19, pts: 3, spd: 1.20, ci: 1 }, // medium – teal
  { rMin:  8, rMax: 12, pts: 5, spd: 2.00, ci: 2 }, // small  – purple
] as const;

// R, G, B for each type
const PALETTE: [number, number, number][] = [
  [34,  139, 230],   // accent blue
  [21,  170, 191],   // teal
  [121,  80, 242],   // purple
];

let _uid = 0;

// ── Canvas drawing helpers ─────────────────────────────────────────

function drawOrbs(ctx: CanvasRenderingContext2D, orbs: Orb[]) {
  for (const orb of orbs) {
    const [r, g, b] = PALETTE[orb.colorIdx];
    const a     = orb.dying ? Math.max(0, orb.opacity * (1 - orb.dyingT)) : orb.opacity;
    const scale = orb.dying ? 1 + orb.dyingT * 0.6 : 1;
    const R     = orb.radius * scale;

    // Outer glow
    const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, R * 3);
    glow.addColorStop(0, `rgba(${r},${g},${b},${(0.28 * a).toFixed(3)})`);
    glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, R * 3, 0, Math.PI * 2);
    ctx.fill();

    // Core sphere
    const core = ctx.createRadialGradient(
      orb.x - R * 0.32, orb.y - R * 0.32, 0,
      orb.x, orb.y, R
    );
    core.addColorStop(0,    `rgba(255,255,255,${(0.92 * a).toFixed(3)})`);
    core.addColorStop(0.35, `rgba(${r},${g},${b},${(0.88 * a).toFixed(3)})`);
    core.addColorStop(1,    `rgba(${Math.round(r*0.5)},${Math.round(g*0.5)},${Math.round(b*0.5)},${(0.35 * a).toFixed(3)})`);
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, R, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    const [r, g, b] = PALETTE[p.colorIdx];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity.toFixed(3)})`;
    ctx.fill();
  }
}

function drawPopups(ctx: CanvasRenderingContext2D, popups: ScorePopup[], isDark: boolean) {
  ctx.textAlign = "center";
  for (const pop of popups) {
    ctx.font      = "bold 18px system-ui, sans-serif";
    ctx.fillStyle = isDark
      ? `rgba(255,255,255,${pop.opacity.toFixed(3)})`
      : `rgba(30,30,30,${pop.opacity.toFixed(3)})`;
    ctx.fillText(pop.text, pop.x, pop.y);
  }
}

function makeParticles(x: number, y: number, ci: number, count = 14): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.5 + 1;
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 3 + 1,
      opacity: 1,
      colorIdx: ci,
    };
  });
}

// ── Component ──────────────────────────────────────────────────────

export default function CursorGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score,     setScore]     = useState(0);
  const [timeLeft,  setTimeLeft]  = useState(DURATION);
  const [combo,     setCombo]     = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("orb-hs") || "0")
  );

  // Refs — read by the animation loop without stale closures
  const stateRef    = useRef<GameState>("idle");
  const isDarkRef   = useRef(isDark);
  const scoreRef    = useRef(0);
  const orbsRef     = useRef<Orb[]>([]);
  const ptclsRef    = useRef<Particle[]>([]);
  const popupsRef   = useRef<ScorePopup[]>([]);
  const rafRef      = useRef(0);
  const lastSpawnRef = useRef(0);
  const timerIdRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const comboRef    = useRef({ count: 0, lastHit: 0 });
  const timeRef     = useRef(DURATION);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Game lifecycle ─────────────────────────────────────────────

  const endGame = useCallback(() => {
    if (timerIdRef.current) clearInterval(timerIdRef.current);
    stateRef.current = "ended";
    setGameState("ended");
    const final = scoreRef.current;
    setHighScore(prev => {
      const best = Math.max(prev, final);
      localStorage.setItem("orb-hs", String(best));
      return best;
    });
  }, []);

  const startGame = useCallback(() => {
    // Reset everything
    _uid = 0;
    scoreRef.current  = 0;
    orbsRef.current   = [];
    ptclsRef.current  = [];
    popupsRef.current = [];
    lastSpawnRef.current = 0;
    comboRef.current  = { count: 0, lastHit: 0 };
    timeRef.current   = DURATION;

    setScore(0);
    setTimeLeft(DURATION);
    setCombo(0);
    stateRef.current = "playing";
    setGameState("playing");

    let t = DURATION;
    timerIdRef.current = setInterval(() => {
      t--;
      timeRef.current = t;
      setTimeLeft(t);
      if (t <= 0) endGame();
    }, 1000);
  }, [endGame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  // ── Canvas animation loop ──────────────────────────────────────

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

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (stateRef.current !== "playing") return;

      const orbs   = orbsRef.current;
      const ptcls  = ptclsRef.current;
      const popups = popupsRef.current;

      // ── Spawn ──
      if (orbs.length < MAX_ORBS && now - lastSpawnRef.current > SPAWN_DELAY) {
        const roll = Math.random();
        const def  = roll < 0.40 ? ORB_DEFS[0] : roll < 0.72 ? ORB_DEFS[1] : ORB_DEFS[2];
        const r    = def.rMin + Math.random() * (def.rMax - def.rMin);
        const angle = Math.random() * Math.PI * 2;
        orbs.push({
          id: _uid++,
          x:  r + Math.random() * (w - 2 * r),
          y:  r + Math.random() * (h - 2 * r),
          vx: Math.cos(angle) * def.spd,
          vy: Math.sin(angle) * def.spd,
          radius:   r,
          points:   def.pts,
          colorIdx: def.ci,
          opacity:  0,
          dying:    false,
          dyingT:   0,
        });
        lastSpawnRef.current = now;
      }

      // ── Update orbs ──
      for (const orb of orbs) {
        if (!orb.dying) {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.x - orb.radius < 0)  { orb.x = orb.radius;      orb.vx *= -1; }
          if (orb.x + orb.radius > w)  { orb.x = w - orb.radius;  orb.vx *= -1; }
          if (orb.y - orb.radius < 0)  { orb.y = orb.radius;      orb.vy *= -1; }
          if (orb.y + orb.radius > h)  { orb.y = h - orb.radius;  orb.vy *= -1; }
          orb.opacity = Math.min(1, orb.opacity + 0.06);
        } else {
          orb.dyingT = Math.min(1, orb.dyingT + 0.09);
        }
      }
      orbsRef.current = orbs.filter(o => !o.dying || o.dyingT < 1);

      // ── Update particles ──
      for (const p of ptcls) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy      += 0.06;
        p.opacity -= 0.028;
        p.radius  *= 0.975;
      }
      ptclsRef.current = ptcls.filter(p => p.opacity > 0);

      // ── Update score popups ──
      for (const pop of popups) {
        pop.y       -= 1.4;
        pop.opacity -= 0.022;
      }
      popupsRef.current = popups.filter(p => p.opacity > 0);

      // ── Draw ──
      drawOrbs(ctx, orbsRef.current);
      drawParticles(ctx, ptclsRef.current);
      drawPopups(ctx, popupsRef.current, isDarkRef.current);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Hit detection (mouse + touch) ─────────────────────────────

  const handleHit = useCallback((clientX: number, clientY: number) => {
    if (stateRef.current !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const orbs = orbsRef.current;
    for (let i = orbs.length - 1; i >= 0; i--) {
      const orb = orbs[i];
      if (orb.dying) continue;
      const dx = x - orb.x;
      const dy = y - orb.y;
      // Slightly generous hit area
      if (dx * dx + dy * dy <= (orb.radius * 1.25) ** 2) {
        orb.dying = true;

        // Combo logic
        const now = Date.now();
        const c   = comboRef.current;
        if (now - c.lastHit < COMBO_WINDOW) {
          c.count++;
        } else {
          c.count = 1;
        }
        c.lastHit = now;
        const mult   = c.count >= 3 ? 2 : 1;
        const earned = orb.points * mult;

        scoreRef.current += earned;
        setScore(scoreRef.current);
        setCombo(c.count);

        // Particles + popup
        ptclsRef.current.push(...makeParticles(orb.x, orb.y, orb.colorIdx));
        const label = mult > 1 ? `+${earned} ×${mult}` : `+${earned}`;
        popupsRef.current.push({ x: orb.x, y: orb.y - orb.radius - 8, text: label, opacity: 1 });

        break;
      }
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent) => handleHit(e.clientX, e.clientY);
  const onTouchStart = (e: React.TouchEvent) => {
    for (const t of Array.from(e.changedTouches)) handleHit(t.clientX, t.clientY);
  };

  // ── Render ─────────────────────────────────────────────────────

  const isNewRecord = gameState === "ended" && score > 0 && score >= highScore;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">

      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary-light/92 dark:bg-primary/92 backdrop-blur-md" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: gameState === "playing" ? "crosshair" : "default" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      />

      {/* Close button */}
      <div className="relative z-10 flex justify-end p-4">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-secondary-light/70 dark:bg-secondary/70 backdrop-blur-sm
                     border border-secondary-light dark:border-secondary/70
                     text-text-light dark:text-text-dark hover:text-accent
                     flex items-center justify-center transition-colors"
        >
          <MdClose size={18} />
        </button>
      </div>

      {/* ── HUD (during play) ── */}
      {gameState === "playing" && (
        <div className="relative z-10 flex justify-between items-start px-5 pointer-events-none">
          {/* Score */}
          <div className="bg-secondary-light/60 dark:bg-secondary/60 backdrop-blur-sm
                          border border-secondary-light dark:border-secondary/70
                          border-l-[3px] border-l-accent rounded-2xl px-4 py-2">
            <p className="text-[10px] font-bold tracking-widest text-accent uppercase">Score</p>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark leading-none">{score}</p>
          </div>

          {/* Timer */}
          <div className={`bg-secondary-light/60 dark:bg-secondary/60 backdrop-blur-sm
                           border border-secondary-light dark:border-secondary/70
                           border-l-[3px] rounded-2xl px-4 py-2 text-center
                           ${timeLeft <= 10 ? "border-l-red-500" : "border-l-accent"}`}>
            <p className="text-[10px] font-bold tracking-widest text-accent uppercase">Time</p>
            <p className={`text-2xl font-bold leading-none ${
              timeLeft <= 10 ? "text-red-500" : "text-text-light dark:text-text-dark"
            }`}>
              {timeLeft}s
            </p>
          </div>

          {/* Combo */}
          <div className="bg-secondary-light/60 dark:bg-secondary/60 backdrop-blur-sm
                          border border-secondary-light dark:border-secondary/70
                          border-l-[3px] border-l-accent rounded-2xl px-4 py-2 text-right">
            <p className="text-[10px] font-bold tracking-widest text-accent uppercase">Combo</p>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark leading-none">
              {combo >= 3 ? <span className="text-accent">×2</span> : combo}
            </p>
          </div>
        </div>
      )}

      {/* ── Start screen ── */}
      <AnimatePresence>
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex-1 flex items-center justify-center px-4"
          >
            <div className="bg-secondary-light/70 dark:bg-secondary/70 backdrop-blur-md
                            border border-secondary-light dark:border-secondary/70
                            border-l-[3px] border-l-accent rounded-2xl p-8 max-w-md w-full text-center
                            shadow-2xl shadow-accent/10">
              <div className="flex justify-center mb-4">
                <BsStars size={36} className="text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Orb Hunter</h2>
              <p className="text-text-light/60 dark:text-text-dark/60 text-sm mb-6 leading-relaxed">
                Click or tap the glowing orbs before they vanish.<br />
                Smaller orbs are worth more. Chain hits for a <span className="text-accent font-semibold">×2 combo</span>.
              </p>

              {/* Orb legend */}
              <div className="flex justify-center gap-6 mb-7">
                {[
                  { label: "1 pt",  color: "#228be6", size: 22 },
                  { label: "3 pts", color: "#15aabf", size: 15 },
                  { label: "5 pts", color: "#7950f2", size: 10 },
                ].map(({ label, color, size }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <div style={{
                      width: size * 2, height: size * 2, borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 ${size}px ${color}88`,
                    }} />
                    <span className="text-xs text-text-light/60 dark:text-text-dark/60">{label}</span>
                  </div>
                ))}
              </div>

              {highScore > 0 && (
                <p className="text-xs text-accent/80 mb-4 font-medium">
                  Best: {highScore} pts
                </p>
              )}

              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent text-white font-semibold px-10 py-3 rounded-lg
                           hover:bg-opacity-90 transition-colors w-full"
              >
                Play — {DURATION}s
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── End screen ── */}
      <AnimatePresence>
        {gameState === "ended" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex-1 flex items-center justify-center px-4"
          >
            <div className="bg-secondary-light/70 dark:bg-secondary/70 backdrop-blur-md
                            border border-secondary-light dark:border-secondary/70
                            border-l-[3px] border-l-accent rounded-2xl p-8 max-w-md w-full text-center
                            shadow-2xl shadow-accent/10">
              {isNewRecord && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold tracking-widest text-accent uppercase mb-2"
                >
                  New Record!
                </motion.p>
              )}
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-1">
                Time's up
              </h2>
              <p className="text-text-light/50 dark:text-text-dark/50 text-sm mb-6">
                Here's how you did
              </p>

              <div className="flex justify-center gap-8 mb-7">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-accent uppercase mb-0.5">Score</p>
                  <p className="text-4xl font-bold text-text-light dark:text-text-dark">{score}</p>
                </div>
                <div className="w-px bg-secondary-light dark:bg-secondary/70" />
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-accent uppercase mb-0.5">Best</p>
                  <p className="text-4xl font-bold text-text-light dark:text-text-dark">{highScore}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={startGame}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-accent text-white font-semibold py-3 rounded-lg
                             hover:bg-opacity-90 transition-colors"
                >
                  Play Again
                </motion.button>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-secondary-light/80 dark:bg-secondary/80
                             text-text-light dark:text-text-dark font-semibold py-3 rounded-lg
                             border border-secondary-light dark:border-secondary/70
                             hover:border-accent transition-colors"
                >
                  Exit
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend hint during play */}
      {gameState === "playing" && (
        <div className="relative z-10 flex justify-center pb-5 mt-auto pointer-events-none">
          <div className="flex gap-5 bg-secondary-light/50 dark:bg-secondary/50 backdrop-blur-sm
                          border border-secondary-light dark:border-secondary/50 rounded-full px-5 py-2">
            {[
              { color: "#228be6", label: "1pt" },
              { color: "#15aabf", label: "3pt" },
              { color: "#7950f2", label: "5pt" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-text-light/60 dark:text-text-dark/60">
                <span style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                  className="w-2.5 h-2.5 rounded-full inline-block" />
                {label}
              </span>
            ))}
            <span className="text-xs text-accent/70 font-medium">3× chain = ×2</span>
          </div>
        </div>
      )}
    </div>
  );
}
