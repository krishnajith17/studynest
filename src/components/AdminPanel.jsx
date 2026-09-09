import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Save, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  FolderOpen,
  BookPlus,
  Layers,
  ArrowLeft
} from "lucide-react";
import { initialCourses, CATEGORIES } from "../data/courses";

export default function AdminPanel({
  courses,
  onSaveCourses,
  onResetToDefaults,
  onBackToBrowse
}) {
  const [activeTab, setActiveTab] = useState("directory"); // directory, new-course, attach-file

  // New course state
  const [courseForm, setCourseForm] = useState({
    code: "",
    title: "",
    category: "ENGG",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    description: "",
    parts: ["Unit 1: Fundamentals", "Unit 2: Advanced Concepts", "Question Bank"]
  });

  const [tempUnit, setTempUnit] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // File attach state
  const [selectedCourseCode, setSelectedCourseCode] = useState(courses[0]?.code || "");
  const [targetUnit, setTargetUnit] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const notify = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseForm.code.trim() || !courseForm.title.trim()) {
      alert("Please fill in both Course Code and Course Title.");
      return;
    }

    if (courses.some(c => c.code.toLowerCase() === courseForm.code.trim().toLowerCase())) {
      alert(`Course with code "${courseForm.code}" already exists!`);
      return;
    }

    const newCourseObj = {
      ...courseForm,
      code: courseForm.code.trim().toUpperCase(),
      title: courseForm.title.trim(),
      credits: parseInt(courseForm.credits, 10),
      semester: parseInt(courseForm.semester, 10),
      textbooks: [],
      references: [],
      additionalResources: [],
      parts: courseForm.parts.length > 0 ? courseForm.parts : ["Unit 1: General Overview", "Model Exam Papers"]
    };

    onSaveCourses([newCourseObj, ...courses]);
    setCourseForm({
      code: "",
      title: "",
      category: "ENGG",
      credits: 3,
      ltp: "3-0-0",
      semester: 1,
      description: "",
      parts: ["Unit 1: Fundamentals", "Unit 2: Advanced Concepts", "Question Bank"]
    });
    notify(`Created course ${newCourseObj.code} successfully!`);
    setActiveTab("directory");
  };

  const handleDeleteCourse = (code) => {
    if (window.confirm(`Are you sure you want to delete course ${code}?`)) {
      onSaveCourses(courses.filter(c => c.code !== code));
      notify(`Deleted course ${code}.`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit for local storage.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        data: event.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAttachResource = (e) => {
    e.preventDefault();
    if (!selectedCourseCode || !targetUnit.trim() || !uploadedFile) {
      alert("Please select a course, specify a unit name, and upload a file.");
      return;
    }

    const updated = courses.map(c => {
      if (c.code === selectedCourseCode) {
        const parts = [...(c.parts || [])];
        if (!parts.includes(targetUnit)) {
          parts.push(targetUnit);
        }
        const uploadedFiles = { ...(c.uploadedFiles || {}) };
        uploadedFiles[targetUnit] = uploadedFile;
        return { ...c, parts, uploadedFiles };
      }
      return c;
    });

    onSaveCourses(updated);
    setUploadedFile(null);
    setTargetUnit("");
    notify(`Attached file to ${selectedCourseCode} - ${targetUnit}!`);
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      {/* Admin Top Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2rem 0 1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onBackToBrowse}
            style={{ padding: "0.5rem 0.75rem" }}
          >
            <ArrowLeft size={16} />
            <span>Back to Portal</span>
          </button>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 800 }}>
            Curriculum Administration
          </h2>
        </div>

        {/* Tab pills */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "directory" ? "active" : ""}`}
            onClick={() => setActiveTab("directory")}
          >
            Course Directory ({courses.length})
          </button>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "new-course" ? "active" : ""}`}
            onClick={() => setActiveTab("new-course")}
          >
            + Add Course
          </button>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "attach-file" ? "active" : ""}`}
            onClick={() => setActiveTab("attach-file")}
          >
            Upload Notes
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{ 
          background: "rgba(16, 185, 129, 0.15)", 
          border: "1px solid rgba(16, 185, 129, 0.3)", 
          color: "#10b981", 
          padding: "0.75rem 1.25rem", 
          borderRadius: "var(--radius-md)", 
          marginBottom: "1.5rem", 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem",
          fontWeight: 600
        }}>
          <Check size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tab: Directory */}
      {activeTab === "directory" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Registered Curriculum Subjects</h3>
            <button 
              type="button"
              className="btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.35rem 0.65rem", color: "var(--accent-danger)" }}
              onClick={() => {
                if (window.confirm("Reset all courses back to default Amrita curriculum? Custom modifications will be reset.")) {
                  onResetToDefaults();
                  notify("Curriculum reset to factory defaults.");
                }
              }}
            >
              <RotateCcw size={13} />
              <span>Reset to Defaults</span>
            </button>
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {courses.map((course) => (
              <div 
                key={course.code} 
                className="book-card"
                style={{ alignItems: "center", margin: 0 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span className="code-badge" style={{ minWidth: "85px", textAlign: "center" }}>
                    {course.code}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{course.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Sem {course.semester} • {course.category} • {course.credits} Credits • {course.parts?.length || 0} Modules
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => handleDeleteCourse(course.code)}
                  style={{ color: "var(--accent-danger)", padding: "0.5rem", borderRadius: "var(--radius-sm)" }}
                  title={`Delete ${course.code}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: New Course Form */}
      {activeTab === "new-course" && (
        <form onSubmit={handleCreateCourse} className="admin-card">
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>
            Add New Academic Course
          </h3>

          <div className="form-grid" style={{ marginBottom: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Course Code (e.g. 23ECE201)</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="23ECE201"
                value={courseForm.code}
                onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="Digital Signals & Systems"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select"
                value={courseForm.category}
                onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
              >
                <option value="ENGG">Core Engineering (ENGG)</option>
                <option value="SCI">Sciences & Math (SCI)</option>
                <option value="HUM">Humanities & Mind (HUM)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Semester</label>
              <select 
                className="form-select"
                value={courseForm.semester}
                onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Credits</label>
              <input 
                type="number" 
                min="1" 
                max="8" 
                className="form-input"
                value={courseForm.credits}
                onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">L-T-P Structure</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="3-0-0 or 3-1-0"
                value={courseForm.ltp}
                onChange={(e) => setCourseForm({ ...courseForm, ltp: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Course Syllabus Scope & Description</label>
            <textarea 
              rows={4}
              className="form-textarea"
              placeholder="Outline the course objectives, scope, and key learning outcomes..."
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
            />
          </div>

          {/* Units Builder */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="form-label" style={{ marginBottom: "0.5rem", display: "block" }}>
              Syllabus Units & Examination Modules
            </label>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter unit name (e.g. Unit 3: Fourier Transform)..."
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
              />
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  if (tempUnit.trim()) {
                    setCourseForm({
                      ...courseForm,
                      parts: [...courseForm.parts, tempUnit.trim()]
                    });
                    setTempUnit("");
                  }
                }}
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {courseForm.parts.map((p, i) => (
                <span 
                  key={i} 
                  className="filter-pill"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  {p}
                  <Trash2 
                    size={12} 
                    style={{ cursor: "pointer", opacity: 0.7 }}
                    onClick={() => {
                      setCourseForm({
                        ...courseForm,
                        parts: courseForm.parts.filter((_, idx) => idx !== i)
                      });
                    }} 
                  />
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setActiveTab("directory")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ flex: "none", padding: "0.6rem 1.5rem" }}
            >
              <Save size={16} />
              <span>Save & Publish Course</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Attach Notes File */}
      {activeTab === "attach-file" && (
        <form onSubmit={handleAttachResource} className="admin-card">
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem" }}>
            Attach Notes or Handouts to a Course Module
          </h3>

          <div className="form-grid" style={{ marginBottom: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Target Course</label>
              <select 
                className="form-select"
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
              >
                {courses.map(c => (
                  <option key={c.code} value={c.code}>{c.code} – {c.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Module Name / Label</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Unit 1 Complete Handout"
                value={targetUnit}
                onChange={(e) => setTargetUnit(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Upload Document (PDF, Notes, etc. Max 5MB)</label>
            <input 
              type="file" 
              className="form-input" 
              onChange={handleFileUpload}
              required
            />
            {uploadedFile && (
              <span style={{ fontSize: "0.8125rem", color: "#10b981", marginTop: "0.35rem" }}>
                Ready to attach: {uploadedFile.name} ({uploadedFile.size})
              </span>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ flex: "none", padding: "0.6rem 1.5rem" }}
            >
              <Upload size={16} />
              <span>Attach File to Unit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
