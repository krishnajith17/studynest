import React from "react";
import { Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
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
    <div className="controls-bar">
      {/* Category Pills */}
      <div className="filter-group">
        <span className="filter-label">
          <Filter size={15} style={{ verticalAlign: "middle", marginRight: "0.25rem" }} />
          Category:
        </span>
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
          Sciences & Math (SCI)
        </button>
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.ENGG ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.ENGG)}
        >
          Engineering (ENGG)
        </button>
        <button 
          type="button" 
          className={`filter-pill ${selectedCategory === CATEGORIES.HUM ? "active" : ""}`}
          onClick={() => onSelectCategory(CATEGORIES.HUM)}
        >
          Humanities (HUM)
        </button>
      </div>

      {/* Right controls: Results count & Sort */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontWeight: 500 }}>
          Showing <strong>{matchCount}</strong> of {totalCount} courses
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SlidersHorizontal size={14} color="var(--text-dim)" />
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort courses"
          >
            <option value="code">Sort by Course Code</option>
            <option value="title">Sort by Title (A-Z)</option>
            <option value="credits-desc">Highest Credits First</option>
            <option value="semester">Sort by Semester</option>
          </select>

          {hasActiveFilters && (
            <button 
              type="button" 
              className="btn-secondary"
              style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
              onClick={onResetFilters}
              title="Reset all search queries and filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
