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
  FileDown,
  Layers
} from "lucide-react";
import ThemePalettePicker from "./ThemePalettePicker";
import { generateProjectPresentationPDF } from "../utils/pdfGenerator";

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
      {/* Mobbin-Style Floating Pill Navigation Bar */}
      <header className="navbar">
        <div className="navbar-pill">
          {/* Left: Brand Identity */}
          <div className="navbar-brand-group">
            <a 
              href="#home" 
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigateView("browse");
              }}
            >
              <div className="brand-icon-wrap" aria-hidden="true">
                <Layers size={18} strokeWidth={2.5} />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">StudyNest</span>
                <span className="brand-badge">EAC</span>
              </div>
            </a>
          </div>

          {/* Center: Mobbin Segmented Pill Navigation */}
          <nav className="nav-desktop-links" aria-label="Main Navigation">
            <button 
              type="button"
              className={`nav-btn ${activeView === "browse" ? "nav-btn-active" : ""}`}
              onClick={() => onNavigateView("browse")}
            >
              <BookOpen size={15} />
              <span>Courses</span>
            </button>
            <button 
              type="button"
              className={`nav-btn ${activeView === "sgpa" ? "nav-btn-active" : ""}`}
              onClick={() => onNavigateView("sgpa")}
            >
              <Calculator size={15} />
              <span>SGPA</span>
            </button>
            <button 
              type="button"
              className={`nav-btn ${activeView === "hub" ? "nav-btn-active" : ""}`}
              onClick={() => onNavigateView("hub")}
            >
              <Compass size={15} />
              <span>Learning Hub</span>
            </button>
            <button 
              type="button"
              className="nav-btn"
              onClick={onOpenDepartmentModal}
              title="View Amrita EAC Vision, Mission, PEOs and POs"
            >
              <Award size={15} />
              <span>Framework</span>
            </button>
            <button 
              type="button"
              className="nav-btn nav-btn-accent"
              onClick={generateProjectPresentationPDF}
              title="Download Classroom Project Presentation PDF"
            >
              <FileDown size={15} />
              <span>Deck PDF</span>
            </button>
          </nav>

          {/* Right: Utility & Theme Controls */}
          <div className="nav-actions">
            {/* Theme Palette Switcher */}
            <ThemePalettePicker 
              currentPalette={palette} 
              onSelectPalette={onSelectPalette} 
            />

            {/* Bookmarks Toggle */}
            <button 
              type="button"
              className="nav-icon-btn"
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
              className="nav-icon-btn"
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
              className="nav-icon-btn"
              onClick={onToggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Admin Control */}
            {isAdmin ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <button 
                  type="button"
                  className={`nav-btn ${activeView === "admin" ? "nav-btn-active" : ""}`}
                  onClick={() => onNavigateView("admin")}
                  title="Curriculum & File Manager Admin Dashboard"
                  style={{ padding: "0.4rem 0.75rem" }}
                >
                  <ShieldCheck size={15} color="#10b981" />
                  <span className="desktop-only">Admin</span>
                </button>
                <button 
                  type="button"
                  className="nav-icon-btn"
                  onClick={onLogoutAdmin}
                  title="Exit Admin Session"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                className="nav-cta-pill"
                onClick={onOpenAdminLogin}
                title="Admin Portal & File Upload/Exchange"
                aria-label="Admin login"
              >
                <KeyRound size={14} />
                <span className="desktop-only">Admin</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Floating Pill Dock */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <button 
          type="button"
          className={`mobile-nav-item ${activeView === "browse" ? "active" : ""}`}
          onClick={() => onNavigateView("browse")}
          aria-label="Courses"
        >
          <div className="mobile-nav-icon">
            <BookOpen size={19} />
          </div>
          <span>Courses</span>
        </button>

        <button 
          type="button"
          className={`mobile-nav-item ${activeView === "sgpa" ? "active" : ""}`}
          onClick={() => onNavigateView("sgpa")}
          aria-label="SGPA Calculator"
        >
          <div className="mobile-nav-icon">
            <Calculator size={19} />
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
            <Compass size={19} />
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
            <Award size={19} />
          </div>
          <span>Framework</span>
        </button>
      </nav>
    </>
  );
}
