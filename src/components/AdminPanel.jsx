import React, { useState, useMemo } from "react";
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
  ArrowLeft,
  RefreshCw,
  Download,
  Search,
  Filter,
  FileCheck,
  HardDrive,
  FileCode,
  Tag,
  Clock,
  ExternalLink
} from "lucide-react";
import { initialCourses, CATEGORIES } from "../data/courses";
import FileExchangeModal from "./FileExchangeModal";

const FILE_CATEGORIES = [
  { id: "all", label: "All Types" },
  { id: "notes", label: "Lecture Notes" },
  { id: "pyq", label: "Question Bank / PYQ" },
  { id: "lab", label: "Lab Manual & Code" },
  { id: "formula", label: "Formula & Summary" },
  { id: "syllabus", label: "Syllabus Copy" },
  { id: "general", label: "General Handout" }
];

export default function AdminPanel({
  courses,
  onSaveCourses,
  onResetToDefaults,
  onBackToBrowse
}) {
  const [activeTab, setActiveTab] = useState("files"); // "files", "directory", "new-course"
  const [successMsg, setSuccessMsg] = useState("");

  /* ── File Exchange Modal State ── */
  const [exchangeModalState, setExchangeModalState] = useState({
    isOpen: false,
    file: null
  });

  /* ── New Course Form State ── */
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

  /* ── File Upload Section State ── */
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadTargetCourse, setUploadTargetCourse] = useState(courses[0]?.code || "");
  const [uploadTargetUnit, setUploadTargetUnit] = useState("");
  const [uploadCategory, setUploadCategory] = useState("notes");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  /* ── File Manager Search & Filter State ── */
  const [fileSearchQuery, setFileSearchQuery] = useState("");
  const [fileCourseFilter, setFileCourseFilter] = useState("all");
  const [fileCategoryFilter, setFileCategoryFilter] = useState("all");

  const notify = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  /* ── Unified Files Extractor across all courses ── */
  const allFiles = useMemo(() => {
    const list = [];
    courses.forEach(c => {
      // 1. Files in c.files array
      if (Array.isArray(c.files)) {
        c.files.forEach(f => {
          list.push({
            ...f,
            courseCode: c.code,
            courseTitle: c.title,
            id: f.id || `${c.code}_${f.name}`
          });
        });
      }
      // 2. Files in legacy c.uploadedFiles object
      if (c.uploadedFiles && typeof c.uploadedFiles === "object") {
        Object.entries(c.uploadedFiles).forEach(([unitName, f]) => {
          if (!list.some(existing => existing.courseCode === c.code && existing.unitName === unitName && existing.name === f.name)) {
            list.push({
              ...f,
              id: `${c.code}_${unitName}_${f.name}`,
              courseCode: c.code,
              courseTitle: c.title,
              unitName: unitName,
              title: f.title || unitName || f.name,
              category: f.category || "notes",
              uploadedAt: f.uploadedAt || "Standard Syllabus Release"
            });
          }
        });
      }
    });

    return list;
  }, [courses]);

  /* ── Storage calculations ── */
  const storageMetrics = useMemo(() => {
    let totalBytes = 0;
    allFiles.forEach(f => {
      if (f.rawBytes) {
        totalBytes += f.rawBytes;
      } else if (f.size && typeof f.size === "string") {
        const val = parseFloat(f.size);
        if (f.size.toLowerCase().includes("mb")) totalBytes += val * 1024 * 1024;
        else if (f.size.toLowerCase().includes("kb")) totalBytes += val * 1024;
      }
    });

    const formatted = totalBytes > 1024 * 1024 
      ? (totalBytes / (1024 * 1024)).toFixed(2) + " MB" 
      : (totalBytes / 1024).toFixed(1) + " KB";

    // Percentage of 5MB browser quota
    const percent = Math.min(100, Math.round((totalBytes / (5 * 1024 * 1024)) * 100));

    return { totalBytes, formatted, percent, count: allFiles.length };
  }, [allFiles]);

  /* ── Filtered Files List ── */
  const filteredFiles = useMemo(() => {
    const q = fileSearchQuery.trim().toLowerCase();

    return allFiles.filter(f => {
      const matchSearch = !q || 
        (f.name && f.name.toLowerCase().includes(q)) ||
        (f.title && f.title.toLowerCase().includes(q)) ||
        (f.courseCode && f.courseCode.toLowerCase().includes(q)) ||
        (f.courseTitle && f.courseTitle.toLowerCase().includes(q)) ||
        (f.unitName && f.unitName.toLowerCase().includes(q));

      const matchCourse = fileCourseFilter === "all" || f.courseCode === fileCourseFilter;
      const matchCat = fileCategoryFilter === "all" || f.category === fileCategoryFilter;

      return matchSearch && matchCourse && matchCat;
    });
  }, [allFiles, fileSearchQuery, fileCourseFilter, fileCategoryFilter]);

  /* ── Handle File Picker ── */
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB browser storage quota.");
      return;
    }

    setUploadError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        rawBytes: file.size,
        type: file.type || "application/octet-stream",
        data: event.target.result
      });
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  /* ── Action 1: Upload New File ── */
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    if (!uploadTargetCourse) {
      setUploadError("Please choose a target course.");
      return;
    }

    const newFileEntry = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: selectedFile.name,
      size: selectedFile.size,
      rawBytes: selectedFile.rawBytes,
      type: selectedFile.type,
      data: selectedFile.data,
      title: uploadTitle.trim() || selectedFile.name,
      description: uploadDesc.trim() || "",
      category: uploadCategory,
      unitName: uploadTargetUnit.trim() || "General Study Handout",
      uploadedAt: new Date().toLocaleDateString([], { 
        month: "short", 
        day: "numeric", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
      lastModified: new Date().toISOString()
    };

    const updated = courses.map(c => {
      if (c.code === uploadTargetCourse) {
        const existingFiles = Array.isArray(c.files) ? [...c.files] : [];
        const uploadedFiles = { ...(c.uploadedFiles || {}) };

        // Add to files array
        existingFiles.unshift(newFileEntry);

        // Add to uploadedFiles dictionary for unit downloads
        const unitKey = uploadTargetUnit.trim() || "General Handout";
        uploadedFiles[unitKey] = newFileEntry;

        const parts = [...(c.parts || [])];
        if (uploadTargetUnit.trim() && !parts.includes(uploadTargetUnit.trim())) {
          parts.push(uploadTargetUnit.trim());
        }

        return { ...c, parts, files: existingFiles, uploadedFiles };
      }
      return c;
    });

    onSaveCourses(updated);
    setSelectedFile(null);
    setUploadTitle("");
    setUploadDesc("");
    setUploadTargetUnit("");
    setShowUploadForm(false);
    notify(`Successfully uploaded "${newFileEntry.name}" to ${uploadTargetCourse}!`);
  };

  /* ── Action 2: Remove File ── */
  const handleRemoveFile = (fileItem) => {
    if (!window.confirm(`Are you sure you want to remove "${fileItem.name}" from ${fileItem.courseCode}? This cannot be undone.`)) {
      return;
    }

    const updated = courses.map(c => {
      if (c.code === fileItem.courseCode) {
        const filteredFiles = (c.files || []).filter(f => (f.id !== fileItem.id && f.name !== fileItem.name));
        const uploadedFiles = { ...(c.uploadedFiles || {}) };
        
        if (fileItem.unitName && uploadedFiles[fileItem.unitName]) {
          delete uploadedFiles[fileItem.unitName];
        }

        return {
          ...c,
          files: filteredFiles,
          uploadedFiles
        };
      }
      return c;
    });

    onSaveCourses(updated);
    notify(`Removed "${fileItem.name}" successfully.`);
  };

  /* ── Action 3: Exchange / Swap File ── */
  const handleOpenExchange = (fileItem) => {
    setExchangeModalState({
      isOpen: true,
      file: fileItem
    });
  };

  const handleConfirmExchange = (fileId, updatedFileObj) => {
    const updated = courses.map(c => {
      if (c.code === updatedFileObj.courseCode) {
        const updatedFilesList = (c.files || []).map(f => {
          if (f.id === fileId || f.name === fileId || f.id === updatedFileObj.id) {
            return updatedFileObj;
          }
          return f;
        });

        // Also update uploadedFiles map
        const uploadedFiles = { ...(c.uploadedFiles || {}) };
        if (updatedFileObj.unitName) {
          uploadedFiles[updatedFileObj.unitName] = updatedFileObj;
        }

        return {
          ...c,
          files: updatedFilesList,
          uploadedFiles
        };
      }
      return c;
    });

    onSaveCourses(updated);
    notify(`Successfully exchanged file with new version "${updatedFileObj.name}"!`);
  };

  /* ── Test Download File directly ── */
  const handleTestDownload = (fileItem) => {
    if (!fileItem.data) {
      alert("File binary data not found.");
      return;
    }
    const link = document.createElement("a");
    link.href = fileItem.data;
    link.download = fileItem.name || "download.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── Course Creation ── */
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
      files: [],
      uploadedFiles: {},
      parts: courseForm.parts.length > 0 ? courseForm.parts : ["Unit 1: Fundamentals", "Unit 2: Advanced Concepts", "Question Bank"]
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

  // Pre-fill target units when course dropdown changes
  const activeTargetCourseObj = courses.find(c => c.code === uploadTargetCourse);

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
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>
              Curriculum & Resource Administration
            </h2>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              Upload, remove, exchange study materials, and manage courses in real-time
            </div>
          </div>
        </div>

        {/* Tab pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "files" ? "active" : ""}`}
            onClick={() => setActiveTab("files")}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <FolderOpen size={14} />
            <span>File Manager ({allFiles.length})</span>
          </button>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "directory" ? "active" : ""}`}
            onClick={() => setActiveTab("directory")}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Layers size={14} />
            <span>Course Directory ({courses.length})</span>
          </button>
          <button 
            type="button"
            className={`filter-pill ${activeTab === "new-course" ? "active" : ""}`}
            onClick={() => setActiveTab("new-course")}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Plus size={14} />
            <span>+ Add Course</span>
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

      {/* ════════════════════════════════════════════════════════════════
          TAB 1: FILE MANAGER (UPLOAD / REMOVE / EXCHANGE)
          ════════════════════════════════════════════════════════════════ */}
      {activeTab === "files" && (
        <div>
          {/* Storage & Quick Action Header */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "1rem", 
            marginBottom: "1.5rem" 
          }}>
            {/* Storage Usage Card */}
            <div className="admin-card" style={{ padding: "1.25rem 1.5rem", margin: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <HardDrive size={18} color="var(--accent-primary)" />
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Storage Allocated</span>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                  {storageMetrics.formatted} / 5.0 MB ({storageMetrics.percent}%)
                </span>
              </div>
              <div style={{ 
                width: "100%", 
                height: "8px", 
                borderRadius: "var(--radius-full)", 
                background: "var(--bg-surface-elevated)", 
                overflow: "hidden" 
              }}>
                <div style={{ 
                  width: `${Math.max(5, storageMetrics.percent)}%`, 
                  height: "100%", 
                  background: storageMetrics.percent > 80 ? "var(--accent-danger)" : "var(--brand-gradient)", 
                  borderRadius: "var(--radius-full)",
                  transition: "width 0.4s ease"
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                <span>{allFiles.length} Documents uploaded</span>
                <span>Max 5MB browser quota</span>
              </div>
            </div>

            {/* Quick Upload Button Banner */}
            <div className="admin-card" style={{ 
              padding: "1.25rem 1.5rem", 
              margin: 0, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)"
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                  Upload New Resource
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Attach lecture notes, question banks, or lab manuals
                </div>
              </div>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => setShowUploadForm(!showUploadForm)}
                style={{ flex: "none", padding: "0.55rem 1.1rem" }}
              >
                <Upload size={16} />
                <span>{showUploadForm ? "Close Form" : "Upload File"}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Upload Form Section */}
          {showUploadForm && (
            <form onSubmit={handleUploadSubmit} className="admin-card" style={{ marginBottom: "1.75rem", border: "1px solid var(--accent-primary)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Upload size={20} color="var(--accent-primary)" />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
                    Upload Study Resource
                  </h3>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowUploadForm(false)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>

              {uploadError && (
                <div style={{ 
                  background: "rgba(244, 63, 94, 0.15)", 
                  border: "1px solid rgba(244, 63, 94, 0.3)", 
                  color: "var(--accent-danger)", 
                  padding: "0.6rem 0.9rem", 
                  borderRadius: "var(--radius-sm)", 
                  marginBottom: "1rem",
                  fontSize: "0.825rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <AlertTriangle size={15} />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="form-grid" style={{ marginBottom: "1rem" }}>
                {/* Target Course */}
                <div className="form-group">
                  <label className="form-label">Target Academic Course</label>
                  <select 
                    className="form-select"
                    value={uploadTargetCourse}
                    onChange={(e) => {
                      setUploadTargetCourse(e.target.value);
                      setUploadTargetUnit("");
                    }}
                    required
                  >
                    {courses.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.code} – {c.title} (Sem {c.semester})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resource Category */}
                <div className="form-group">
                  <label className="form-label">Resource Classification</label>
                  <select 
                    className="form-select"
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                  >
                    <option value="notes">📑 Lecture Notes & Slides</option>
                    <option value="pyq">❓ Question Bank / Past Exam Papers</option>
                    <option value="lab">🔬 Lab Manual & Code Programs</option>
                    <option value="formula">📐 Formula Sheet & Quick Revision</option>
                    <option value="syllabus">📜 Syllabus & Evaluation Guide</option>
                    <option value="general">🌐 General Reference Material</option>
                  </select>
                </div>

                {/* Target Unit / Module */}
                <div className="form-group">
                  <label className="form-label">Module / Unit Assignment</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Unit 1: Fundamentals, or Model Question Papers"
                    value={uploadTargetUnit}
                    onChange={(e) => setUploadTargetUnit(e.target.value)}
                    list="course-units-datalist"
                  />
                  <datalist id="course-units-datalist">
                    {(activeTargetCourseObj?.parts || []).map((p, idx) => (
                      <option key={idx} value={p} />
                    ))}
                  </datalist>
                </div>

                {/* Display Title */}
                <div className="form-group">
                  <label className="form-label">Display Title / Label</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Unit 1 Comprehensive Study Notes"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                  />
                </div>
              </div>

              {/* File Dropzone */}
              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="form-label">Select File to Upload (Max 5MB)</label>
                <div style={{
                  border: "2px dashed var(--border-card)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  background: "var(--bg-surface-subtle)",
                  cursor: "pointer"
                }} onClick={() => document.getElementById("admin-new-file-input").click()}>
                  <input 
                    id="admin-new-file-input"
                    type="file" 
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                  <div style={{ 
                    width: "44px", 
                    height: "44px", 
                    borderRadius: "var(--radius-full)", 
                    background: "rgba(0, 240, 255, 0.12)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    margin: "0 auto 0.75rem",
                    color: "var(--accent-primary)"
                  }}>
                    <Upload size={22} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {selectedFile ? selectedFile.name : "Click to Browse File from Laptop"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Supports PDF, DOCX, PPTX, Images, ZIP • Saved into browser local storage
                  </div>
                </div>

                {selectedFile && (
                  <div style={{ 
                    marginTop: "0.75rem", 
                    padding: "0.6rem 0.9rem", 
                    background: "rgba(16, 185, 129, 0.1)", 
                    border: "1px solid rgba(16, 185, 129, 0.3)", 
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#10b981",
                    fontSize: "0.85rem"
                  }}>
                    <span>✓ Ready: <strong>{selectedFile.name}</strong> ({selectedFile.size})</span>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.75rem" }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label className="form-label">Brief Description / Study Guidance (Optional)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Key topics covered, practice problems, or syllabus alignment notes..."
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={!selectedFile}
                  style={{ flex: "none", padding: "0.65rem 1.6rem", opacity: selectedFile ? 1 : 0.6 }}
                >
                  <Upload size={16} />
                  <span>Upload & Publish Document</span>
                </button>
              </div>
            </form>
          )}

          {/* Search, Filter & Action Bar */}
          <div className="admin-card" style={{ padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
              {/* Search input */}
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search files by name, course code, unit..."
                  value={fileSearchQuery}
                  onChange={(e) => setFileSearchQuery(e.target.value)}
                  style={{ paddingLeft: "2.25rem", fontSize: "0.85rem" }}
                />
              </div>

              {/* Course Filter Dropdown */}
              <div style={{ minWidth: "180px" }}>
                <select 
                  className="form-select"
                  value={fileCourseFilter}
                  onChange={(e) => setFileCourseFilter(e.target.value)}
                  style={{ fontSize: "0.85rem", padding: "0.6rem 0.8rem" }}
                >
                  <option value="all">All Courses ({courses.length})</option>
                  {courses.map(c => (
                    <option key={c.code} value={c.code}>{c.code} – {c.title}</option>
                  ))}
                </select>
              </div>

              {/* Category Pills */}
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {FILE_CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    type="button"
                    className={`filter-pill ${fileCategoryFilter === cat.id ? "active" : ""}`}
                    onClick={() => setFileCategoryFilter(cat.id)}
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem" }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Files List / Table */}
          {filteredFiles.length === 0 ? (
            <div className="admin-card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
              <FolderOpen size={42} style={{ color: "var(--text-dim)", margin: "0 auto 1rem" }} />
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                No Uploaded Files Found
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: "450px", margin: "0 auto 1.25rem" }}>
                {allFiles.length === 0 
                  ? "No custom study materials have been uploaded yet. Click 'Upload File' above to attach your first syllabus document, notes, or question bank."
                  : "No files match your current search and filter criteria. Try clearing your filters."}
              </p>
              {allFiles.length === 0 && (
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={() => setShowUploadForm(true)}
                  style={{ flex: "none", margin: "0 auto" }}
                >
                  <Upload size={16} />
                  <span>Upload First File</span>
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {filteredFiles.map((f, idx) => (
                <div 
                  key={f.id || idx} 
                  className="book-card"
                  style={{ 
                    margin: 0, 
                    padding: "1rem 1.25rem", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap"
                  }}
                >
                  {/* Left: File metadata */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", flex: "1 1 320px" }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "var(--radius-md)", 
                      background: "rgba(0, 240, 255, 0.12)",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "var(--accent-primary)",
                      flexShrink: 0
                    }}>
                      <FileText size={20} />
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                          {f.title || f.name}
                        </span>
                        <span className="filter-pill" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem", textTransform: "uppercase", fontWeight: 700 }}>
                          {f.category || "Notes"}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                        <span className="code-badge" style={{ fontSize: "0.7rem", padding: "0.1rem 0.4rem" }}>
                          {f.courseCode}
                        </span>
                        <span>•</span>
                        <span>{f.unitName || "General Handout"}</span>
                        <span>•</span>
                        <span>{f.size}</span>
                        {f.name && f.name !== f.title && (
                          <>
                            <span>•</span>
                            <span style={{ opacity: 0.7 }}>File: {f.name}</span>
                          </>
                        )}
                      </div>

                      {f.description && (
                        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.25rem", fontStyle: "italic" }}>
                          {f.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Three Core Action Buttons (Download, Exchange, Remove) */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                    {/* Action 1: Test / Download */}
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => handleTestDownload(f)}
                      title="Download / preview file"
                      style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem" }}
                    >
                      <Download size={14} />
                      <span className="desktop-only">Download</span>
                    </button>

                    {/* Action 2: Exchange / Swap */}
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => handleOpenExchange(f)}
                      title="Exchange / replace with a new file"
                      style={{ 
                        padding: "0.45rem 0.85rem", 
                        fontSize: "0.78rem", 
                        background: "linear-gradient(135deg, #8b5cf6 0%, #00f0ff 100%)",
                        border: "none",
                        boxShadow: "0 0 12px rgba(139, 92, 246, 0.3)"
                      }}
                    >
                      <RefreshCw size={14} />
                      <span>Exchange</span>
                    </button>

                    {/* Action 3: Remove */}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveFile(f)}
                      title="Remove file from website"
                      style={{ 
                        color: "var(--accent-danger)", 
                        background: "rgba(244, 63, 94, 0.1)",
                        border: "1px solid rgba(244, 63, 94, 0.25)",
                        padding: "0.45rem 0.75rem", 
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.78rem"
                      }}
                    >
                      <Trash2 size={14} />
                      <span className="desktop-only">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          TAB 2: COURSE DIRECTORY
          ════════════════════════════════════════════════════════════════ */}
      {activeTab === "directory" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>Registered Curriculum Subjects</h3>
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
            {courses.map((course) => {
              const courseFileCount = (course.files?.length || 0) + Object.keys(course.uploadedFiles || {}).length;

              return (
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
                        {courseFileCount > 0 && (
                          <span style={{ color: "var(--accent-primary)", fontWeight: 600, marginLeft: "0.5rem" }}>
                            • 📎 {courseFileCount} File(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => {
                        setUploadTargetCourse(course.code);
                        setShowUploadForm(true);
                        setActiveTab("files");
                      }}
                      style={{ fontSize: "0.75rem", padding: "0.35rem 0.65rem" }}
                      title={`Upload file to ${course.code}`}
                    >
                      <Upload size={13} />
                      <span>Upload</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleDeleteCourse(course.code)}
                      style={{ color: "var(--accent-danger)", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "none", border: "none", cursor: "pointer" }}
                      title={`Delete ${course.code}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          TAB 3: NEW COURSE FORM
          ════════════════════════════════════════════════════════════════ */}
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

      {/* ── Exchange File Modal ── */}
      <FileExchangeModal 
        isOpen={exchangeModalState.isOpen}
        file={exchangeModalState.file}
        onClose={() => setExchangeModalState({ isOpen: false, file: null })}
        onConfirmExchange={handleConfirmExchange}
      />
    </div>
  );
}
