import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { HlsVideo, HLS_SRC } from "./HlsVideo.jsx";
import { LinkedinIcon, GithubIcon } from "./BrandIcons.jsx";

/* ─────────────────────────────────────────
   SOCIAL / NAVIGATION LINKS
   Replace the placeholder urls below with your real
   profile links whenever you have them.
   Note: LinkedIn/GitHub use local SVG icons (BrandIcons.jsx)
   since lucide-react v1 removed brand logos.
───────────────────────────────────────── */
const SOCIALS = [
  { label: "LinkedIn", href: "www.linkedin.com/in/mohamed-sameer-605a2a353", icon: LinkedinIcon, external: true },
  { label: "GitHub", href: "https://github.com/Smohamedsameer", icon: GithubIcon, external: true },
  { label: "Email", href: "mailto:sameerkaleemi10@example.com", icon: Mail, external: true },
  { label: "WhatsApp", href: "https://wa.me/918148771210?text=hi", icon: Phone, external: true },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} style={{ position: "relative", overflow: "hidden", paddingTop: 80, paddingBottom: 48, background: "var(--bg)" }}>
      {/* Flipped video BG */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <HlsVideo
          src={HLS_SRC}
          flipY
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%) scaleY(-1)",
            minWidth: "100%", minHeight: "100%", objectFit: "cover",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", marginBottom: 64, position: "relative", zIndex: 2 }}>
        <div className="animate-marquee" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
          {Array(20).fill("BUILDING THE FUTURE • ").map((t, i) => (
            <span key={i} className="font-display" style={{ fontSize: "clamp(24px,4vw,40px)", color: "rgba(245,245,245,0.15)", paddingRight: 32 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        style={{ textAlign: "center", position: "relative", zIndex: 2, padding: "0 24px" }}
      >
        <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Get In Touch</div>
        <h2 className="font-display" style={{ fontSize: "clamp(40px, 8vw, 96px)", color: "var(--text)", marginBottom: 40, lineHeight: 0.9 }}>
          Let's Code<br />together.
        </h2>
        <div className="accent-border-wrap" style={{ display: "inline-block", marginBottom: 80 }}>
          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            borderRadius: 9999, padding: "16px 36px", fontSize: 15, fontWeight: 600,
            background: "var(--surface)", color: "var(--text)", textDecoration: "none",
            backdropFilter: "blur(8px)", position: "relative", zIndex: 1,
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            Get in touch ↗️
          </Link>
        </div>

        {/* Footer bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 24, borderTop: "1px solid var(--stroke)", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {SOCIALS.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, color: "var(--muted)", textDecoration: "none",
                  transition: "color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Icon size={15} /> {label}
              </a>
            ))}
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "var(--muted)", textDecoration: "none",
                transition: "color 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Contact
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
            <div className="animate-pulse-green" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
            Available for projects
          </div>
        </div>
      </motion.div>
    </section>
  );
}