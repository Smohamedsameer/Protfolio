import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import Footer from "./Footer.jsx";

const RESUME_PATH = "/Mohamed-Sameer-dev.pdf";

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header with image background */}
      <section style={{
        position: "relative", minHeight: "48vh", display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
        paddingTop: 140, paddingBottom: 40,
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
            alt="Resume background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.8)" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
            background: "linear-gradient(to top, var(--bg), transparent)",
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700, padding: "0 24px" }}
        >
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
            Resume
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,64px)", color: "var(--text)", marginBottom: 20 }}>
            My <em>resume</em>
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>
            This resume highlights my journey as a Java Full Stack Developer, blending academic learning with
            hands-on project experience. It focuses on practical skills built through real training at Greens
            Technologies rather than just theory. Every section is kept clear and concise so you can quickly see
            what I bring to a team.
          </p>
        </motion.div>
      </section>

      {/* Resume preview + download */}
      <section ref={ref} style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            borderRadius: 24, overflow: "hidden", border: "1px solid var(--stroke)",
            background: "var(--surface)", padding: 16,
          }}
        >
          <iframe
            src={RESUME_PATH}
            title="Mohd Sameer Resume"
            style={{ width: "100%", height: "70vh", border: "none", borderRadius: 16, background: "#fff" }}
          />
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <div className="accent-border-wrap">
            <a
              href={RESUME_PATH}
              download="Mohd-Sameer-Resume.pdf"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                borderRadius: 9999, padding: "16px 36px", fontSize: 15, fontWeight: 600,
                background: "var(--text)", color: "var(--bg)", textDecoration: "none",
                position: "relative", zIndex: 1, transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(94,210,156,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
