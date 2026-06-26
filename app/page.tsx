"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Animated Canvas Mandala ───────────────────────────────────── */
function CanvasMandala() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
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
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      angle.current += 0.0015;

      const cx = w / 2 + (mouse.current.x - w / 2) * 0.04;
      const cy = h / 2 + (mouse.current.y - h / 2) * 0.04;

      for (let ring = 1; ring <= 7; ring++) {
        const r = ring * 52;
        const petals = ring * 6;
        const alpha = 0.04 + ring * 0.012;
        ctx.strokeStyle = `rgba(139,115,85,${alpha})`;
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        for (let p = 0; p < petals; p++) {
          const a = (p / petals) * Math.PI * 2 + angle.current * (ring % 2 === 0 ? 1 : -1);
          const x1 = cx + Math.cos(a) * r;
          const y1 = cy + Math.sin(a) * r;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x1, y1);
          ctx.stroke();

          if (ring % 2 === 0) {
            ctx.beginPath();
            ctx.arc(x1, y1, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139,115,85,${alpha * 1.5})`;
            ctx.fill();
          }
        }
      }
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

/* ── Word-by-word reveal ───────────────────────────────────────── */
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
              transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + i * 60}ms, opacity 0.6s ease ${delay + i * 60}ms`,
            }}>{w}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/* ── Scroll reveal ─────────────────────────────────────────────── */
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

/* ── Magnetic button ───────────────────────────────────────────── */
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

/* ── Marquee ───────────────────────────────────────────────────── */
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

/* ── 3D Service Card ───────────────────────────────────────────── */
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
      <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }} onMouseMove={onMove}
        style={{
          padding: "2.5rem", borderRadius: "12px", position: "relative", overflow: "hidden",
          background: "#f5f0e8", border: `1px solid ${hovered ? "#8b7355" : "#c4b99a"}`,
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateY(${hovered ? -8 : 0}px)`,
          boxShadow: hovered ? "0 24px 60px rgba(28,16,8,0.12)" : "0 2px 8px rgba(28,16,8,0.04)",
          transition: "border-color 0.3s, box-shadow 0.4s, transform 0.2s ease-out",
          cursor: "default",
        }}>
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

/* ── Cursor ────────────────────────────────────────────────────── */
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
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
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
        transform: "translate(-50%,-50%)", transition: "none",
      }} />
      <div ref={ring} className="fixed z-[9998] pointer-events-none hidden md:block" style={{
        width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(139,115,85,0.5)",
        transform: "translate(-50%,-50%)",
      }} />
    </>
  );
}

/* ── Scroll Progress Bar ───────────────────────────────────────── */
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
      style={{ width: `${pct}%`, background: "linear-gradient(90deg, #8b7355, #c4b99a)", transition: "width 0.1s" }} />
  );
}

/* ── Main ──────────────────────────────────────────────────────── */
export default function Home() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 50);
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
        <img src="/Mandala%20Network%20Logo2.svg" alt="Mandala Network" style={{ height: 240, mixBlendMode: "multiply" }}
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
        <CanvasMandala />
        <div className="relative z-10 max-w-5xl mx-auto pt-20">
          <Reveal delay={0}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b7355", marginBottom: "2rem" }}>
              Market Access · Experiential Experiences · Emerging Technologies
            </p>
          </Reveal>
          <SplitReveal text="From Relationships to Real Outcomes."
            tag="h1" delay={100}
            className="font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.8rem,7vw,6rem)", color: "#1c1008", justifyContent: "center" }} />
          <Reveal delay={500}>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 3rem", color: "#5c4a32" }}>
              Mandala Network opens markets and builds event experiences for Web3 and AI companies
              across Europe, the Middle East, and South Asia.
            </p>
          </Reveal>
          <Reveal delay={650}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticBtn href="#contact" dark>Work With Us</MagneticBtn>
              <MagneticBtn href="#services">Our Services</MagneticBtn>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#c4b99a", animation: "fadeUp 1s ease 1.2s both" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
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
      </div>

      {/* ABOUT */}
      <section id="about" className="py-32 md:py-44 px-6 md:px-14" style={{ borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal><p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "2rem" }}>About</p></Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.2rem,4.5vw,4rem)", fontWeight: 700, color: "#1c1008", lineHeight: 1.15 }}>
                “The right rooms. The right people.”
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={200} className="space-y-6" style={{ color: "#5c4a32", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p>We are Mandala Network — a boutique market access and events firm working exclusively with Web3 and AI companies across Europe, the Middle East &amp; North Africa, and South Asia.</p>
              <p>Every engagement gets our full attention, our deepest relationships, and our best work. When you work with Mandala Network, you work with a team as invested in your success as you are.</p>
              <p>The result: faster market entry, stronger partnerships, and event experiences designed to actually move deals — not just fill rooms.</p>
              <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #c4b99a" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8b7355" }}>Europe · MENA · South Asia</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 md:py-44 px-6 md:px-14" style={{ background: "#ede8df", borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "1rem" }}>What We Do</p></Reveal>
          <SplitReveal text="Three things. Done exceptionally well." tag="h2" delay={100}
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#1c1008", marginBottom: "4rem" }} />
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard n="01" title="Market Access" delay={0}
              body="Strategic entry, partnerships, and introductions across Europe, MENA, and South Asia. We connect you with the people and institutions that accelerate real growth." />
            <ServiceCard n="02" title="Event Production" delay={120}
              body="From private dinners to large-scale B2B activations — every experience is engineered to move deals and forge the relationships that last." />
            <ServiceCard n="03" title="Intentional Roster" delay={240}
              body="A small number of clients. Full attention. No dilution. Quality is the only metric that matters." />
          </div>
        </div>
      </section>

      {/* DEVCON MUMBAI */}
      <section id="devconmumbai" className="py-32 md:py-44 px-6 md:px-14" style={{ borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "1rem" }}>Upcoming Event</p></Reveal>
          <SplitReveal text="Devcon Mumbai." tag="h2" delay={100}
            style={{ fontFamily: "var(--font-display,serif)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#1c1008", marginBottom: "1rem" }} />
          <Reveal delay={200}>
            <p style={{ fontSize: "1.1rem", color: "#5c4a32", maxWidth: "520px", marginBottom: "4rem" }}>
              On the ground in Mumbai — curating the right rooms, making your presence count.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Reveal className="relative rounded-2xl overflow-hidden" style={{ minHeight: 500 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Mumbai.jpg" alt="Mumbai" style={{ width: "100%", minHeight: 500, objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement; if (p) { p.style.background = "#ede8df"; p.style.display = "flex"; p.style.alignItems = "center"; p.style.justifyContent = "center"; } }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,16,8,0.6) 0%,transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4b99a" }}>Mumbai, India</span>
              </div>
            </Reveal>
            <Reveal delay={150} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #c4b99a", minHeight: 520 }}>
              <iframe src="https://form.typeform.com/to/qvrQfqQo" width="100%" height="520"
                frameBorder="0" allow="camera; microphone; autoplay; encrypted-media;"
                title="Devcon Mumbai Registration" className="block" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 md:py-44 px-6 md:px-14 relative overflow-hidden"
        style={{ background: "#1c1008", borderTop: "1px solid #2d1f14" }}>
        <div style={{ position: "absolute", right: "-80px", top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", width: 520, height: 520 }}>
          <CanvasMandala />
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <Reveal><p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355", marginBottom: "1.5rem" }}>Contact</p></Reveal>
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
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(139,115,85,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
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
      <footer className="px-6 md:px-14 py-10" style={{ background: "#f5f0e8", borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1c1008", marginBottom: "0.25rem" }}>Mandala Network</div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b7355" }}>From Relationships to Real Outcomes</div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#8b7355" }}>&copy; {new Date().getFullYear()} Mandala Network. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
