import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Footer from "./Footer.jsx";

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10,
  background: "var(--bg)", border: "1px solid var(--stroke)",
  color: "var(--text)", fontSize: 14, outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = { fontSize: 13, color: "var(--muted)", padding: "12px 16px", whiteSpace: "nowrap" };
const cellStyle = { padding: "10px 16px" };

const initialForm = {
  firstName: "", lastName: "", address: "", phone: "", country: "",
  state: "", city: "", pincode: "", gender: "", dob: "",
};

function FieldRow({ label, children }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--stroke)" }}>
      <td style={labelStyle}>{label}</td>
      <td style={cellStyle}>{children}</td>
    </tr>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setForm(initialForm);
  };

  const focusIn = e => e.target.style.borderColor = "#4E85BF";
  const focusOut = e => e.target.style.borderColor = "var(--stroke)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header with image background */}
      <section style={{
        position: "relative", minHeight: "45vh", display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
        paddingTop: 140, paddingBottom: 40,
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1600&q=80"
            alt="Contact background"
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
          style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}
        >
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
            Contact
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,64px)", color: "var(--text)" }}>
            Let's <em>talk</em>
          </h1>
        </motion.div>
      </section>

      {/* Form */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 100px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: 24, border: "1px solid var(--stroke)",
            background: "var(--surface)", padding: 24, overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <FieldRow label="First Name">
                <input style={inputStyle} type="text" name="firstName" value={form.firstName}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Last Name">
                <input style={inputStyle} type="text" name="lastName" value={form.lastName}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Address">
                <input style={inputStyle} type="text" name="address" value={form.address}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Phone No">
                <input style={inputStyle} type="tel" name="phone" value={form.phone}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Country">
                <input style={inputStyle} type="text" name="country" value={form.country}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="State">
                <input style={inputStyle} type="text" name="state" value={form.state}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="City">
                <input style={inputStyle} type="text" name="city" value={form.city}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Pincode">
                <input style={inputStyle} type="text" name="pincode" value={form.pincode}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
              <FieldRow label="Gender">
                <select style={inputStyle} name="gender" value={form.gender}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FieldRow>
              <FieldRow label="Date of Birth">
                <input style={inputStyle} type="date" name="dob" value={form.dob}
                  onChange={handleChange} onFocus={focusIn} onBlur={focusOut} required />
              </FieldRow>
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <div className="accent-border-wrap">
              <button
                type="submit"
                style={{
                  borderRadius: 9999, padding: "14px 36px", fontSize: 14, fontWeight: 600,
                  background: "var(--text)", color: "var(--bg)", border: "none",
                  cursor: "pointer", position: "relative", zIndex: 1, transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "var(--surface)", border: "1px solid var(--stroke)",
                borderRadius: 24, padding: "40px 32px", textAlign: "center", maxWidth: 380,
              }}
            >
              <CheckCircle2 size={44} color="#4ade80" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, color: "var(--text)", marginBottom: 8 }}>Application Submitted</h3>
              <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>Thank you for contacting us.</p>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  borderRadius: 9999, padding: "10px 28px", fontSize: 13, fontWeight: 600,
                  background: "var(--text)", color: "var(--bg)", border: "none", cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
