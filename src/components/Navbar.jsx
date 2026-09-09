import React from "react";
import { 
  GraduationCap, 
  Bookmark, 
  History, 
  Sun, 
  Moon, 
  ShieldCheck, 
  KeyRound, 
  LogOut 
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
  onNavigateView
}) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
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
          <span className="brand-name">StudyNest</span>
          <span className="brand-badge">Pro</span>
        </a>

        {/* Action buttons */}
        <div className="nav-actions">
          {/* Bookmarks Toggle */}
          <button 
            type="button"
            className={`nav-btn ${activeView === "bookmarks" ? "nav-btn-active" : ""}`}
            onClick={onOpenBookmarks}
            title="Saved & Pinned Courses"
            aria-label="View bookmarked courses"
          >
            <Bookmark size={17} />
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
            <History size={17} />
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
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
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
                <ShieldCheck size={17} color="#10b981" />
                <span className="nav-btn-text">Admin</span>
              </button>
              <button 
                type="button"
                className="nav-btn"
                onClick={onLogoutAdmin}
                title="Exit Admin Session"
                style={{ padding: "0.5rem" }}
              >
                <LogOut size={16} />
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
              <KeyRound size={17} />
              <span className="nav-btn-text">Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
