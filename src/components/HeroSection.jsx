import React from "react";
import { Search, X, Sparkles, BookCheck, Layers, Award, GraduationCap } from "lucide-react";

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
  return (
    <section className="hero" id="home">
      {/* Ambient Aurora Orbs */}
      <div className="hero-glow-bg">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>

      <div className="container hero-inner">
        {/* Top pill */}
        <div className="hero-pill">
          <Sparkles size={15} />
          <span>Curriculum 2023–2027 • Vivid Academic Incubator</span>
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Master Your Curriculum with <br />
          <span className="hero-title-highlight">StudyNest Chroma</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Explore complete syllabus units, access accredited textbooks with 1-click links, download formatted academic notes, and calculate your SGPA in vibrant high-definition color.
        </p>

        {/* Search input bar */}
        <div className="search-wrapper">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search course code, title, author, or unit topic (e.g. 23MAT124, Biomimicry, C programming)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn"
                onClick={onClearSearch}
                aria-label="Clear search input"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Semester quick filter chips */}
        <div className="filter-pills-row">
          <button 
            type="button" 
            className={`filter-pill ${selectedSemester === "all" ? "active" : ""}`}
            onClick={() => onSelectSemester("all")}
          >
            All Semesters
          </button>
          <button 
            type="button" 
            className={`filter-pill ${selectedSemester === "1" ? "active" : ""}`}
            onClick={() => onSelectSemester("1")}
          >
            Semester 1
          </button>
          <button 
            type="button" 
            className={`filter-pill ${selectedSemester === "2" ? "active" : ""}`}
            onClick={() => onSelectSemester("2")}
          >
            Semester 2
          </button>
        </div>

        {/* Live Academic Stats */}
        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-number">{totalCourses}</div>
            <div className="stat-label">Core Courses</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{totalUnits}</div>
            <div className="stat-label">Syllabus Units</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{totalBooks}+</div>
            <div className="stat-label">Textbooks & Refs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free & Offline</div>
          </div>
        </div>
      </div>
    </section>
  );
}
