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
  weight: ["300", "400", "500", "600", "700"],
});

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      background: "#e8e0d0",
    }}>
      {/* Full-bleed background: the mandala logo SVG */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vmax",
          height: "100vmax",
          objectFit: "contain",
          opacity: 0.85,
          mixBlendMode: "multiply",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Subtle radial vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, rgba(206,196,178,0.6) 100%)",
      }} />

      {/* NAV */}
      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 2rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Mandala icon — small SVG mark */}
          <svg width="26" height="26" viewBox="-13 -13 26 26" aria-hidden="true">
            <circle r="11" fill="none" stroke="#26110C" strokeWidth="0.8" opacity="0.6" />
            <circle r="7" fill="none" stroke="#26110C" strokeWidth="0.7" opacity="0.5" />
            <circle r="3.5" fill="none" stroke="#26110C" strokeWidth="0.7" opacity="0.5" />
            {[0,1,2,3,4,5,6,7].map(i => {
              const a = (i / 8) * Math.PI * 2;
              return <line key={i} x1={Math.cos(a)*3.5} y1={Math.sin(a)*3.5} x2={Math.cos(a)*11} y2={Math.sin(a)*11} stroke="#26110C" strokeWidth="0.5" opacity="0.4" />;
            })}
            <circle r="1.5" fill="#26110C" opacity="0.6" />
          </svg>
          <span className={archivo.className} style={{
            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#26110C",
          }}>
            Mandala Network
          </span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 3rem",
        position: "relative", zIndex: 1,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 1s ease 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
      }}>

        {/* Badge */}
        <div className={archivo.className} style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(38,17,12,0.88)",
          borderRadius: "100px",
          padding: "0.4rem 1rem",
          marginBottom: "2.5rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8875C", display: "inline-block", flexShrink: 0 }} />
          <span style={{
            fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E7DFCB",
          }}>
            Launching Soon · 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className={cormorant.className} style={{
          fontSize: "clamp(3.5rem, 8.5vw, 7rem)",
          fontWeight: 400,
          lineHeight: 1.05,
          color: "#26110C",
          marginBottom: 0,
          maxWidth: "16ch",
        }}>
          We&apos;re building<br />something
        </h1>

        {/* "intentional." — italic, golden, with inline sub-text */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "0.6rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <span className={cormorant.className} style={{
            fontSize: "clamp(3.5rem, 8.5vw, 7rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#7A5C38",
            lineHeight: 1.05,
          }}>
            intentional.
          </span>
          <span className={cormorant.className} style={{
            fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
            fontStyle: "italic",
            color: "#5C3E24",
            opacity: 0.7,
            paddingBottom: "0.9rem",
            whiteSpace: "nowrap",
          }}>
            From relationships to real outcomes.
          </span>
        </div>

        {/* Body */}
        <p className={archivo.className} style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          fontWeight: 400,
          color: "#3B2318",
          maxWidth: "52ch",
          lineHeight: 1.75,
          marginBottom: "2.5rem",
          opacity: 0.85,
        }}>
          Our new home is on the way — market access and event experiences
          for Web3 &amp; AI across Europe, MENA, and South Asia.
          In the meantime, the conversation is already open.
        </p>

        {/* Email form */}
        {submitted ? (
          <p className={archivo.className} style={{
            fontSize: "0.9rem", color: "#3B2318", opacity: 0.7,
            marginBottom: "1.5rem",
          }}>
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}
            style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className={archivo.className}
              style={{
                padding: "0 1.25rem",
                height: 48,
                borderRadius: "6px",
                border: "1.5px solid rgba(38,17,12,0.18)",
                background: "rgba(251,248,241,0.6)",
                color: "#26110C",
                fontSize: "0.95rem",
                fontWeight: 400,
                outline: "none",
                width: 280,
                backdropFilter: "blur(8px)",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(38,17,12,0.45)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(38,17,12,0.18)")}
            />
            <button
              type="submit"
              className={archivo.className}
              style={{
                height: 48,
                padding: "0 1.75rem",
                borderRadius: "6px",
                background: "#26110C",
                color: "#F5EFE2",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Notify me
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
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.82rem", fontWeight: 600,
            color: "#3B2318", textDecoration: "none",
            opacity: 0.75, transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#A8875C", display: "inline-block", flexShrink: 0 }} />
          Talk to us on Telegram · @MandalaNetwork
        </a>
      </main>

      {/* Footer dashes */}
      <div style={{
        position: "absolute", bottom: "1.5rem", left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: "0.5rem",
        opacity: visible ? 0.35 : 0,
        transition: "opacity 1.5s ease 0.6s",
      }}>
        <div style={{ width: 24, height: 1.5, borderRadius: 1, background: "#26110C" }} />
        <div style={{ width: 24, height: 1.5, borderRadius: 1, background: "#26110C" }} />
      </div>
    </div>
  );
}
