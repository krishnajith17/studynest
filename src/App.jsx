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
  Award, 
  Key, 
  LogOut,
  Moon,
  Sun,
  ExternalLink,
  Info,
  Layers
} from "lucide-react";
import { initialCourses } from "./data";

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
  
  // Egg Hatching Animation State
  const [hatchingState, setHatchingState] = useState({
    active: false,
    stage: "egg", // egg, shaking, cracked, hatched, done
    courseCode: "",
    partName: ""
  });

  // Admin Panel State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // New Course Form State
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

  // New Resource Form State
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [newResourcePartName, setNewResourcePartName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileBase64, setUploadedFileBase64] = useState("");

  // Temp reference input states
  const [tempTextbook, setTempTextbook] = useState({ title: "", author: "", publisher: "", year: "", link: "" });
  const [tempRef, setTempRef] = useState({ title: "", author: "", publisher: "", year: "", link: "" });
  const [tempPart, setTempPart] = useState("");

  // Funny Quotes & Owl Guard state
  const [owlQuote, setOwlQuote] = useState("Welcome to StudyNest! Chirp! Select a course and start studying.");
  
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

  // Add search term matching
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
      setOwlQuote("Admin verified! You have access to the egg incubator (control panel).");
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
    setOwlQuote(`Successfully incubated course: ${createdCourse.title}!`);
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
        // If file uploaded, store it in metadata (simulated)
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
    setOwlQuote(`Added exam resource "${newResourcePartName}" to ${selectedCourseCode}!`);
  };

  const triggerDownload = (courseCode, partName) => {
    const course = courses.find(c => c.code === courseCode);
    
    setHatchingState({
      active: true,
      stage: "egg",
      courseCode,
      partName
    });

    // Step 1: Shake the egg
    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "shaking" }));
    }, 400);

    // Step 2: Crack the egg
    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "cracked" }));
    }, 1500);

    // Step 3: Hatch the baby bird and trigger download
    setTimeout(() => {
      setHatchingState(prev => ({ ...prev, stage: "hatched" }));
      generateAndSavePDF(course, partName);
    }, 2500);

    // Step 4: Reset state
    setTimeout(() => {
      setHatchingState({ active: false, stage: "egg", courseCode: "", partName: "" });
      setOwlQuote(`A baby bird flew away with your PDF: ${partName}!`);
    }, 4500);
  };

  const generateAndSavePDF = (course, partName) => {
    // Check if there is an uploaded custom file
    if (course.uploadedFiles && course.uploadedFiles[partName]) {
      const customFile = course.uploadedFiles[partName];
      const link = document.createElement("a");
      link.href = customFile.data;
      link.download = customFile.name || `${course.code}_${partName.replace(/\s+/g, "_")}.pdf`;
      link.click();
    } else {
      // Generate a premium dynamic PDF using jsPDF
      const doc = new jsPDF();
      
      // Header theme: StudyNest Cozy green/amber
      doc.setFillColor(11, 78, 59); // nest-green
      doc.rect(0, 0, 210, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("StudyNest", 15, 25);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Premium Exam Study Resource", 145, 25);

      // Course Info
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`${course.code}: ${course.title}`, 15, 55);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(12);
      doc.text(`Resource: ${partName}`, 15, 65);
      doc.line(15, 70, 195, 70);

      // Content section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Course Overview & Syllabus", 15, 82);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(course.description, 180);
      doc.text(splitDesc, 15, 90);

      // Textbooks & References lists
      let yOffset = 115;
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
      doc.text("Reference Materials:", 15, yOffset);
      yOffset += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      course.references.forEach((ref, i) => {
        const text = `${i + 1}. ${ref.title} by ${ref.author} (${ref.publisher}, ${ref.year})`;
        const splitText = doc.splitTextToSize(text, 185);
        doc.text(splitText, 15, yOffset);
        yOffset += splitText.length * 5;
      });

      // Footer
      doc.setFillColor(245, 158, 11); // Amber accent
      doc.rect(0, 287, 210, 10, "F");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("Generated with Love by StudyNest. Keep your feathers aligned and fly high!", 50, 292);

      doc.save(`${course.code}_${partName.replace(/\s+/g, "_")}.pdf`);
    }

    // Add to history
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
    setOwlQuote("Your nest history has been blown away!");
  };

  return (
    <div className="min-height-100vh flex flex-col p-4 md:p-8 max-w-6xl mx-auto">
      
      {/* Header section with funny logo & quote guard */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-[rgba(245,158,11,0.15)]">
        <div className="flex items-center gap-4 cursor-pointer" onClick={changeOwlQuote}>
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] floating">
            <span className="text-3xl">🪺</span>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              StudyNest <span className="text-amber-500 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">V1.0</span>
            </h1>
            <p className="text-sm text-slate-400 font-mono">Exam Resource Incubator</p>
          </div>
        </div>

        {/* Owl mascot with quote bubble */}
        <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 max-w-md w-full glass">
          <div className="text-4xl animate-bounce">🦉</div>
          <div className="flex-1">
            <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">Nest Guard</p>
            <p className="text-sm text-slate-200 italic">"{owlQuote}"</p>
          </div>
        </div>
      </header>

      {/* Tabs navigation & options */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 glass">
          <button 
            onClick={() => setActiveTab("search")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === "search" ? "bg-amber-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            <Search className="w-4 h-4" /> Search Nest
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === "history" ? "bg-amber-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            <HistoryIcon className="w-4 h-4" /> Studied Eggs
            {history.length > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{history.length}</span>}
          </button>
          <button 
            onClick={() => {
              if (isAdmin) {
                setActiveTab("admin");
              } else {
                setShowAdminLogin(true);
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === "admin" ? "bg-amber-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            <Sparkles className="w-4 h-4" /> Incubator
          </button>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-400 text-sm font-medium">
          <span>🎯</span>
          <span>Eggs Hatched: <strong className="text-white text-base">{history.length}</strong></span>
        </div>
      </div>

      {/* SEARCH TAB CONTENT */}
      {activeTab === "search" && (
        <div className="flex flex-col gap-6 fade-in">
          {/* Filters card */}
          <div className="p-6 rounded-2xl glass flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search course title, code, references, or exam parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 search-glow"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select 
                value={selectedSemester} 
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm cursor-pointer search-glow flex-1 md:flex-none"
              >
                <option value="all">All Semesters</option>
                <option value="1">Semester I</option>
                <option value="2">Semester II</option>
              </select>

              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm cursor-pointer search-glow flex-1 md:flex-none"
              >
                <option value="all">All Categories</option>
                <option value="SCI">Basic Sciences (SCI)</option>
                <option value="ENGG">Engineering (ENGG)</option>
                <option value="HUM">Humanities (HUM)</option>
              </select>
            </div>
          </div>

          {/* Courses list */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl p-8 glass">
              <span className="text-5xl block mb-4">💨</span>
              <h3 className="text-xl font-bold text-white mb-2">The nest is empty!</h3>
              <p className="text-slate-400 max-w-sm mx-auto">No courses match your search criteria. Try removing filters or add a new course in the Incubator tab!</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div key={course.code} className="p-6 rounded-2xl glass flex flex-col justify-between hover:-translate-y-1 transition duration-300 border-t-2 border-t-amber-500/50">
                  <div>
                    {/* Course Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-xs px-2.5 py-1 rounded-full font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-500 uppercase tracking-wide">
                        {course.category} | L-T-P: {course.ltp}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Sem {course.semester}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500">
                      {course.code} - {course.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Extracted references section */}
                    {((course.textbooks && course.textbooks.length > 0) || (course.references && course.references.length > 0)) && (
                      <div className="mb-6 p-4 bg-slate-950/40 rounded-xl border border-slate-800/80">
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Extracted References
                        </h4>
                        <div className="flex flex-col gap-2">
                          {course.textbooks.map((book, i) => (
                            <a 
                              key={i} 
                              href={book.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-slate-300 hover:text-white flex items-start gap-1 transition"
                            >
                              <span className="text-slate-500">•</span>
                              <span className="flex-1 leading-normal font-medium hover:underline">
                                {book.title} (Textbook) <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                              </span>
                            </a>
                          ))}
                          {course.references.map((ref, i) => (
                            <a 
                              key={i} 
                              href={ref.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-slate-300 hover:text-white flex items-start gap-1 transition"
                            >
                              <span className="text-slate-500">•</span>
                              <span className="flex-1 leading-normal font-medium hover:underline">
                                {ref.title} (Reference) <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resource parts to download */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Incubated Resources
                    </h4>
                    <div className="flex flex-col gap-2">
                      {course.parts.map((part) => (
                        <button
                          key={part}
                          onClick={() => triggerDownload(course.code, part)}
                          className="w-full text-left bg-slate-900/60 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-xs px-3.5 py-2.5 rounded-xl text-slate-200 hover:text-white flex items-center justify-between group transition btn-funny"
                        >
                          <span className="truncate pr-2 font-medium">{part}</span>
                          <span className="bg-slate-800 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 p-1.5 rounded-lg transition duration-300 flex items-center justify-center">
                            <Download className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HISTORY TAB CONTENT */}
      {activeTab === "history" && (
        <div className="fade-in max-w-2xl mx-auto w-full">
          <div className="p-6 rounded-2xl glass">
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥚</span>
                <div>
                  <h3 className="text-xl font-bold text-white">Incubated Eggs History</h3>
                  <p className="text-xs text-slate-400 font-mono">Track downloaded exam material</p>
                </div>
              </div>
              
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <span className="text-4xl block mb-3">🐣</span>
                <p className="font-semibold text-white mb-1">No eggs hatched yet!</p>
                <p className="text-xs">Go to the search tab and download resources to hatch your first study bird.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {history.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-lg mt-0.5 text-emerald-400">
                        🐥
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{item.partName}</h4>
                        <p className="text-xs text-slate-400">{item.courseCode} - {item.courseTitle}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">{item.timestamp}</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Hatched</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN PANEL TAB CONTENT */}
      {activeTab === "admin" && (
        <div className="fade-in max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1: Add a course */}
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" /> Incubate New Course
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Add a new course structure to the local StudyNest catalogue.</p>

              <form onSubmit={handleCreateCourse} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Course Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 23ECE101" 
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Course Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Nature Engineering" 
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Category</label>
                    <select 
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white search-glow cursor-pointer"
                    >
                      <option value="SCI">SCI</option>
                      <option value="ENGG">ENGG</option>
                      <option value="HUM">HUM</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Credits</label>
                    <input 
                      type="number" 
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 1 })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Semester</label>
                    <input 
                      type="number" 
                      value={newCourse.semester}
                      onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) || 1 })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Description</label>
                  <textarea 
                    rows="2"
                    placeholder="Provide short course overview..."
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow resize-none"
                  />
                </div>

                {/* Adding Textbooks */}
                <div className="flex flex-col gap-2 p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Textbooks</span>
                  {newCourse.textbooks.map((b, i) => (
                    <div key={i} className="text-xs text-slate-300">{b.title} by {b.author}</div>
                  ))}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Book Title" 
                      value={tempTextbook.title} 
                      onChange={(e) => setTempTextbook({ ...tempTextbook, title: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white search-glow flex-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Author" 
                      value={tempTextbook.author} 
                      onChange={(e) => setTempTextbook({ ...tempTextbook, author: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white search-glow w-24"
                    />
                    <button 
                      type="button" 
                      onClick={addTextbookToNewCourse}
                      className="px-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Adding References */}
                <div className="flex flex-col gap-2 p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">References</span>
                  {newCourse.references.map((r, i) => (
                    <div key={i} className="text-xs text-slate-300">{r.title} by {r.author}</div>
                  ))}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Reference Title" 
                      value={tempRef.title} 
                      onChange={(e) => setTempRef({ ...tempRef, title: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white search-glow flex-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Author" 
                      value={tempRef.author} 
                      onChange={(e) => setTempRef({ ...tempRef, author: e.target.value })}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white search-glow w-24"
                    />
                    <button 
                      type="button" 
                      onClick={addReferenceToNewCourse}
                      className="px-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  Confirm & Incubate Course
                </button>
              </form>
            </div>

            {/* Column 2: Upload Resource PDF */}
            <div className="p-6 rounded-2xl glass flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" /> Incubate Exam Resource
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">Add a specific exam resource (Syllabus part, Question paper, or Notes) to a course.</p>

                <form onSubmit={handleAddResource} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Target Course</label>
                    <select 
                      value={selectedCourseCode}
                      onChange={(e) => setSelectedCourseCode(e.target.value)}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow cursor-pointer"
                    >
                      <option value="">-- Select a Course --</option>
                      {courses.map(c => (
                        <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Resource Name / Part</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2026 Midterm Solved Papers" 
                      value={newResourcePartName}
                      onChange={(e) => setNewResourcePartName(e.target.value)}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white search-glow"
                    />
                  </div>

                  {/* PDF Upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Upload PDF File (Optional)</label>
                    <div className="p-6 bg-slate-950/60 border border-dashed border-slate-800 rounded-xl text-center relative hover:border-amber-500/50 transition">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-3xl block mb-2">📁</span>
                      <p className="text-xs text-slate-400 font-semibold">
                        {uploadedFileName ? `Selected: ${uploadedFileName}` : "Drag and drop or click to upload PDF"}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">Files are saved inside local simulated DB</p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    Incubate Exam Material
                  </button>
                </form>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-6">
                <button
                  onClick={() => setIsAdmin(false)}
                  className="px-4 py-2 bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ml-auto"
                >
                  <LogOut className="w-4 h-4" /> Exit Admin
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ADMIN PASSWORD LOGIN MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm glass fade-in shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" /> Entering Incubator
            </h3>
            <p className="text-xs text-slate-400 mb-6">Incubator access is locked. Enter the passcode to proceed.</p>

            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="Enter passcode..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm search-glow"
                autoFocus
              />
              {adminError && <p className="text-xs text-red-500 font-semibold">{adminError}</p>}
              
              <div className="flex gap-3 justify-end mt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword("");
                    setAdminError("");
                  }}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition"
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
        <div className="fixed inset-0 bg-slate-950/90 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="text-center max-w-sm w-full fade-in p-8 rounded-3xl glass border border-amber-500/20">
            {hatchingState.stage === "egg" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center">
                  🥚
                </div>
                <p className="text-slate-400 text-sm mt-4 font-mono">Exam egg found in nest...</p>
              </div>
            )}

            {hatchingState.stage === "shaking" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center egg-shaking">
                  🥚
                </div>
                <p className="text-amber-500 text-sm font-bold mt-4 font-mono">Incubating study notes...</p>
              </div>
            )}

            {hatchingState.stage === "cracked" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center egg-shaking">
                  🐣
                </div>
                <p className="text-amber-400 text-sm font-bold mt-4 font-mono">*Chirp Crack Chirp!*</p>
              </div>
            )}

            {hatchingState.stage === "hatched" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center animate-bounce text-emerald-400">
                  🐤
                </div>
                <p className="text-emerald-400 text-sm font-extrabold mt-4 font-mono">Resource Hatched! Check Downloads.</p>
              </div>
            )}

            <h3 className="text-lg font-bold text-white mb-1">
              {hatchingState.stage === "hatched" ? "Study Bird Flying!" : "Hatching Resource"}
            </h3>
            <p className="text-xs text-slate-400">
              {hatchingState.partName} - {hatchingState.courseCode}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center pb-8 border-t border-[rgba(245,158,11,0.15)] pt-6">
        <p className="text-xs text-slate-500 font-mono">
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
          className="text-[10px] text-slate-600 hover:text-amber-500/50 mt-2 cursor-pointer select-none transition"
        >
          🔐 Admin Entrance (Password: chirp)
        </p>
      </footer>
      
    </div>
  );
}
