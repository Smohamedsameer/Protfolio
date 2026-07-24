import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "./Footer.jsx";

const EDUCATION = [
  { school: "Christ College of Arts and Science", course: "B.Com", period: "2022 – 2026" },
  { school: "Shamrock Mat Higher Secondary School", course: "SSLC (XII Standard)", period: "2022" },
  { school: "Greens Technologies", course: "Java Full Stack Development", period: "2025 – 2026" },
];

const SKILLS = ["Java", "Full Stack Development", "HTML", "CSS", "JavaScript", "React", "SQL", "Git & GitHub","CI/CD Pipeline","Spring Boot","React","RestAPI","Microservice","Deployment"];
const LANGUAGES = ["English", "Tamil", "Arabic", "Urdu"];
const CERTIFICATES = ["Java Full Stack Completion Certificate", "Udemy — Java Programming Certificate"];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header / hero with image background */}
      <section style={{
        position: "relative", minHeight: "70vh", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", paddingTop: 140, paddingBottom: 60,
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80"
            alt="Workspace background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.78)" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
            background: "linear-gradient(to top, var(--bg), transparent)",
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}
        >
          {/* Profile photo */}
          <div style={{
            width: 150, height: 150, borderRadius: "50%", margin: "0 auto 28px",
            padding: 4, background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
          }}>
            <img
              src="/profile.png"
              alt="Mohd Sameer"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--bg)" }}
            />
          </div>

          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
            About Me
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,64px)", color: "var(--text)", marginBottom: 20 }}>
            Mohamed Sameer
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 620, margin: "0 auto", lineHeight: 1.8 }}>
            I'm a Chennai-based Full Stack Developer with a Java-focused background, currently completing my
            B.Com while building real-world projects at Greens Technologies. I enjoy turning ideas into clean,
            working applications and I'm always looking to sharpen my skills across the stack. Outside of code,
            I'm someone who believes steady, consistent learning beats shortcuts every time.
          </p>
        </motion.div>
      </section>

      {/* Education */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 40px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: "var(--stroke)" }} />
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Education</span>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.school} delay={i * 0.1}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                flexWrap: "wrap", gap: 8, padding: "20px 24px", borderRadius: 20,
                background: "var(--surface)", border: "1px solid var(--stroke)",
                transition: "transform 0.25s, border-color 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#4E85BF"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--stroke)"; }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{ed.school}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{ed.course}</div>
                </div>
                <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>{ed.period}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills + Languages */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40 }}>
          <Reveal>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SKILLS.map(s => (
                <span key={s} style={{
                  fontSize: 13, padding: "8px 16px", borderRadius: 9999,
                  border: "1px solid var(--stroke)", color: "var(--text)",
                  transition: "all 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#89AACC"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--stroke)"; }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Languages Known</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {LANGUAGES.map(l => (
                <span key={l} style={{
                  fontSize: 13, padding: "8px 16px", borderRadius: 9999,
                  background: "var(--surface)", color: "var(--text)",
                  transition: "all 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {l}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certificates */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 100px" }}>
        <Reveal>
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Certificates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CERTIFICATES.map(c => (
              <div key={c} style={{
                fontSize: 14, color: "var(--text)", padding: "16px 20px", borderRadius: 16,
                background: "var(--surface)", border: "1px solid var(--stroke)",
              }}>
                🎓 {c}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
