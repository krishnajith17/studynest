import React, { useEffect, useRef } from "react";
import { Search, X, Sparkles, ArrowUpRight, Layers, BookOpen, FileText, Command } from "lucide-react";

const QUICK_SEARCH_TAGS = [
  "23MAT124",
  "23ECE101",
  "C Programming",
  "Biomimicry",
  "Linear Algebra",
  "Digital Electronics"
];

export default function HeroSection({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch,
  totalCourses,
  totalUnits,
  totalBooks,
  selectedSemester,
  onSelectSemester
}) {
  const inputRef = useRef(null);

  // Support ⌘K / Ctrl+K keyboard shortcut to focus search bar (Mobbin signature UX)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (searchQuery) {
          onClearSearch();
        } else {
          inputRef.current?.blur();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery, onClearSearch]);

  return (
    <section className="hero" id="home">
      {/* Subtle Ambient Studio Glow */}
      <div className="hero-glow-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
      </div>

      <div className="container hero-inner">
        {/* Mobbin-style Top Announcement Pill */}
        <div className="hero-announcement">
          <span className="hero-announcement-tag">NEW</span>
          <span className="hero-announcement-text">
            Amrita Vishwa Vidyapeetham • B.Tech EAC 2023–2027 Library
          </span>
          <ArrowUpRight size={14} className="hero-announcement-arrow" />
        </div>

        {/* Mobbin Editorial Display Headline */}
        <h1 className="hero-title">
          Discover curated <span className="hero-title-highlight">Amrita EAC</span>{" "}
          courses, syllabus flows &amp; study references.
        </h1>

        {/* Subtitle with inline metric highlights */}
        <p className="hero-subtitle">
          Featuring <strong className="hero-metric-inline">{totalCourses} accredited courses</strong>,{" "}
          <strong className="hero-metric-inline">{totalUnits} downloadable unit modules</strong>, and{" "}
          <strong className="hero-metric-inline">{totalBooks}+ reference textbooks</strong> — built for fast, zero-friction exam preparation.
        </p>

        {/* Mobbin Command-K Search Bar */}
        <div className="search-wrapper">
          <div className="search-input-group">
            <Search className="search-icon" size={19} strokeWidth={2.2} />
            <input 
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search courses, syllabus units, textbooks, or codes (e.g. 23MAT124)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search curriculum"
            />
            {searchQuery ? (
              <button 
                type="button" 
                className="search-clear-btn"
                onClick={onClearSearch}
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            ) : (
              <div className="search-kbd-badge" title="Press Ctrl+K or ⌘K to search">
                <span>⌘K</span>
              </div>
            )}
          </div>

          {/* Quick Trending Search Chips */}
          <div className="quick-tags-row">
            <span className="quick-tags-label">Trending:</span>
            {QUICK_SEARCH_TAGS.map((tag) => {
              const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  className={`quick-tag-chip ${isActive ? "active" : ""}`}
                  onClick={() => onSearchChange(isActive ? "" : tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobbin Platform-Style Segmented Semester Switcher + Metric Strip */}
        <div className="hero-controls-bar">
          <div className="segmented-track" role="tablist" aria-label="Semester Filter">
            <button 
              type="button" 
              role="tab"
              aria-selected={selectedSemester === "1"}
              className={`segmented-pill ${selectedSemester === "1" ? "active" : ""}`}
              onClick={() => onSelectSemester("1")}
            >
              Semester 1
            </button>
            <button 
              type="button" 
              role="tab"
              aria-selected={selectedSemester === "2"}
              className={`segmented-pill ${selectedSemester === "2" ? "active" : ""}`}
              onClick={() => onSelectSemester("2")}
            >
              Semester 2
            </button>
            <button 
              type="button" 
              role="tab"
              aria-selected={selectedSemester === "all"}
              className={`segmented-pill ${selectedSemester === "all" ? "active" : ""}`}
              onClick={() => onSelectSemester("all")}
            >
              All Semesters
            </button>
          </div>

          {/* Compact Mobbin Stat Pills */}
          <div className="hero-stat-pills">
            <div className="hero-stat-pill">
              <Layers size={14} />
              <span><strong>{totalCourses}</strong> Courses</span>
            </div>
            <div className="hero-stat-pill">
              <FileText size={14} />
              <span><strong>{totalUnits}</strong> Unit PDFs</span>
            </div>
            <div className="hero-stat-pill">
              <BookOpen size={14} />
              <span><strong>{totalBooks}+</strong> Books</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
