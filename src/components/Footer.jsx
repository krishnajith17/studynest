import React, { useState, useEffect } from "react";
import { Layers, FileDown, ArrowUpRight } from "lucide-react";
import { ACADEMIC_QUOTES } from "../data/courses";
import { generateProjectPresentationPDF } from "../utils/pdfGenerator";

export default function Footer() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * ACADEMIC_QUOTES.length));
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Editorial Quote Card */}
        <div className="footer-quote-card">
          <p className="footer-quote-text">
            {ACADEMIC_QUOTES[quoteIndex]}
          </p>
        </div>

        <div className="footer-bottom-row">
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div className="brand-icon-wrap" style={{ width: "2.1rem", height: "2.1rem" }}>
              <Layers size={16} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
                  StudyNest
                </span>
                <span className="brand-badge">Amrita EAC</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Curated academic syllabus library, reference hub &amp; instant PDF generator.
              </div>
            </div>
          </div>

          <div className="footer-links-row">
            <button
              type="button"
              onClick={generateProjectPresentationPDF}
              className="filter-reset-pill"
              style={{ color: "var(--text-primary)" }}
              title="Download Classroom Project Presentation PDF"
            >
              <FileDown size={13} />
              <span>Project Presentation PDF</span>
            </button>

            <a 
              href="https://github.com/krishnajith17/studynest" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="filter-reset-pill"
            >
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>

            <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
              B.Tech EAC 2023–2027
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
