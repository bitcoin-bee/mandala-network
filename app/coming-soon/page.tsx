"use client";

import { useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Archivo } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

/* ── Shatkona Mandala Canvas ───────────────────────────────────── */
function ShatkonaMandala() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const angle = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    window.addEventListener("mousemove", onMove);

    const col = (a: number) => `rgba(38,17,12,${a})`;

    const drawTriangle = (
      cx: number, cy: number, r: number,
      offset: number, alpha: number, lw: number
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + offset;
        if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = col(alpha);
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawRing = (cx: number, cy: number, r: number, alpha: number, lw: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = col(alpha);
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawDots = (cx: number, cy: number, n: number, r: number, alpha: number, offset: number) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = col(alpha);
        ctx.fill();
      }
    };

    const drawLotus = (cx: number, cy: number, n: number, r1: number, r2: number, alpha: number, offset: number) => {
      const mid = (r1 + r2) / 2;
      const pr = (r2 - r1) / 2;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * mid, cy + Math.sin(a) * mid, pr, 0, Math.PI * 2);
        ctx.strokeStyle = col(alpha);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const drawSpokes = (cx: number, cy: number, n: number, r1: number, r2: number, alpha: number, offset: number) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.strokeStyle = col(alpha);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      angle.current += 0.002;
      const t = angle.current;

      const cx = w / 2 + (mouse.current.x - 0.5) * w * 0.03;
      const cy = h / 2 + (mouse.current.y - 0.5) * h * 0.03;

      // Scale based on viewport
      const base = Math.min(w, h) * 0.38;

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = col(0.5);
      ctx.fill();

      // Inner circle
      drawRing(cx, cy, base * 0.12, 0.25, 1);

      // 8 inner lotus petals
      drawLotus(cx, cy, 8, base * 0.12, base * 0.28, 0.18, t);
      drawRing(cx, cy, base * 0.28, 0.2, 0.8);

      // Shatkona: two interlocked triangles (the core motif from the design)
      drawTriangle(cx, cy, base * 0.44, -Math.PI / 2 + t * 0.4, 0.55, 1.4);
      drawTriangle(cx, cy, base * 0.44, Math.PI / 2 + Math.PI / 3 - t * 0.4, 0.55, 1.4);

      // Ring around shatkona
      drawRing(cx, cy, base * 0.5, 0.18, 0.8);
      drawDots(cx, cy, 12, base * 0.5, 0.35, t * 0.6);

      // 12 lotus petals outer
      drawLotus(cx, cy, 12, base * 0.5, base * 0.68, 0.13, -t * 0.5);
      drawRing(cx, cy, base * 0.68, 0.16, 0.8);

      // Spokes
      drawSpokes(cx, cy, 24, base * 0.68, base * 0.78, 0.08, -t * 0.3);
      drawRing(cx, cy, base * 0.78, 0.13, 0.7);
      drawDots(cx, cy, 24, base * 0.78, 0.2, t * 0.4);

      // Outermost ring
      drawRing(cx, cy, base * 0.9, 0.08, 0.6);
      drawDots(cx, cy, 36, base * 0.9, 0.12, -t * 0.25);

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ── Countdown ─────────────────────────────────────────────────── */
function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Target date — update as needed
  const target = new Date("2025-11-01T00:00:00Z");
  const { d, h, m, s } = useCountdown(target);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={`${cormorant.className}`}
      style={{
        minHeight: "100vh",
        background: "#cec3ae",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Full-screen mandala */}
      <ShatkonaMandala />

      {/* Radial vignette for depth */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(206,195,174,0.55) 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1.2s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>

        {/* Logo wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Mandala%20Network%20Logo2.svg"
          alt="Mandala Network"
          style={{ height: "auto", width: "auto", maxHeight: 80, maxWidth: 240, mixBlendMode: "multiply", marginBottom: "3rem" }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />

        {/* Label */}
        <p className={archivo.className} style={{
          fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase",
          color: "rgba(38,17,12,0.5)", marginBottom: "1.25rem",
        }}>
          Something is coming
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "inherit",
          fontSize: "clamp(3rem, 9vw, 7rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "#26110C",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          marginBottom: "1.5rem",
          textWrap: "balance",
        }}>
          Coming Soon
        </h1>

        <p className={archivo.className} style={{
          fontSize: "1rem",
          color: "rgba(38,17,12,0.55)",
          maxWidth: "38ch",
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: "3rem",
        }}>
          We are building something remarkable. Market access, event experiences, and real outcomes across Europe, MENA &amp; South Asia.
        </p>

        {/* Countdown */}
        <div style={{
          display: "flex", gap: "clamp(1.5rem, 4vw, 3rem)",
          marginBottom: "3.5rem",
        }}>
          {[
            { v: d,       l: "Days" },
            { v: h,       l: "Hours" },
            { v: m,       l: "Min" },
            { v: s,       l: "Sec" },
          ].map(({ v, l }) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <span style={{
                fontFamily: "inherit", fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 300, color: "#26110C", lineHeight: 1,
                fontVariantNumeric: "tabular-nums", minWidth: "2ch", textAlign: "center",
              }}>
                {pad(v)}
              </span>
              <span className={archivo.className} style={{
                fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(38,17,12,0.4)",
              }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Divider ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", width: "100%", maxWidth: 320 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(38,17,12,0.2)" }} />
          <svg width="20" height="20" viewBox="-10 -10 20 20" aria-hidden="true">
            <circle r="8" fill="none" stroke="rgba(38,17,12,0.3)" strokeWidth="0.8" />
            {[0,1,2,3,4,5,6,7].map(i => {
              const a = (i / 8) * Math.PI * 2;
              return <line key={i} x1={Math.cos(a)*3} y1={Math.sin(a)*3} x2={Math.cos(a)*8} y2={Math.sin(a)*8} stroke="rgba(38,17,12,0.25)" strokeWidth="0.6" />;
            })}
            <circle r="2" fill="rgba(38,17,12,0.4)" />
          </svg>
          <div style={{ flex: 1, height: 1, background: "rgba(38,17,12,0.2)" }} />
        </div>

        {/* Email capture */}
        {submitted ? (
          <p className={archivo.className} style={{
            fontSize: "0.85rem", color: "rgba(38,17,12,0.6)",
            letterSpacing: "0.05em",
          }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={archivo.className}
              style={{
                padding: "0.75rem 1.1rem",
                borderRadius: "4px",
                border: "1px solid rgba(38,17,12,0.25)",
                background: "rgba(206,195,174,0.4)",
                backdropFilter: "blur(8px)",
                color: "#26110C",
                fontSize: "0.875rem",
                fontWeight: 300,
                outline: "none",
                width: 220,
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(38,17,12,0.6)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(38,17,12,0.25)")}
            />
            <button
              type="submit"
              className={archivo.className}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                background: "#26110C",
                color: "#cec3ae",
                border: "none",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Notify Me
            </button>
          </form>
        )}

        {/* Telegram */}
        <a
          href="https://t.me/MandalaNetwork"
          target="_blank"
          rel="noopener noreferrer"
          className={archivo.className}
          style={{
            marginTop: "2.5rem",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(38,17,12,0.4)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(38,17,12,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(38,17,12,0.4)")}
        >
          @MandalaNetwork on Telegram
        </a>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: "1.5rem", left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: visible ? 0.4 : 0, transition: "opacity 1.5s ease 0.8s",
      }}>
        <span className={archivo.className} style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#26110C" }}>
          © {new Date().getFullYear()} Mandala Network
        </span>
      </div>
    </div>
  );
}
