import React, { useState } from "react";
import { 
  X, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Star,
  Globe,
  Award,
  FlaskConical,
  CheckSquare,
  Square,
  Sparkles
} from "lucide-react";

export default function CourseDetailModal({
  course,
  isBookmarked,
  onToggleBookmark,
  onClose,
  onDownloadUnit,
  onDownloadFull
}) {
  const [activeTab, setActiveTab] = useState("syllabus"); // syllabus, copo, lab, books, external
  const [completedUnits, setCompletedUnits] = useState({});

  if (!course) return null;

  const toggleUnitDone = (unitTitle) => {
    setCompletedUnits(prev => ({
      ...prev,
      [unitTitle]: !prev[unitTitle]
    }));
  };

  const hasLab = course.experiments && course.experiments.length > 0;
  const hasExt = course.externalResources && course.externalResources.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "860px", height: "88vh" }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span className="code-badge" style={{ fontSize: "1rem" }}>{course.code}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Sem {course.semester} • {course.credits} Credits • L-T-P: {course.ltp}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button 
              type="button"
              className={`star-btn ${isBookmarked ? "starred" : ""}`}
              onClick={() => onToggleBookmark(course.code)}
              title={isBookmarked ? "Remove bookmark" : "Pin to bookmarks"}
            >
              <Star size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          padding: "0.75rem 1.5rem", 
          background: "var(--bg-surface-elevated)", 
          borderBottom: "1px solid var(--border-subtle)",
          overflowX: "auto"
        }}>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "syllabus" ? "active" : ""}`}
            onClick={() => setActiveTab("syllabus")}
          >
            📑 Syllabus & Units
          </button>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "copo" ? "active" : ""}`}
            onClick={() => setActiveTab("copo")}
          >
            🎯 Course Outcomes (CO-PO)
          </button>
          {hasLab && (
            <button 
              type="button"
              className={`filter-pill ${activeTab === "lab" ? "active" : ""}`}
              onClick={() => setActiveTab("lab")}
            >
              🧪 Lab Experiments ({course.experiments.length})
            </button>
          )}
          <button 
            type="button"
            className={`filter-pill ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            📚 Textbooks ({course.textbooks?.length || 0})
          </button>
          {hasExt && (
            <button 
              type="button"
              className={`filter-pill ${activeTab === "external" ? "active" : ""}`}
              onClick={() => setActiveTab("external")}
            >
              🌐 Simulators & Videos ({course.externalResources.length})
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
            {course.title}
          </h2>

          {/* TAB 1: Syllabus & Units */}
          {activeTab === "syllabus" && (
            <div>
              {/* Objectives */}
              {course.objectives && course.objectives.length > 0 && (
                <div style={{ marginBottom: "1.5rem", background: "var(--bg-surface-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent-primary)" }}>
                  <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Course Educational Objectives
                  </h4>
                  <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {course.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Units Detailed Breakdown */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700 }}>
                    Unit-wise Syllabus Details
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Check off items to track study progress</span>
                </div>

                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {(course.units || []).map((u, i) => {
                    const isDone = completedUnits[u.title];
                    return (
                      <div 
                        key={i} 
                        className="book-card"
                        style={{ flexDirection: "column", gap: "0.5rem", margin: 0, opacity: isDone ? 0.75 : 1 }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                          <div 
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                            onClick={() => toggleUnitDone(u.title)}
                          >
                            {isDone ? (
                              <CheckSquare size={18} color="#10b981" />
                            ) : (
                              <Square size={18} color="var(--text-dim)" />
                            )}
                            <h5 style={{ fontWeight: 700, fontSize: "0.95rem", color: isDone ? "#10b981" : "var(--text-primary)" }}>
                              {u.title}
                            </h5>
                          </div>

                          <button 
                            type="button" 
                            className="unit-dl-icon-btn"
                            onClick={() => onDownloadUnit(course, u.title)}
                            title="Generate PDF notes for this unit"
                          >
                            <Download size={14} />
                          </button>
                        </div>

                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55, paddingLeft: "1.65rem" }}>
                          {u.topics}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Course Outcomes & CO-PO Mapping */}
          {activeTab === "copo" && (
            <div>
              <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Course Outcomes (CO)
              </h4>
              <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.75rem" }}>
                {(course.outcomes || []).map((co, i) => (
                  <div key={i} className="book-card" style={{ margin: 0, padding: "0.75rem 1rem" }}>
                    <span className="code-badge" style={{ minWidth: "55px", textAlign: "center" }}>{co.code}</span>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>
                      {co.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CO-PO Mapping Table */}
              {course.copoMapping && (
                <div>
                  <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    NBA CO-PO & PSO Correlation Matrix
                  </h4>
                  <div style={{ overflowX: "auto", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", padding: "0.75rem", border: "1px solid var(--border-subtle)" }}>
                    <table style={{ width: "100%", fontSize: "0.78125rem", textAlign: "center", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <th style={{ padding: "0.4rem", color: "var(--text-primary)" }}>CO</th>
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                            <th key={n} style={{ padding: "0.4rem", color: "var(--text-dim)" }}>PO{n}</th>
                          ))}
                          <th style={{ padding: "0.4rem", color: "#10b981" }}>PSO1</th>
                          <th style={{ padding: "0.4rem", color: "#10b981" }}>PSO2</th>
                          <th style={{ padding: "0.4rem", color: "#10b981" }}>PSO3</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(course.copoMapping).map(([coKey, poMap]) => (
                          <tr key={coKey} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                            <td style={{ fontWeight: 700, padding: "0.4rem", color: "var(--accent-primary)" }}>{coKey}</td>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                              <td key={n} style={{ padding: "0.4rem", color: poMap[`PO${n}`] ? "var(--text-primary)" : "var(--text-dim)" }}>
                                {poMap[`PO${n}`] || "-"}
                              </td>
                            ))}
                            <td style={{ padding: "0.4rem", fontWeight: 600, color: "#10b981" }}>{poMap["PSO1"] || "-"}</td>
                            <td style={{ padding: "0.4rem", fontWeight: 600, color: "#10b981" }}>{poMap["PSO2"] || "-"}</td>
                            <td style={{ padding: "0.4rem", fontWeight: 600, color: "#10b981" }}>{poMap["PSO3"] || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>
                    Correlation Level: <strong>3</strong> - High, <strong>2</strong> - Medium, <strong>1</strong> - Low.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Lab Experiments */}
          {activeTab === "lab" && hasLab && (
            <div>
              <div style={{ 
                background: "var(--bg-surface-elevated)", 
                padding: "0.85rem 1.15rem", 
                borderRadius: "var(--radius-md)", 
                marginBottom: "1.25rem",
                fontSize: "0.85rem",
                color: "var(--text-secondary)"
              }}>
                🔬 <strong>Laboratory Requirement</strong>: Students are required to develop a working system prototype at the end for higher evaluation weightage.
              </div>

              <div style={{ display: "grid", gap: "0.6rem" }}>
                {course.experiments.map((exp, idx) => (
                  <div key={idx} className="book-card" style={{ margin: 0, padding: "0.85rem 1rem", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <FlaskConical size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>
                        {exp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Textbooks & References */}
          {activeTab === "books" && (
            <div>
              <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Prescribed Textbooks
              </h4>
              <div style={{ display: "grid", gap: "0.6rem", marginBottom: "1.75rem" }}>
                {(course.textbooks || []).map((book, idx) => (
                  <div key={idx} className="book-card" style={{ margin: 0 }}>
                    <div>
                      <div className="book-title">
                        {book.title}
                        {book.edition && (
                          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--accent-primary)", marginLeft: "0.5rem" }}>
                            ({book.edition})
                          </span>
                        )}
                      </div>
                      <div className="book-meta">
                        By {book.author || "Unknown"} • {book.publisher || "Publisher"} {book.year ? `(${book.year})` : ""}
                        {book.isbn && <span> • ISBN: {book.isbn}</span>}
                      </div>
                    </div>

                    {book.link && (
                      <a 
                        href={book.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="book-link-btn"
                      >
                        <span>Search</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* References */}
              {course.references && course.references.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Reference Books
                  </h4>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    {course.references.map((ref, idx) => (
                      <div key={idx} className="book-card" style={{ margin: 0 }}>
                        <div>
                          <div className="book-title" style={{ fontSize: "0.875rem" }}>{ref.title}</div>
                          <div className="book-meta">
                            {ref.author} • {ref.publisher} {ref.year ? `(${ref.year})` : ""}
                          </div>
                        </div>
                        {ref.link && (
                          <a 
                            href={ref.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="book-link-btn"
                          >
                            <span>Find</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: External Resources & Simulators */}
          {activeTab === "external" && hasExt && (
            <div>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {course.externalResources.map((res, idx) => (
                  <div key={idx} className="book-card" style={{ margin: 0, padding: "1rem", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ 
                          fontSize: "0.65rem", 
                          textTransform: "uppercase", 
                          fontWeight: 700, 
                          padding: "0.15rem 0.45rem", 
                          borderRadius: "var(--radius-full)", 
                          background: "var(--bg-surface-elevated)", 
                          color: "var(--accent-primary)" 
                        }}>
                          {res.type}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                          {res.title}
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                        {res.desc}
                      </p>
                    </div>

                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                      style={{ flex: "none", padding: "0.45rem 0.85rem", fontSize: "0.8rem", textDecoration: "none" }}
                    >
                      <span>Open</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ 
          padding: "1rem 1.5rem", 
          borderTop: "1px solid var(--border-subtle)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          background: "var(--bg-surface-elevated)" 
        }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            Accredited Amrita EAC Syllabus (2023–2027)
          </span>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ flex: "none" }}
            onClick={() => onDownloadFull(course)}
          >
            <Download size={16} />
            <span>Download Course Syllabus PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
