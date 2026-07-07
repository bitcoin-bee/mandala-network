"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Sacred Geometry Mandala Canvas ───────────────────────────────── */
function CanvasMandala({ className = "", interactive = true, speed = 1 }: {
  className?: string; interactive?: boolean; speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const angle = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      mouse.current = { x: rect.width / 2, y: rect.height / 2 };
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      if (!interactive) return;
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMove);

    // Particles orbiting rings
    const particles = Array.from({ length: 40 }, (_, i) => ({
      ring: (i % 6) + 2,
      phase: (i / 40) * Math.PI * 2,
      speed: (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1) * 0.004 * speed,
      size: 1 + Math.random() * 1.5,
    }));

    const drawCircle = (cx: number, cy: number, r: number, alpha: number, lw = 0.7) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawDots = (cx: number, cy: number, n: number, r: number, alpha: number, offset: number, dotR = 1.8) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,185,154,${alpha})`;
        ctx.fill();
      }
    };

    // Lotus petals: offset circles
    const drawLotus = (cx: number, cy: number, n: number, r1: number, r2: number, alpha: number, offset: number, fill = false) => {
      const midR = (r1 + r2) / 2;
      const petalR = (r2 - r1) / 2;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        const px = cx + Math.cos(a) * midR;
        const py = cy + Math.sin(a) * midR;
        ctx.beginPath();
        ctx.arc(px, py, petalR, 0, Math.PI * 2);
        if (fill) {
          ctx.fillStyle = `rgba(139,115,85,${alpha * 0.15})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    // Star polygon
    const drawStar = (cx: number, cy: number, n: number, r: number, alpha: number, offset: number) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    // Two interlocked triangles (Star of David / Shatkona)
    const drawTriangle = (cx: number, cy: number, r: number, alpha: number, offset: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + offset;
        if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    // Radial lines
    const drawSpokes = (cx: number, cy: number, n: number, r1: number, r2: number, alpha: number, offset: number) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + offset;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      angle.current += 0.0018 * speed;
      const t = angle.current;

      const cx = w / 2 + (mouse.current.x - w / 2) * (interactive ? 0.03 : 0);
      const cy = h / 2 + (mouse.current.y - h / 2) * (interactive ? 0.03 : 0);

      // ── Center ──
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139,115,85,0.35)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,115,85,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Ring 1: 8 inner petals (r 8–34) ──
      drawLotus(cx, cy, 8, 8, 34, 0.18, t, true);
      drawCircle(cx, cy, 34, 0.14, 0.8);

      // ── Ring 2: Shatkona triangles (r 50) ──
      drawTriangle(cx, cy, 48, 0.12, t * -0.7);
      drawTriangle(cx, cy, 48, 0.12, t * -0.7 + Math.PI / 3);
      drawCircle(cx, cy, 55, 0.1, 0.7);
      drawDots(cx, cy, 6, 55, 0.25, t * -0.7);

      // ── Ring 3: 12 lotus petals (r 55–90) ──
      drawLotus(cx, cy, 12, 55, 90, 0.13, t * 0.8);
      drawCircle(cx, cy, 90, 0.12, 0.7);
      drawDots(cx, cy, 12, 90, 0.2, t * 0.8);

      // ── Ring 4: 16-pointed star + spokes (r 110) ──
      drawStar(cx, cy, 16, 110, 0.08, t * -0.6);
      drawSpokes(cx, cy, 16, 90, 130, 0.07, t * -0.6);
      drawCircle(cx, cy, 130, 0.1, 0.7);

      // ── Ring 5: 16 petals (r 130–168) ──
      drawLotus(cx, cy, 16, 130, 168, 0.1, t * 0.5);
      drawCircle(cx, cy, 168, 0.1, 0.7);
      drawDots(cx, cy, 24, 168, 0.16, t * 0.5, 2);

      // ── Ring 6: Geometric octagon + fine spokes ──
      drawStar(cx, cy, 8, 188, 0.07, t * -0.4 + Math.PI / 8);
      drawSpokes(cx, cy, 24, 168, 198, 0.06, t * -0.4);
      drawCircle(cx, cy, 198, 0.09, 0.6);

      // ── Ring 7: 24 outer petals (r 198–240) ──
      drawLotus(cx, cy, 24, 198, 240, 0.08, t * 0.35);
      drawCircle(cx, cy, 240, 0.09, 0.6);
      drawDots(cx, cy, 32, 240, 0.12, t * 0.35, 1.5);

      // ── Ring 8: Final fine ring ──
      drawSpokes(cx, cy, 32, 240, 270, 0.05, t * -0.3);
      drawCircle(cx, cy, 270, 0.07, 0.5);
      drawDots(cx, cy, 48, 270, 0.09, t * -0.3, 1.2);

      // ── Particles orbiting rings ──
      const ringRadii = [34, 55, 90, 130, 168, 240];
      particles.forEach(p => {
        p.phase += p.speed;
        const r = ringRadii[p.ring - 2] ?? 90;
        const px = cx + Math.cos(p.phase) * r;
        const py = cy + Math.sin(p.phase) * r;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196,185,154,0.5)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [interactive, speed]);

  return <canvas ref={ref} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
}

/* ── Mandala SVG Ornament (section divider) ───────────────────────── */
function MandalaOrn({ size = 72, color = "#c4b99a", opacity = 0.6 }: { size?: number; color?: string; opacity?: number }) {
  const rs = [8, 16, 24, 32];
  const spokes = 16;
  return (
    <svg width={size} height={size} viewBox="-40 -40 80 80" aria-hidden="true" style={{ opacity }}>
      {/* Rings */}
      {rs.map(r => <circle key={r} r={r} fill="none" stroke={color} strokeWidth="0.8" />)}
      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i / spokes) * Math.PI * 2;
        return <line key={i} x1={Math.cos(a) * 8} y1={Math.sin(a) * 8} x2={Math.cos(a) * 32} y2={Math.sin(a) * 32} stroke={color} strokeWidth="0.6" />;
      })}
      {/* Dots at outer ring */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return <circle key={i} cx={Math.cos(a) * 38} cy={Math.sin(a) * 38} r="1.5" fill={color} />;
      })}
      {/* Center */}
      <circle r="3" fill={color} />
    </svg>
  );
}

/* ── Word-by-word reveal ───────────────────────────────────────────── */
function SplitReveal({ text, className, style, tag = "h1", delay = 0 }: {
  text: string; className?: string; style?: React.CSSProperties;
  tag?: "h1" | "h2" | "p"; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");
  const Tag = tag;
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <Tag className={className} style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
        {words.map((w, i) => (
          <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <span style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + i * 70}ms, opacity 0.6s ease ${delay + i * 70}ms`,
            }}>{w}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/* ── Scroll reveal ─────────────────────────────────────────────────── */
function Reveal({ children, className, style, delay = 0 }: {
  children: React.ReactNode; className?: string;
  style?: React.CSSProperties; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)",
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── Magnetic button ───────────────────────────────────────────────── */
function MagneticBtn({ children, href, dark = false }: {
  children: React.ReactNode; href: string; dark?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      className="inline-block px-8 py-4 rounded text-sm font-medium"
      style={{
        background: dark ? "#1c1008" : "transparent",
        color: dark ? "#f5f0e8" : "#1c1008",
        border: dark ? "none" : "1.5px solid #c4b99a",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = dark
          ? "0 16px 40px rgba(28,16,8,0.25)"
          : "0 8px 24px rgba(139,115,85,0.15)";
        if (!dark) e.currentTarget.style.borderColor = "#8b7355";
      }}
    >
      {children}
    </a>
  );
}

/* ── Marquee ───────────────────────────────────────────────────────── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#1c1008", overflow: "hidden", padding: "14px 0", borderTop: "1px solid #2d1f14", borderBottom: "1px solid #2d1f14" }}>
      <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ padding: "0 32px", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", whiteSpace: "nowrap" }}>
            {item} <span style={{ color: "#3a2518", margin: "0 8px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Client Logo Strip ─────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Starknet Foundation", abbr: "SF" },
  { name: "0G Foundation", abbr: "0G" },
  { name: "Paris Blockchain Week", abbr: "PB" },
  { name: "Somnia Network", abbr: "SN" },
  { name: "AWS", abbr: "AW" },
  { name: "Istanbul Blockchain Week", abbr: "IB" },
  { name: "BlockDown Festival", abbr: "BD" },
];

function ClientStrip() {
  const doubled = [...CLIENTS, ...CLIENTS];
  return (
    <div style={{ background: "#f5f0e8", padding: "52px 0", borderTop: "1px solid rgba(196,185,154,0.35)", borderBottom: "1px solid rgba(196,185,154,0.35)", overflow: "hidden" }}>
      <p style={{ textAlign: "center", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c4b99a", marginBottom: "2.5rem" }}>
        Trusted by leading teams in Web3 &amp; AI
      </p>
      <div style={{ display: "flex", animation: "marquee 36s linear infinite", width: "max-content" }}>
        {doubled.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0 3rem", flexShrink: 0 }}>
            {/* Monogram circle */}
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1px solid #c4b99a",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", color: "#8b7355" }}>{c.abbr}</span>
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#5c4a32", whiteSpace: "nowrap", letterSpacing: "0.01em" }}>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3D Service Card ───────────────────────────────────────────────── */
function ServiceCard({ n, title, body, delay }: { n: string; title: string; body: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * -12;
    const y = ((e.clientX - r.left) / r.width - 0.5) * 12;
    setRot({ x, y });
  };

  return (
    <Reveal delay={delay} style={{ perspective: "1000px" }}>
      <div ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }}
        onMouseMove={onMove}
        style={{
          padding: "2.5rem", borderRadius: "16px", position: "relative", overflow: "hidden",
          background: "#f5f0e8", border: `1px solid ${hovered ? "#8b7355" : "#c4b99a"}`,
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateY(${hovered ? -10 : 0}px)`,
          boxShadow: hovered ? "0 28px 70px rgba(28,16,8,0.14)" : "0 2px 8px rgba(28,16,8,0.04)",
          transition: "border-color 0.3s, box-shadow 0.4s, transform 0.2s ease-out",
          cursor: "default",
        }}>
        {/* Mandala ornament in card corner */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem", opacity: hovered ? 0.18 : 0.08, transition: "opacity 0.4s" }}>
          <MandalaOrn size={64} color="#8b7355" opacity={1} />
        </div>
        <div style={{
          position: "absolute", top: "1rem", right: "1.5rem", fontSize: "5rem", fontWeight: 700,
          fontFamily: "var(--font-display,serif)", color: "#ede8df", lineHeight: 1, userSelect: "none",
          transition: "transform 0.3s ease",
          transform: hovered ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
        }}>{n}</div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem", color: "#1c1008", position: "relative", zIndex: 1 }}>{title}</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#5c4a32", position: "relative", zIndex: 1 }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ── Custom Cursor (mandala ring) ──────────────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf: number;
    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.1;
      if (dot.current) {
        dot.current.style.left = `${pos.current.x}px`;
        dot.current.style.top = `${pos.current.y}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${smooth.current.x}px`;
        ring.current.style.top = `${smooth.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed z-[9999] pointer-events-none hidden md:block" style={{
        width: 6, height: 6, borderRadius: "50%", background: "#8b7355",
        transform: "translate(-50%,-50%)",
      }} />
      <div ref={ring} className="fixed z-[9998] pointer-events-none hidden md:block" style={{
        width: 40, height: 40, transform: "translate(-50%,-50%)", animation: "spinSlow 8s linear infinite",
      }}>
        <svg width="40" height="40" viewBox="-20 -20 40 40">
          <circle r="18" fill="none" stroke="rgba(139,115,85,0.4)" strokeWidth="1" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <circle key={i} cx={Math.cos(a) * 18} cy={Math.sin(a) * 18} r="1.2" fill="rgba(196,185,154,0.6)" />;
          })}
        </svg>
      </div>
    </>
  );
}

/* ── Scroll Progress Bar ───────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setPct((window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[100] h-[2px] pointer-events-none"
      style={{ width: `${pct}%`, background: "linear-gradient(90deg, #8b7355, #c4b99a, #8b7355)", transition: "width 0.1s" }} />
  );
}

/* ── Section Divider with Mandala ──────────────────────────────────── */
function SectionDivider({ light = false }: { light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "0 1.5rem" }}>
      <div style={{ flex: 1, height: 1, background: light ? "rgba(255,255,255,0.06)" : "#c4b99a", opacity: light ? 1 : 0.4 }} />
      <MandalaOrn size={52} color={light ? "#5c4a32" : "#c4b99a"} opacity={light ? 0.4 : 0.7} />
      <div style={{ flex: 1, height: 1, background: light ? "rgba(255,255,255,0.06)" : "#c4b99a", opacity: light ? 1 : 0.4 }} />
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => { setNavScrolled(window.scrollY > 50); setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ fontFamily: "var(--font-body,sans-serif)", background: "#f5f0e8", cursor: "none" }}>
      <Cursor />
      <ScrollProgress />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4"
        style={{
          background: navScrolled ? "rgba(245,240,232,0.96)" : "rgba(245,240,232,0)",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(196,185,154,0.6)" : "none",
          transition: "all 0.5s ease",
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Mandala%20Network%20Logo2.svg" alt="Mandala Network" style={{ height: 52, mixBlendMode: "multiply" }}
          onError={e => { e.currentTarget.style.display = "none"; (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "block"; }} />
        <span style={{ display: "none", fontWeight: 700, color: "#1c1008" }}>Mandala Network</span>
        <div className="flex items-center gap-8">
          {[["About", "#about"], ["Services", "#services"], ["Devcon", "#devconmumbai"]].map(([l, h]) => (
            <a key={l} href={h} className="hidden md:block text-sm"
              style={{ color: "#5c4a32", transition: "color 0.2s", letterSpacing: "0.03em" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1c1008")}
              onMouseLeave={e => (e.currentTarget.style.color = "#5c4a32")}>{l}</a>
          ))}
          <a href="#contact" className="text-sm px-5 py-2.5 rounded-full font-medium"
            style={{ background: "#1c1008", color: "#f5f0e8", transition: "all 0.25s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#3a2518"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1c1008"; e.currentTarget.style.transform = "scale(1)"; }}>
            Get in Touch
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Large hero mandala — parallax shrink on scroll */}
        <div style={{
          position: "absolute", inset: 0,
          transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.15}px)`,
          opacity: Math.max(0, 1 - scrollY * 0.002),
          transition: "opacity 0.05s",
        }}>
          <CanvasMandala interactive={true} speed={1} />
        </div>

        {/* Radial gradient overlay for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(245,240,232,0) 30%, rgba(245,240,232,0.85) 100%)",
          pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-5xl mx-auto pt-40">
          <Reveal delay={0}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 32, height: 1, background: "#c4b99a" }} />
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>
                Market Access · Experiential Experiences · Emerging Technologies
              </p>
              <div style={{ width: 32, height: 1, background: "#c4b99a" }} />
            </div>
          </Reveal>

          <SplitReveal text="From Relationships to Real Outcomes."
            tag="h1" delay={150}
            className="font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.8rem,7vw,6rem)", color: "#1c1008", justifyContent: "center" }} />

          <Reveal delay={600}>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 3rem", color: "#5c4a32" }}>
              Mandala Network opens markets and builds event experiences for Web3 and AI companies
              across Europe, the Middle East, and South Asia.
            </p>
          </Reveal>

          <Reveal delay={750}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticBtn href="#contact" dark>Work With Us</MagneticBtn>
              <MagneticBtn href="#services">Our Services</MagneticBtn>
            </div>
          </Reveal>

          {/* Mandala ornament below CTA */}
          <Reveal delay={900}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <MandalaOrn size={44} color="#8b7355" opacity={0.35} />
            </div>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#c4b99a", animation: "fadeUp 1s ease 1.4s both" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,#c4b99a,transparent)", animation: "pulse 2s ease infinite" }} />
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={["Market Access", "Europe", "MENA", "South Asia", "Event Production", "Web3", "AI", "Intentional", "B2B", "Real Outcomes"]} />

      {/* STATS */}
      <div style={{ background: "#1c1008" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-14 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {[
            { v: "3", l: "Regions" },
            { v: "Europe · MENA · South Asia", l: "Markets" },
            { v: "Boutique", l: "By Design" },
            { v: "End-to-End", l: "Event Production" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80} className="text-center md:border-r last:border-r-0 px-4"
              style={{ borderColor: "#2d1f14" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-display,serif)", color: "#f5f0e8", marginBottom: "0.5rem" }}>{s.v}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355" }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
        <SectionDivider light />
        <div style={{ height: "2rem" }} />
      </div>

      {/* CLIENT STRIP */}
      <ClientStrip />

      {/* ABOUT */}
      <section id="about" className="py-32 md:py-44 px-6 md:px-14 relative overflow-hidden">
        {/* Large faded mandala behind quote */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, opacity: 0.04, pointerEvents: "none",
        }}>
          <CanvasMandala interactive={false} speed={0.4} />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <MandalaOrn size={32} color="#8b7355" opacity={0.7} />
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>About</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.2rem,4.5vw,4rem)", fontWeight: 700, color: "#1c1008", lineHeight: 1.15 }}>
                &ldquo;The right rooms.<br />The right people.&rdquo;
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <div style={{ marginTop: "2.5rem" }}>
                <MandalaOrn size={40} color="#c4b99a" opacity={0.5} />
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={200} className="space-y-6" style={{ color: "#5c4a32", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p>We are Mandala Network, a boutique market access and events firm working exclusively with Web3 and AI companies across Europe, the Middle East &amp; North Africa, and South Asia.</p>
              <p>Every engagement gets our full attention, our deepest relationships, and our best work. When you work with Mandala Network, you work with a team as invested in your success as you are.</p>
              <p>The result: faster market entry, stronger partnerships, and event experiences designed to actually move deals. Not just fill rooms.</p>
              <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #c4b99a", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <MandalaOrn size={24} color="#8b7355" opacity={0.6} />
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>Europe · MENA · South Asia</p>
              </div>
            </Reveal>
          </div>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <SectionDivider />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 md:py-44 px-6 md:px-14 relative" style={{ background: "#ede8df" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <MandalaOrn size={32} color="#8b7355" opacity={0.7} />
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>What We Do</p>
            </div>
          </Reveal>
          <SplitReveal text="Three things. Done exceptionally well." tag="h2" delay={100}
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#1c1008", marginBottom: "4rem" }} />
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard n="01" title="Market Access" delay={0}
              body="Strategic entry, partnerships, and introductions across Europe, MENA, and South Asia. We connect you with the people and institutions that accelerate real growth." />
            <ServiceCard n="02" title="Event Production" delay={120}
              body="From private dinners to large-scale B2B activations, every experience is engineered to move deals and forge the relationships that last." />
            <ServiceCard n="03" title="Intentional Roster" delay={240}
              body="A small number of clients. Full attention. No dilution. Quality is the only metric that matters." />
          </div>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <SectionDivider />
        </div>
      </section>

      {/* DEVCON MUMBAI */}
      <section id="devconmumbai" className="py-32 md:py-44 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <MandalaOrn size={32} color="#8b7355" opacity={0.7} />
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>Upcoming Event</p>
            </div>
          </Reveal>
          <SplitReveal text="Devcon Mumbai." tag="h2" delay={100}
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#1c1008", marginBottom: "1rem" }} />
          <Reveal delay={200}>
            <p style={{ fontSize: "1.1rem", color: "#5c4a32", maxWidth: "520px", marginBottom: "4rem" }}>
              On the ground in Mumbai, curating the right rooms and making your presence count.
            </p>
          </Reveal>
          <Reveal className="rounded-2xl overflow-hidden" style={{ border: "1px solid #c4b99a", maxWidth: 760 }}>
            <iframe src="https://form.typeform.com/to/qvrQfqQo" width="100%" height="560"
              frameBorder="0" allow="camera; microphone; autoplay; encrypted-media;"
              title="Devcon Mumbai Registration" className="block" />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 md:py-44 px-6 md:px-14 relative overflow-hidden"
        style={{ background: "#1c1008", borderTop: "1px solid #2d1f14" }}>
        {/* Large background mandala */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ width: 700, height: 700, opacity: 0.07, flexShrink: 0, marginRight: "-120px" }}>
            <CanvasMandala interactive={false} speed={0.5} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <MandalaOrn size={32} color="#8b7355" opacity={0.7} />
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", margin: 0 }}>Contact</p>
              </div>
            </Reveal>
            <SplitReveal text="Let's Talk." tag="h2" delay={100}
              style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, color: "#f5f0e8", marginBottom: "1.5rem" }} />
            <Reveal delay={300}>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "#c4b99a", marginBottom: "2.5rem" }}>
                Looking to expand into Europe, MENA, or South Asia? Want an event that actually delivers?
              </p>
              <a href="https://t.me/MandalaNetwork" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
                style={{ background: "#2d1f14", border: "1px solid #3a2518", transition: "all 0.3s ease", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b7355"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#3a2518"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/PFP.JPG" alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
                  onError={e => (e.currentTarget.style.display = "none")} />
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f5f0e8" }}>Message us on Telegram</div>
                  <div style={{ fontSize: "0.75rem", color: "#8b7355" }}>@MandalaNetwork</div>
                </div>
                <svg style={{ marginLeft: "auto" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </Reveal>
          </div>
          <Reveal delay={200}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ paddingTop: "4rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <MandalaOrn size={80} color="#8b7355" opacity={0.6} />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#f5f0e8", marginBottom: "0.5rem" }}>Message received.</h3>
                <p style={{ color: "#8b7355" }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[{ id: "name", label: "Name", type: "text", ph: "Your name", req: true }, { id: "company", label: "Company", type: "text", ph: "Your company", req: false }].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "0.5rem" }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} required={f.req} value={form[f.id as keyof typeof form]} onChange={change} placeholder={f.ph}
                        style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: 8, background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#8b7355")} onBlur={e => (e.currentTarget.style.borderColor = "#3a2518")} />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "0.5rem" }}>Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={change} placeholder="you@company.com"
                    style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: 8, background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#8b7355")} onBlur={e => (e.currentTarget.style.borderColor = "#3a2518")} />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "0.5rem" }}>Message</label>
                  <textarea id="message" name="message" required rows={5} value={form.message} onChange={change} placeholder="Tell us about your goals..."
                    style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: 8, background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8", fontSize: "0.9rem", outline: "none", resize: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#8b7355")} onBlur={e => (e.currentTarget.style.borderColor = "#3a2518")} />
                </div>
                <button type="submit"
                  style={{ width: "100%", padding: "1rem", borderRadius: 8, background: "#f5f0e8", color: "#1c1008", fontSize: "0.9rem", fontWeight: 600, border: "none", transition: "all 0.25s ease", cursor: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#c4b99a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f5f0e8"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Send Message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-14 py-12" style={{ background: "#f5f0e8", borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <MandalaOrn size={48} color="#c4b99a" opacity={0.6} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1c1008", marginBottom: "0.25rem" }}>Mandala Network</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355" }}>From Relationships to Real Outcomes</div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#8b7355" }}>&copy; {new Date().getFullYear()} Mandala Network. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes spinSlow { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
