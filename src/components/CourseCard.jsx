import React from "react";
import { 
  Star, 
  BookOpen, 
  Download, 
  Layers, 
  ExternalLink,
  ChevronRight,
  FileText
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

  return (
    <div className="course-card">
      <div>
        {/* Top Badges & Bookmark */}
        <div className="card-top">
          <div className="badge-row">
            <span className="code-badge">{course.code}</span>
            <span className={`category-tag ${getCategoryClass(course.category)}`}>
              {course.category}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 600 }}>
              Sem {course.semester}
            </span>
          </div>

          <button 
            type="button"
            className={`star-btn ${isBookmarked ? "starred" : ""}`}
            onClick={() => onToggleBookmark(course.code)}
            title={isBookmarked ? "Remove from pinned courses" : "Pin this course to bookmarks"}
            aria-label={`Bookmark ${course.title}`}
          >
            <Star size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title */}
        <h3 className="course-title">{course.title}</h3>

        {/* Credits & LTP */}
        <div className="course-meta-chips">
          <span><strong>{course.credits}</strong> Credits</span>
          <span>•</span>
          <span>L-T-P: <strong>{course.ltp}</strong></span>
          <span>•</span>
          <span><strong>{course.textbooks?.length || 0}</strong> Books</span>
        </div>

        {/* Description */}
        <p className="course-desc">{course.description}</p>

        {/* Units / Syllabus Preview */}
        {course.parts && course.parts.length > 0 && (
          <div className="units-container">
            <div className="units-title">
              <span>Syllabus Modules ({course.parts.length})</span>
              <span style={{ fontSize: "0.7rem", color: "var(--accent-primary)" }}>Instant PDF</span>
            </div>
            <div className="unit-pills-list">
              {course.parts.slice(0, 3).map((part, idx) => (
                <div 
                  key={idx} 
                  className="unit-download-item"
                  onClick={() => onDownloadUnit(course, part)}
                  title={`Download study material for ${part}`}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "88%" }}>
                    {part}
                  </span>
                  <span className="unit-dl-icon-btn">
                    <Download size={13} />
                  </span>
                </div>
              ))}
              {course.parts.length > 3 && (
                <div 
                  style={{ 
                    fontSize: "0.75rem", 
                    color: "var(--accent-primary)", 
                    cursor: "pointer", 
                    padding: "0.2rem 0.4rem", 
                    fontWeight: 600 
                  }}
                  onClick={() => onOpenDetails(course)}
                >
                  +{course.parts.length - 3} more modules & questions →
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="card-footer-actions">
        <button 
          type="button" 
          className="btn-primary"
          onClick={() => onOpenDetails(course)}
        >
          <BookOpen size={16} />
          <span>Syllabus & Books</span>
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
  );
}
