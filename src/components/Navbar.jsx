import React from "react";
import { 
  GraduationCap, 
  Bookmark, 
  History, 
  Sun, 
  Moon, 
  ShieldCheck, 
  KeyRound, 
  LogOut,
  Calculator,
  Compass,
  Award,
  BookOpen,
  Sparkles
} from "lucide-react";
import ThemePalettePicker from "./ThemePalettePicker";

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  palette,
  onSelectPalette,
  bookmarkCount, 
  historyCount, 
  onOpenBookmarks, 
  onOpenHistory, 
  isAdmin, 
  onOpenAdminLogin, 
  onLogoutAdmin,
  activeView,
  onNavigateView,
  onOpenDepartmentModal
}) {
  return (
    <>
      {/* Top Navbar */}
      <header className="navbar">
        <div className="container navbar-inner">
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a 
              href="#home" 
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigateView("browse");
              }}
            >
              <div className="brand-icon-wrap">
                <GraduationCap size={20} strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span className="brand-name">StudyNest</span>
                  <span className="brand-badge">Vivid</span>
                </div>
              </div>
            </a>

            {/* Desktop Primary View Switcher */}
            <nav className="nav-desktop-links" style={{ marginLeft: "0.5rem" }}>
              <button 
                type="button"
                className={`nav-btn ${activeView === "browse" ? "nav-btn-active" : ""}`}
                onClick={() => onNavigateView("browse")}
              >
                <BookOpen size={16} />
                <span>Curriculum</span>
              </button>
              <button 
                type="button"
                className={`nav-btn ${activeView === "sgpa" ? "nav-btn-active" : ""}`}
                onClick={() => onNavigateView("sgpa")}
              >
                <Calculator size={16} />
                <span>SGPA Calc</span>
              </button>
              <button 
                type="button"
                className={`nav-btn ${activeView === "hub" ? "nav-btn-active" : ""}`}
                onClick={() => onNavigateView("hub")}
              >
                <Compass size={16} />
                <span>Learning Hub</span>
              </button>
              <button 
                type="button"
                className="nav-btn"
                onClick={onOpenDepartmentModal}
                title="View EAC Vision, Mission, PEOs and POs"
              >
                <Award size={16} />
                <span>Framework</span>
              </button>
            </nav>
          </div>

          {/* Action buttons */}
          <div className="nav-actions">
            {/* Theme Palette Switcher */}
            <ThemePalettePicker 
              currentPalette={palette} 
              onSelectPalette={onSelectPalette} 
            />

            {/* Bookmarks Toggle */}
            <button 
              type="button"
              className="nav-btn"
              onClick={onOpenBookmarks}
              title="Saved & Pinned Courses"
              aria-label="View bookmarked courses"
            >
              <Bookmark size={16} />
              {bookmarkCount > 0 && (
                <span className="nav-icon-badge">{bookmarkCount}</span>
              )}
            </button>

            {/* Download History Toggle */}
            <button 
              type="button"
              className="nav-btn"
              onClick={onOpenHistory}
              title="Download Logs"
              aria-label="View download history"
            >
              <History size={16} />
              {historyCount > 0 && (
                <span className="nav-icon-badge">{historyCount}</span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button 
              type="button"
              className="nav-btn"
              onClick={onToggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#7c3aed" />}
            </button>

            {/* Admin Control */}
            {isAdmin ? (
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button 
                  type="button"
                  className={`nav-btn ${activeView === "admin" ? "nav-btn-active" : ""}`}
                  onClick={() => onNavigateView("admin")}
                  title="Curriculum Admin Dashboard"
                >
                  <ShieldCheck size={16} color="#10b981" />
                  <span className="desktop-only">Admin</span>
                </button>
                <button 
                  type="button"
                  className="nav-btn"
                  onClick={onLogoutAdmin}
                  title="Exit Admin Session"
                  style={{ padding: "0.5rem" }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                className="nav-btn"
                onClick={onOpenAdminLogin}
                title="Admin Portal Access"
                aria-label="Admin login"
              >
                <KeyRound size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <button 
          type="button"
          className={`mobile-nav-item ${activeView === "browse" ? "active" : ""}`}
          onClick={() => onNavigateView("browse")}
          aria-label="Courses"
        >
          <div className="mobile-nav-icon">
            <BookOpen size={20} />
          </div>
          <span>Curriculum</span>
        </button>

        <button 
          type="button"
          className={`mobile-nav-item ${activeView === "sgpa" ? "active" : ""}`}
          onClick={() => onNavigateView("sgpa")}
          aria-label="SGPA Calculator"
        >
          <div className="mobile-nav-icon">
            <Calculator size={20} />
          </div>
          <span>SGPA</span>
        </button>

        <button 
          type="button"
          className={`mobile-nav-item ${activeView === "hub" ? "active" : ""}`}
          onClick={() => onNavigateView("hub")}
          aria-label="Learning Hub"
        >
          <div className="mobile-nav-icon">
            <Compass size={20} />
          </div>
          <span>Hub</span>
        </button>

        <button 
          type="button"
          className="mobile-nav-item"
          onClick={onOpenDepartmentModal}
          aria-label="Department Framework"
        >
          <div className="mobile-nav-icon">
            <Award size={20} />
          </div>
          <span>Framework</span>
        </button>
      </nav>
    </>
  );
}
