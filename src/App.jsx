import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { 
  Search, 
  History as HistoryIcon, 
  Plus, 
  Download, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  Trash2, 
  Key, 
  LogOut,
  ExternalLink,
  Layers,
  ChevronRight
} from "lucide-react";
import { initialCourses } from "./data";

const CARD_THEMES = [
  { bg: "var(--color-purple)", border: "#b5a8e0", ears: "#9e8fe3" },
  { bg: "var(--color-orange)", border: "#ff5a36", ears: "#e54724" },
  { bg: "var(--color-green)", border: "#37f3c1", ears: "#1fe0ae" },
  { bg: "var(--color-blue)", border: "#00ecef", ears: "#00cfd2" },
  { bg: "var(--color-yellow)", border: "#fff200", ears: "#e6da00" }
];

export default function App() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("studynest_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("studynest_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [hatchingState, setHatchingState] = useState({
    active: false,
    stage: "egg",
    courseCode: "",
    partName: ""
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    category: "SCI",
    credits: 3,
    ltp: "3-0-0",
    semester: 1,
    description: "",
    textbooks: [],
    references: [],
    parts: []
  });

  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [newResourcePartName, setNewResourcePartName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileBase64, setUploadedFileBase64] = useState("");

  const [tempTextbook, setTempTextbook] = useState({ title: "", author: "", publisher: "", year: "", link: "" });
  const [tempRef, setTempRef] = useState({ title: "", author: "", publisher: "", year: "", link: "" });
  const [tempPart, setTempPart] = useState("");

  const [owlQuote, setOwlQuote] = useState("Unbox study guides worth talking about! Grab a book-card below.");
  
  const funnyQuotes = [
    "Warning: Cramming the night before might cause temporary feather loss.",
    "Exams are like bird nests: built twig by twig (or slide by slide).",
    "Don't count your chickens before they pass their exams!",
    "Your brain is a nest. Fill it with knowledge, not just dust.",
    "Be like the owl: wise, awake at night, and screaming internally.",
    "Study hard! If you fail, the birds will mock you from the trees.",
    "A download a day keeps the failing grade away! Or at least makes you feel productive.",
  ];

  useEffect(() => {
    localStorage.setItem("studynest_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("studynest_history", JSON.stringify(history));
  }, [history]);

  const changeOwlQuote = () => {
    const randomIndex = Math.floor(Math.random() * funnyQuotes.length);
    setOwlQuote(funnyQuotes[randomIndex]);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.parts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSemester = selectedSemester === "all" || course.semester.toString() === selectedSemester;
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesSemester && matchesCategory;
  });

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "chirp") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setAdminError("");
      setOwlQuote("Admin verified! Welcome to the book binder dashboard.");
      setActiveTab("admin");
    } else {
      setAdminError("Wrong passcode! Hint: What does a baby bird say?");
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title) return;

    const createdCourse = {
      ...newCourse,
      semester: parseInt(newCourse.semester),
      credits: parseInt(newCourse.credits),
      parts: newCourse.parts.length > 0 ? newCourse.parts : ["Unit 1: Overview", "Midterm Notes", "Final Prep Q&A"]
    };

    setCourses([...courses, createdCourse]);
    setNewCourse({
      code: "",
      title: "",
      category: "SCI",
      credits: 3,
      ltp: "3-0-0",
      semester: 1,
      description: "",
      textbooks: [],
      references: [],
      parts: []
    });
    setOwlQuote(`Successfully bound new course book: ${createdCourse.title}!`);
  };

  const addTextbookToNewCourse = () => {
    if (!tempTextbook.title) return;
    const bookLink = tempTextbook.link || `https://www.google.com/search?q=${encodeURIComponent(tempTextbook.title + " " + (tempTextbook.author || ""))}`;
    setNewCourse({
      ...newCourse,
      textbooks: [...newCourse.textbooks, { ...tempTextbook, link: bookLink }]
    });
    setTempTextbook({ title: "", author: "", publisher: "", year: "", link: "" });
  };

  const addReferenceToNewCourse = () => {
    if (!tempRef.title) return;
    const refLink = tempRef.link || `https://www.google.com/search?q=${encodeURIComponent(tempRef.title + " " + (tempRef.author || ""))}`;
    setNewCourse({
      ...newCourse,
      references: [...newCourse.references, { ...tempRef, link: refLink }]
    });
    setTempRef({ title: "", author: "", publisher: "", year: "", link: "" });
  };

  const addPartToNewCourse = () => {
    if (!tempPart) return;
    setNewCourse({
      ...newCourse,
      parts: [...newCourse.parts, tempPart]
    });
    setTempPart("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedFileBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!selectedCourseCode || !newResourcePartName) return;

    setCourses(courses.map((course) => {
      if (course.code === selectedCourseCode) {
        const updatedParts = [...course.parts, newResourcePartName];
        const updatedCourse = { ...course, parts: updatedParts };
        
        if (uploadedFileBase64) {
          if (!updatedCourse.uploadedFiles) updatedCourse.uploadedFiles = {};
          updatedCourse.uploadedFiles[newResourcePartName] = {
            name: uploadedFileName,
            data: uploadedFileBase64
          };
        }
        return updatedCourse;
      }
      return course;
    }));

    setNewResourcePartName("");
    setUploadedFileName("");
    setUploadedFileBase64("");
    setOwlQuote(`Inserted exam notes "${newResourcePartName}" into ${selectedCourseCode}!`);
  };

  const triggerDownload = (courseCode, partName) => {
    const course = courses.find(c => c.code === courseCode);
    
    setHatchingState({
      active: true,
      stage: "egg",
      courseCode,
      partName
    });

    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "shaking" }));
    }, 400);

    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "cracked" }));
    }, 1500);

    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "hatched" }));
      generateAndSavePDF(course, partName);
    }, 2500);

    setTimeout(() => {
      setHatchingState({ active: false, stage: "egg", courseCode: "", partName: "" });
      setOwlQuote(`A wise study-bird flew away with your PDF: ${partName}!`);
    }, 4500);
  };

  const generateAndSavePDF = (course, partName) => {
    if (course.uploadedFiles && course.uploadedFiles[partName]) {
      const customFile = course.uploadedFiles[partName];
      const link = document.createElement("a");
      link.href = customFile.data;
      link.download = customFile.name || `${course.code}_${partName.replace(/\s+/g, "_")}.pdf`;
      link.click();
    } else {
      const doc = new jsPDF();
      
      doc.setFillColor(21, 27, 38);
      doc.rect(0, 0, 210, 42, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("StudyNest", 15, 26);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(255, 242, 0);
      doc.text("UNBOX STORIES WORTH STUDYING", 132, 25);

      doc.setTextColor(21, 27, 38);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`${course.code}: ${course.title}`, 15, 58);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(`Incubated Resource: ${partName}`, 15, 68);
      doc.line(15, 73, 195, 73);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Syllabus & Course Scope", 15, 85);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(course.description, 180);
      doc.text(splitDesc, 15, 93);

      let yOffset = 118;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Recommended Textbooks:", 15, yOffset);
      yOffset += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      course.textbooks.forEach((book, i) => {
        const text = `${i + 1}. ${book.title} by ${book.author} (${book.publisher}, ${book.year})`;
        const splitText = doc.splitTextToSize(text, 185);
        doc.text(splitText, 15, yOffset);
        yOffset += splitText.length * 5;
      });

      yOffset += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("References & Guides:", 15, yOffset);
      yOffset += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      course.references.forEach((ref, i) => {
        const text = `${i + 1}. ${ref.title} by ${ref.author} (${ref.publisher}, ${ref.year})`;
        const splitText = doc.splitTextToSize(text, 185);
        doc.text(splitText, 15, yOffset);
        yOffset += splitText.length * 5;
      });

      doc.setFillColor(255, 242, 0);
      doc.rect(0, 287, 210, 10, "F");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(21, 27, 38);
      doc.text("Designed with cozy style by StudyNest Aardvark. Happy Cramming!", 60, 293);

      doc.save(`${course.code}_${partName.replace(/\s+/g, "_")}.pdf`);
    }

    const historyItem = {
      id: Date.now().toString(),
      courseCode: course.code,
      courseTitle: course.title,
      partName,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };
    setHistory([historyItem, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
    setOwlQuote("Your catalog of study-chicks was cleared!");
  };

  return (
    <div className="app-container">
      
      {/* Dynamic Yellow Aardvark Banner */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <span>🪺</span>
              <span>Incubator Hub</span>
            </div>
            <h1 className="hero-title">
              Unbox study guides worth talking about.
            </h1>
            <p className="hero-desc">
              Join the book club that's anything but traditional. Pick your courses, unbox reference books, and hatch premium PDF study materials straight to your local nest.
            </p>
            <div className="hero-actions">
              <button 
                onClick={() => setActiveTab("search")}
                className="btn-aardvark is--yellow"
              >
                Start Unboxing <ChevronRight className="w-5 h-5" />
              </button>
              <div className="handwritten">Syllabus scanned & sorted by hand 🦉</div>
            </div>
          </div>

          {/* Large Owl Mascot */}
          <div className="hero-visual">
            <span style={{ fontSize: "6rem" }}>🦉</span>
            <div className="hero-visual-badge">Nest Guard</div>
          </div>
        </div>
      </section>

      {/* Main navigation header */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span>🪹</span>
            <span>StudyNest</span>
          </div>

          <div className="navbar-tabs">
            <button 
              onClick={() => setActiveTab("search")}
              className={`tab-btn ${activeTab === "search" ? "is--active" : ""}`}
            >
              All Books
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`tab-btn ${activeTab === "history" ? "is--active" : ""}`}
            >
              Hatched Box ({history.length})
            </button>
            <button 
              onClick={() => {
                if (isAdmin) {
                  setActiveTab("admin");
                } else {
                  setShowAdminLogin(true);
                }
              }}
              className={`tab-btn ${activeTab === "admin" ? "is--active" : ""}`}
            >
              Incubator Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Wisdom Bubble */}
      <div className="wisdom-container">
        <div onClick={changeOwlQuote} className="wisdom-bubble">
          <span style={{ fontSize: "1.5rem" }}>💡</span>
          <p style={{ fontSize: "0.85rem", fontStyle: "italic", margin: 0 }}>"{owlQuote}"</p>
        </div>
      </div>

      <div className="main-content">
        
        {/* SEARCH TAB CONTENT */}
        {activeTab === "search" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Flat search and filter card */}
            <div className="filter-section">
              <div className="search-input-wrap">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search course titles, codes, references, or parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-flat"
                />
              </div>
              
              <div className="filter-selects">
                <select 
                  value={selectedSemester} 
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="input-flat"
                >
                  <option value="all">All Semesters</option>
                  <option value="1">1st Sem</option>
                  <option value="2">2nd Sem</option>
                </select>

                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-flat"
                >
                  <option value="all">All Categories</option>
                  <option value="SCI">SCI</option>
                  <option value="ENGG">ENGG</option>
                  <option value="HUM">HUM</option>
                </select>
              </div>
            </div>

            {/* Courses list */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-white border-2 border-[#151b26] rounded-3xl p-8 shadow-flat" style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🍂</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>No nests found!</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "350px", margin: "0 auto" }}>No study guides match your queries. Try resetting filters or incubate a new one in the admin section!</p>
              </div>
            ) : (
              <div className="catalog-grid">
                {filteredCourses.map((course, idx) => {
                  const theme = CARD_THEMES[idx % CARD_THEMES.length];
                  return (
                    <div key={course.code} className="course-card">
                      {/* Styled Aardvark Ears (Nest Wings) */}
                      <div className="nest-wings" style={{ color: theme.ears }}>
                        <svg className="nest-wing" fill="currentColor" viewBox="0 0 44 45">
                          <path d="M1.335.198c.671-.316 1.5-.254 2.186.187C27.678 16.847 39.839 36.953 44 45h-6.048c-2.382-1.604-6.964-3.674-15.652-4.814C2.999 37.666-.665 14.174.09 2.04.152 1.28.589.515 1.335.198Z" />
                        </svg>
                        <svg className="nest-wing" fill="currentColor" viewBox="0 0 29 80">
                          <path d="M19.388.879c.667-.771 1.647-1.018 2.559-.807.912.21 1.682.956 1.926 1.861C34.595 38.09 25.79 69.237 21.823 80h-4.188c-.17-4.22-2.739-13.318-10.975-22.064-8.493-9.099-8.88-21.913-1.063-37.23C11.221 9.603 19.091 1.266 19.388.879Z" />
                        </svg>
                      </div>

                      {/* Spine Cover book cover */}
                      <div className="book-container">
                        <div className="book-cover" style={{ backgroundColor: theme.bg }}>
                          <div className="book-spine"></div>
                          <div className="book-cover-content">
                            <div className="book-cover-cat">
                              {course.category}
                            </div>
                            <div className="book-cover-code">
                              {course.code}
                            </div>
                            <div className="book-cover-sem">
                              Sem {course.semester}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card details */}
                      <div className="card-details">
                        <div>
                          <div className="card-tags">
                            <span className="tag-genre">{course.ltp}</span>
                            <span className="tag-genre is--amber">{course.credits} Credits</span>
                          </div>

                          <h3 className="card-title">
                            {course.title}
                          </h3>
                          <p className="card-desc">
                            {course.description}
                          </p>

                          {/* Extracted references section */}
                          {((course.textbooks && course.textbooks.length > 0) || (course.references && course.references.length > 0)) && (
                            <div className="reference-card">
                              <h4 className="reference-card-title">
                                <BookOpen style={{ width: "0.85rem", height: "0.85rem", color: "var(--color-orange)" }} /> Clickable References
                              </h4>
                              <div className="reference-list">
                                {course.textbooks.map((b, i) => (
                                  <a 
                                    key={i} 
                                    href={b.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="reference-link"
                                  >
                                    <span style={{ color: "var(--color-orange)" }}>•</span>
                                    <span style={{ flex: 1 }}>
                                      {b.title} ({b.author}) <ExternalLink style={{ display: "inline-block", width: "0.65rem", height: "0.65rem", marginLeft: "0.15rem", verticalAlign: "middle" }} />
                                    </span>
                                  </a>
                                ))}
                                {course.references.map((r, i) => (
                                  <a 
                                    key={i} 
                                    href={r.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="reference-link"
                                  >
                                    <span style={{ color: "var(--color-orange)" }}>•</span>
                                    <span style={{ flex: 1 }}>
                                      {r.title} ({r.author}) <ExternalLink style={{ display: "inline-block", width: "0.65rem", height: "0.65rem", marginLeft: "0.15rem", verticalAlign: "middle" }} />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Exam Parts list */}
                        <div>
                          <div className="resources-block-title">
                            <Layers style={{ width: "0.75rem", height: "0.75rem", verticalAlign: "middle", marginRight: "0.2rem" }} /> Incubated Resources
                          </div>
                          <div className="resources-grid">
                            {course.parts.map((part) => (
                              <button
                                key={part}
                                onClick={() => triggerDownload(course.code, part)}
                                className="download-btn"
                              >
                                <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{part}</span>
                                <Download className="download-btn-icon" />
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* HATCHED HISTORY TAB CONTENT */}
        {activeTab === "history" && (
          <div className="fade-in">
            <div className="history-panel">
              <div className="history-header">
                <div className="history-header-left">
                  <span style={{ fontSize: "1.75rem" }}>🪺</span>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Your Study Nest Box</h3>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "monospace" }}>Track downloaded exam eggs</p>
                  </div>
                </div>
                
                {history.length > 0 && (
                  <button onClick={clearHistory} className="history-clear-btn">
                    Clear Box
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.75rem" }}>🐣</span>
                  <p style={{ fontWeight: "bold", color: "var(--text-dark)", marginBottom: "0.25rem" }}>No eggs hatched yet!</p>
                  <p style={{ fontSize: "0.75rem" }}>Unbox resources on the main page to hatch study guides.</p>
                </div>
              ) : (
                <div className="history-list">
                  {history.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="history-item-left">
                        <div className="history-item-icon">
                          🐤
                        </div>
                        <div>
                          <h4 style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--text-dark)" }}>{item.partName}</h4>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.courseCode} - {item.courseTitle}</p>
                          <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: "0.25rem", fontFamily: "monospace" }}>{item.timestamp}</p>
                        </div>
                      </div>
                      <span className="history-item-tag">Hatched</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADMIN INCUBATOR TAB CONTENT */}
        {activeTab === "admin" && (
          <div className="fade-in">
            <div className="admin-grid">
              
              {/* Form 1: Add a course */}
              <div className="admin-card">
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Plus style={{ width: "1.25rem", height: "1.25rem", color: "var(--color-orange)" }} /> Bind New Course Book
                  </h3>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Add a new book shell to the StudyNest catalogue.</p>

                  <form onSubmit={handleCreateCourse} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Course Code</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 23ECE101" 
                          value={newCourse.code}
                          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                          className="input-flat"
                        />
                      </div>
                      <div className="form-group">
                        <label>Course Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Nature Engineering" 
                          value={newCourse.title}
                          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                          className="input-flat"
                        />
                      </div>
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                          className="input-flat"
                          style={{ cursor: "pointer" }}
                        >
                          <option value="SCI">SCI</option>
                          <option value="ENGG">ENGG</option>
                          <option value="HUM">HUM</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Credits</label>
                        <input 
                          type="number" 
                          value={newCourse.credits}
                          onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 1 })}
                          className="input-flat"
                        />
                      </div>
                      <div className="form-group">
                        <label>Semester</label>
                        <input 
                          type="number" 
                          value={newCourse.semester}
                          onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) || 1 })}
                          className="input-flat"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        rows="2"
                        placeholder="Course overview..."
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="input-flat"
                        style={{ resize: "none" }}
                      />
                    </div>

                    {/* Add textbooks */}
                    <div className="admin-subform">
                      <span className="admin-subform-title">Textbooks</span>
                      {newCourse.textbooks.map((b, i) => (
                        <div key={i} style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "500" }}>{b.title} by {b.author}</div>
                      ))}
                      <div className="admin-subform-row">
                        <input 
                          type="text" 
                          placeholder="Title" 
                          value={tempTextbook.title} 
                          onChange={(e) => setTempTextbook({ ...tempTextbook, title: e.target.value })}
                          className="input-flat"
                          style={{ fontSize: "0.7rem", padding: "6px 12px", flex: 1 }}
                        />
                        <input 
                          type="text" 
                          placeholder="Author" 
                          value={tempTextbook.author} 
                          onChange={(e) => setTempTextbook({ ...tempTextbook, author: e.target.value })}
                          className="input-flat"
                          style={{ fontSize: "0.7rem", padding: "6px 12px", width: "90px" }}
                        />
                        <button 
                          type="button" 
                          onClick={addTextbookToNewCourse}
                          className="btn-aardvark"
                          style={{ fontSize: "0.7rem", padding: "6px 16px", borderRadius: "8px" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Add references */}
                    <div className="admin-subform">
                      <span className="admin-subform-title">References</span>
                      {newCourse.references.map((r, i) => (
                        <div key={i} style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "500" }}>{r.title} by {r.author}</div>
                      ))}
                      <div className="admin-subform-row">
                        <input 
                          type="text" 
                          placeholder="Title" 
                          value={tempRef.title} 
                          onChange={(e) => setTempRef({ ...tempRef, title: e.target.value })}
                          className="input-flat"
                          style={{ fontSize: "0.7rem", padding: "6px 12px", flex: 1 }}
                        />
                        <input 
                          type="text" 
                          placeholder="Author" 
                          value={tempRef.author} 
                          onChange={(e) => setTempRef({ ...tempRef, author: e.target.value })}
                          className="input-flat"
                          style={{ fontSize: "0.7rem", padding: "6px 12px", width: "90px" }}
                        />
                        <button 
                          type="button" 
                          onClick={addReferenceToNewCourse}
                          className="btn-aardvark"
                          style={{ fontSize: "0.7rem", padding: "6px 16px", borderRadius: "8px" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-aardvark is--yellow"
                      style={{ width: "100%", padding: "12px", justifyContent: "center" }}
                    >
                      Confirm & Bind Course
                    </button>
                  </form>
                </div>
              </div>

              {/* Form 2: Upload PDFs */}
              <div className="admin-card">
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Plus style={{ width: "1.25rem", height: "1.25rem", color: "var(--color-orange)" }} /> Incubate Exam Resource
                  </h3>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Add a specific exam note, syllabus part, or question bank to a course book.</p>

                  <form onSubmit={handleAddResource} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div className="form-group">
                      <label>Target Course</label>
                      <select 
                        value={selectedCourseCode}
                        onChange={(e) => setSelectedCourseCode(e.target.value)}
                        className="input-flat"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="">-- Select Course --</option>
                        {courses.map(c => (
                          <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Resource / Part Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Midterm 2026 Solved" 
                        value={newResourcePartName}
                        onChange={(e) => setNewResourcePartName(e.target.value)}
                        className="input-flat"
                      />
                    </div>

                    <div className="form-group">
                      <label>Upload PDF File</label>
                      <div className="drag-area">
                        <input 
                          type="file" 
                          accept="application/pdf"
                          onChange={handleFileUpload}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>📁</span>
                        <p style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                          {uploadedFileName ? `Selected: ${uploadedFileName}` : "Drag and drop or click to upload PDF"}
                        </p>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-aardvark is--yellow"
                      style={{ width: "100%", padding: "12px", justifyContent: "center" }}
                    >
                      Confirm Resource
                    </button>
                  </form>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="btn-aardvark"
                    style={{ backgroundColor: "var(--color-orange)", color: "white", padding: "10px 20px" }}
                  >
                    <LogOut className="w-4 h-4" /> Exit Admin
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* LOGIN MODAL */}
      {showAdminLogin && (
        <div className="modal-overlay">
          <div className="hatch-modal">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <Key style={{ width: "1.25rem", height: "1.25rem", color: "var(--color-yellow)" }} /> Entering Incubator
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Incubator access is locked. Enter the passcode to proceed.</p>

            <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input 
                type="password" 
                placeholder="Enter passcode..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="input-flat"
                style={{ textAlign: "center" }}
                autoFocus
              />
              {adminError && <p style={{ fontSize: "0.7rem", color: "red", fontWeight: "bold" }}>{adminError}</p>}
              
              <div className="modal-footer-btns">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword("");
                    setAdminError("");
                  }}
                  className="tab-btn"
                  style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-aardvark is--yellow"
                  style={{ fontSize: "0.75rem", padding: "8px 20px" }}
                >
                  Confirm Chirp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EGG HATCHING DYNAMIC DOWNLOAD MODAL */}
      {hatchingState.active && (
        <div className="modal-overlay">
          <div className="hatch-modal">
            {hatchingState.stage === "egg" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "5rem", width: "8rem", height: "8rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  🥚
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: "1rem" }}>Exam egg found in nest...</p>
              </div>
            )}

            {hatchingState.stage === "shaking" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="egg-shaking" style={{ fontSize: "5rem", width: "8rem", height: "8rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContext: "center" }}>
                  🥚
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-orange)", fontWeight: "bold", fontFamily: "monospace", marginTop: "1rem" }}>Incubating study notes...</p>
              </div>
            )}

            {hatchingState.stage === "cracked" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="egg-shaking" style={{ fontSize: "5rem", width: "8rem", height: "8rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContext: "center" }}>
                  🐣
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-orange)", fontWeight: "bold", fontFamily: "monospace", marginTop: "1rem" }}>*Chirp Crack Chirp!*</p>
              </div>
            )}

            {hatchingState.stage === "hatched" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="floating" style={{ fontSize: "5rem", width: "8rem", height: "8rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContext: "center", color: "var(--color-green)" }}>
                  🐤
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-green)", fontWeight: "extrabold", fontFamily: "monospace", marginTop: "1rem" }}>Resource Hatched! Check Downloads.</p>
              </div>
            )}

            <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--text-dark)", marginBottom: "0.25rem" }}>
              {hatchingState.stage === "hatched" ? "Study Bird Flying!" : "Hatching Resource"}
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {hatchingState.partName} - {hatchingState.courseCode}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-wrap">
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
          Made with Love by the StudyNest Team. All study notes incubated locally.
        </p>
        <p 
          onClick={() => {
            if (isAdmin) {
              setActiveTab("admin");
            } else {
              setShowAdminLogin(true);
            }
          }}
          className="footer-admin-link"
        >
          🔐 Admin Entrance (Password: chirp)
        </p>
      </footer>
      
    </div>
  );
}
