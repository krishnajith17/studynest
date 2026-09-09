import React, { useState } from "react";
import { X, KeyRound, Eye, EyeOff, ShieldAlert, Sparkles } from "lucide-react";

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === "STUDY") {
      setError("");
      setPasscode("");
      onLoginSuccess();
    } else {
      setError("Invalid passcode. Hint: Use 'STUDY'");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "420px" }}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <KeyRound size={18} color="var(--accent-primary)" />
            <h3 className="modal-title" style={{ fontSize: "1.125rem" }}>Curriculum Admin Login</h3>
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

        <form onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Authorized personnel can modify curriculum data, upload study notes, and manage modules.
          </p>

          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label className="form-label" htmlFor="admin-passcode">
              Administrator Passcode
            </label>
            <div style={{ position: "relative" }}>
              <input 
                id="admin-passcode"
                type={showPassword ? "text" : "password"}
                className="form-input"
                style={{ width: "100%", paddingRight: "2.5rem" }}
                placeholder="Enter passcode (e.g. STUDY)..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError("");
                }}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: "absolute", 
                  right: "0.75rem", 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  color: "var(--text-dim)",
                  display: "flex",
                  alignItems: "center"
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.4rem", 
              color: "var(--accent-danger)", 
              fontSize: "0.8125rem", 
              marginBottom: "1rem" 
            }}>
              <ShieldAlert size={15} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
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
              style={{ flex: "none", padding: "0.6rem 1.25rem" }}
            >
              Unlock Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
