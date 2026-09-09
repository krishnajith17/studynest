import React from "react";
import { 
  X, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Star,
  Globe
} from "lucide-react";

export default function CourseDetailModal({
  course,
  isBookmarked,
  onToggleBookmark,
  onClose,
  onDownloadUnit,
  onDownloadFull
}) {
  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "780px" }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span className="code-badge" style={{ fontSize: "0.95rem" }}>{course.code}</span>
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

        {/* Modal Body */}
        <div className="modal-body">
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
            {course.title}
          </h2>

          {/* Description / Scope */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.4rem" }}>
              Course Syllabus Scope
            </h4>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {course.description}
            </p>
          </div>

          {/* Units / Modules */}
          {course.parts && course.parts.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700 }}>
                  Modules & Examination Resources ({course.parts.length})
                </h4>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Click to generate notes PDF</span>
              </div>

              <div style={{ display: "grid", gap: "0.5rem" }}>
                {course.parts.map((part, index) => {
                  const hasCustomFile = course.uploadedFiles && course.uploadedFiles[part];
                  return (
                    <div 
                      key={index} 
                      className="book-card"
                      style={{ alignItems: "center", cursor: "pointer", margin: 0 }}
                      onClick={() => onDownloadUnit(course, part)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ 
                          width: "2rem", 
                          height: "2rem", 
                          borderRadius: "var(--radius-sm)", 
                          background: "var(--bg-surface-elevated)", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: "var(--accent-primary)",
                          fontWeight: 700,
                          fontSize: "0.8125rem"
                        }}>
                          {index + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                            {part}
                          </div>
                          {hasCustomFile && (
                            <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>
                              Custom File: {hasCustomFile.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="btn-secondary" 
                        style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownloadUnit(course, part);
                        }}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended Textbooks */}
          {course.textbooks && course.textbooks.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Accredited Textbooks ({course.textbooks.length})
              </h4>
              <div style={{ display: "grid", gap: "0.6rem" }}>
                {course.textbooks.map((book, idx) => (
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
                        By {book.author || "Unknown"} • {book.publisher || "Academic Publisher"} {book.year ? `(${book.year})` : ""}
                        {book.isbn && <span> • ISBN: {book.isbn}</span>}
                      </div>
                    </div>

                    {book.link && (
                      <a 
                        href={book.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="book-link-btn"
                        title="Search / purchase on Google Books or web"
                      >
                        <span>Search</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {course.references && course.references.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Reference Literature ({course.references.length})
              </h4>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {course.references.map((ref, idx) => (
                  <div key={idx} className="book-card" style={{ margin: 0 }}>
                    <div>
                      <div className="book-title" style={{ fontSize: "0.875rem" }}>{ref.title}</div>
                      <div className="book-meta">
                        {ref.author || "Author"} • {ref.publisher || "Publisher"} {ref.year ? `(${ref.year})` : ""}
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

          {/* Additional Resources (e.g. TED, AskNature) */}
          {course.additionalResources && course.additionalResources.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Digital & Web Resources
              </h4>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {course.additionalResources.map((res, idx) => (
                  <a 
                    key={idx}
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="book-link-btn"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.8125rem" }}
                  >
                    <Globe size={14} />
                    <span>{res.label}</span>
                    <ExternalLink size={12} />
                  </a>
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
            Need offline access?
          </span>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ flex: "none" }}
            onClick={() => onDownloadFull(course)}
          >
            <Download size={16} />
            <span>Download Full Course Guide PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
