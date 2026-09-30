import React from "react";
import { 
  Bookmark, 
  BookOpen, 
  Download, 
  ArrowUpRight,
  FileText,
  Paperclip
} from "lucide-react";

export default function CourseCard({ 
  course, 
  isBookmarked, 
  onToggleBookmark, 
  onOpenDetails,
  onDownloadUnit,
  onDownloadFull
}) {
  const getCategoryClass = (cat) => {
    switch (cat) {
      case "SCI": return "category-sci";
      case "ENGG": return "category-engg";
      case "HUM": return "category-hum";
      default: return "";
    }
  };

  const fileCount = (course.files?.length || 0) + Object.keys(course.uploadedFiles || {}).length;

  return (
    <article className="course-card">
      {/* Mobbin-Style Visual Showcase Stage (Top Container) */}
      <div className="card-showcase-stage">
        {/* Top Row: Code, Category, Semester & Bookmark */}
        <div className="card-top">
          <div className="badge-row">
            <span className="code-badge">{course.code}</span>
            <span className={`category-tag ${getCategoryClass(course.category)}`}>
              {course.category}
            </span>
            <span className="sem-badge">Sem 0{course.semester}</span>
          </div>

          <button 
            type="button"
            className={`star-btn ${isBookmarked ? "starred" : ""}`}
            onClick={() => onToggleBookmark(course.code)}
            title={isBookmarked ? "Remove from saved courses" : "Save course to bookmarks"}
            aria-label={`Bookmark ${course.title}`}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Interactive Syllabus Flow Preview inside the Showcase Stage */}
        {course.parts && course.parts.length > 0 && (
          <div className="units-container">
            <div className="units-title">
              <span>Syllabus Flows ({course.parts.length})</span>
              <span className="units-instant-tag">1-Click PDF</span>
            </div>
            <div className="unit-pills-list">
              {course.parts.slice(0, 3).map((part, idx) => (
                <div 
                  key={idx} 
                  className="unit-download-item"
                  onClick={() => onDownloadUnit(course, part)}
                  title={`Download study notes for ${part}`}
                >
                  <div className="unit-item-left">
                    <span className="unit-index-pill">0{idx + 1}</span>
                    <span className="unit-item-name">{part}</span>
                  </div>
                  <span className="unit-dl-icon-btn">
                    <Download size={13} />
                  </span>
                </div>
              ))}
              {course.parts.length > 3 && (
                <button 
                  type="button"
                  className="units-more-btn"
                  onClick={() => onOpenDetails(course)}
                >
                  <span>+{course.parts.length - 3} more modules &amp; exam bank</span>
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Editorial Metadata & Actions */}
      <div className="card-body-meta">
        <h3 
          className="course-title" 
          onClick={() => onOpenDetails(course)}
          style={{ cursor: "pointer" }}
        >
          {course.title}
        </h3>

        {/* Credits, L-T-P, Books & Custom Uploaded Files */}
        <div className="course-meta-chips">
          <span className="meta-pill"><strong>{course.credits}</strong> Cr</span>
          <span className="meta-dot">•</span>
          <span className="meta-pill">L-T-P <strong>{course.ltp}</strong></span>
          <span className="meta-dot">•</span>
          <span className="meta-pill"><strong>{course.textbooks?.length || 0}</strong> Books</span>
          {fileCount > 0 && (
            <>
              <span className="meta-dot">•</span>
              <span className="meta-file-badge">
                <Paperclip size={11} />
                <span>{fileCount} File{fileCount > 1 ? "s" : ""}</span>
              </span>
            </>
          )}
        </div>

        {/* Concise Description */}
        <p className="course-desc">{course.description}</p>

        {/* Mobbin Pill Action Footer */}
        <div className="card-footer-actions">
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => onOpenDetails(course)}
          >
            <BookOpen size={15} />
            <span>Explore Syllabus</span>
            <ArrowUpRight size={15} style={{ marginLeft: "auto", opacity: 0.75 }} />
          </button>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => onDownloadFull(course)}
            title="Download Complete Course Guide (PDF)"
            aria-label={`Download full PDF for ${course.code}`}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
