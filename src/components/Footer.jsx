import React, { useState, useEffect } from "react";
import { GraduationCap, Heart, Quote, ExternalLink, Sparkles } from "lucide-react";
import { ACADEMIC_QUOTES } from "../data/courses";

export default function Footer() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * ACADEMIC_QUOTES.length));
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Quote banner */}
        <div style={{ 
          textAlign: "center", 
          maxWidth: "680px", 
          margin: "0 auto 2.5rem", 
          padding: "1rem 1.5rem", 
          background: "var(--bg-surface-subtle)", 
          border: "1px solid var(--border-subtle)", 
          borderRadius: "var(--radius-lg)" 
        }}>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {ACADEMIC_QUOTES[quoteIndex]}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="brand-icon-wrap" style={{ width: "2.2rem", height: "2.2rem" }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1.05rem" }}>StudyNest Chroma</span>
                <span className="brand-badge" style={{ fontSize: "0.65rem" }}>Vivid Edition</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Curriculum syllabus repository & high-definition academic resource incubator.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", color: "var(--text-muted)", fontSize: "0.8125rem" }}>
            <a 
              href="https://github.com/krishnajith17/studynest" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-primary)", fontWeight: 600 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub Repository</span>
            </a>
            <span>•</span>
            <span>5 Dynamic Vivid Palettes</span>
            <span>•</span>
            <span>Amrita EAC Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
