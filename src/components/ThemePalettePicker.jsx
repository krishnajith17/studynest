import React, { useState, useRef, useEffect } from "react";
import { Check, Sparkles } from "lucide-react";

export const PALETTES = [
  {
    id: "aurora",
    name: "Mobbin Studio",
    tagline: "High-Contrast Ink & Electric Blue",
    dots: ["#0065ff", "#141414", "#00f0ff"]
  },
  {
    id: "sunset",
    name: "Sunset Radiance",
    tagline: "Flame Orange & Warm Amber",
    dots: ["#ff540b", "#f59e0b", "#ec4899"]
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    tagline: "Laser Rose & Hyper Cyan",
    dots: ["#f43f5e", "#06b6d4", "#a3e635"]
  },
  {
    id: "emerald",
    name: "Emerald Oasis",
    tagline: "Mobbin Green & Mint Teal",
    dots: ["#10b981", "#3ba213", "#06b6d4"]
  },
  {
    id: "amethyst",
    name: "Cosmic Amethyst",
    tagline: "Studio Violet & Gold",
    dots: ["#a855f7", "#d946ef", "#facc15"]
  }
];

export default function ThemePalettePicker({ currentPalette, onSelectPalette }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeThemeObj = PALETTES.find(p => p.id === currentPalette) || PALETTES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button 
        type="button" 
        className="palette-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Switch Studio Accent Theme"
        aria-label="Color Palette Switcher"
      >
        <div className="palette-preview-dots">
          {activeThemeObj.dots.map((color, i) => (
            <span 
              key={i} 
              className="palette-preview-dot" 
              style={{ background: color }}
            />
          ))}
        </div>
        <span className="desktop-only" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
          {activeThemeObj.name.split(" ")[0]}
        </span>
      </button>

      {isOpen && (
        <div 
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            width: "min(275px, calc(100vw - 24px))",
            maxWidth: "92vw",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-card)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-hover)",
            padding: "0.65rem",
            zIndex: 250,
            animation: "scaleUp 160ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.35rem 0.5rem 0.55rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.4rem" }}>
            <Sparkles size={14} color="var(--accent-primary)" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Studio Accent Theme
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {PALETTES.map((palette) => {
              const isSelected = palette.id === currentPalette;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => {
                    onSelectPalette(palette.id);
                    setIsOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.7rem",
                    borderRadius: "12px",
                    background: isSelected ? "var(--bg-surface-elevated)" : "transparent",
                    border: isSelected ? "1px solid var(--border-card)" : "1px solid transparent",
                    textAlign: "left",
                    transition: "all var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "var(--bg-surface-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {palette.dots.map((c, idx) => (
                        <span 
                          key={idx} 
                          style={{
                            width: "9px",
                            height: "9px",
                            borderRadius: "50%",
                            background: c,
                            border: "1px solid rgba(255,255,255,0.15)"
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {palette.name}
                      </div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                        {palette.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={15} color="var(--accent-primary)" strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
