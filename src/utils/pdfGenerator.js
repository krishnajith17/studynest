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
 * Builds a concise, classroom-ready 2-page Project Presentation PDF for S1 classroom presentation.
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

  const drawCardSection = (badgeText, title, paragraphs, yPos, accentRGB = [2, 132, 199]) => {
    // Calculate required height
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    let textLinesCount = 0;
    const wrappedParagraphs = paragraphs.map((p) => {
      const lines = doc.splitTextToSize(`•  ${p}`, contentWidth - 14);
      textLinesCount += lines.length;
      return lines;
    });

    const boxHeight = 16 + textLinesCount * 5.2 + (paragraphs.length - 1) * 2.5 + 5;

    // Card Background
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, yPos, contentWidth, boxHeight, 3, 3, "FD");

    // Left colored accent bar
    doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
    doc.roundedRect(margin, yPos, 3.5, boxHeight, 1.5, 1.5, "F");

    // Section Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`${badgeText}  ${title}`, margin + 8, yPos + 9.5);

    // Subtle divider line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.line(margin + 8, yPos + 12.5, pageWidth - margin - 6, yPos + 12.5);

    // Bullet paragraphs
    let curY = yPos + 19;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85);

    wrappedParagraphs.forEach((lines) => {
      doc.text(lines, margin + 8, curY);
      curY += lines.length * 5.2 + 2.5;
    });

    return yPos + boxHeight + 6;
  };

  /* ========================================================================
     PAGE 1: PROBLEM STATEMENT, MOTIVATION, LIMITATIONS & FUTURE IMPROVEMENTS
     ======================================================================== */
  // Top Hero Header Banner
  doc.setFillColor(8, 12, 24);
  doc.rect(0, 0, pageWidth, 62, "F");

  // Accent bar at very top
  doc.setFillColor(0, 240, 255);
  doc.rect(0, 0, pageWidth / 2, 2.5, "F");
  doc.setFillColor(139, 92, 246);
  doc.rect(pageWidth / 2, 0, pageWidth / 2, 2.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 240, 255);
  doc.text("AMRITA VISHWA VIDYAPEETHAM  •  B.TECH EAC (SEMESTER 1 PROJECT)", pageWidth / 2, 13, { align: "center" });

  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text("STUDYNEST CHROMA", pageWidth / 2, 26, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184);
  doc.text("Tailored Academic Reference & Study Portal for Amrita Students", pageWidth / 2, 34, { align: "center" });

  // Live URL Pill inside Header
  doc.setFillColor(22, 32, 56);
  doc.setDrawColor(0, 240, 255);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, 41, contentWidth - 8, 14, 2.5, 2.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text("Live Website:", margin + 10, 49.5);
  doc.setTextColor(255, 255, 255);
  doc.text("https://krishnajith17.github.io/studynest/", margin + 34, 49.5);
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text("Presented by: Krishnajith (S1 EAC)", pageWidth - margin - 10, 49.5, { align: "right" });

  let y = 72;

  // 1. Problem Statement
  y = drawCardSection(
    "01.",
    "PROBLEM STATEMENT",
    [
      "Tailored website for Amrita students for studies: Students need a dedicated platform customized specifically around the Amrita Vishwa Vidyapeetham B.Tech coursework.",
      "Course syllabi, reference textbook names, and unit-wise study materials are scattered across large PDFs, making daily study and quick revision difficult on mobile phones and laptops.",
    ],
    y,
    [2, 132, 199] // Sky Blue
  );

  // 2. Motivation
  y = drawCardSection(
    "02.",
    "MOTIVATION",
    [
      "One-stop destination for all the academic references for Amrita students: Bringing syllabus units, prescribed textbooks, reference books, and study notes together under a single link.",
      "Helping S1 and S2 students quickly check course topics, download unit PDFs, calculate SGPA, and use interactive study tools without searching multiple sources.",
    ],
    y,
    [16, 185, 129] // Emerald Green
  );

  // 3. Limitations
  y = drawCardSection(
    "03.",
    "LIMITATIONS",
    [
      "Being S1 students, we do not yet have a complete idea of Amrita examination question papers and the exact type of supplementary references or materials followed across all courses with respect to the Amrita coursework.",
      "Uploaded files in the Admin section are currently saved in browser local storage (up to 5 MB limit) rather than a centralized cloud server.",
    ],
    y,
    [244, 63, 94] // Rose Red
  );

  // 4. Future Improvements
  y = drawCardSection(
    "04.",
    "FUTURE IMPROVEMENTS",
    [
      "We need to fine-tune the study materials, reduce redundancy, and add a more detailed, structured approach to learning the course materials.",
      "Include verified Amrita previous-year question papers (PYQs), faculty-approved lecture handouts, and cloud database storage so uploaded files sync for all students automatically.",
    ],
    y,
    [139, 92, 246] // Electric Purple
  );

  /* ========================================================================
     PAGE 2: KEY FEATURES OF THE WEBSITE & COURSES INCLUDED
     ======================================================================== */
  doc.addPage();

  // Top Header on Page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 16, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(0, 240, 255);
  doc.text("STUDYNEST CHROMA  |  KEY WEBSITE FEATURES & OVERVIEW", margin, 10.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text("Classroom Presentation Summary", pageWidth - margin, 10.5, { align: "right" });

  y = 26;

  // 5. Key Features
  y = drawCardSection(
    "05.",
    "WHAT THE WEBSITE DOES (KEY FEATURES)",
    [
      "Complete Course Directory (11 Subjects): Covers Semester 1 & 2 B.Tech EAC courses (Calculus, IoT, Digital Electronics, Basic Electrical Engg, C Programming, Technical Communication, Cultural Education, etc.).",
      "Textbooks & Reference Books: Lists prescribed textbooks and reference books with author names and 1-click Google Books search links.",
      "Instant PDF Notes Download: Generates downloadable PDF study guides for the full syllabus or individual units in one click.",
      "Admin File Manager (Passcode: STUDY): Allows uploading new study files, removing old files, or exchanging (replacing) files on the website.",
      "SGPA Calculator & Learning Hub: Includes an Amrita credit-weighted SGPA calculator, Logic Gate simulator, and Ohm's Law / RC circuit calculator.",
      "Works on Mobile & Laptop + 5 Color Themes: Features a mobile bottom navigation bar and 5 vivid color themes with Dark/Light modes.",
    ],
    y,
    [2, 132, 199]
  );

  // 6. Technology Stack & Quick Summary Table
  y = drawCardSection(
    "06.",
    "TOOLS & TECHNOLOGIES USED",
    [
      "Frontend: React.js, Vite, HTML5, and Custom CSS3 (Responsive Mobile & Desktop Design).",
      "PDF & Storage: jsPDF for instant client-side PDF generation and Browser LocalStorage for saving custom files and bookmarks.",
      "Deployment: Hosted live on GitHub Pages with automated GitHub Actions deployment.",
    ],
    y,
    [245, 158, 11] // Amber
  );

  // Quick Classroom Demo Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y + 2, contentWidth, 44, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0, 240, 255);
  doc.text("QUICK CLASSROOM DEMO STEPS", margin + 8, y + 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(241, 245, 249);
  doc.text("1. Open https://krishnajith17.github.io/studynest/ and switch between the 5 Color Palettes.", margin + 8, y + 19);
  doc.text("2. Click any S1 course (e.g., 23ECE102 Digital Electronics) to view Units, Textbooks, and download a PDF.", margin + 8, y + 26);
  doc.text("3. Open SGPA Calculator & Learning Hub to show the grade estimator and logic gate simulator.", margin + 8, y + 33);
  doc.text("4. Click Admin (Passcode: STUDY) -> File Manager to Upload, Exchange, or Remove study files.", margin + 8, y + 40);

  // Add Footers & Page Numbers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "StudyNest Chroma  •  Amrita B.Tech EAC Study Portal (https://krishnajith17.github.io/studynest/)",
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

