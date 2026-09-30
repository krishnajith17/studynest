import React from "react";
import { SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import { CATEGORIES } from "../data/courses";

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  matchCount,
  totalCount,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="filter-bar-container">
      {/* Left: Mobbin-Style Horizontal Category Filter Chips */}
      <div className="filter-chips-scroll" role="tablist" aria-label="Course Categories">
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.ALL ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.ALL)}
        >
          All Categories
        </button>
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.SCI ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.SCI)}
        >
          Sciences &amp; Math · SCI
        </button>
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.ENGG ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.ENGG)}
        >
          Engineering · ENGG
        </button>
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.HUM ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.HUM)}
        >
          Humanities · HUM
        </button>
      </div>

      {/* Right: Results Count, Sort Pill & Reset */}
      <div className="filter-right-controls">
        <span className="filter-count-label">
          Showing <strong>{matchCount}</strong> of {totalCount}
        </span>

        <div className="sort-pill-wrap">
          <SlidersHorizontal size={13} className="sort-icon" />
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort courses"
          >
            <option value="code">Sort: Course Code</option>
            <option value="title">Sort: Title (A–Z)</option>
            <option value="credits-desc">Sort: Highest Credits</option>
            <option value="semester">Sort: Semester</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button 
            type="button" 
            className="filter-reset-pill"
            onClick={onResetFilters}
            title="Reset all search queries and filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
