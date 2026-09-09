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
