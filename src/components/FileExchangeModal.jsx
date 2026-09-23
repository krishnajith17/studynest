import React, { useState } from "react";
import { 
  X, 
  RefreshCw, 
  Upload, 
  FileText, 
  Check, 
  AlertCircle, 
  ArrowRight,
  FileCheck,
  FolderOpen
} from "lucide-react";

export default function FileExchangeModal({
  file,
  isOpen,
  onClose,
  onConfirmExchange
}) {
  const [replacementFile, setReplacementFile] = useState(null);
  const [title, setTitle] = useState(file?.title || file?.name || "");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !file) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      setErrorMsg("Replacement file exceeds 5MB browser storage limit.");
      return;
    }

    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = (event) => {
      setReplacementFile({
        name: selected.name,
        size: (selected.size / 1024).toFixed(1) + " KB",
        rawBytes: selected.size,
        type: selected.type || "application/octet-stream",
        data: event.target.result
      });
      // Optionally update display title if it was identical to the old file name
      if (!title || title === file.name) {
        setTitle(selected.name);
      }
    };
    reader.readAsDataURL(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replacementFile) {
      setErrorMsg("Please select a new file to exchange with the current one.");
      return;
    }

    const updatedFileObj = {
      ...file,
      name: replacementFile.name,
      size: replacementFile.size,
      rawBytes: replacementFile.rawBytes,
      type: replacementFile.type,
      data: replacementFile.data,
      title: title.trim() || replacementFile.name,
      lastModified: new Date().toISOString(),
      updatedAtFormatted: new Date().toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    onConfirmExchange(file.id || file.name, updatedFileObj);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "560px" }}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "var(--radius-md)", 
              background: "rgba(0, 240, 255, 0.15)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "var(--accent-primary)"
            }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                Exchange / Replace File
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                Swap this document with an updated version without breaking existing links
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "1.25rem 1.5rem" }}>
          {errorMsg && (
            <div style={{ 
              background: "rgba(244, 63, 94, 0.15)", 
              border: "1px solid rgba(244, 63, 94, 0.3)", 
              color: "var(--accent-danger)", 
              padding: "0.6rem 0.9rem", 
              borderRadius: "var(--radius-sm)", 
              marginBottom: "1rem",
              fontSize: "0.825rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem"
            }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Current File Banner */}
          <div style={{ 
            background: "var(--bg-surface-elevated)", 
            border: "1px solid var(--border-subtle)", 
            borderRadius: "var(--radius-md)", 
            padding: "0.85rem 1rem",
            marginBottom: "1.25rem"
          }}>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.4rem" }}>
              Current Active File
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <FileText size={18} color="var(--accent-primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {file.courseCode ? `${file.courseCode} • ` : ""}{file.unitName || "General Handout"} • {file.size}
                  </div>
                </div>
              </div>
              <span className="filter-pill" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
                {file.category || "Notes"}
              </span>
            </div>
          </div>

          {/* Replacement File Picker */}
          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">
              Select Replacement File (PDF, DOCX, PPTX, Images, etc.)
            </label>
            <div style={{
              border: "2px dashed var(--border-card)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem 1rem",
              textAlign: "center",
              background: "var(--bg-surface-subtle)",
              cursor: "pointer",
              transition: "border-color 0.2s ease"
            }} onClick={() => document.getElementById("exchange-file-input").click()}>
              <input 
                id="exchange-file-input"
                type="file" 
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div style={{ 
                width: "42px", 
                height: "42px", 
                borderRadius: "var(--radius-full)", 
                background: "rgba(0, 240, 255, 0.1)",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 0.75rem",
                color: "var(--accent-primary)"
              }}>
                <Upload size={20} />
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                {replacementFile ? "File Selected — Click to Change" : "Click to Browse Replacement File"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Max file size: 5MB • Instant browser storage
              </div>
            </div>
          </div>

          {/* Comparison / Preview if replacement selected */}
          {replacementFile && (
            <div style={{ 
              background: "rgba(16, 185, 129, 0.08)", 
              border: "1px solid rgba(16, 185, 129, 0.25)", 
              borderRadius: "var(--radius-md)", 
              padding: "0.85rem 1rem",
              marginBottom: "1.25rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#10b981", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                <FileCheck size={16} />
                <span>Ready to Swap:</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{replacementFile.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{replacementFile.size}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                  <span>{file.size}</span>
                  <ArrowRight size={13} />
                  <span style={{ color: "#10b981" }}>{replacementFile.size}</span>
                </div>
              </div>
            </div>
          )}

          {/* Display Label / Title */}
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Display Title / Material Description</label>
            <input 
              type="text" 
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 1 Revised Complete Handout"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!replacementFile}
              style={{ flex: "none", padding: "0.6rem 1.4rem", opacity: replacementFile ? 1 : 0.6 }}
            >
              <RefreshCw size={15} />
              <span>Confirm & Swap File</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
