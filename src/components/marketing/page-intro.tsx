"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Phase = "boot" | "reveal" | "done";

/** How long the 0→100 boot takes. */
const COUNT_MS = 1800;
/** Beat of stillness at 100 before the reveal. */
const HOLD_MS = 200;
/** Length of the particle dispersal + curtain lift. */
const REVEAL_MS = 900;
/** Number of vertical curtain columns that peel in a stagger. */
const PANEL_COUNT = 5;
/** Per-column stagger for the raking peel. */
const PANEL_STAGGER_MS = 55;
const PANELS = Array.from({ length: PANEL_COUNT }, (_, i) => i);

/** Pixel sampling step when converting the wordmark into particle targets. */
const SAMPLE_STEP = 5;
/** Square particle edge, in CSS pixels. */
const DOT_SIZE = 2;

/** Boot log lines and the progress (0–1) at which each resolves. */
const BOOT_LINES = [
  { at: 0.18, label: "loading interface" },
  { at: 0.45, label: "hydrating modules" },
  { at: 0.72, label: "connecting report stream" },
  { at: 0.95, label: "ready" },
];

interface Particle {
  /** Normalized delay (0–0.5): later particles snap in later. */
  delay: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  /** Dispersal velocity, applied during the reveal. */
  vx: number;
  vy: number;
}

/** Sample the wordmark into particle targets by rasterizing it offscreen. */
function buildParticles(width: number, height: number): Particle[] {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d");
  if (!ctx) {
    return [];
  }
  const fontSize = Math.min(width * 0.16, height * 0.34);
  ctx.font = `700 ${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("LUMEN", width / 2, height / 2);

  const { data } = ctx.getImageData(0, 0, width, height);
  const particles: Particle[] = [];
  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 128) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.max(width, height) * (0.35 + Math.random() * 0.4);
        particles.push({
          delay: Math.random() * 0.5,
          sx: x + Math.cos(angle) * radius,
          sy: y + Math.sin(angle) * radius,
          tx: x,
          ty: y,
          vx: (Math.random() - 0.5) * 14,
          vy: -4 - Math.random() * 10,
        });
      }
    }
  }
  return particles;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Draw one frame: assembling toward targets, or scattering on the reveal. */
function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  size: { height: number; width: number },
  eased: number,
  scatter: number
) {
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.fillStyle = "#e7e7e4";
  for (const p of particles) {
    let x: number;
    let y: number;
    if (scatter > 0) {
      const s = easeOutCubic(Math.min(1, scatter));
      x = p.tx + p.vx * s * 40;
      y = p.ty + p.vy * s * 40;
      ctx.globalAlpha = 1 - s;
    } else {
      const local = Math.min(1, Math.max(0, (eased - p.delay) / (1 - p.delay)));
      const e = easeOutCubic(local);
      x = p.sx + (p.tx - p.sx) * e;
      y = p.sy + (p.ty - p.sy) * e;
      ctx.globalAlpha = 0.25 + 0.75 * e;
    }
    ctx.fillRect(x, y, DOT_SIZE, DOT_SIZE);
  }
  ctx.globalAlpha = 1;
}

/**
 * The Lumen boot sequence, igloo.inc-style: a dark screen where the wordmark
 * assembles in real time from a field of drifting particles while a HUD of
 * mono readouts (boot log, version, percentage) tracks the same progress. At
 * 100 the particles scatter upward and a five-column curtain peels to hand
 * off to the light hero. Rendered on one canvas, rAF-driven, plays once per
 * session, skipped entirely under reduced motion.
 */
export function PageIntro() {
  const [phase, setPhase] = useState<Phase>("boot");
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || sessionStorage.getItem("lumen-intro-played")) {
      root.classList.remove("intro-playing");
      setPhase("done");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    let particles: Particle[] = [];
    if (canvas && ctx) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      particles = buildParticles(width, height);
    }

    const lines = logRef.current
      ? Array.from(logRef.current.querySelectorAll("[data-line]"))
      : [];

    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / COUNT_MS);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(
          3,
          "0"
        );
      }
      for (const [index, line] of lines.entries()) {
        line.toggleAttribute("data-on", eased >= BOOT_LINES[index].at);
      }

      // Dispersal continues past t=1 while the curtain peels.
      const scatter = Math.max(0, (elapsed - COUNT_MS - HOLD_MS) / REVEAL_MS);

      if (ctx) {
        drawParticles(ctx, particles, { height, width }, eased, scatter);
      }

      if (elapsed < COUNT_MS + HOLD_MS + REVEAL_MS) {
        raf = requestAnimationFrame(tick);
      }
    });

    const toReveal = window.setTimeout(() => {
      setPhase("reveal");
      // Release the hero's paused reveals so they rise as the curtain peels.
      root.classList.remove("intro-playing");
    }, COUNT_MS + HOLD_MS);

    const toDone = window.setTimeout(
      () => {
        setPhase("done");
        document.body.style.overflow = previousOverflow;
        sessionStorage.setItem("lumen-intro-played", "1");
      },
      COUNT_MS + HOLD_MS + REVEAL_MS
    );

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(toReveal);
      clearTimeout(toDone);
      document.body.style.overflow = previousOverflow;
      root.classList.remove("intro-playing");
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn("intro-root", phase === "reveal" && "is-revealing")}
      ref={rootRef}
    >
      <div className="intro-panels">
        {PANELS.map((i) => (
          <span
            className="intro-panel"
            key={i}
            style={{ transitionDelay: `${i * PANEL_STAGGER_MS}ms` }}
          />
        ))}
      </div>

      <div className="intro-content">
        <div className="intro-grain" />
        <canvas className="intro-canvas" ref={canvasRef} />

        {/* HUD — corner readouts in the system voice */}
        <div className="intro-hud intro-hud-tl" ref={logRef}>
          <span className="intro-hud-title">LUMEN / BOOT</span>
          {BOOT_LINES.map((line) => (
            <span className="intro-line" data-line="" key={line.label}>
              <span className="intro-line-tick">▸</span>
              {line.label}
            </span>
          ))}
        </div>
        <div className="intro-hud intro-hud-bl">
          <span>v0.9 / early access</span>
        </div>
        <div className="intro-count">
          <span ref={countRef}>000</span>
          <span className="intro-count-unit">%</span>
        </div>
      </div>
    </div>
  );
}
