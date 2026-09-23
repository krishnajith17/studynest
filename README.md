# 🌈 StudyNest Chroma (Vivid Edition)

> **Vivid Academic Syllabus & Resource Incubator for Engineering Students**  
> An elevated, high-energy academic study portal engineered with **5 dynamic, vibrant color palettes**, category aura glows, and iridescent micro-interactions while retaining 100% of the accredited 11-course engineering curriculum.

---

## ✨ What's New in StudyNest Chroma

- 🎨 **5 Curated Dynamic Color Palettes** with 1-click real-time switcher:
  1. 🌌 **Electric Aurora**: Deep Indigo/Navy + Vivid Cyber Cyan (`#00f0ff`) + Electric Violet (`#8b5cf6`) + Neon Mint (`#10b981`)
  2. 🌅 **Sunset Radiance**: Deep Obsidian + Solar Coral (`#ff5722`) + Sunset Pink (`#ec4899`) + Golden Amber (`#f59e0b`)
  3. ⚡ **Cyberpunk Neon**: High-contrast Onyx + Laser Rose (`#f43f5e`) + Hyper Cyan (`#06b6d4`) + Acid Lime (`#a3e635`)
  4. 🌲 **Emerald Oasis**: Abyssal Teal + Radiant Emerald (`#10b981`) + Mint Frost (`#2dd4bf`) + Spring Green (`#84cc16`)
  5. 🔮 **Cosmic Amethyst**: Midnight Plum (`#0d071a`) + Galactic Orchid (`#c084fc`) + Vivid Fuchsia (`#d946ef`) + Starlight Gold (`#facc15`)
- 🌓 **Harmonized Dark & Light Modes**:
  - Each of the 5 palettes adapts seamlessly into both a high-contrast dark mode and a crisp daylight-readable light mode.
- 💫 **Category-Themed Aura Glows**:
  - **Sciences & Math (SCI)**: Mint & Emerald aura glow.
  - **Core Engineering (ENGG)**: Electric Cyan & Cobalt aura glow.
  - **Humanities (HUM)**: Warm Coral & Sunset Amber glow.
- 🔮 **Chromatic Card Borders & Ambient Orbs**:
  - Floating ambient aurora orbs in the hero background.
  - Cards feature multi-stop chromatic borders that softly illuminate upon hover.
  - Iridescent animated gradient typography for hero headlines and metric counters.

---

## 📚 Complete Curriculum Included (Identical to StudyNest Pro)

- **11 Core Courses**:
  - `23MAT124`: Mathematics for EAC 1 (Calculus & Linear Algebra)
  - `23ECE101`: Nature Inspired Engineering (Biomimicry & Systems)
  - `23ECE102`: Problem Solving & Algorithmic Thinking
  - `23ECE103`: Basic Electrical & Electronics Engineering
  - `23ECE104`: Physics of Semiconductors
  - `23EEE104`: Electric Circuits & Simulation
  - `23EEE184`: Electrical Engineering Laboratory
  - `23CHY104`: Engineering Chemistry
  - `23ENG101`: Technical Communication & Professional Fluency
  - `23CUL101`: Cultural Education & Heritage of India
  - `23CSE101`: Computer Programming Fundamentals
- **All Syllabus Modules & Instant Unit-by-Unit PDF Generation**
- **Accredited Textbooks with 1-Click Search Links**
- **Interactive SGPA / CGPA Estimator** with weighted grading formulas
- **Learning Hub** (circuit simulators, math graphers, NPTEL course links, viva questions)
- **Department Framework Modal** (Vision, Mission, PEOs, PSOs)
- **Pinned Drawer (Bookmarks)** and **Download History Log**
- **Curriculum Admin Suite** (Passcode: `STUDY`)

---

## 🚀 Running StudyNest Chroma Locally

From PowerShell or Terminal:

```bash
# 1. Navigate to the project
cd "C:\Users\krish\.gemini\antigravity\scratch\studynest-chroma"

# 2. Start the dev server (runs on port 5174 so StudyNest Pro can run simultaneously on 5173)
cmd.exe /c "npm.cmd run dev"

# 3. Open in browser:
# http://localhost:5174/
```

To build for production or GitHub Pages:
```bash
cmd.exe /c "npm.cmd run build"
```
The optimized production bundle is placed in `./dist` with relative paths (`base: './'`), ready for zero-config deployment.
