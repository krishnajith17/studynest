import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialCourses, CATEGORIES } from "./data/courses";
import { generateCoursePDF } from "./utils/pdfGenerator";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilterBar from "./components/FilterBar";
import CourseCard from "./components/CourseCard";
import CourseDetailModal from "./components/CourseDetailModal";
import DownloadModal from "./components/DownloadModal";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminPanel from "./components/AdminPanel";
import HistoryDrawer from "./components/HistoryDrawer";
import BookmarksDrawer from "./components/BookmarksDrawer";
import Footer from "./components/Footer";

export default function App() {
  /* ── Persistence ── */
  const [courses, setCourses] = useLocalStorage("studynest_pro_courses", initialCourses);
  const [bookmarks, setBookmarks] = useLocalStorage("studynest_pro_bookmarks", ["23MAT124", "23ECE101"]);
  const [history, setHistory] = useLocalStorage("studynest_pro_history", []);
  const [theme, setTheme] = useLocalStorage("studynest_theme", "dark");

  /* ── UI / Filter States ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [sortBy, setSortBy] = useState("code");
  const [activeView, setActiveView] = useState("browse"); // "browse" or "admin"

  /* ── Modals & Drawers ── */
  const [detailCourse, setDetailCourse] = useState(null);
  const [downloadState, setDownloadState] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /* ── Synchronize Theme with Document Root ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  /* ── Stats Calculations ── */
  const stats = useMemo(() => {
    const totalCourses = courses.length;
    let totalUnits = 0;
    let totalBooks = 0;

    courses.forEach((c) => {
      totalUnits += c.parts?.length || 0;
      totalBooks += (c.textbooks?.length || 0) + (c.references?.length || 0);
    });

    return { totalCourses, totalUnits, totalBooks };
  }, [courses]);

  /* ── Bookmark Toggle ── */
  const toggleBookmark = useCallback((code) => {
    setBookmarks((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }, [setBookmarks]);

  /* ── Filtered and Sorted Courses ── */
  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = courses.filter((course) => {
      const matchSearch =
        !q ||
        course.code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.parts?.some((p) => p.toLowerCase().includes(q)) ||
        course.textbooks?.some(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.author?.toLowerCase().includes(q)
        );

      const matchSemester =
        selectedSemester === "all" ||
        course.semester.toString() === selectedSemester;

      const matchCategory =
        selectedCategory === CATEGORIES.ALL ||
        course.category === selectedCategory;

      return matchSearch && matchSemester && matchCategory;
    });

    // Sorting
    return matches.sort((a, b) => {
      if (sortBy === "code") return a.code.localeCompare(b.code);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "credits-desc") return b.credits - a.credits;
      if (sortBy === "semester") return a.semester - b.semester;
      return 0;
    });
  }, [courses, searchQuery, selectedSemester, selectedCategory, sortBy]);

  /* ── Download Handler ── */
  const handleStartDownload = useCallback((course, partName = null) => {
    setDownloadState({ course, partName });
  }, []);

  const handleDownloadExecution = useCallback(
    (course, partName) => {
      // Check if custom uploaded file exists
      if (partName && course.uploadedFiles && course.uploadedFiles[partName]) {
        const customFile = course.uploadedFiles[partName];
        const link = document.createElement("a");
        link.href = customFile.data;
        link.download =
          customFile.name ||
          `${course.code}_${partName.replace(/\s+/g, "_")}.pdf`;
        link.click();
      } else {
        // Generate formatted multi-page PDF
        generateCoursePDF(course, partName);
      }

      // Record in History
      const now = new Date();
      const historyItem = {
        id: Date.now().toString(),
        courseCode: course.code,
        courseTitle: course.title,
        partName: partName || "Full Course Guide",
        timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • ${now.toLocaleDateString([], { month: 'short', day: 'numeric' })}`,
      };

      setHistory((prev) => [historyItem, ...prev.slice(0, 30)]);
    },
    [setHistory]
  );

  const handleReDownload = (item) => {
    const course = courses.find((c) => c.code === item.courseCode);
    if (course) {
      handleStartDownload(
        course,
        item.partName === "Full Course Guide" ? null : item.partName
      );
    } else {
      alert("This course is no longer in the active curriculum.");
    }
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSemester !== "all" ||
    selectedCategory !== CATEGORIES.ALL;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSemester("all");
    setSelectedCategory(CATEGORIES.ALL);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Global Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        bookmarkCount={bookmarks.length}
        historyCount={history.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          setActiveView("browse");
        }}
        activeView={activeView}
        onNavigateView={setActiveView}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeView === "admin" ? (
          <AdminPanel
            courses={courses}
            onSaveCourses={setCourses}
            onResetToDefaults={() => setCourses(initialCourses)}
            onBackToBrowse={() => setActiveView("browse")}
          />
        ) : (
          <>
            {/* Hero Banner with Search and Stats */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery("")}
              totalCourses={stats.totalCourses}
              totalUnits={stats.totalUnits}
              totalBooks={stats.totalBooks}
              selectedSemester={selectedSemester}
              onSelectSemester={setSelectedSemester}
            />

            {/* Courses Catalogue Section */}
            <div className="container">
              <FilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                matchCount={filteredCourses.length}
                totalCount={courses.length}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
              />

              {/* Course Cards Grid */}
              {filteredCourses.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 1rem",
                    background: "var(--bg-surface)",
                    border: "1px dashed var(--border-card)",
                    borderRadius: "var(--radius-xl)",
                    marginBottom: "3rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    No matching courses found
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                    Try searching with broader terms or reset your filters.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ flex: "none" }}
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="course-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.code}
                      course={course}
                      isBookmarked={bookmarks.includes(course.code)}
                      onToggleBookmark={toggleBookmark}
                      onOpenDetails={setDetailCourse}
                      onDownloadUnit={(c, p) => handleStartDownload(c, p)}
                      onDownloadFull={(c) => handleStartDownload(c, null)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Course Detail Modal */}
      {detailCourse && (
        <CourseDetailModal
          course={detailCourse}
          isBookmarked={bookmarks.includes(detailCourse.code)}
          onToggleBookmark={toggleBookmark}
          onClose={() => setDetailCourse(null)}
          onDownloadUnit={(c, p) => handleStartDownload(c, p)}
          onDownloadFull={(c) => handleStartDownload(c, null)}
        />
      )}

      {/* Animated Download Modal */}
      {downloadState && (
        <DownloadModal
          downloadState={downloadState}
          onClose={() => setDownloadState(null)}
          onComplete={handleDownloadExecution}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsAdminLoginOpen(false);
          setActiveView("admin");
        }}
      />

      {/* Recent History Slide-over */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => setHistory([])}
        onReDownload={handleReDownload}
      />

      {/* Bookmarks Slide-over */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        courses={courses}
        bookmarkedCodes={bookmarks}
        onToggleBookmark={toggleBookmark}
        onSelectCourse={(course) => setDetailCourse(course)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
