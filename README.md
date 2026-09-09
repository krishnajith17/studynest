# 🎓 StudyNest Pro

> **Academic Syllabus & Resource Incubator for Engineering Students**  
> An elevated, modern, high-performance study portal engineered to help undergraduate engineering students explore syllabus scopes, access accredited textbooks with one-click search links, download unit-by-unit study notes as formatted PDFs, and manage bookmarks.

---

## ✨ Features & Enhancements

- 📚 **Full 11-Course Engineering Curriculum**:
  - Complete curriculum across Semesters 1 & 2 (Mathematics, Semiconductor Physics, Nature Inspired Engineering, Computer Programming, Electrical Lab, Indian Heritage, Technical Communication, and more).
  - Detailed course credits, Lecture-Tutorial-Practical (L-T-P) hours, and scope descriptions.
- 📖 **Interactive Textbook & Reference Hub**:
  - Direct 1-click links to search and purchase accredited textbooks on Google Books.
  - Complete author citations, publication years, editions, and ISBNs.
- ⚡ **Instant Search & Multi-Level Filtering**:
  - Multi-attribute real-time search across course codes, titles, authors, and syllabus keywords.
  - Filter chips for **Semester 1**, **Semester 2**, and categories (**Basic Sciences & Math**, **Core Engineering**, **Humanities & Mind**).
  - Sorting by Course Code, Title, and Credits.
- 📄 **Multi-Page Formatted PDF Generator**:
  - Clean, academic-grade PDF generation with automatic pagination.
  - Formatted tables for syllabus units, textbook bibliographies, and exam question banks.
- 📌 **Pinned Courses (Bookmarks)**:
  - Students can star their current semester courses for 1-click access via the Pinned Drawer.
- ⏱️ **Download History**:
  - Local history log of recently compiled notes with instant re-download capabilities.
- 🌓 **Adaptive Dark & Light Mode**:
  - Designed according to strict WCAG 4.5:1 contrast standards with smooth transitions.
- 🔐 **Curriculum Administration Suite**:
  - Passcode: `STUDY`
  - Allows course additions, module management, and custom PDF file uploads attached to specific units.
- 🚀 **Turnkey GitHub Pages Deployment**:
  - Pre-configured `base: './'` for zero-config hosting.
  - Automated GitHub Actions workflow included (`.github/workflows/deploy.yml`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Icons**: Lucide React + Custom SVG Brand Kit
- **PDF Generation**: jsPDF
- **Styling**: Modern CSS Design System (Custom CSS Variables, Glassmorphism, Micro-Interactions)
- **Deployment**: GitHub Pages & GitHub Actions

---

## 🚀 How to Upload & Deploy to GitHub

### Method 1: Update Your Existing `studynest` Repository (Recommended)

To replace the old version in `https://github.com/krishnajith17/studynest` with this new version:

```bash
# 1. Navigate into the studynest-pro folder
cd "C:\Users\krish\.gemini\antigravity\scratch\studynest-pro"

# 2. Initialize git if not already initialized
git init

# 3. Add all files
git add .

# 4. Commit changes
git commit -m "feat: complete StudyNest Pro redesign with 11-course curriculum, clean UI, and PDF generator"

# 5. Set branch to main
git branch -M main

# 6. Add your GitHub remote
git remote add origin https://github.com/krishnajith17/studynest.git

# 7. Push to GitHub (use --force if overwriting old commits)
git push -u origin main --force
```

### Method 2: Push to a New GitHub Repository

If you'd prefer to create a brand new repository (e.g. `studynest-pro`):

1. Go to [github.com/new](https://github.com/new) and create a new repository named `studynest-pro`.
2. Run:

```bash
cd "C:\Users\krish\.gemini\antigravity\scratch\studynest-pro"
git init
git add .
git commit -m "feat: initial commit for StudyNest Pro"
git branch -M main
git remote add origin https://github.com/krishnajith17/studynest-pro.git
git push -u origin main
```

---

## 🌐 Enabling GitHub Pages

Once pushed, enable GitHub Pages in your repository settings:

1. Go to your repository on GitHub (`https://github.com/krishnajith17/studynest` or your new repo).
2. Click **Settings** ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The automated workflow in `.github/workflows/deploy.yml` will automatically build and publish your site in ~60 seconds!

*(Alternative: You can also choose **Deploy from a branch**, and select `gh-pages` or upload the contents of the `dist/` folder directly).*

---

## 💻 Local Development

```bash
# Install dependencies (if setting up on a new machine)
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🔑 Admin Passcode

- **Passcode**: `STUDY`
- Click the **Admin** button in the top navigation bar to unlock the curriculum management dashboard.
