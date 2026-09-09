import React from "react";
import { X, Award, Target, BookOpen, ShieldCheck, CheckCircle2 } from "lucide-react";
import { DEPARTMENT_INFO } from "../data/courses";

export default function DepartmentFrameworkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "720px" }}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Award size={20} color="var(--accent-primary)" />
            <h3 className="modal-title">EAC Academic Framework & Accreditation</h3>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Department Header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="code-badge" style={{ marginBottom: "0.4rem", display: "inline-block" }}>
              {DEPARTMENT_INFO.branch}
            </span>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {DEPARTMENT_INFO.department}
            </h4>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {DEPARTMENT_INFO.school} • {DEPARTMENT_INFO.institution}
            </div>
          </div>

          {/* Vision */}
          <div style={{ marginBottom: "1.5rem", background: "var(--bg-surface-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent-primary)" }}>
            <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.35rem" }}>
              Vision of the Department
            </h5>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {DEPARTMENT_INFO.vision}
            </p>
          </div>

          {/* Mission */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Mission Statements
            </h5>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {DEPARTMENT_INFO.missions.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PEOs */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Program Educational Objectives (PEOs)
            </h5>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {DEPARTMENT_INFO.peos.map((peo, i) => (
                <div key={i} className="book-card" style={{ margin: 0, padding: "0.75rem 1rem" }}>
                  <span className="code-badge" style={{ minWidth: "60px", textAlign: "center" }}>{peo.code}</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                    {peo.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PSOs */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Program Specific Outcomes (PSOs)
            </h5>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {DEPARTMENT_INFO.psos.map((pso, i) => (
                <div key={i} className="book-card" style={{ margin: 0, padding: "0.75rem 1rem" }}>
                  <span className="code-badge" style={{ minWidth: "60px", textAlign: "center", color: "#10b981" }}>{pso.code}</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                    {pso.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Scheme */}
          <div>
            <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Official Evaluation & Weightage Scheme
            </h5>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="stat-item" style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  Theory Courses
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Continuous Assessment: <strong>30%</strong><br />
                  Mid-Term Exam: <strong>30%</strong><br />
                  End Semester: <strong>40%</strong>
                </div>
              </div>

              <div className="stat-item" style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  Laboratory Courses
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Continuous Assessment: <strong>40%</strong><br />
                  Mid-Term Exam: <strong>20%</strong><br />
                  End Sem / Project: <strong>40%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
