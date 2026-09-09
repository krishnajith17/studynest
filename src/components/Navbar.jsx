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
  BookOpen
} from "lucide-react";

export default function Navbar({ 
  theme, 
  onToggleTheme, 
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
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a 
            href="#home" 
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              onNavigateView("browse");
            }}
          >
            <div className="brand-icon-wrap">
              <GraduationCap size={22} strokeWidth={2.4} />
            </div>
            <span className="brand-name">Amrita EAC</span>
            <span className="brand-badge">Sem 1</span>
          </a>

          {/* Primary View Switcher */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.35rem" }} className="nav-desktop-links">
            <button 
              type="button"
              className={`nav-btn ${activeView === "browse" ? "nav-btn-active" : ""}`}
              onClick={() => onNavigateView("browse")}
            >
              <BookOpen size={16} />
              <span>Courses</span>
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
          {/* Bookmarks Toggle */}
          <button 
            type="button"
            className="nav-btn"
            onClick={onOpenBookmarks}
            title="Saved & Pinned Courses"
            aria-label="View bookmarked courses"
          >
            <Bookmark size={16} />
            <span className="nav-btn-text">Pinned</span>
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
            <span className="nav-btn-text">History</span>
            {historyCount > 0 && (
              <span className="nav-icon-badge">{historyCount}</span>
            )}
          </button>

          {/* Theme Toggle */}
          <button 
            type="button"
            className="nav-btn"
            onClick={onToggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin Control */}
          {isAdmin ? (
            <div style={{ display: "flex", gap: "0.35rem" }}>
              <button 
                type="button"
                className={`nav-btn ${activeView === "admin" ? "nav-btn-active" : ""}`}
                onClick={() => onNavigateView("admin")}
                title="Curriculum Admin Dashboard"
              >
                <ShieldCheck size={16} color="#10b981" />
                <span className="nav-btn-text">Admin</span>
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
              <span className="nav-btn-text">Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
