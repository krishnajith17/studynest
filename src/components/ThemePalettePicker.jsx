import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";

export const PALETTES = [
  {
    id: "aurora",
    name: "Electric Aurora",
    tagline: "Cyber Cyan & Electric Violet",
    dots: ["#00f0ff", "#8b5cf6", "#10b981"]
  },
  {
    id: "sunset",
    name: "Sunset Radiance",
    tagline: "Solar Coral & Amber Glow",
    dots: ["#ff5722", "#f59e0b", "#ec4899"]
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
    tagline: "Radiant Emerald & Seafoam",
    dots: ["#10b981", "#06b6d4", "#84cc16"]
  },
  {
    id: "amethyst",
    name: "Cosmic Amethyst",
    tagline: "Galactic Orchid & Sun Gold",
    dots: ["#c084fc", "#d946ef", "#facc15"]
  }
];

export default function ThemePalettePicker({ currentPalette, onSelectPalette }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeThemeObj = PALETTES.find(p => p.id === currentPalette) || PALETTES[0];

  // Close dropdown on click outside
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
        title="Change Vibrant Color Theme"
        aria-label="Color Palette Switcher"
      >
        <div className="palette-preview-dots">
          {activeThemeObj.dots.map((color, i) => (
            <span 
              key={i} 
              className="palette-preview-dot" 
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
          ))}
        </div>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
          {activeThemeObj.name.split(" ")[0]}
        </span>
      </button>

      {isOpen && (
        <div 
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "min(280px, calc(100vw - 24px))",
            maxWidth: "92vw",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-card)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-hover)",
            padding: "0.75rem",
            animation: "scaleUp 180ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.5rem 0.65rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.5rem" }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Vibrant Color Palettes
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
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
                    padding: "0.55rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: isSelected ? "var(--bg-surface-subtle)" : "transparent",
                    border: isSelected ? "1px solid var(--border-card)" : "1px solid transparent",
                    textAlign: "left",
                    transition: "all var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "var(--bg-surface-elevated)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {palette.dots.map((c, idx) => (
                        <span 
                          key={idx} 
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: c,
                            boxShadow: `0 0 8px ${c}`
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: isSelected ? "var(--accent-primary)" : "var(--text-primary)" }}>
                        {palette.name}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        {palette.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={16} color="var(--accent-primary)" strokeWidth={3} />
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
