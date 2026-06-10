"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0a0a0a] text-[#f0ece4] min-h-screen font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1e1e1e]">
        <span className="text-lg font-semibold tracking-wide text-[#f0ece4]">
          Mandala Network
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#devcon"
            className="text-sm text-[#6b6b6b] hover:text-[#f0ece4] transition-colors duration-200 hidden sm:block"
          >
            Devcon Mumbai
          </a>
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2.5 rounded border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 pb-16 text-center overflow-hidden"
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#c9a84c]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#c9a84c]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#c9a84c]/15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-[#c9a84c]/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#c9a84c] text-sm font-medium tracking-widest uppercase mb-6">
            Real Market Access
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            Real Market Access for{" "}
            <span className="text-[#c9a84c]">Web3 &amp; AI</span> Companies
          </h1>
          <p className="text-[#6b6b6b] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Mandala Network helps Web3 and AI companies get real market access
            across Europe, the Middle East, and South Asia — and builds event
            experiences that put them in front of the right people.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-[#c9a84c] text-[#0a0a0a] font-semibold rounded hover:bg-[#b8963e] transition-colors duration-200 text-sm tracking-wide"
          >
            Work With Us
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#c9a84c] leading-tight">
              &ldquo;Intentional
              <br />
              by design.&rdquo;
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-[#f0ece4]">
              We are Mandala Network
            </h2>
            <p className="text-[#6b6b6b] leading-relaxed text-base md:text-lg">
              We are a boutique market access and events firm working
              exclusively with Web3 and AI companies. Our focus is on three
              regions that are shaping the next decade of digital adoption:
              Europe, the Middle East &amp; North Africa, and South Asia.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed text-base md:text-lg">
              We don&apos;t take on many clients. We go deep, not wide — building
              genuine relationships and opening doors that matter. When you work
              with Mandala Network, you work with a team that is as invested in
              your success as you are.
            </p>
            <div className="pt-4 border-t border-[#1e1e1e]">
              <p className="text-[#f0ece4] text-sm font-medium tracking-widest uppercase">
                Europe &bull; MENA &bull; South Asia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[#c9a84c] text-sm font-medium tracking-widest uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f0ece4]">
              Our Services
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Market Access */}
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-lg p-8 flex flex-col gap-6 hover:border-[#c9a84c]/30 transition-colors duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#c9a84c]/10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f0ece4] mb-3">
                  Market Access
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">
                  Europe, MENA, and South Asia. Strategic entry, partnerships,
                  and introductions in the markets that matter. We connect you
                  with the people and institutions that accelerate real growth.
                </p>
              </div>
            </div>

            {/* Event Production */}
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-lg p-8 flex flex-col gap-6 hover:border-[#c9a84c]/30 transition-colors duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#c9a84c]/10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f0ece4] mb-3">
                  Event Production
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">
                  From private dinners to large-scale B2B activations, designed
                  to move deals. We create the conditions for meaningful
                  conversations and lasting business relationships.
                </p>
              </div>
            </div>

            {/* Intentional by Design */}
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-lg p-8 flex flex-col gap-6 hover:border-[#c9a84c]/30 transition-colors duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#c9a84c]/10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#f0ece4] mb-3">
                  Intentional by Design
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">
                  We work with a small number of clients at a time. This is a
                  deliberate choice — it means every engagement gets our full
                  attention, and quality is never sacrificed for volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#1e1e1e]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#c9a84c] text-sm font-medium tracking-widest uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f0ece4]">
              Let&apos;s Talk
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-6">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#f0ece4] mb-3">
                Message received.
              </h3>
              <p className="text-[#6b6b6b]">
                We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium tracking-widest uppercase text-[#6b6b6b]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-[#111111] border border-[#1e1e1e] rounded px-4 py-3 text-[#f0ece4] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="company"
                    className="text-xs font-medium tracking-widest uppercase text-[#6b6b6b]"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="bg-[#111111] border border-[#1e1e1e] rounded px-4 py-3 text-[#f0ece4] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium tracking-widest uppercase text-[#6b6b6b]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-[#111111] border border-[#1e1e1e] rounded px-4 py-3 text-[#f0ece4] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium tracking-widest uppercase text-[#6b6b6b]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your company and what you're looking to achieve..."
                  className="bg-[#111111] border border-[#1e1e1e] rounded px-4 py-3 text-[#f0ece4] text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 px-8 py-4 bg-[#c9a84c] text-[#0a0a0a] font-semibold rounded hover:bg-[#b8963e] transition-colors duration-200 text-sm tracking-wide"
              >
                Send Message
              </button>
              <p className="text-center text-xs text-[#6b6b6b] mt-2">
                We work with a small number of clients at a time.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* DEVCON MUMBAI */}
      <section id="devcon" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c9a84c] text-sm font-medium tracking-widest uppercase mb-4">
            Upcoming Event
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0ece4] mb-4">
            Devcon Mumbai
          </h2>
          <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-2xl mb-12">
            We&apos;re on the ground in Mumbai — connecting the right people, curating the right rooms, and making sure your presence counts.
          </p>

          {/* Image + Form grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Photo */}
            <div className="relative overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mumbai.jpg"
                alt="Mumbai street scene"
                className="w-full h-full object-cover object-center max-h-[520px] rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent rounded-lg" />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs tracking-widest uppercase text-[#c9a84c] font-medium">
                  Mumbai, India
                </span>
              </div>
            </div>

            {/* Typeform embed */}
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-lg overflow-hidden" style={{ minHeight: 520 }}>
              <iframe
                src="https://form.typeform.com/to/qvrQfqQo"
                width="100%"
                height="520"
                frameBorder="0"
                allow="camera; microphone; autoplay; encrypted-media;"
                title="Devcon Mumbai Registration"
                className="block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e1e1e] py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-[#f0ece4]">
            Mandala Network
          </span>
          <p className="text-xs text-[#6b6b6b]">
            &copy; {new Date().getFullYear()} Mandala Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
