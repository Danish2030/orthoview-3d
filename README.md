# OrthoView3D 📐
> **Interactive 3D-to-2D First-Angle Orthographic Projection Visualizer** for first-year B.Tech Engineering Graphics & Design students. Compliant with **ISO 128** and **Bureau of Indian Standards (BIS SP:46)** conventions.

---

## 🚀 Live Demo & Purpose
In technical engineering education, understanding how 3D physical objects fold into 2D orthogonal planes is often the steepest conceptual hurdle for students. **OrthoView3D** bridges this spatial reasoning gap by providing a real-time, bi-directional 3D perspective viewport synced with a professional 2D First-Angle Drawing Sheet.

---

## 📐 First-Angle Projection Fundamentals (ISO 128 / BIS SP:46)

### 1. Spatial Orientation
In **First-Angle Projection**, the object is situated in the **First Quadrant**:
- **Above the Horizontal Plane (H.P.)**
- **In front of the Vertical Plane (V.P.)**
- The **Object is placed BETWEEN the Observer and the Projection Plane**.

### 2. Standard 2D Sheet Layout
When the Horizontal Plane (H.P.) is rotated $90^\circ$ clockwise downwards to align with the Vertical Plane (V.P.), the views align as follows:
- **Front View (FV / Elevation):** Drawn on the V.P. **ABOVE** the reference line $X-Y$ (Top-Left).
- **Top View (TV / Plan):** Drawn on the H.P. directly **BELOW** the Front View (Bottom-Left).
- **Left-Hand Side View (LHSV / End View):** Projected onto the Right Profile Plane (R.P.P.) to the **RIGHT** of the Front View, beyond the reference line $X_1-Y_1$ (Top-Right).
- **Quadrant 4 (Bottom-Right):** Accommodates the standard **$45^\circ$ Miter Projection Line** transferring dimensions from Top View to Side View, along with the official **Title Block** and **First-Angle Projection Symbol**.

### 3. Why 2nd and 4th Angle Projections are NEVER Used
Rotating the Horizontal Plane $90^\circ$ clockwise causes:
- **2nd Quadrant:** H.P. swings upward and **overlaps directly on top of V.P.** Front and Top views overlap.
- **4th Quadrant:** Both H.P. and V.P. end up below $X-Y$, causing views to overlap completely.
- *Conclusion:* Only **1st Angle** (ISO / Indian Standard) and **3rd Angle** (USA / ASME) provide clean, non-overlapping orthogonal layouts.

---

## ✨ Features

- **Split-Screen Dual Viewport:**
  - **Left Panel (3D Interactive Workspace):** Perspective Three.js canvas with smooth `OrbitControls`, coordinate triad ($X=\text{Red}, Y=\text{Green}, Z=\text{Blue}$), ground grid floor, and quick camera presets (`Isometric`, `Front`, `Top`, `Side`, `Reset`).
  - **Right Panel (2D Drawing Sheet):** Authentic engineering drawing sheet featuring $X-Y$ and $X_1-Y_1$ reference lines, quadrant tags, $45^\circ$ miter line, and dynamic alignment projectors.
- **Visible vs. Hidden Lines Rendering:**
  - **Visible edges:** Solid crisp lines rendered using `EdgesGeometry` with normal depth testing (`depthFunc: LessEqualDepth`).
  - **Hidden lines:** Dashed lines (`LineDashedMaterial`) rendered using GPU depth-buffer testing (`depthFunc: GreaterDepth` with `depthWrite: false`), highlighting hidden internal grooves, steps, and holes.
- **Standard Engineering Solids Library:**
  1. **Stepped L-Block:** Fundamental block with a $90^\circ$ step.
  2. **Slotted U-Block:** U-channel block with central slot and internal hidden lines.
  3. **Hexagonal Prism:** Regular 6-sided prism demonstrating corner generators.
  4. **Square Pyramid:** Sloping triangular faces meeting at the apex.
  5. **Frustum of a Cone:** Truncated cone matching the ISO First-Angle symbol.
  6. **Cylinder with Hole (Bushing):** Hollow cylinder showing circular top view and hidden dashed bore lines.
  7. **Machinist V-Block:** Precision locating block with a $90^\circ$ V-groove.
  8. **Triangular Prism:** Horizontal triangular cross-section.
- **Parametric Dimension Controls:**
  - Real-time sliders for `Length (L)`, `Width (W)`, and `Height (H)` from 20 mm to 100 mm with instant millimeter readouts.
- **Orientation & Inclination Controls:**
  - $0^\circ$ to $360^\circ$ rotation about $X$ (tilt to H.P.), $Y$ (spin azimuth), and $Z$ (tilt to V.P.) with snap-chips for common exam angles ($30^\circ, 45^\circ, 60^\circ, 90^\circ$).
- **Themes:**
  - **CAD Blueprint (Dark):** Navy background, neon cyan visible lines, golden amber hidden lines.
  - **Drawing Sheet (Light):** Classic white drafting paper, crisp black ink lines, graphite dashed lines.
- **Export to High-Resolution PNG:**
  - Captures the complete 2D drawing sheet with borders, views, reference lines, $45^\circ$ miter line, scale, and the official First-Angle Projection symbol.
- **Interactive Theory Guide & Practice Quiz:**
  - In-app visual reference guide explaining quadrant theory and line types.
  - Interactive 6-question B.Tech graphics quiz with instant explanations and celebratory confetti.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **3D Graphics Engine:** Three.js (`three`, `@types/three`)
- **Styling:** Tailwind CSS (custom CAD & blueprint themes)
- **Icons:** `lucide-react`
- **Effects:** `canvas-confetti`

---

## 🏃 Local Run & Development

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/orthoview-3d.git

# Navigate to project directory
cd orthoview-3d

# Install dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production / GitHub Pages
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory, ready to deploy to GitHub Pages (configured with `base: './'`).

---

## 📜 License
MIT License. Built for engineering educators and students worldwide.
