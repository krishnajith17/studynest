import React, { useState } from "react";
import { 
  Globe, 
  ExternalLink, 
  Cpu, 
  PlayCircle, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Zap,
  Activity,
  Code2
} from "lucide-react";

export default function LearningHub() {
  const [activeTab, setActiveTab] = useState("simulators"); // simulators, nptel, viva, guides

  const SIMULATORS = [
    {
      title: "Falstad Circuit Simulator",
      category: "Electrical Engineering",
      badge: "Real-time Simulation",
      url: "https://www.falstad.com/circuit/",
      icon: Zap,
      color: "#0ea5e9",
      desc: "Interactive in-browser circuit simulator. Visualize current flow, test AC/DC circuits, RLC resonance, and verify Thevenin/Norton equivalents."
    },
    {
      title: "Desmos 3D & 2D Grapher",
      category: "Engineering Mathematics",
      badge: "Math Visualizer",
      url: "https://www.desmos.com/calculator",
      icon: Activity,
      color: "#6366f1",
      desc: "Plot functions, trace derivatives, visualize limits, analyze continuity, and compute multivariable vector fields and surfaces."
    },
    {
      title: "VisuAlgo: Algorithm Visualizer",
      category: "Algorithmic Thinking",
      badge: "Algorithm Animator",
      url: "https://visualgo.net/en",
      icon: Code2,
      color: "#10b981",
      desc: "Step-by-step visual execution of sorting algorithms (Bubble, Selection, Insertion) and search trees with Big-O comparisons."
    },
    {
      title: "AskNature Biomimicry Database",
      category: "Nature Inspired Engineering",
      badge: "Biological Innovation",
      url: "https://asknature.org/",
      icon: Sparkles,
      color: "#f59e0b",
      desc: "Official catalog of over 1,700 biological mechanisms translated into engineering innovations (e.g. Kingfisher beak, lotus effect, shark skin)."
    },
    {
      title: "Python Tutor: Code Execution",
      category: "Problem Solving",
      badge: "Memory Inspector",
      url: "https://pythontutor.com/",
      icon: Cpu,
      color: "#8b5cf6",
      desc: "Step through Python and C code frame-by-frame to see stack frames, pointer bindings, and memory allocations in real-time."
    },
    {
      title: "PhET Semiconductor Physics",
      category: "Semiconductors",
      badge: "Physics Lab",
      url: "https://phet.colorado.edu/en/simulations/semiconductor",
      icon: Layers,
      color: "#ec4899",
      desc: "Simulate semiconductor doping, energy band gaps, electron-hole recombination, and current flow across PN junctions."
    },
    {
      title: "MHRD Virtual Labs (IIT)",
      category: "Electrical Lab",
      badge: "Govt. Initiative",
      url: "https://www.vlab.co.in/broad-division-electrical-engineering",
      icon: BookOpen,
      color: "#06b6d4",
      desc: "Perform verified virtual experiments for Kirchhoff's Laws, Superposition, and DC motor characteristics as per engineering curricula."
    }
  ];

  const LECTURES = [
    {
      course: "23MAT124: Mathematics I",
      title: "3Blue1Brown: Essence of Linear Algebra",
      provider: "Grant Sanderson",
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
      desc: "The geometric intuition behind vectors, matrices, determinants, dot products, and eigenvalues."
    },
    {
      course: "23MAT124: Mathematics I",
      title: "3Blue1Brown: Essence of Calculus",
      provider: "Grant Sanderson",
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
      desc: "Visualizing the Fundamental Theorem of Calculus, derivatives, and infinite series."
    },
    {
      course: "23ECE103: Electrical Engineering",
      title: "NPTEL: Basic Electrical Circuits",
      provider: "Prof. Nagendra Krishnapura (IIT Madras)",
      url: "https://nptel.ac.in/courses/108101091",
      desc: "In-depth circuit analysis, nodal/mesh equations, network theorems, and steady-state AC response."
    },
    {
      course: "23ECE104: Semiconductors",
      title: "MIT 6.012: Microelectronic Devices",
      provider: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/",
      desc: "Physics of PN junctions, carrier transport, energy band bending, and MOSFET fundamentals."
    },
    {
      course: "23ECE102: Algorithmic Thinking",
      title: "Harvard CS50: Computational Thinking",
      provider: "Prof. David J. Malan (Harvard)",
      url: "https://cs50.harvard.edu/x/",
      desc: "Rigorous introduction to algorithms, binary search, Big-O notation, and memory structures."
    },
    {
      course: "23ECE101: Nature Inspired Engineering",
      title: "TED: Biomimicry in Action",
      provider: "Janine Benyus",
      url: "https://www.ted.com/talks/janine_benyus_biomimicry_in_action",
      desc: "How nature solves complex engineering challenges with minimal energy and zero toxicity."
    }
  ];

  const VIVA_QUESTIONS = [
    {
      subject: "23ECE181: Electrical Engineering Lab",
      question: "What is the core difference between Thevenin's and Norton's theorem?",
      answer: "Thevenin's theorem models an active linear network as a voltage source (Vth) in series with an impedance (Rth). Norton's theorem models the same network as an equivalent current source (In = Vth/Rth) in parallel with Rth."
    },
    {
      subject: "23ECE181: Electrical Engineering Lab",
      question: "Why is the Wheatstone Bridge more accurate than a simple ohmmeter?",
      answer: "A Wheatstone Bridge is a null measurement method where no current flows through the detector at balance, eliminating meter loading errors and lead resistance inaccuracies."
    },
    {
      subject: "23ECE181: Electrical Engineering Lab",
      question: "What is Back EMF in a DC motor, and why is it important?",
      answer: "Back EMF is the induced voltage opposing the applied armature voltage as the rotor rotates (E = (PΦNZ)/(60A)). It acts as a self-regulating mechanism that prevents catastrophic inrush currents once the motor reaches operating speed."
    },
    {
      subject: "23ECE102: Problem Solving & Algorithms",
      question: "What are the 4 fundamental cornerstones of Computational Thinking?",
      answer: "1. Decomposition (breaking down complex problems), 2. Pattern Recognition (finding similarities), 3. Abstraction (focusing on important information), 4. Algorithm Design (step-by-step instructions to solve)."
    },
    {
      subject: "23ECE102: Problem Solving & Algorithms",
      question: "Why is Binary Search faster than Linear Search, and what is its prerequisite?",
      answer: "Binary Search runs in O(log n) time by dividing the search space in half each step, compared to Linear Search's O(n). Prerequisite: the input array must be sorted."
    },
    {
      subject: "23ECE104: Physics of Semiconductors",
      question: "What is the Hall Effect and what parameters does it measure?",
      answer: "When a current-carrying conductor is placed in a transverse magnetic field, a voltage (Hall voltage) is developed perpendicular to both. It determines carrier type (electrons or holes), carrier concentration, and carrier mobility."
    }
  ];

  return (
    <div className="container" style={{ padding: "2.5rem 1rem 4rem" }}>
      {/* Top Banner */}
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
        <div className="hero-pill" style={{ marginBottom: "0.75rem" }}>
          <Globe size={15} />
          <span>Curated Academic Vault</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          External Learning Hub & Simulators
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
          Hand-picked interactive circuit simulators, NPTEL playlists, video masterclasses, and exam viva guides curated for Amrita EAC students.
        </p>
      </div>

      {/* Hub Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        <button 
          type="button" 
          className={`filter-pill ${activeTab === "simulators" ? "active" : ""}`}
          onClick={() => setActiveTab("simulators")}
        >
          ⚡ Interactive Simulators ({SIMULATORS.length})
        </button>
        <button 
          type="button" 
          className={`filter-pill ${activeTab === "nptel" ? "active" : ""}`}
          onClick={() => setActiveTab("nptel")}
        >
          🎓 NPTEL & Video Courses ({LECTURES.length})
        </button>
        <button 
          type="button" 
          className={`filter-pill ${activeTab === "viva" ? "active" : ""}`}
          onClick={() => setActiveTab("viva")}
        >
          🧪 Lab Viva & Exam Q&A ({VIVA_QUESTIONS.length})
        </button>
      </div>

      {/* Tab 1: Simulators */}
      {activeTab === "simulators" && (
        <div className="course-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {SIMULATORS.map((sim, i) => {
            const IconComponent = sim.icon;
            return (
              <div 
                key={i} 
                className="course-card"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ 
                      width: "2.25rem", 
                      height: "2.25rem", 
                      borderRadius: "var(--radius-md)", 
                      background: `${sim.color}20`, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: sim.color
                    }}>
                      <IconComponent size={20} />
                    </div>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      fontWeight: 700, 
                      padding: "0.2rem 0.55rem", 
                      borderRadius: "var(--radius-full)", 
                      background: "var(--bg-surface-elevated)", 
                      color: sim.color,
                      border: "1px solid var(--border-subtle)" 
                    }}>
                      {sim.badge}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                    {sim.title}
                  </h3>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 600, marginBottom: "0.75rem" }}>
                    {sim.category}
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    {sim.desc}
                  </p>
                </div>

                <a 
                  href={sim.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <span>Launch Simulator</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: NPTEL & Lectures */}
      {activeTab === "nptel" && (
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gap: "1rem" }}>
          {LECTURES.map((lec, i) => (
            <div key={i} className="book-card" style={{ margin: 0, padding: "1.25rem", alignItems: "center" }}>
              <div>
                <span className="code-badge" style={{ fontSize: "0.75rem", marginBottom: "0.4rem", display: "inline-block" }}>
                  {lec.course}
                </span>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  {lec.title}
                </h4>
                <div style={{ fontSize: "0.8125rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "0.4rem" }}>
                  Instructor: {lec.provider}
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {lec.desc}
                </p>
              </div>

              <a 
                href={lec.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                style={{ flex: "none", padding: "0.55rem 1rem", fontSize: "0.8125rem", textDecoration: "none" }}
              >
                <PlayCircle size={16} />
                <span>Watch Series</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Viva Q&A */}
      {activeTab === "viva" && (
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gap: "1rem" }}>
          <div style={{ 
            background: "var(--bg-surface-elevated)", 
            padding: "1rem 1.25rem", 
            borderRadius: "var(--radius-lg)", 
            border: "1px solid var(--border-subtle)",
            fontSize: "0.875rem",
            color: "var(--text-secondary)" 
          }}>
            💡 <strong>Pro-Tip for Amrita Lab Exams</strong>: External examiners focus heavily on circuit operating limits, component ratings, and Big-O complexity trade-offs. Review these core questions before your practical sessions.
          </div>

          {VIVA_QUESTIONS.map((item, i) => (
            <div key={i} className="admin-card" style={{ margin: 0, padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                {item.subject}
              </div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Q: {item.question}
              </h4>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, background: "var(--bg-surface-subtle)", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent-primary)" }}>
                <strong>Answer</strong>: {item.answer}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
