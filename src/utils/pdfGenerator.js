import { jsPDF } from "jspdf";

/**
 * Generates a clean, modern, multi-page PDF syllabus & resource guide.
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
    doc.text(`StudyNest Pro | ${course.code} – ${course.title}`, margin, 12);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);
  };

  // 1. Primary Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, "F");

  // Sub-brand and Logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("StudyNest Pro", margin + 8, y + 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text("ENGINEERING ACADEMIC RESOURCE INCUBATOR", margin + 8, y + 21);

  // Metadata badge right-aligned
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 8, y + 14, { align: "right" });
  doc.text(`Semester: ${course.semester} | Credits: ${course.credits} (${course.ltp})`, pageWidth - margin - 8, y + 21, { align: "right" });

  y += 46;

  // 2. Course Title & Badges
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${course.code}: ${course.title}`, margin, y);
  y += 6;

  // Subtitle / Module tag
  if (partName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(2, 132, 199); // sky-600
    doc.text(`Target Focus Module: ${partName}`, margin, y);
    y += 6;
  }

  // Horizontal divider
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 3. Syllabus Scope
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text("Course Overview & Scope", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  const splitDesc = doc.splitTextToSize(course.description, contentWidth);
  checkPageBreak(splitDesc.length * 5);
  doc.text(splitDesc, margin, y);
  y += splitDesc.length * 5 + 6;

  // 4. Units Breakdown
  if (course.parts && course.parts.length > 0) {
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("Syllabus Units & Modules", margin, y);
    y += 6;

    course.parts.forEach((part, index) => {
      checkPageBreak(8);
      // Unit bullet icon/box
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y - 4, contentWidth, 7, 1.5, 1.5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(79, 70, 229);
      doc.text(`U${index + 1}`, margin + 3, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(part, margin + 14, y);

      y += 8.5;
    });
    y += 5;
  }

  // 5. Recommended Textbooks
  if (course.textbooks && course.textbooks.length > 0) {
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("Recommended Textbooks", margin, y);
    y += 6;

    course.textbooks.forEach((book, index) => {
      checkPageBreak(16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      const titleLine = `${index + 1}. ${book.title}`;
      const splitTitle = doc.splitTextToSize(titleLine, contentWidth - 4);
      doc.text(splitTitle, margin + 2, y);
      y += splitTitle.length * 4.2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      const metaLine = `Author: ${book.author || "N/A"}  |  Publisher: ${book.publisher || "N/A"}${book.year ? ` (${book.year})` : ""}${book.isbn ? `  |  ISBN: ${book.isbn}` : ""}`;
      const splitMeta = doc.splitTextToSize(metaLine, contentWidth - 4);
      doc.text(splitMeta, margin + 6, y);
      y += splitMeta.length * 4.2 + 3;
    });
    y += 4;
  }

  // 6. References
  if (course.references && course.references.length > 0) {
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("Reference Materials & Literature", margin, y);
    y += 6;

    course.references.forEach((ref, index) => {
      checkPageBreak(14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const refLine = `• [R${index + 1}] "${ref.title}" by ${ref.author || "N/A"} (${ref.publisher || "Reference"}, ${ref.year || "N/A"})`;
      const splitRef = doc.splitTextToSize(refLine, contentWidth - 4);
      doc.text(splitRef, margin + 2, y);
      y += splitRef.length * 4.2 + 2;
    });
  }

  // Add Page Numbers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("StudyNest Pro — Amrita Engineering Academic Resources", margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: "right" });
  }

  const safeFileName = `${course.code}_${(partName || "Full_Syllabus").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  doc.save(safeFileName);
}
