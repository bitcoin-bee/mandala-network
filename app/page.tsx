"use client";

import { useState } from "react";

function MandalaDecoration() {
  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <g transform="translate(300,300)" stroke="#8b7355" fill="none" opacity="0.08" strokeWidth="0.8">
        <circle r="280" /><circle r="240" /><circle r="200" /><circle r="160" />
        <circle r="120" /><circle r="80" /><circle r="40" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => (
          <line key={a} x1="0" y1="0" x2={280*Math.cos((a*Math.PI)/180)} y2={280*Math.sin((a*Math.PI)/180)} />
        ))}
        {[0,45,90,135,180,225,270,315].map((a) => (
          <polygon key={a} points="0,-20 17,10 -17,10"
            transform={`rotate(${a}) translate(0,-160)`} />
        ))}
        {[0,60,120,180,240,300].map((a) => (
          <circle key={a} r="6" cx={120*Math.cos((a*Math.PI)/180)} cy={120*Math.sin((a*Math.PI)/180)} />
        ))}
      </g>
    </svg>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: "var(--font-body, sans-serif)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #c4b99a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Mandala Network" className="h-8 w-auto" />
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#about" className="hidden md:block text-sm" style={{ color: "#5c4a32" }}>About</a>
          <a href="#services" className="hidden md:block text-sm" style={{ color: "#5c4a32" }}>Services</a>
          <a href="#devcon" className="hidden md:block text-sm" style={{ color: "#5c4a32" }}>Devcon Mumbai</a>
          <a href="#contact" className="text-sm px-5 py-2.5 rounded"
            style={{ background: "#1c1008", color: "#f5f0e8" }}>
            Get in Touch
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] relative">
            <MandalaDecoration />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="animate-fade-up delay-1 text-xs font-medium tracking-[0.25em] uppercase mb-8"
            style={{ color: "#8b7355" }}>
            Market Access · Events · Web3 &amp; AI
          </p>
          <h1 className="animate-fade-up delay-2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-display, Georgia, serif)", color: "#1c1008" }}>
            From Relationships<br />to Real Outcomes.
          </h1>
          <p className="animate-fade-up delay-3 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "#5c4a32" }}>
            Mandala Network opens markets and builds event experiences for Web3 and AI companies
            across Europe, the Middle East, and South Asia.
          </p>
          <div className="animate-fade-up delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="px-8 py-4 rounded text-sm font-medium"
              style={{ background: "#1c1008", color: "#f5f0e8" }}>
              Work With Us
            </a>
            <a href="#services" className="px-8 py-4 rounded text-sm font-medium border"
              style={{ borderColor: "#c4b99a", color: "#1c1008" }}>
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ background: "#1c1008", color: "#f5f0e8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {[
            { value: "3", label: "Regions" },
            { value: "Europe · MENA · South Asia", label: "Markets" },
            { value: "Intentional", label: "Client Roster" },
            { value: "End-to-End", label: "Event Production" },
          ].map((s, i) => (
            <div key={i} className="text-center md:border-r last:border-r-0" style={{ borderColor: "#3a2518" }}>
              <div className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display, serif)" }}>
                {s.value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "#8b7355" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 md:py-36 px-6 md:px-12" style={{ borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color: "#8b7355" }}>About</p>
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display, serif)", color: "#1c1008" }}>
              &ldquo;We go deep,<br />not wide.&rdquo;
            </blockquote>
          </div>
          <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "#5c4a32" }}>
            <p>
              We are Mandala Network — a boutique market access and events firm working exclusively
              with Web3 and AI companies. Our focus is on three regions shaping the next decade of
              digital adoption: Europe, the Middle East &amp; North Africa, and South Asia.
            </p>
            <p>
              We don&apos;t take on many clients. That&apos;s deliberate. Every engagement gets our full
              attention, our deepest relationships, and our best work. When you work with Mandala
              Network, you work with a team as invested in your success as you are.
            </p>
            <p>
              The result: faster market entry, stronger partnerships, and event experiences
              designed to actually move deals — not just fill rooms.
            </p>
            <div className="pt-6" style={{ borderTop: "1px solid #c4b99a" }}>
              <p className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "#8b7355" }}>
                Europe &nbsp;&bull;&nbsp; MENA &nbsp;&bull;&nbsp; South Asia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 md:py-36 px-6 md:px-12"
        style={{ background: "#ede8df", borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#8b7355" }}>What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: "var(--font-display, serif)", color: "#1c1008" }}>
            Three things.<br />Done exceptionally well.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01", title: "Market Access",
                body: "Strategic entry, partnerships, and introductions across Europe, MENA, and South Asia. We connect you with the people and institutions that accelerate real growth."
              },
              {
                n: "02", title: "Event Production",
                body: "From private dinners to large-scale B2B activations — every experience is designed with one goal: to move deals and build lasting relationships."
              },
              {
                n: "03", title: "Intentional Roster",
                body: "We work with a small number of clients at a time. This is a deliberate choice — it means every engagement gets our full attention, never sacrificed for volume."
              },
            ].map((s) => (
              <div key={s.n} className="p-8 rounded-lg relative overflow-hidden"
                style={{ background: "#f5f0e8", border: "1px solid #c4b99a" }}>
                <div className="text-7xl font-bold absolute top-4 right-6 leading-none select-none"
                  style={{ color: "#c4b99a", fontFamily: "var(--font-display, serif)" }}>
                  {s.n}
                </div>
                <h3 className="text-xl font-semibold mb-4 relative z-10"
                  style={{ color: "#1c1008" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed relative z-10" style={{ color: "#5c4a32" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVCON MUMBAI */}
      <section id="devcon" className="py-28 md:py-36 px-6 md:px-12"
        style={{ borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#8b7355" }}>Upcoming Event</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display, serif)", color: "#1c1008" }}>
            Devcon Mumbai
          </h2>
          <p className="text-lg mb-14 max-w-xl" style={{ color: "#5c4a32" }}>
            We&apos;re on the ground in Mumbai — curating the right rooms and making sure your presence counts.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="relative rounded-lg overflow-hidden" style={{ minHeight: 480 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mumbai.jpg" alt="Mumbai" className="w-full h-full object-cover"
                style={{ minHeight: 480 }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(28,16,8,0.5) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "#c4b99a" }}>
                  Mumbai, India
                </span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #c4b99a", minHeight: 520 }}>
              <iframe
                src="https://form.typeform.com/to/qvrQfqQo"
                width="100%" height="520"
                frameBorder="0"
                allow="camera; microphone; autoplay; encrypted-media;"
                title="Devcon Mumbai Registration"
                className="block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 md:py-36 px-6 md:px-12"
        style={{ background: "#1c1008", borderTop: "1px solid #2d1f14" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "#8b7355" }}>Contact</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display, serif)", color: "#f5f0e8" }}>
              Let&apos;s Talk.
            </h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: "#c4b99a" }}>
              If you&apos;re a Web3 or AI company looking to expand into new markets — or you want an
              event that actually delivers — we&apos;d like to hear from you.
            </p>
            <p className="text-sm italic" style={{ color: "#8b7355" }}>
              We work with a small number of clients at a time.
            </p>
          </div>
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(139,115,85,0.15)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="#8b7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "#f5f0e8" }}>Message received.</h3>
                <p style={{ color: "#8b7355" }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { id: "company", label: "Company", type: "text", placeholder: "Your company" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-xs tracking-widest uppercase mb-2"
                        style={{ color: "#8b7355" }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} required={f.id === "name"}
                        value={formData[f.id as keyof typeof formData]}
                        onChange={handleChange} placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded text-sm"
                        style={{ background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#8b7355" }}>Email</label>
                  <input id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange} placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded text-sm"
                    style={{ background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8" }} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#8b7355" }}>Message</label>
                  <textarea id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your goals..."
                    className="w-full px-4 py-3 rounded text-sm resize-none"
                    style={{ background: "#2d1f14", border: "1px solid #3a2518", color: "#f5f0e8" }} />
                </div>
                <button type="submit" className="w-full py-4 rounded text-sm font-medium"
                  style={{ background: "#f5f0e8", color: "#1c1008" }}>
                  Send Message
                </button>
                <p className="text-center text-xs" style={{ color: "#5c4a32" }}>
                  We work with a small number of clients at a time.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10" style={{ background: "#f5f0e8", borderTop: "1px solid #c4b99a" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-sm mb-1" style={{ color: "#1c1008" }}>Mandala Network</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#8b7355" }}>
              From Relationships to Real Outcomes
            </div>
          </div>
          <p className="text-xs" style={{ color: "#8b7355" }}>
            &copy; {new Date().getFullYear()} Mandala Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
