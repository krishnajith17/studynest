import React from "react";
import { X, Bookmark, Star, BookOpen, Trash2 } from "lucide-react";

export default function BookmarksDrawer({
  isOpen,
  onClose,
  courses,
  bookmarkedCodes,
  onToggleBookmark,
  onSelectCourse
}) {
  if (!isOpen) return null;

  const bookmarkedCourses = courses.filter(c => bookmarkedCodes.includes(c.code));

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bookmark size={18} color="var(--accent-primary)" />
            <h3 className="modal-title" style={{ fontSize: "1.125rem" }}>
              Pinned Courses ({bookmarkedCourses.length})
            </h3>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {bookmarkedCourses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-dim)" }}>
              <Star size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                No pinned courses yet
              </p>
              <p style={{ fontSize: "0.8125rem" }}>
                Click the star icon on any course card to bookmark your active subjects for quick access.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {bookmarkedCourses.map((course) => (
                <div key={course.code} className="book-card" style={{ margin: 0, flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className="code-badge">{course.code}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Sem {course.semester}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => onToggleBookmark(course.code)}
                      style={{ color: "var(--accent-warning)", padding: "0.2rem" }}
                      title="Remove bookmark"
                    >
                      <Star size={16} fill="currentColor" />
                    </button>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {course.title}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {course.credits} Credits • {course.parts?.length || 0} Modules
                    </span>
                    <button 
                      type="button"
                      className="btn-secondary"
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem" }}
                      onClick={() => {
                        onClose();
                        onSelectCourse(course);
                      }}
                    >
                      <BookOpen size={13} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
