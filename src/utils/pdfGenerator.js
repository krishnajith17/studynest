import { jsPDF } from "jspdf";

/**
 * Generates an official, clean, multi-page PDF syllabus & study guide for Amrita EAC.
 * @param {Object} course - The course object
 * @param {string} [partName] - Specific unit/module name if downloaded individually
 */
export function generateCoursePDF(course, partName = null) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = margin;
      drawMinimalHeader();
    }
  };

  const drawMinimalHeader = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Amrita EAC Syllabus | ${course.code} – ${course.title}`, margin, 12);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);
  };

  // 1. Primary Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, "F");

  // Institution & Program
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Amrita Vishwa Vidyapeetham", margin + 8, y + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text("B.Tech Electronics and Computer Engineering (EAC) • Curriculum 2023–2027", margin + 8, y + 20);

  // Metadata badge right-aligned
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 8, y + 13, { align: "right" });
  doc.text(`Sem ${course.semester} | Credits: ${course.credits} (L-T-P: ${course.ltp})`, pageWidth - margin - 8, y + 20, { align: "right" });

  y += 46;

  // 2. Course Title & Badges
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(`${course.code}: ${course.title}`, margin, y);
  y += 6;

  if (partName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(2, 132, 199);
    doc.text(`Target Module: ${partName}`, margin, y);
    y += 6;
  }

  // Horizontal divider
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 3. Course Objectives (if present)
  if (course.objectives && course.objectives.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Course Objectives", margin, y);
    y += 5.5;

    course.objectives.forEach((obj) => {
      checkPageBreak(10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const splitObj = doc.splitTextToSize(`• ${obj}`, contentWidth - 4);
      doc.text(splitObj, margin + 2, y);
      y += splitObj.length * 4.2 + 1;
    });
    y += 4;
  }

  // 4. Course Outcomes (COs)
  if (course.outcomes && course.outcomes.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Course Outcomes (CO)", margin, y);
    y += 5.5;

    course.outcomes.forEach((co) => {
      checkPageBreak(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(79, 70, 229);
      doc.text(`${co.code}:`, margin + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const splitCo = doc.splitTextToSize(co.text, contentWidth - 18);
      doc.text(splitCo, margin + 16, y);
      y += splitCo.length * 4.2 + 2;
    });
    y += 4;
  }

  // 5. Unit Syllabus Details
  if (course.units && course.units.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Detailed Syllabus Units", margin, y);
    y += 6;

    course.units.forEach((u) => {
      checkPageBreak(20);
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y - 4, contentWidth, 6.5, 1.5, 1.5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(u.title, margin + 4, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const splitTopics = doc.splitTextToSize(u.topics, contentWidth - 4);
      checkPageBreak(splitTopics.length * 4.2);
      doc.text(splitTopics, margin + 3, y);
      y += splitTopics.length * 4.2 + 5;
    });
  }

  // 6. Lab Experiments (if present)
  if (course.experiments && course.experiments.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Laboratory Experiment Contents", margin, y);
    y += 6;

    course.experiments.forEach((exp, idx) => {
      checkPageBreak(8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const splitExp = doc.splitTextToSize(`${idx + 1}. ${exp}`, contentWidth - 4);
      doc.text(splitExp, margin + 2, y);
      y += splitExp.length * 4.2 + 1.5;
    });
    y += 4;
  }

  // 7. Recommended Textbooks
  if (course.textbooks && course.textbooks.length > 0) {
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Prescribed Textbooks", margin, y);
    y += 5.5;

    course.textbooks.forEach((book, index) => {
      checkPageBreak(15);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const titleLine = `${index + 1}. ${book.title}${book.edition ? ` (${book.edition})` : ""}`;
      const splitTitle = doc.splitTextToSize(titleLine, contentWidth - 4);
      doc.text(splitTitle, margin + 2, y);
      y += splitTitle.length * 4.2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const metaLine = `Author: ${book.author || "N/A"}  |  Publisher: ${book.publisher || "N/A"}${book.year ? ` (${book.year})` : ""}${book.isbn ? `  |  ISBN: ${book.isbn}` : ""}`;
      const splitMeta = doc.splitTextToSize(metaLine, contentWidth - 4);
      doc.text(splitMeta, margin + 6, y);
      y += splitMeta.length * 4 + 2.5;
    });
    y += 3;
  }

  // 8. References
  if (course.references && course.references.length > 0) {
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text("Reference Literature", margin, y);
    y += 5.5;

    course.references.forEach((ref, index) => {
      checkPageBreak(12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const refLine = `• [R${index + 1}] "${ref.title}" by ${ref.author || "N/A"} (${ref.publisher || "Reference"}, ${ref.year || "N/A"})`;
      const splitRef = doc.splitTextToSize(refLine, contentWidth - 4);
      doc.text(splitRef, margin + 2, y);
      y += splitRef.length * 3.8 + 2;
    });
  }

  // Add Page Numbers and Footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Amrita Vishwa Vidyapeetham • Department of ECE (Branch: EAC)", margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: "right" });
  }

  const safeFileName = `Amrita_EAC_${course.code}_${(partName || "Syllabus").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  doc.save(safeFileName);
}

/**
 * Builds the jsPDF document instance for the 8-page Classroom Project Presentation & Report.
 * Can be saved directly in browser or exported as ArrayBuffer in Node.js.
 */
export function buildProjectPresentationDoc() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const drawPageHeader = (sectionTitle) => {
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(0, 240, 255);
    doc.text("STUDYNEST CHROMA v3.0  |  CLASSROOM PROJECT PRESENTATION", margin, 9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(203, 213, 225);
    doc.text(sectionTitle, pageWidth - margin, 9, { align: "right" });
  };

  const drawSectionHeading = (num, title, yPos) => {
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, yPos, contentWidth, 9, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(0, 240, 255);
    doc.text(`${num}. ${title.toUpperCase()}`, margin + 4, yPos + 6);
    return yPos + 14;
  };

  const drawSubHeading = (title, yPos) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, yPos);
    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 1.5, margin + 45, yPos + 1.5);
    return yPos + 6.5;
  };

  const drawBulletList = (items, startY) => {
    let curY = startY;
    items.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(2, 132, 199);
      doc.text("•", margin + 2, curY);

      if (typeof item === "string") {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.8);
        doc.setTextColor(51, 65, 85);
        const lines = doc.splitTextToSize(item, contentWidth - 8);
        doc.text(lines, margin + 6, curY);
        curY += lines.length * 4.2 + 2;
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(item.head, margin + 6, curY);
        curY += 4.3;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const lines = doc.splitTextToSize(item.body, contentWidth - 8);
        doc.text(lines, margin + 6, curY);
        curY += lines.length * 4.1 + 2.8;
      }
    });
    return curY;
  };

  /* ========================================================================
     PAGE 1: COVER PAGE / EXECUTIVE TITLE SLIDE
     ======================================================================== */
  // Full dark hero header block
  doc.setFillColor(8, 12, 24);
  doc.rect(0, 0, pageWidth, 115, "F");

  // Top accent stripe
  doc.setFillColor(0, 240, 255);
  doc.rect(0, 0, pageWidth / 2, 3, "F");
  doc.setFillColor(139, 92, 246);
  doc.rect(pageWidth / 2, 0, pageWidth / 2, 3, "F");

  // Institution badge
  doc.setFillColor(22, 32, 56);
  doc.roundedRect(margin, 16, contentWidth, 14, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 240, 255);
  doc.text("AMRITA VISHWA VIDYAPEETHAM  •  SCHOOL OF ENGINEERING", pageWidth / 2, 22, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text("Department of Electronics & Communication Engineering  |  B.Tech EAC (2023–2027)", pageWidth / 2, 27, { align: "center" });

  // Main Project Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text("STUDYNEST CHROMA", pageWidth / 2, 50, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(56, 189, 248);
  doc.text("Vivid Academic Syllabus, Engineering Study Hub & File Management Portal", pageWidth / 2, 60, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184);
  const coverSub = doc.splitTextToSize(
    "A modern, responsive React 19 + Vite 8 web application providing instant unit-wise PDF study notes, accredited textbooks, NBA CO-PO correlation matrices, credit-weighted SGPA estimation, virtual lab simulators, and real-time administrative file management.",
    contentWidth - 16
  );
  doc.text(coverSub, pageWidth / 2, 71, { align: "center" });

  // Live Links Banner inside Dark Header
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(0, 240, 255);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 6, 89, contentWidth - 12, 18, 2.5, 2.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text("LIVE PRODUCTION URL:", margin + 12, 96);
  doc.setTextColor(255, 255, 255);
  doc.text("https://krishnajith17.github.io/studynest/", margin + 55, 96);

  doc.setTextColor(139, 92, 246);
  doc.text("GITHUB REPOSITORY:", margin + 12, 103);
  doc.setTextColor(203, 213, 225);
  doc.text("https://github.com/krishnajith17/studynest", margin + 55, 103);

  // Key Metrics Grid (4 cards)
  let y = 125;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("PROJECT AT A GLANCE — KEY METRICS", margin, y);
  y += 5;

  const metrics = [
    { num: "11 Courses", label: "Sem 1 & 2 Accredited EAC Subjects" },
    { num: "33+ Modules", label: "Unit Breakdowns & Instant PDFs" },
    { num: "50+ Books", label: "Textbooks & References with ISBN" },
    { num: "5 Palettes", label: "Vivid Themes + Dark/Light Mode" },
  ];
  const cardW = (contentWidth - 9) / 4;
  metrics.forEach((m, idx) => {
    const cx = margin + idx * (cardW + 3);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(cx, y, cardW, 22, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(2, 132, 199);
    doc.text(m.num, cx + cardW / 2, y + 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(m.label, cx + cardW / 2, y + 17, { align: "center" });
  });

  y += 32;

  // Core Pillars Overview Box
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("CORE ARCHITECTURAL PILLARS", margin, y);
  y += 5;

  const pillars = [
    {
      title: "1. Unified Academic Hub",
      desc: "Complete syllabus objectives, unit topics, lab experiments, CO-PO mapping matrices, and textbook links in one interface.",
    },
    {
      title: "2. Client-Side PDF Engine",
      desc: "Instant browser-based generation of formatted course syllabus PDFs and unit-specific handouts using jsPDF.",
    },
    {
      title: "3. Real-Time Admin File Manager",
      desc: "Passcode-protected Admin section to Upload, Remove, and Exchange (swap) study documents in real time.",
    },
    {
      title: "4. Mobile & Laptop Responsive",
      desc: "App-style fixed bottom navigation bar on mobile phones (iOS/Android) and multi-column glassmorphic layout on laptops.",
    },
  ];

  pillars.forEach((p) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 15, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(p.title, margin + 4, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(p.desc, margin + 4, y + 11.5);
    y += 18;
  });

  y += 4;
  // Presenter Metadata Box at Bottom of Page 1
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 26, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 240, 255);
  doc.text("PROJECT PRESENTATION METADATA", margin + 6, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(241, 245, 249);
  doc.text("Developer & Presenter: Krishnajith (krishnajith17)", margin + 6, y + 15);
  doc.text("Program: B.Tech Electronics & Computer Engineering (EAC)", margin + 6, y + 21);
  doc.text("Admin Passcode: STUDY  |  Version: 3.0.0", pageWidth - margin - 6, y + 15, { align: "right" });
  doc.text(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, pageWidth - margin - 6, y + 21, { align: "right" });

  /* ========================================================================
     PAGE 2: PROBLEM STATEMENT, MOTIVATION & PROJECT OBJECTIVES
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 1: Problem Statement & Objectives");
  y = 22;

  y = drawSectionHeading("1", "Problem Statement & Project Motivation", y);
  y = drawSubHeading("1.1 Challenges Faced by Engineering Students & Faculty", y);
  y = drawBulletList(
    [
      {
        head: "Fragmented Curriculum Documents",
        body: "Official university syllabus books are static 150+ page PDFs. Locating a single unit topic, textbook ISBN, or lab experiment list requires scrolling through dozens of pages.",
      },
      {
        head: "Lack of Quick Unit-Level Handouts",
        body: "Students frequently need a clean, printable summary of a single module (e.g., Unit 2 of Digital Electronics) rather than an entire multi-semester document.",
      },
      {
        head: "Static & Hard-to-Update Study Materials",
        body: "When faculty or class representatives update lecture notes or question banks, sharing links across chat groups leads to version confusion and broken files.",
      },
      {
        head: "Manual SGPA & Grade Estimation",
        body: "Calculating credit-weighted SGPA across 1-credit labs, 3-credit theory courses, and 4-credit core subjects using the Amrita grading scale (O, A+, A, B+, B, C, P) is error-prone.",
      },
      {
        head: "Poor Mobile Experience on Academic Portals",
        body: "Traditional syllabus tables break on smartphone screens and lack touch-friendly navigation for students studying on the go.",
      },
    ],
    y
  );

  y += 4;
  y = drawSectionHeading("2", "Project Objectives & Solution Scope", y);
  y = drawSubHeading("2.1 How StudyNest Chroma Solves These Challenges", y);
  y = drawBulletList(
    [
      {
        head: "Interactive Single-Page Curriculum Hub",
        body: "Consolidates all 11 Semester 1 & 2 B.Tech EAC courses with instant search, category filtering (SCI, ENGG, HUM), and credit sorting.",
      },
      {
        head: "Automated Client-Side PDF Generator",
        body: "Compiles official multi-page PDF syllabus documents or targeted single-unit study guides on the fly in under 1.5 seconds.",
      },
      {
        head: "Dynamic Admin File Manager (Upload, Remove, Exchange)",
        body: "Enables administrators to upload custom PDFs/notes, remove outdated handouts, or exchange (swap) a file in-place while preserving all course links.",
      },
      {
        head: "Built-In Engineering Simulators & Calculators",
        body: "Provides an interactive SGPA/CGPA calculator, Ohm's Law & RC filter solver, Digital Logic truth-table simulator, and Viva-Voce Q&A bank.",
      },
      {
        head: "Chromatic Multi-Palette UI & Mobile App Bar",
        body: "Features 5 vivid color palettes with Dark/Light modes and a dedicated iOS/Android bottom navigation bar with 44px touch targets.",
      },
    ],
    y
  );

  /* ========================================================================
     PAGE 3: SYSTEM ARCHITECTURE & TECHNOLOGY STACK
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 2: System Architecture & Tech Stack");
  y = 22;

  y = drawSectionHeading("3", "Technology Stack & Engineering Specifications", y);

  const techRows = [
    ["Layer / Domain", "Technology Used", "Role & Technical Justification"],
    ["Frontend UI Library", "React 19.2.8", "Component-driven SPA architecture using Hooks (useState, useMemo, useCallback)"],
    ["Build & Bundler", "Vite 8.3.0", "Sub-500ms production rollup bundling + custom dev-mode HTML transform plugin"],
    ["Styling & Themes", "Custom CSS3 Tokens", "3-layer CSS variable architecture supporting 5 palettes + Dark/Light mode"],
    ["PDF Generation", "jsPDF 4.2.1", "Client-side vector PDF creation with dynamic pagination, headers, and tables"],
    ["Icon System", "Lucide React 1.31", "Lightweight, consistent SVG iconography across cards, drawers, and modals"],
    ["State Persistence", "Browser localStorage", "Zero-backend persistence for custom courses, Base64 files, bookmarks & history"],
    ["CI/CD & Hosting", "GitHub Pages + Actions", "Automated deployment via deploy.yml + root/docs static asset synchronization"],
  ];

  // Draw Tech Table
  const colWidths = [42, 42, contentWidth - 84];
  techRows.forEach((row, rIdx) => {
    const isHeader = rIdx === 0;
    const rowH = isHeader ? 8 : 11;
    doc.setFillColor(isHeader ? 15 : rIdx % 2 === 0 ? 248 : 241, isHeader ? 23 : rIdx % 2 === 0 ? 250 : 245, isHeader ? 42 : rIdx % 2 === 0 ? 252 : 249);
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, y, contentWidth, rowH, "FD");

    let curX = margin;
    row.forEach((cell, cIdx) => {
      doc.setFont("helvetica", isHeader || cIdx === 0 ? "bold" : "normal");
      doc.setFontSize(isHeader ? 8.5 : 8);
      doc.setTextColor(isHeader ? 255 : cIdx === 0 ? 15 : 51, isHeader ? 255 : cIdx === 0 ? 23 : 65, isHeader ? 255 : cIdx === 0 ? 42 : 85);
      const lines = doc.splitTextToSize(cell, colWidths[cIdx] - 4);
      doc.text(lines, curX + 2, y + 4.5);
      curX += colWidths[cIdx];
    });
    y += rowH;
  });

  y += 8;
  y = drawSectionHeading("4", "Application Architecture & Component Hierarchy", y);
  y = drawBulletList(
    [
      {
        head: "App.jsx (Core Controller & State Router)",
        body: "Manages global state via useLocalStorage ('studynest_chroma_courses', 'bookmarks', 'history', 'theme', 'palette') and routes between Browse, SGPA Calculator, Learning Hub, and Admin views.",
      },
      {
        head: "Navbar.jsx & ThemePalettePicker.jsx",
        body: "Provides desktop top navigation, quick counters for Bookmarks and History, real-time 5-palette theme switcher, and the fixed mobile bottom navigation bar.",
      },
      {
        head: "HeroSection.jsx & FilterBar.jsx",
        body: "Displays live curriculum metrics (Courses, Modules, Textbooks), real-time search input, Semester pills (Sem 1 / Sem 2), Category tabs, and sorting dropdown.",
      },
      {
        head: "CourseCard.jsx & CourseDetailModal.jsx",
        body: "Renders individual subject cards with category aura glows and opens the 6-tab deep-dive modal (Syllabus, CO-PO Matrix, Labs, Textbooks, Simulators, Study Files).",
      },
      {
        head: "AdminPanel.jsx & FileExchangeModal.jsx",
        body: "Handles passcode-protected curriculum administration, new course creation, and the complete File Management suite (Upload, Remove, Exchange/Swap).",
      },
      {
        head: "DownloadModal.jsx & pdfGenerator.js",
        body: "Executes a 3-stage verification and compilation progress flow, serving either custom faculty-uploaded files or dynamically generated jsPDF documents.",
      },
    ],
    y
  );

  /* ========================================================================
     PAGE 4: STUDENT PORTAL FEATURES & 6-TAB COURSE MODAL
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 3: Student Portal & Course Modal");
  y = 22;

  y = drawSectionHeading("5", "Student Portal — Core Functional Modules", y);
  y = drawSubHeading("5.1 Intelligent Search, Filtering & Sorting Engine", y);
  y = drawBulletList(
    [
      {
        head: "Multi-Field Instant Search",
        body: "Queries course codes (e.g., '23ECE102'), course titles, descriptions, syllabus unit names, and textbook titles/authors simultaneously with zero latency.",
      },
      {
        head: "Category & Semester Segmentation",
        body: "One-click filtering across Semester 1, Semester 2, Sciences & Math (SCI), Core Engineering (ENGG), and Humanities (HUM).",
      },
      {
        head: "Multi-Criteria Sorting",
        body: "Sort courses by Course Code, Alphabetical Title, Credits (High-to-Low), or Semester progression.",
      },
    ],
    y
  );

  y += 3;
  y = drawSubHeading("5.2 Inside the 6-Tab Interactive Course Detail Modal", y);
  y = drawBulletList(
    [
      {
        head: "Tab 1 — Syllabus & Units",
        body: "Displays Course Educational Objectives and expandable Unit breakdowns. Students can check off completed units to track exam preparation and download unit-specific PDFs.",
      },
      {
        head: "Tab 2 — Course Outcomes & NBA CO-PO Matrix",
        body: "Lists measurable Course Outcomes (CO1–CO5) alongside a full 15-column NBA Program Outcome (PO1–PO12) and Program Specific Outcome (PSO1–PSO3) correlation table.",
      },
      {
        head: "Tab 3 — Laboratory Experiments",
        body: "Available on lab-integrated courses (e.g., 23ECE101, 23ECE102, 23EEE184, 23CSE101), detailing hardware/software experiments and prototype evaluation requirements.",
      },
      {
        head: "Tab 4 — Prescribed Textbooks & Reference Books",
        body: "Complete bibliographic records including Author, Edition, Publisher, Publication Year, ISBN, and 1-click external search links to Google Books.",
      },
      {
        head: "Tab 5 — Virtual Simulators & Video Lectures",
        body: "Direct integration with interactive engineering tools including Falstad Circuit Simulator, GeoGebra 3D, Desmos Graphing Calculator, Python Tutor, and NPTEL courses.",
      },
      {
        head: "Tab 6 — Official Study Files & Handouts",
        body: "Dynamically appears when files are uploaded via the Admin Panel, allowing students to download custom lecture notes, question banks, and formula sheets.",
      },
    ],
    y
  );

  y += 3;
  y = drawSubHeading("5.3 Personalization: Pinned Bookmarks & Download History", y);
  y = drawBulletList(
    [
      {
        head: "Bookmarks Slide-Over Drawer",
        body: "Students can star/pin important courses for instant 1-click access from the top navigation bar or mobile bottom bar.",
      },
      {
        head: "Recent Downloads Drawer",
        body: "Automatically logs the last 30 downloaded syllabus PDFs or unit handouts with timestamps and a 1-click 'Re-Download' button.",
      },
    ],
    y
  );

  /* ========================================================================
     PAGE 5: INTERACTIVE TOOLS & ADMIN FILE MANAGEMENT SYSTEM
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 4: Engineering Tools & Admin File Manager");
  y = 22;

  y = drawSectionHeading("6", "Interactive SGPA Calculator & Learning Hub", y);
  y = drawSubHeading("6.1 Credit-Weighted SGPA & CGPA Estimator (SgpaCalculator.jsx)", y);
  y = drawBulletList(
    [
      {
        head: "Accredited Grading Scale",
        body: "Implements the official Amrita 10-point grading system: O (10.0), A+ (9.5), A (9.0), B+ (8.0), B (7.0), C (6.0), P (5.0), and F (0.0).",
      },
      {
        head: "Exact Credit Weighting",
        body: "Computes SGPA = Sum(Course Credits × Grade Points) / Sum(Total Credits) across Semester 1 (23 Credits) and Semester 2, plus cumulative CGPA estimation.",
      },
    ],
    y
  );

  y += 2;
  y = drawSubHeading("6.2 Interactive Engineering Learning Hub (LearningHub.jsx)", y);
  y = drawBulletList(
    [
      {
        head: "Circuit & RC Filter Calculator",
        body: "Real-time solver for Ohm's Law (V = I × R, P = V × I) and First-Order RC Low-Pass Filter Time Constant (tau = R × C) and Cutoff Frequency (fc = 1 / 2*pi*R*C).",
      },
      {
        head: "Digital Logic Gate Simulator",
        body: "Interactive binary input switches (A, B) with live boolean output evaluation and truth table highlighting for AND, OR, NAND, NOR, XOR, XNOR, and NOT gates.",
      },
      {
        head: "Viva-Voce Question Bank",
        body: "Curated oral exam questions and concise technical answers covering IoT, Digital Logic, Basic Electrical Engineering, C Programming, and Engineering Chemistry.",
      },
    ],
    y
  );

  y += 4;
  y = drawSectionHeading("7", "Admin Panel & Real-Time File Management System", y);
  y = drawSubHeading("7.1 Complete File Lifecycle: Upload, Exchange & Remove", y);
  y = drawBulletList(
    [
      {
        head: "Passcode Authentication",
        body: "Protected by passcode 'STUDY' via AdminLoginModal.jsx to prevent unauthorized edits.",
      },
      {
        head: "Upload Study Files",
        body: "Admins select a target course, assign a module/unit, classify the document (Lecture Notes, Question Bank/PYQ, Lab Manual, Formula Sheet, Syllabus), and upload files up to 5MB.",
      },
      {
        head: "Exchange / Swap Files In-Place (FileExchangeModal.jsx)",
        body: "Allows replacing an existing file with an updated version while preserving the course mapping, unit association, and student download buttons. Displays old vs. new file size comparison.",
      },
      {
        head: "Remove Files & Storage Quota Tracker",
        body: "One-click deletion with confirmation prompt, paired with a live progress bar monitoring total KB/MB used out of the 5.0 MB browser storage quota.",
      },
      {
        head: "Dynamic Course Builder & Factory Reset",
        body: "Admins can create new courses for Semesters 1–8, add custom syllabus units, or reset the entire database back to factory defaults.",
      },
    ],
    y
  );

  /* ========================================================================
     PAGE 6: COMPLETE CURRICULUM DATABASE (11 COURSES OVERVIEW)
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 5: Complete Curriculum Database");
  y = 22;

  y = drawSectionHeading("8", "Accredited B.Tech EAC Curriculum Database (11 Courses)", y);

  const courseRows = [
    ["Code", "Sem", "Cat", "Cr", "L-T-P", "Course Title & Primary Prescribed Textbook"],
    ["23MAT124", "1", "SCI", "4", "3-1-0", "Calculus & Matrix Algebra — Strang (Linear Algebra), Anton (Calculus)"],
    ["23ECE101", "1", "ENGG", "3", "2-0-3", "Introduction to Internet of Things — Bahga & Madisetti (IoT: A Hands-On Approach)"],
    ["23ECE102", "1", "ENGG", "4", "3-0-3", "Digital Electronics & Systems — Morris Mano (Digital Design), Floyd"],
    ["23EEE104", "1", "ENGG", "3", "3-0-0", "Basic Electrical & Electronics Engg. — Alexander & Sadiku, Boylestad"],
    ["23EEE184", "1", "ENGG", "1", "0-0-3", "Basic Electrical & Electronics Lab — Kothari & Nagrath, Floyd"],
    ["23CSE101", "1", "ENGG", "4", "3-0-3", "Computational Thinking & Problem Solving — Ferragina, Guttag (MIT Press)"],
    ["23ENG101", "1", "HUM", "3", "2-0-3", "Technical Communication — Raman & Sharma (Oxford), Markel"],
    ["23CUL101", "1", "HUM", "2", "2-0-0", "Cultural Education I — Amrita University Publication, Radhakrishnan"],
    ["23ECE103", "2", "ENGG", "4", "3-1-0", "Network Analysis & Synthesis — Hayt, Kemmerly & Durbin, Van Valkenburg"],
    ["23ECE104", "2", "ENGG", "4", "3-0-3", "Electronic Devices & Circuits — Sedra & Smith (Microelectronic Circuits)"],
    ["23CHY104", "2", "SCI", "3", "2-0-3", "Engineering Chemistry — Jain & Jain (Dhanpat Rai), Atkins (Physical Chem)"],
  ];

  const cWidths = [22, 11, 14, 10, 16, contentWidth - 73];
  courseRows.forEach((row, rIdx) => {
    const isHeader = rIdx === 0;
    const rowH = isHeader ? 8 : 11.5;
    doc.setFillColor(isHeader ? 15 : rIdx % 2 === 0 ? 248 : 241, isHeader ? 23 : rIdx % 2 === 0 ? 250 : 245, isHeader ? 42 : rIdx % 2 === 0 ? 252 : 249);
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, y, contentWidth, rowH, "FD");

    let curX = margin;
    row.forEach((cell, cIdx) => {
      doc.setFont("helvetica", isHeader || cIdx === 0 ? "bold" : "normal");
      doc.setFontSize(isHeader ? 8 : 7.8);
      doc.setTextColor(isHeader ? 255 : cIdx === 0 ? 2 : 30, isHeader ? 255 : cIdx === 0 ? 132 : 41, isHeader ? 255 : cIdx === 0 ? 199 : 59);
      const lines = doc.splitTextToSize(cell, cWidths[cIdx] - 3);
      doc.text(lines, curX + 1.5, y + 4.5);
      curX += cWidths[cIdx];
    });
    y += rowH;
  });

  y += 8;
  y = drawSubHeading("8.1 Department Framework & NBA Accreditation Alignment", y);
  y = drawBulletList(
    [
      {
        head: "Program Educational Objectives (PEO1–PEO3)",
        body: "Prepares graduates for hardware-software co-design careers, embedded & cyber-physical systems innovation, and lifelong ethical engineering leadership.",
      },
      {
        head: "Program Specific Outcomes (PSO1–PSO3)",
        body: "Covers solid-state electronic devices, signal processing, IoT sensor networks, and modern algorithmic software engineering.",
      },
    ],
    y
  );

  /* ========================================================================
     PAGE 7: CHROMATIC DESIGN SYSTEM, MOBILE UX & CLASSROOM DEMO GUIDE
     ======================================================================== */
  doc.addPage();
  drawPageHeader("Section 6: UI/UX Design & Classroom Demo Script");
  y = 22;

  y = drawSectionHeading("9", "Chromatic Design System & Cross-Device Responsiveness", y);
  y = drawSubHeading("9.1 Five Real-Time Dynamic Theme Palettes", y);
  y = drawBulletList(
    [
      {
        head: "1. Electric Aurora (Default)",
        body: "Deep Indigo surface (#080c18) paired with Cyber Cyan (#00f0ff), Electric Purple (#8b5cf6), and Neon Mint (#10b981).",
      },
      {
        head: "2. Sunset Radiance",
        body: "Obsidian Plum surface (#120b14) paired with Solar Coral (#ff5722), Amber Gold (#f59e0b), and Sunset Fuchsia (#ec4899).",
      },
      {
        head: "3. Cyberpunk Neon",
        body: "High-contrast Onyx (#05050a) paired with Laser Rose (#f43f5e), Hyper Cyan (#06b6d4), and Acid Lime (#a3e635).",
      },
      {
        head: "4. Emerald Oasis",
        body: "Abyssal Forest (#04120e) paired with Radiant Emerald (#10b981), Aqua Mint (#2dd4bf), and Spring Lime (#84cc16).",
      },
      {
        head: "5. Cosmic Amethyst",
        body: "Midnight Violet (#0d071a) paired with Galactic Orchid (#c084fc), Vivid Fuchsia (#d946ef), and Starlight Gold (#facc15).",
      },
    ],
    y
  );

  y += 3;
  y = drawSubHeading("9.2 Step-by-Step Classroom Live Presentation Script (5-Minute Walkthrough)", y);
  y = drawBulletList(
    [
      {
        head: "Step 1 — Introduction & Theme Showcase (1 Min)",
        body: "Open https://krishnajith17.github.io/studynest/ on the classroom projector. Highlight the instant dark load, curriculum stats, and switch live between the 5 color palettes and Light/Dark modes.",
      },
      {
        head: "Step 2 — Course Exploration & Instant PDF Generation (1.5 Min)",
        body: "Search for 'Digital' or filter by Semester 1. Open '23ECE102 Digital Electronics', showcase the Unit syllabus, NBA CO-PO matrix, Accredited Textbooks, and click 'Download Course Syllabus PDF' to generate a live PDF.",
      },
      {
        head: "Step 3 — SGPA Calculator & Learning Hub Simulators (1 Min)",
        body: "Switch to the SGPA Calculator to compute semester GPA live. Then open the Learning Hub and toggle inputs on the Digital Logic Gate Simulator and RC Filter Calculator.",
      },
      {
        head: "Step 4 — Admin File Manager: Upload, Exchange & Remove (1.5 Min)",
        body: "Click 'Admin' (Passcode: STUDY). Open the File Manager tab, upload a sample PDF handout to a course, demonstrate the 'Exchange' button to swap it with a revised file, and show it appearing immediately in the student Course Modal.",
      },
    ],
    y
  );

  // Add Footers & Page Numbers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "StudyNest Chroma v3.0  •  B.Tech EAC Curriculum Portal (https://krishnajith17.github.io/studynest/)",
      margin,
      pageHeight - 6.5
    );
    doc.setFont("helvetica", "bold");
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 6.5, { align: "right" });
  }

  return doc;
}

export function generateProjectPresentationPDF() {
  const doc = buildProjectPresentationDoc();
  doc.save("StudyNest_Classroom_Presentation.pdf");
}

