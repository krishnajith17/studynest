import React, { useState, useMemo } from "react";
import { Calculator, Award, RotateCcw, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

const GRADE_POINTS = {
  "O": { points: 10.0, label: "O (Outstanding - 10)" },
  "A+": { points: 9.5, label: "A+ (Excellent - 9.5)" },
  "A": { points: 9.0, label: "A (Very Good - 9.0)" },
  "B+": { points: 8.0, label: "B+ (Good - 8.0)" },
  "B": { points: 7.0, label: "B (Above Average - 7.0)" },
  "C": { points: 6.0, label: "C (Average - 6.0)" },
  "P": { points: 5.0, label: "P (Pass - 5.0)" },
  "F": { points: 0.0, label: "F (Fail - 0)" }
};

export default function SgpaCalculator({ courses }) {
  // Pre-populate with all Semester 1 courses
  const sem1Courses = useMemo(() => {
    return courses.filter(c => c.semester === 1);
  }, [courses]);

  const [grades, setGrades] = useState(() => {
    const initial = {};
    sem1Courses.forEach(c => {
      initial[c.code] = "A"; // default to A (9.0)
    });
    return initial;
  });

  const handleGradeChange = (code, grade) => {
    setGrades(prev => ({ ...prev, [code]: grade }));
  };

  const handleReset = () => {
    const reset = {};
    sem1Courses.forEach(c => {
      reset[c.code] = "A";
    });
    setGrades(reset);
  };

  const { sgpa, totalCredits, totalPointsEarned } = useMemo(() => {
    let totalCreditsCount = 0;
    let totalPoints = 0;

    sem1Courses.forEach(c => {
      const cr = Number(c.credits) || 0;
      const g = grades[c.code] || "A";
      const pts = GRADE_POINTS[g]?.points ?? 9.0;
      totalCreditsCount += cr;
      totalPoints += cr * pts;
    });

    const calculatedSgpa = totalCreditsCount > 0 ? (totalPoints / totalCreditsCount).toFixed(2) : "0.00";
    return { sgpa: calculatedSgpa, totalCredits: totalCreditsCount, totalPointsEarned: totalPoints.toFixed(1) };
  }, [sem1Courses, grades]);

  const getSgpaClassification = (score) => {
    const val = parseFloat(score);
    if (val >= 9.0) return { label: "First Class with Distinction (Outstanding)", color: "#10b981", bg: "rgba(16, 185, 129, 0.12)" };
    if (val >= 8.0) return { label: "First Class with Distinction", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)" };
    if (val >= 6.5) return { label: "First Class", color: "#818cf8", bg: "rgba(129, 140, 248, 0.12)" };
    if (val >= 5.0) return { label: "Second Class / Pass", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)" };
    return { label: "Needs Improvement", color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)" };
  };

  const classification = getSgpaClassification(sgpa);

  return (
    <div className="container" style={{ padding: "2.5rem 1rem 4rem" }}>
      {/* Header Banner */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.5rem" }}>
        <div className="hero-pill" style={{ marginBottom: "0.75rem" }}>
          <Calculator size={15} />
          <span>Amrita Vishwa Vidyapeetham • 10-Point Scale</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Semester 1 SGPA Estimator
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
          Accurately calculate your Semester Grade Point Average based on official EAC credit weightages (Total: 23 Credits).
        </p>
      </div>

      {/* Result Display Card */}
      <div style={{ 
        maxWidth: "760px", 
        margin: "0 auto 2.5rem", 
        background: "var(--bg-card)", 
        border: "1px solid var(--border-card)", 
        borderRadius: "var(--radius-xl)", 
        padding: "1.75rem",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "0.25rem" }}>
              Projected SGPA
            </div>
            <div style={{ 
              fontFamily: "var(--font-heading)", 
              fontSize: "3.5rem", 
              fontWeight: 800, 
              color: classification.color,
              lineHeight: 1 
            }}>
              {sgpa}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
              out of 10.00
            </div>
          </div>

          <div style={{ textAlign: "left", minWidth: "220px" }}>
            <div style={{ 
              padding: "0.4rem 0.85rem", 
              borderRadius: "var(--radius-full)", 
              background: classification.bg, 
              color: classification.color,
              fontWeight: 700,
              fontSize: "0.85rem",
              display: "inline-block",
              marginBottom: "0.75rem"
            }}>
              {classification.label}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Total Credits: <strong>{totalCredits}</strong><br />
              Total Grade Points: <strong>{totalPointsEarned}</strong>
            </div>
          </div>
        </div>

        {/* Progress Bar Visualizer */}
        <div style={{ width: "100%", background: "var(--bg-surface-subtle)", height: "8px", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{ 
            height: "100%", 
            width: `${Math.min(100, (parseFloat(sgpa) / 10) * 100)}%`, 
            background: `linear-gradient(90deg, #0284c7, ${classification.color})`,
            transition: "width 300ms ease" 
          }} />
        </div>
      </div>

      {/* Grade Selector Table */}
      <div style={{ 
        maxWidth: "840px", 
        margin: "0 auto", 
        background: "var(--bg-surface)", 
        border: "1px solid var(--border-subtle)", 
        borderRadius: "var(--radius-lg)", 
        padding: "1.25rem" 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Course Grade Matrix</h3>
          <button 
            type="button" 
            className="btn-secondary"
            style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
            onClick={handleReset}
          >
            <RotateCcw size={13} />
            <span>Reset All to A (9.0)</span>
          </button>
        </div>

        <div style={{ display: "grid", gap: "0.65rem" }}>
          {sem1Courses.map(course => (
            <div 
              key={course.code}
              className="book-card"
              style={{ margin: 0, alignItems: "center", padding: "0.75rem 1rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="code-badge" style={{ minWidth: "85px", textAlign: "center" }}>
                  {course.code}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    {course.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {course.category} • <strong>{course.credits} Credits</strong> (L-T-P: {course.ltp})
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 600 }}>
                  Grade:
                </label>
                <select 
                  className="form-select"
                  style={{ padding: "0.35rem 0.65rem", fontWeight: 600, fontSize: "0.85rem", width: "130px" }}
                  value={grades[course.code] || "A"}
                  onChange={(e) => handleGradeChange(course.code, e.target.value)}
                  aria-label={`Grade for ${course.code}`}
                >
                  {Object.keys(GRADE_POINTS).map(g => (
                    <option key={g} value={g}>
                      {g} ({GRADE_POINTS[g].points} pts)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
