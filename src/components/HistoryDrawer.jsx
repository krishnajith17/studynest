import React from "react";
import { X, History, Trash2, Download, FileText } from "lucide-react";

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onReDownload
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <History size={18} color="var(--accent-primary)" />
            <h3 className="modal-title" style={{ fontSize: "1.125rem" }}>Download History</h3>
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
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-dim)" }}>
              <History size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                No downloads yet
              </p>
              <p style={{ fontSize: "0.8125rem" }}>
                Generated PDFs and study materials will appear here for easy re-downloading.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {history.map((item, idx) => (
                <div key={idx} className="book-card" style={{ margin: 0, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ 
                      width: "2.25rem", 
                      height: "2.25rem", 
                      borderRadius: "var(--radius-sm)", 
                      background: "var(--bg-surface-elevated)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "var(--accent-primary)"
                    }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                        {item.courseCode} – {item.partName || "Full Syllabus"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {item.timestamp}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="unit-dl-icon-btn"
                    onClick={() => onReDownload(item)}
                    title="Download again"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "flex-end" }}>
            <button 
              type="button"
              className="btn-secondary"
              style={{ fontSize: "0.8125rem", padding: "0.4rem 0.85rem", color: "var(--accent-danger)" }}
              onClick={onClearHistory}
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
