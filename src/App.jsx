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
  ExternalLink,
  Layers,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { initialCourses } from "./data";

// Helper for assignable theme colors to courses
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
      
      // Header theme: Cozy dark navy and amber
      doc.setFillColor(21, 27, 38); // var(--bg-navy)
      doc.rect(0, 0, 210, 42, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("StudyNest", 15, 26);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(255, 242, 0); // Bold yellow
      doc.text("UNBOX STORIES WORTH STUDYING", 132, 25);

      // Course Info
      doc.setTextColor(21, 27, 38);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`${course.code}: ${course.title}`, 15, 58);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(`Incubated Resource: ${partName}`, 15, 68);
      doc.line(15, 73, 195, 73);

      // Content section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Syllabus & Course Scope", 15, 85);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(course.description, 180);
      doc.text(splitDesc, 15, 93);

      // Textbooks & References lists
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

      // Footer
      doc.setFillColor(255, 242, 0); // Yellow footer
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
    <div className="min-h-screen flex flex-col pb-16">
      
      {/* Dynamic Yellow Aardvark-style Header Banner */}
      <section className="bg-[#fff200] border-b-4 border-[#151b26] py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl floating">🪺</span>
              <span className="font-heading font-extrabold uppercase tracking-widest text-xs px-3 py-1 rounded-full bg-[#151b26] text-white">
                Incubator Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-[#151b26] leading-none mb-6">
              Unbox study guides worth talking about.
            </h1>
            <p className="text-base md:text-lg text-[#151b26] font-medium max-w-xl mb-8 leading-relaxed">
              Join the book club that's anything but traditional. Pick your courses, unbox reference books, and hatch premium PDF study materials straight to your local nest.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActiveTab("search")}
                className="btn-aardvark"
              >
                Start Unboxing <ChevronRight className="w-5 h-5" />
              </button>
              <div className="handwritten">Syllabus scanned & sorted by hand 🦉</div>
            </div>
          </div>

          {/* Large Owl Mascot Visual */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-white border-4 border-[#151b26] shadow-flat flex flex-col items-center justify-center p-6 relative float-mascot">
            <span className="text-8xl">🦉</span>
            <div className="absolute -bottom-5 bg-[#ff5a36] text-white border-2 border-[#151b26] px-4 py-1 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider">
              Nest Guard
            </div>
          </div>

        </div>
      </section>

      {/* Main navigation header */}
      <nav className="border-b-2 border-slate-200 bg-white py-4 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪹</span>
            <span className="font-heading font-extrabold text-xl text-[#151b26]">StudyNest</span>
          </div>

          {/* Tabs navigation */}
          <div className="flex items-center gap-2">
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
      <div className="max-w-6xl mx-auto w-full px-4 mt-8">
        <div 
          onClick={changeOwlQuote}
          className="bg-white border-2 border-[#151b26] p-4 rounded-2xl shadow-flat-btn hover:shadow-flat-btn-hover hover:translate-x-0.5 hover:translate-y-0.5 transition cursor-pointer flex items-center gap-3 max-w-xl"
        >
          <span className="text-2xl">💡</span>
          <p className="text-sm text-slate-700 italic">"{owlQuote}"</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 mt-8 flex-1">
        
        {/* SEARCH TAB CONTENT */}
        {activeTab === "search" && (
          <div className="flex flex-col gap-8 fade-in">
            
            {/* Flat-style search and filter headers */}
            <div className="bg-white border-2 border-[#151b26] p-6 rounded-3xl shadow-flat flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search course titles, codes, references, or parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full input-flat pl-12"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  value={selectedSemester} 
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="input-flat py-3 cursor-pointer"
                >
                  <option value="all">All Semesters</option>
                  <option value="1">1st Sem</option>
                  <option value="2">2nd Sem</option>
                </select>

                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-flat py-3 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="SCI">SCI</option>
                  <option value="ENGG">ENGG</option>
                  <option value="HUM">HUM</option>
                </select>
              </div>
            </div>

            {/* Courses catalogue */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-white border-2 border-[#151b26] rounded-3xl p-8 shadow-flat">
                <span className="text-5xl block mb-4">🍂</span>
                <h3 className="text-xl font-bold mb-2">No nests found!</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No study guides match your queries. Try resetting filters or incubate a new one in the admin section!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCourses.map((course, idx) => {
                  const theme = CARD_THEMES[idx % CARD_THEMES.length];
                  return (
                    <div 
                      key={course.code} 
                      className="course-card p-6 flex flex-col sm:flex-row gap-6 relative"
                    >
                      {/* Styled Aardvark Ears (Nest Wings) */}
                      <div className="nest-wings" style={{ color: theme.ears }}>
                        <svg className="nest-wing" fill="currentColor" viewBox="0 0 44 45">
                          <path d="M1.335.198c.671-.316 1.5-.254 2.186.187C27.678 16.847 39.839 36.953 44 45h-6.048c-2.382-1.604-6.964-3.674-15.652-4.814C2.999 37.666-.665 14.174.09 2.04.152 1.28.589.515 1.335.198Z" />
                        </svg>
                        <svg className="nest-wing" fill="currentColor" viewBox="0 0 29 80">
                          <path d="M19.388.879c.667-.771 1.647-1.018 2.559-.807.912.21 1.682.956 1.926 1.861C34.595 38.09 25.79 69.237 21.823 80h-4.188c-.17-4.22-2.739-13.318-10.975-22.064-8.493-9.099-8.88-21.913-1.063-37.23C11.221 9.603 19.091 1.266 19.388.879Z" />
                        </svg>
                      </div>

                      {/* Cover spine image container */}
                      <div className="book-container mx-auto sm:mx-0">
                        <div className="book-cover h-full" style={{ backgroundColor: theme.bg }}>
                          <div className="book-spine"></div>
                          <div className="h-full flex flex-col justify-between p-3 pt-6 text-[#151b26]">
                            <div className="font-heading font-extrabold text-xs tracking-wider border-b border-black/15 pb-1">
                              {course.category}
                            </div>
                            <div className="font-heading font-extrabold text-lg rotate-0 text-center uppercase tracking-tighter leading-tight break-all">
                              {course.code}
                            </div>
                            <div className="text-[9px] font-bold text-center opacity-80 uppercase font-mono">
                              Sem {course.semester}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course details right side */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="tag-genre bg-slate-100">{course.ltp}</span>
                            <span className="tag-genre bg-amber-100">{course.credits} Credits</span>
                          </div>

                          <h3 className="text-xl font-extrabold text-[#151b26] mb-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 mb-4 leading-normal line-clamp-3">
                            {course.description}
                          </p>

                          {/* Extracted references section */}
                          {((course.textbooks && course.textbooks.length > 0) || (course.references && course.references.length > 0)) && (
                            <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                              <h4 className="text-[10px] font-bold text-[#151b26] uppercase tracking-wider mb-2 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#ff5a36]" /> Clickable References
                              </h4>
                              <div className="flex flex-col gap-1.5">
                                {course.textbooks.map((b, i) => (
                                  <a 
                                    key={i} 
                                    href={b.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-slate-700 hover:text-black font-semibold flex items-start gap-1 transition"
                                  >
                                    <span className="text-[#ff5a36] font-bold">•</span>
                                    <span className="flex-1 hover:underline">
                                      {b.title} ({b.author}) <ExternalLink className="inline-block w-2.5 h-2.5 ml-0.5 text-slate-400" />
                                    </span>
                                  </a>
                                ))}
                                {course.references.map((r, i) => (
                                  <a 
                                    key={i} 
                                    href={r.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-slate-700 hover:text-black font-semibold flex items-start gap-1 transition"
                                  >
                                    <span className="text-[#ff5a36] font-bold">•</span>
                                    <span className="flex-1 hover:underline">
                                      {r.title} ({r.author}) <ExternalLink className="inline-block w-2.5 h-2.5 ml-0.5 text-slate-400" />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Exam Parts list */}
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5" /> Incubator Resources
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {course.parts.map((part) => (
                              <button
                                key={part}
                                onClick={() => triggerDownload(course.code, part)}
                                className="text-left bg-white hover:bg-slate-100 border border-[#151b26] text-[10px] px-3 py-2 rounded-xl font-bold flex items-center justify-between group transition"
                              >
                                <span className="truncate pr-1">{part}</span>
                                <Download className="w-3 h-3 text-[#151b26] flex-shrink-0" />
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

        {/* HATCHED HISTROY TAB CONTENT */}
        {activeTab === "history" && (
          <div className="fade-in max-w-xl mx-auto w-full">
            <div className="bg-white border-2 border-[#151b26] p-6 rounded-3xl shadow-flat">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🪺</span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#151b26]">Your Study Nest Box</h3>
                    <p className="text-xs text-slate-500 font-mono">Track downloaded exam eggs</p>
                  </div>
                </div>
                
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-xs font-bold rounded-full transition"
                  >
                    Clear Box
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <span className="text-5xl block mb-3">🐣</span>
                  <p className="font-bold text-[#151b26] mb-1">No eggs hatched yet!</p>
                  <p className="text-xs">Unbox resources on the main page to hatch study guides.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-lg mt-0.5">
                          🐤
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#151b26] leading-tight">{item.partName}</h4>
                          <p className="text-xs text-slate-500">{item.courseCode} - {item.courseTitle}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-mono">{item.timestamp}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200">Hatched</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADMIN INCUBATOR TAB CONTENT */}
        {activeTab === "admin" && (
          <div className="fade-in max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Form 1: Add a course */}
              <div className="bg-white border-2 border-[#151b26] p-6 rounded-3xl shadow-flat">
                <h3 className="text-lg font-extrabold text-[#151b26] mb-2 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#ff5a36]" /> Bind New Course Book
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">Add a new book shell to the StudyNest catalogue.</p>

                <form onSubmit={handleCreateCourse} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Course Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 23ECE101" 
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                        className="input-flat py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Course Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Nature Engineering" 
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="input-flat py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Category</label>
                      <select 
                        value={newCourse.category}
                        onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                        className="input-flat py-2 cursor-pointer"
                      >
                        <option value="SCI">SCI</option>
                        <option value="ENGG">ENGG</option>
                        <option value="HUM">HUM</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Credits</label>
                      <input 
                        type="number" 
                        value={newCourse.credits}
                        onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 1 })}
                        className="input-flat py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Semester</label>
                      <input 
                        type="number" 
                        value={newCourse.semester}
                        onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) || 1 })}
                        className="input-flat py-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold uppercase">Description</label>
                    <textarea 
                      rows="2"
                      placeholder="Course overview..."
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="input-flat py-2 resize-none"
                    />
                  </div>

                  {/* Add textbooks */}
                  <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-[#ff5a36] uppercase tracking-wider">Textbooks</span>
                    {newCourse.textbooks.map((b, i) => (
                      <div key={i} className="text-[11px] text-slate-600 font-medium">{b.title} by {b.author}</div>
                    ))}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Title" 
                        value={tempTextbook.title} 
                        onChange={(e) => setTempTextbook({ ...tempTextbook, title: e.target.value })}
                        className="input-flat py-1.5 text-xs flex-1"
                      />
                      <input 
                        type="text" 
                        placeholder="Author" 
                        value={tempTextbook.author} 
                        onChange={(e) => setTempTextbook({ ...tempTextbook, author: e.target.value })}
                        className="input-flat py-1.5 text-xs w-24"
                      />
                      <button 
                        type="button" 
                        onClick={addTextbookToNewCourse}
                        className="px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition border border-black/20"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Add references */}
                  <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-[#ff5a36] uppercase tracking-wider">References</span>
                    {newCourse.references.map((r, i) => (
                      <div key={i} className="text-[11px] text-slate-600 font-medium">{r.title} by {r.author}</div>
                    ))}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Title" 
                        value={tempRef.title} 
                        onChange={(e) => setTempRef({ ...tempRef, title: e.target.value })}
                        className="input-flat py-1.5 text-xs flex-1"
                      />
                      <input 
                        type="text" 
                        placeholder="Author" 
                        value={tempRef.author} 
                        onChange={(e) => setTempRef({ ...tempRef, author: e.target.value })}
                        className="input-flat py-1.5 text-xs w-24"
                      />
                      <button 
                        type="button" 
                        onClick={addReferenceToNewCourse}
                        className="px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition border border-black/20"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-aardvark is--yellow py-3 flex justify-center"
                  >
                    Confirm & Bind Course
                  </button>
                </form>
              </div>

              {/* Form 2: Upload PDFs */}
              <div className="bg-white border-2 border-[#151b26] p-6 rounded-3xl shadow-flat flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-[#151b26] mb-2 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#ff5a36]" /> Incubate Exam Resource
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Add a specific exam note, syllabus part, or question bank to a course book.</p>

                  <form onSubmit={handleAddResource} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Target Course</label>
                      <select 
                        value={selectedCourseCode}
                        onChange={(e) => setSelectedCourseCode(e.target.value)}
                        className="input-flat py-2 cursor-pointer"
                      >
                        <option value="">-- Select Course --</option>
                        {courses.map(c => (
                          <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Resource / Part Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Midterm 2026 Solved" 
                        value={newResourcePartName}
                        onChange={(e) => setNewResourcePartName(e.target.value)}
                        className="input-flat py-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-500 font-bold uppercase">Upload PDF File</label>
                      <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-black/50 rounded-2xl text-center relative transition">
                        <input 
                          type="file" 
                          accept="application/pdf"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-3xl block mb-2">📁</span>
                        <p className="text-xs font-bold">
                          {uploadedFileName ? `Selected: ${uploadedFileName}` : "Drag and drop or click to upload PDF"}
                        </p>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full btn-aardvark is--yellow py-3 flex justify-center"
                    >
                      Confirm Resource
                    </button>
                  </form>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6 flex justify-end">
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="px-4 py-2 bg-[#ff5a36] text-white font-bold rounded-full flex items-center gap-1.5 transition"
                  >
                    <LogOut className="w-4 h-4" /> Exit Admin Panel
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* LOGIN MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="hatch-modal">
            <h3 className="text-xl font-heading font-extrabold mb-1 flex items-center justify-center gap-2">
              <Key className="w-5 h-5 text-amber-500" /> Entering Incubator
            </h3>
            <p className="text-xs text-slate-500 mb-6">Incubator access is locked. Enter the passcode to proceed.</p>

            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="Enter passcode..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full input-flat text-center"
                autoFocus
              />
              {adminError && <p className="text-xs text-red-500 font-bold">{adminError}</p>}
              
              <div className="flex gap-3 justify-center mt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword("");
                    setAdminError("");
                  }}
                  className="px-5 py-2.5 bg-slate-200 text-slate-800 rounded-full text-xs font-bold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full text-xs font-bold transition border border-black/20"
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
          <div className="hatch-modal">
            {hatchingState.stage === "egg" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center">
                  🥚
                </div>
                <p className="text-slate-500 text-xs mt-4 font-mono">Exam egg found in nest...</p>
              </div>
            )}

            {hatchingState.stage === "shaking" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center egg-shake-active">
                  🥚
                </div>
                <p className="text-amber-500 text-xs font-bold mt-4 font-mono">Incubating study notes...</p>
              </div>
            )}

            {hatchingState.stage === "cracked" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center egg-shake-active">
                  🐣
                </div>
                <p className="text-amber-500 text-xs font-bold mt-4 font-mono">*Chirp Crack Chirp!*</p>
              </div>
            )}

            {hatchingState.stage === "hatched" && (
              <div className="mb-6">
                <div className="text-8xl w-32 h-32 mx-auto flex items-center justify-center animate-bounce text-emerald-500">
                  🐤
                </div>
                <p className="text-emerald-500 text-xs font-extrabold mt-4 font-mono">Resource Hatched! Check Downloads.</p>
              </div>
            )}

            <h3 className="text-lg font-heading font-extrabold text-[#151b26] mb-1">
              {hatchingState.stage === "hatched" ? "Study Bird Flying!" : "Hatching Resource"}
            </h3>
            <p className="text-xs text-slate-500">
              {hatchingState.partName} - {hatchingState.courseCode}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-4 mt-20 text-center border-t-2 border-slate-200 pt-6">
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
          className="text-[10px] text-slate-400 hover:text-amber-500 mt-2 cursor-pointer select-none transition"
        >
          🔐 Admin Entrance (Password: chirp)
        </p>
      </footer>
      
    </div>
  );
}
