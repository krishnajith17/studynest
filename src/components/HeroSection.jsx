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
      <div className="hero-glow-bg"></div>
      <div className="container hero-inner">
        {/* Top pill */}
        <div className="hero-pill">
          <Sparkles size={15} />
          <span>Curriculum 2023–2027 • Amrita Engineering</span>
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Master Your Courses with <br />
          <span className="hero-title-highlight">StudyNest Pro</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Search verified syllabus structures, explore accredited textbooks, and compile instant unit-wise notes, exam question banks, and reference guides.
        </p>

        {/* Search input bar */}
        <div className="search-wrapper">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search by course code, title, author, or unit topic (e.g. 23MAT124, Biomimicry, C programming)..."
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
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
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
