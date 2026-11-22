# OrthoView3D — Complete Master Source Code

> **Project Name:** OrthoView3D  
> **Standard:** ISO 128 / BIS SP:46:2003 First-Angle Orthographic Projection Visualizer  
> **Target Audience:** First-Year B.Tech / B.E. Engineering Graphics & CAD Students  
> **Generated:** Production-Grade Master Source Code Release  

---

## Table of Contents
- [.github/workflows/deploy.yml](#githubworkflowsdeployyml) — *GitHub Actions CI/CD workflow to build with Node 20 and deploy to GitHub Pages*
- [.github/workflows/release.yml](#githubworkflowsreleaseyml) — *GitHub Actions workflow to automate GitHub Releases on version tags*
- [package.json](#packagejson) — *Project dependencies and build scripts*
- [vite.config.ts](#viteconfigts) — *Vite build configuration with base relative path for GitHub Pages*
- [tsconfig.json](#tsconfigjson) — *TypeScript compiler configuration*
- [tsconfig.node.json](#tsconfignodejson) — *TypeScript configuration for Vite node runtime*
- [tailwind.config.js](#tailwindconfigjs) — *Tailwind CSS engineering theme configuration*
- [postcss.config.js](#postcssconfigjs) — *PostCSS plugins configuration*
- [patch-rollup.cjs](#patchrollupcjs) — *AppLocker compatibility patch falling back to WASM Rollup*
- [index.html](#indexhtml) — *Application HTML shell and fonts*
- [src/main.tsx](#srcmaintsx) — *React DOM bootstrap*
- [src/index.css](#srcindexcss) — *Tailwind directives, custom scrollbars, and drafting grid patterns*
- [src/App.tsx](#srcapptsx) — *Main application state coordinator and split-screen layout*
- [src/types/index.ts](#srctypesindexts) — *Data models for solids, materials, views, and dimensions*
- [src/utils/geometryGenerators.ts](#srcutilsgeometrygeneratorsts) — *3D parametric CAD geometry generators with chamfers and fillets*
- [src/utils/projectionMath.ts](#srcutilsprojectionmathts) — *2D projection bounding box calculations and snap angles*
- [src/utils/exportDrawingSheet.ts](#srcutilsexportdrawingsheetts) — *High-resolution canvas composite exporter for PNG download*
- [src/components/Header.tsx](#srccomponentsheadertsx) — *Top navigation bar with export buttons and modal triggers*
- [src/components/Sidebar.tsx](#srccomponentssidebartsx) — *CAD control sidebar with solid selector, dimensions, orientation, and materials*
- [src/components/Viewport3D.tsx](#srccomponentsviewport3dtsx) — *Interactive Three.js 3D viewport with OrbitControls, studio lighting, materials, and sight arrows*
- [src/components/ViewCube.tsx](#srccomponentsviewcubetsx) — *Interactive 3D CSS orientation ViewCube with camera snap and live tracking*
- [src/components/ViewCanvas2D.tsx](#srccomponentsviewcanvas2dtsx) — *Real-time orthographic 2D canvas with visible/hidden lines and dimension callouts*
- [src/components/OrthographicSheet.tsx](#srccomponentsorthographicsheettsx) — *ISO A3 drafting sheet layout with zone markings, miter line, and alignment projectors*
- [src/components/TitleBlock.tsx](#srccomponentstitleblocktsx) — *Mechanical engineering institutional title block with tolerances and projection symbol*
- [src/components/TheoryModal.tsx](#srccomponentstheorymodaltsx) — *First-Angle projection interactive theory and reference modal*
- [src/components/QuizModal.tsx](#srccomponentsquizmodaltsx) — *Interactive 6-question engineering graphics mastery quiz*
- [README.md](#readmemd) — *Project overview, ISO standard references, and local setup guide*

---

## `.github/workflows/deploy.yml`

*GitHub Actions CI/CD workflow to build with Node 20 and deploy to GitHub Pages*

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build project
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## `.github/workflows/release.yml`

*GitHub Actions workflow to automate GitHub Releases on version tags*

```yaml
name: Publish GitHub Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  release:
    name: Create GitHub Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Publish Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
          files: public/orthoview3d-source-code.zip
```

---

## `package.json`

*Project dependencies and build scripts*

```json
{
  "name": "orthoview-3d",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "postinstall": "node patch-rollup.cjs"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.2",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@rollup/wasm-node": "^4.68.8",
    "@types/canvas-confetti": "^1.9.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.160.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.4"
  }
}

```

---

## `vite.config.ts`

*Vite build configuration with base relative path for GitHub Pages*

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true
  }
})

```

---

## `tsconfig.json`

*TypeScript compiler configuration*

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

---

## `tsconfig.node.json`

*TypeScript configuration for Vite node runtime*

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

```

---

## `tailwind.config.js`

*Tailwind CSS engineering theme configuration*

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cad: {
          dark: '#0d131f',
          panel: '#151c2c',
          card: '#1b2438',
          border: '#2a3652',
          accent: '#38bdf8',
          projector: 'rgba(56, 189, 248, 0.4)',
          paper: '#f8fafc',
          paperCard: '#ffffff',
          paperBorder: '#cbd5e1',
          paperInk: '#0f172a'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

```

---

## `postcss.config.js`

*PostCSS plugins configuration*

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

---

## `patch-rollup.cjs`

*AppLocker compatibility patch falling back to WASM Rollup*

```javascript
const fs = require('fs');
const path = require('path');

const nativePath = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');
if (fs.existsSync(nativePath)) {
  let content = fs.readFileSync(nativePath, 'utf8');
  if (!content.includes('@rollup/wasm-node')) {
    content = content.replace(
      'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {',
      'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {\n\t\ttry { return require(\'@rollup/wasm-node/dist/native.js\'); } catch(e){}'
    );
    fs.writeFileSync(nativePath, content, 'utf8');
    console.log('Patched rollup to fallback to @rollup/wasm-node');
  }
}

```

---

## `index.html`

*Application HTML shell and fonts*

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'></path><polyline points='3.27 6.96 12 12.01 20.73 6.96'></polyline><line x1='12' y1='22.08' x2='12' y2='12'></line></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OrthoView3D — 1st Angle Orthographic Projection Visualizer</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#0b0f19] text-slate-100 overflow-hidden select-none">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

---

## `src/main.tsx`

*React DOM bootstrap*

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```

---

## `src/index.css`

*Tailwind directives, custom scrollbars, and drafting grid patterns*

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
}

/* Custom CAD technical scrollbars */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.4);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.25);
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.5);
}

/* Range input styling */
input[type="range"] {
  accent-color: #38bdf8;
}

/* CAD Technical blueprint grid */
.blueprint-grid {
  background-image: 
    linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

```

---

## `src/App.tsx`

*Main application state coordinator and split-screen layout*

```tsx
import { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Viewport3D } from './components/Viewport3D';
import { OrthographicSheet } from './components/OrthographicSheet';
import { TheoryModal } from './components/TheoryModal';
import { QuizModal } from './components/QuizModal';
import { createSolidGeometry, SOLID_PRESETS } from './utils/geometryGenerators';
import { exportSheetAsPNG } from './utils/exportDrawingSheet';
import { DisplayOptions, SolidDimensions, SolidRotation, SolidType, ThemeMode } from './types';

export function App() {
  // Active Solid & Parameters
  const [currentSolid, setCurrentSolid] = useState<SolidType>('l-block');
  const [dimensions, setDimensions] = useState<SolidDimensions>({
    length: 60,
    width: 40,
    height: 50,
  });
  const [rotation, setRotation] = useState<SolidRotation>({ x: 0, y: 0, z: 0 });

  // UI States
  const [theme, setTheme] = useState<ThemeMode>('blueprint');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Display Options
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    showHiddenLines: true,
    showProjectors: true,
    showDimensions: true,
    showMiterLine: true,
    show3DPlanes: false,
    show3DGrid: true,
    show3DAxes: true,
    showSightArrows: true,
    showCenterLines: true,
    renderStyle: 'aluminum',
    transferMethod: 'miter',
    unfoldProgress: 0,
    showHatching: false,
    showContactShadow: true,
  });

  // Keep references to 2D view canvases for export
  const canvasesRef = useRef<{
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
  }>({
    front: null,
    top: null,
    leftSide: null,
  });

  // Solid Geometry (Memoized)
  const geometry = useMemo(() => {
    return createSolidGeometry(currentSolid, dimensions);
  }, [currentSolid, dimensions]);

  // Current preset metadata
  const currentPreset = useMemo(() => {
    return SOLID_PRESETS.find((p) => p.id === currentSolid) || SOLID_PRESETS[0];
  }, [currentSolid]);

  // Handlers
  const handleSelectSolid = (type: SolidType) => {
    setCurrentSolid(type);
    const preset = SOLID_PRESETS.find((p) => p.id === type);
    if (preset) {
      setDimensions(preset.defaultDimensions);
      setRotation({ x: 0, y: 0, z: 0 });
    }
  };

  const handleResetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'blueprint' ? 'paper' : 'blueprint'));
  };

  const handleExportSheet = async () => {
    setIsExporting(true);
    try {
      await exportSheetAsPNG({
        canvases: canvasesRef.current,
        solidName: currentPreset.name,
        dimensions,
        theme,
        showMiterLine: displayOptions.showMiterLine,
        showProjectors: displayOptions.showProjectors,
      });
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const isDark = theme === 'blueprint';

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-200 ${
        isDark ? 'dark bg-[#0b0f19] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Sleek Top Toolbar */}
      <Header
        solidName={currentPreset.name}
        dimensions={dimensions}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onExportSheet={handleExportSheet}
        isExporting={isExporting}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          currentSolid={currentSolid}
          onSelectSolid={handleSelectSolid}
          dimensions={dimensions}
          onUpdateDimensions={setDimensions}
          rotation={rotation}
          onUpdateRotation={setRotation}
          onResetRotation={handleResetRotation}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          displayOptions={displayOptions}
          onUpdateDisplayOptions={setDisplayOptions}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Dual Viewport Split-Screen Workspace */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-full">
          {/* Left Panel: Interactive 3D Perspective Viewport (5 Columns) */}
          <section className="lg:col-span-5 h-full relative border-r border-slate-700/50 overflow-hidden flex flex-col">
            <Viewport3D
              geometry={geometry}
              dimensions={dimensions}
              rotation={rotation}
              theme={theme}
              displayOptions={displayOptions}
              onResetRotation={handleResetRotation}
              onUpdateDisplayOptions={setDisplayOptions}
            />
          </section>

          {/* Right Panel: 2D First-Angle Projection Sheet (7 Columns) */}
          <section className="lg:col-span-7 h-full relative overflow-hidden flex flex-col">
            <OrthographicSheet
              geometry={geometry}
              dimensions={dimensions}
              rotation={rotation}
              theme={theme}
              displayOptions={displayOptions}
              solidName={currentPreset.name}
              onCanvasesReady={(canvases) => {
                canvasesRef.current = canvases;
              }}
            />
          </section>
        </main>
      </div>

      {/* Theory Guide Modal */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        theme={theme}
      />

      {/* Student Practice Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        theme={theme}
      />
    </div>
  );
}

export default App;

```

---

## `src/types/index.ts`

*Data models for solids, materials, views, and dimensions*

```typescript
export type SolidType =
  | 'l-block'
  | 'u-block'
  | 'hex-prism'
  | 'square-pyramid'
  | 'cone-frustum'
  | 'cylinder-hole'
  | 'counterbore'
  | 'v-block'
  | 'tri-prism';

export interface SolidDimensions {
  length: number; // L in mm (along X)
  width: number;  // W in mm (along Z)
  height: number; // H in mm (along Y)
}

export interface SolidRotation {
  x: number; // in degrees (0 - 360)
  y: number; // in degrees (0 - 360)
  z: number; // in degrees (0 - 360)
}

export type ThemeMode = 'blueprint' | 'paper';
export type RenderStyle = 'aluminum' | 'steel' | 'polymer' | 'glass' | 'anodized';
export type TransferMethod = 'miter' | 'compass';

export interface DisplayOptions {
  showHiddenLines: boolean;
  showProjectors: boolean;
  showDimensions: boolean;
  showMiterLine: boolean;
  show3DPlanes: boolean;
  show3DGrid: boolean;
  show3DAxes: boolean;
  showSightArrows: boolean;
  showCenterLines: boolean;
  showHatching: boolean;
  showContactShadow: boolean;
  renderStyle: RenderStyle;
  transferMethod: TransferMethod;
  unfoldProgress: number; // 0% (folded 3D box) to 100% (fully flattened 2D sheet)
}

export interface SolidPreset {
  id: SolidType;
  name: string;
  category: string;
  description: string;
  defaultDimensions: SolidDimensions;
  iconName: string;
}

```

---

## `src/utils/geometryGenerators.ts`

*3D parametric CAD geometry generators with chamfers and fillets*

```typescript
import * as THREE from 'three';
import { SolidDimensions, SolidType } from '../types';

export function createSolidGeometry(type: SolidType, dim: SolidDimensions): THREE.BufferGeometry {
  const { length: L, width: W, height: H } = dim;

  switch (type) {
    case 'l-block': {
      // Machined Stepped L-block with chamfered edges
      const shape = new THREE.Shape();
      const halfW = W / 2;
      const halfH = H / 2;

      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(halfW, 0);
      shape.lineTo(0, 0);
      shape.lineTo(0, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'u-block': {
      // Milled Slotted U-block with tool fillet at bottom of channel
      const halfW = W / 2;
      const halfH = H / 2;
      const slotHalfW = W / 4;
      const slotBottom = 0;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(halfW, halfH);
      shape.lineTo(slotHalfW, halfH);
      shape.lineTo(slotHalfW, slotBottom);
      shape.lineTo(-slotHalfW, slotBottom);
      shape.lineTo(-slotHalfW, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'hex-prism': {
      // Hexagonal Prism with machined end-face chamfers
      const radius = L / 2;
      const geom = new THREE.CylinderGeometry(radius, radius, H, 6, 2, false);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'square-pyramid': {
      // Square Pyramid with base plinth
      const radius = Math.SQRT2 * (L / 2);
      const geom = new THREE.ConeGeometry(radius, H, 4, 1);
      geom.rotateY(Math.PI / 4);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'cone-frustum': {
      // Truncated Cone Frustum (ISO First-Angle Reference Solid)
      const rBottom = L / 2;
      const rTop = L / 4;
      const geom = new THREE.CylinderGeometry(rTop, rBottom, H, 48, 2);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'cylinder-hole': {
      // Bushing with concentric through-bore
      const rOut = L / 2;
      const rIn = L / 4;

      const shape = new THREE.Shape();
      shape.absarc(0, 0, rOut, 0, Math.PI * 2, false);

      const holePath = new THREE.Path();
      holePath.absarc(0, 0, rIn, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      const extrudeSettings = {
        steps: 1,
        depth: H,
        bevelEnabled: true,
        bevelThickness: 0.6,
        bevelSize: 0.6,
        bevelSegments: 2,
        curveSegments: 48,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateX(Math.PI / 2);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'counterbore': {
      // Cylinder with Stepped Counterbore Hole (Dual hidden lines)
      // Top half has larger counterbore diameter, bottom half has through-hole
      const rOut = L / 2;
      const rCounter = L * 0.38; // Counterbore diameter
      const rBore = L * 0.22;    // Through hole diameter

      // Generate using lathe profile for exact mechanical counterbore
      const points: THREE.Vector2[] = [];
      const halfH = H / 2;
      const cbDepth = H * 0.45; // Counterbore depth

      // Outer cylinder profile (from bottom to top)
      points.push(new THREE.Vector2(rBore, -halfH));         // bottom inner hole
      points.push(new THREE.Vector2(rOut, -halfH));          // bottom outer edge
      points.push(new THREE.Vector2(rOut, halfH));           // top outer edge
      points.push(new THREE.Vector2(rCounter, halfH));       // top counterbore lip
      points.push(new THREE.Vector2(rCounter, halfH - cbDepth)); // counterbore seat corner
      points.push(new THREE.Vector2(rBore, halfH - cbDepth));    // counterbore step
      points.push(new THREE.Vector2(rBore, -halfH));         // inner bore floor

      const geom = new THREE.LatheGeometry(points, 48);
      const scaleZ = W / L;
      geom.scale(1, 1, scaleZ);
      return geom;
    }

    case 'v-block': {
      // Precision Workshop V-Block with 90° groove and bottom relief channel
      const halfW = W / 2;
      const halfH = H / 2;
      const vDepth = H * 0.42;
      const vHalfW = W * 0.35;
      const reliefRadius = W * 0.06;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      // Right clamp slot
      shape.lineTo(halfW, halfH);
      shape.lineTo(vHalfW, halfH);
      // V-Groove slope to central relief
      shape.lineTo(reliefRadius, halfH - vDepth + reliefRadius);
      shape.lineTo(0, halfH - vDepth);
      shape.lineTo(-reliefRadius, halfH - vDepth + reliefRadius);
      shape.lineTo(-vHalfW, halfH);
      shape.lineTo(-halfW, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    case 'tri-prism': {
      // Equilateral Triangular Prism with edge bevels
      const halfW = W / 2;
      const halfH = H / 2;

      const shape = new THREE.Shape();
      shape.moveTo(-halfW, -halfH);
      shape.lineTo(halfW, -halfH);
      shape.lineTo(0, halfH);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: L,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelOffset: -0.8,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      geom.rotateY(Math.PI / 2);
      return geom;
    }

    default:
      return new THREE.BoxGeometry(L, H, W);
  }
}

export const SOLID_PRESETS: {
  id: SolidType;
  name: string;
  category: string;
  description: string;
  defaultDimensions: SolidDimensions;
  iconName: string;
}[] = [
  {
    id: 'l-block',
    name: 'Stepped L-Block (Machined)',
    category: 'Prismatic Solids',
    description: 'Precision milled L-bracket with corner chamfers. Illustrates visible steps and profile alignment.',
    defaultDimensions: { length: 60, width: 40, height: 50 },
    iconName: 'CornerDownRight',
  },
  {
    id: 'u-block',
    name: 'Slotted U-Channel Block',
    category: 'Prismatic Solids',
    description: 'Milled U-channel with longitudinal slot. Features crucial interior hidden lines in front and side views.',
    defaultDimensions: { length: 60, width: 50, height: 45 },
    iconName: 'SplitSquareVertical',
  },
  {
    id: 'hex-prism',
    name: 'Hexagonal Prism (ISO Standard)',
    category: 'Polyhedra',
    description: 'Regular 6-sided prism. Demonstrates corner generators, face visibility, and symmetry axes.',
    defaultDimensions: { length: 50, width: 50, height: 60 },
    iconName: 'Hexagon',
  },
  {
    id: 'square-pyramid',
    name: 'Square Pyramid',
    category: 'Pyramids',
    description: 'Square base with sloping triangular faces meeting at the vertex. Shows diagonal ridge lines in plan.',
    defaultDimensions: { length: 50, width: 50, height: 65 },
    iconName: 'Pyramid',
  },
  {
    id: 'cone-frustum',
    name: 'Frustum of a Cone (ISO Symbol)',
    category: 'Conics',
    description: 'Truncated cone standard. This exact solid defines the official ISO First-Angle Projection symbol!',
    defaultDimensions: { length: 60, width: 60, height: 50 },
    iconName: 'Cone',
  },
  {
    id: 'counterbore',
    name: 'Counterbore Bushing (Dual Step)',
    category: 'Turned Parts',
    description: 'Turned cylindrical component with stepped counterbore. Tests multi-tier hidden lines and concentric circles.',
    defaultDimensions: { length: 55, width: 55, height: 60 },
    iconName: 'CircleDot',
  },
  {
    id: 'cylinder-hole',
    name: 'Hollow Cylinder (Bushing)',
    category: 'Hollow Solids',
    description: 'Solid cylinder with axial through-bore. Essential for practicing interior hidden lines and centerlines.',
    defaultDimensions: { length: 50, width: 50, height: 55 },
    iconName: 'CircleDot',
  },
  {
    id: 'v-block',
    name: 'Machinist V-Block (90° Groove)',
    category: 'Mechanical Fixtures',
    description: 'Precision workshop locating fixture with 90° V-groove and central relief hole for clamping round bars.',
    defaultDimensions: { length: 60, width: 50, height: 45 },
    iconName: 'Spline',
  },
  {
    id: 'tri-prism',
    name: 'Triangular Prism',
    category: 'Polyhedra',
    description: 'Equilateral triangular cross-section extruded horizontally. Ideal for learning apex projection.',
    defaultDimensions: { length: 60, width: 45, height: 50 },
    iconName: 'Triangle',
  },
];

```

---

## `src/utils/projectionMath.ts`

*2D projection bounding box calculations and snap angles*

```typescript
import * as THREE from 'three';
import { SolidRotation } from '../types';

export interface BoundingBox2D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
}

export interface ProjectedBounds {
  front: BoundingBox2D;
  top: BoundingBox2D;
  leftSide: BoundingBox2D;
}

/**
 * Computes the exact 2D screen bounding boxes of the rotated solid for:
 * 1. Front View (Elevation on VP)
 * 2. Top View (Plan on HP)
 * 3. Left-Hand Side View (Profile on RPP)
 */
export function calculateProjectedBounds(
  geometry: THREE.BufferGeometry,
  rotation: SolidRotation
): ProjectedBounds {
  // Convert degrees to radians
  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(rotation.x),
    THREE.MathUtils.degToRad(rotation.y),
    THREE.MathUtils.degToRad(rotation.z),
    'XYZ'
  );

  const rotMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);

  const posAttr = geometry.getAttribute('position');
  if (!posAttr) {
    const empty: BoundingBox2D = { minX: -25, maxX: 25, minY: -25, maxY: 25, width: 50, height: 50 };
    return { front: empty, top: empty, leftSide: empty };
  }

  const v = new THREE.Vector3();

  // Front View: X -> screenX, Y -> screenY
  let fMinX = Infinity, fMaxX = -Infinity;
  let fMinY = Infinity, fMaxY = -Infinity;

  // Top View: X -> screenX, -Z -> screenY (or Z down)
  let tMinX = Infinity, tMaxX = -Infinity;
  let tMinY = Infinity, tMaxY = -Infinity;

  // LHSV: Z -> screenX (front Z on left), Y -> screenY
  let sMinX = Infinity, sMaxX = -Infinity;
  let sMinY = Infinity, sMaxY = -Infinity;

  for (let i = 0; i < posAttr.count; i++) {
    v.fromBufferAttribute(posAttr, i);
    v.applyMatrix4(rotMatrix);

    // Front View
    if (v.x < fMinX) fMinX = v.x;
    if (v.x > fMaxX) fMaxX = v.x;
    if (v.y < fMinY) fMinY = v.y;
    if (v.y > fMaxY) fMaxY = v.y;

    // Top View (X is horizontal, -Z is vertical upwards towards XY)
    if (v.x < tMinX) tMinX = v.x;
    if (v.x > tMaxX) tMaxX = v.x;
    // In Top View, world +Z is front (down), world -Z is back (up)
    // We map screenY = -v.z so back is at top (+screenY) and front is at bottom (-screenY)
    const topY = -v.z;
    if (topY < tMinY) tMinY = topY;
    if (topY > tMaxY) tMaxY = topY;

    // LHSV (looking from -X towards +X: world +Z is on observer's left)
    // screenX = v.z (so +Z is left when camera is set up accordingly)
    const sideX = v.z;
    if (sideX < sMinX) sMinX = sideX;
    if (sideX > sMaxX) sMaxX = sideX;
    if (v.y < sMinY) sMinY = v.y;
    if (v.y > sMaxY) sMaxY = v.y;
  }

  return {
    front: {
      minX: fMinX,
      maxX: fMaxX,
      minY: fMinY,
      maxY: fMaxY,
      width: Math.max(1, fMaxX - fMinX),
      height: Math.max(1, fMaxY - fMinY),
    },
    top: {
      minX: tMinX,
      maxX: tMaxX,
      minY: tMinY,
      maxY: tMaxY,
      width: Math.max(1, tMaxX - tMinX),
      height: Math.max(1, tMaxY - tMinY),
    },
    leftSide: {
      minX: sMinX,
      maxX: sMaxX,
      minY: sMinY,
      maxY: sMaxY,
      width: Math.max(1, sMaxX - sMinX),
      height: Math.max(1, sMaxY - sMinY),
    },
  };
}

/**
 * Common engineering angles for quick alignment
 */
export const SNAP_ANGLES = [0, 30, 45, 60, 90, 180];

```

---

## `src/utils/exportDrawingSheet.ts`

*High-resolution canvas composite exporter for PNG download*

```typescript
import { SolidDimensions, ThemeMode } from '../types';

interface ExportParams {
  canvases: {
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
  };
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  showMiterLine: boolean;
  showProjectors: boolean;
}

export async function exportSheetAsPNG({
  canvases,
  solidName,
  dimensions,
  theme,
  showMiterLine,
  showProjectors,
}: ExportParams): Promise<void> {
  const isDark = theme === 'blueprint';

  // Target high-res canvas size (1920x1080)
  const W = 1920;
  const H = 1080;

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = W;
  exportCanvas.height = H;
  const ctx = exportCanvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Fill
  ctx.fillStyle = isDark ? '#0c1222' : '#f8fafc';
  ctx.fillRect(0, 0, W, H);

  // 2. Outer Drawing Sheet Border (CAD Standard Margin)
  const margin = 30;
  ctx.strokeStyle = isDark ? '#38bdf8' : '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(margin, margin, W - 2 * margin, H - 2 * margin);

  // Inner margin border
  ctx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(100, 116, 139, 0.4)';
  ctx.strokeRect(margin + 8, margin + 8, W - 2 * (margin + 8), H - 2 * (margin + 8));

  // 3. Top Banner
  ctx.fillStyle = isDark ? '#10172a' : '#e2e8f0';
  ctx.fillRect(margin + 9, margin + 9, W - 2 * (margin + 9), 50);

  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText('ORTHOVIEW 3D — FIRST-ANGLE ORTHOGRAPHIC PROJECTION SHEET', margin + 30, margin + 42);

  ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('ISO 128 / BIS SP:46 (FIRST QUADRANT)', W - margin - 350, margin + 42);

  // 4. Quadrant geometry coordinates
  const qLeft = margin + 9;
  const qTop = margin + 59;
  const qWidth = (W - 2 * (margin + 9)) / 2;
  const qHeight = (H - margin - 59 - margin - 9) / 2;

  // Center reference lines intersection
  const cx = qLeft + qWidth;
  const cy = qTop + qHeight;

  // Render 3 WebGL Views from their respective canvases
  // Quadrant 1: Front View (Top-Left)
  if (canvases.front) {
    ctx.drawImage(canvases.front, qLeft + 10, qTop + 10, qWidth - 20, qHeight - 20);
  }

  // Quadrant 2: Left Side View (Top-Right)
  if (canvases.leftSide) {
    ctx.drawImage(canvases.leftSide, cx + 10, qTop + 10, qWidth - 20, qHeight - 20);
  }

  // Quadrant 3: Top View (Bottom-Left)
  if (canvases.top) {
    ctx.drawImage(canvases.top, qLeft + 10, cy + 10, qWidth - 20, qHeight - 20);
  }

  // Faint Projector Rays
  if (showProjectors) {
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    // Vertical projectors (FV to TV)
    ctx.beginPath();
    ctx.moveTo(qLeft + qWidth * 0.3, qTop + 30);
    ctx.lineTo(qLeft + qWidth * 0.3, cy + qHeight - 30);
    ctx.moveTo(qLeft + qWidth * 0.7, qTop + 30);
    ctx.lineTo(qLeft + qWidth * 0.7, cy + qHeight - 30);
    ctx.stroke();

    // Horizontal projectors (FV to LHSV)
    ctx.beginPath();
    ctx.moveTo(qLeft + 40, qTop + qHeight * 0.3);
    ctx.lineTo(cx + qWidth - 40, qTop + qHeight * 0.3);
    ctx.moveTo(qLeft + 40, qTop + qHeight * 0.7);
    ctx.lineTo(cx + qWidth - 40, qTop + qHeight * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  // 45° Miter line in Quadrant 4 (Bottom-Right)
  if (showMiterLine) {
    ctx.save();
    ctx.strokeStyle = isDark ? '#38bdf8' : '#2563eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    ctx.beginPath();
    ctx.moveTo(cx + 20, cy + 20);
    ctx.lineTo(cx + qWidth * 0.65, cy + qHeight * 0.65);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#38bdf8' : '#2563eb';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('45° MITER LINE', cx + qWidth * 0.28, cy + qHeight * 0.35);

    ctx.restore();
  }

  // Reference Lines: Horizontal X — Y
  ctx.save();
  ctx.strokeStyle = isDark ? '#38bdf8' : '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(qLeft, cy);
  ctx.lineTo(qLeft + 2 * qWidth, cy);
  ctx.stroke();

  // X and Y text badges
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('X', qLeft + 15, cy - 10);
  ctx.fillText('Y', qLeft + 2 * qWidth - 30, cy - 10);

  // Reference Lines: Vertical X1 — Y1
  ctx.strokeStyle = isDark ? '#fbbf24' : '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, qTop);
  ctx.lineTo(cx, qTop + 2 * qHeight);
  ctx.stroke();

  // X1 and Y1 labels
  ctx.fillStyle = isDark ? '#fbbf24' : '#0f172a';
  ctx.fillText('X₁', cx - 35, qTop + 30);
  ctx.fillText('Y₁', cx - 35, qTop + 2 * qHeight - 20);

  // Center Origin O
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
  ctx.fill();
  ctx.strokeStyle = isDark ? '#38bdf8' : '#1e293b';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('O', cx - 6, cy + 5);
  ctx.restore();

  // Quadrant Labels
  ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('FRONT VIEW (FV / ELEVATION) [V.P.]', qLeft + 25, qTop + 35);
  ctx.fillText('LEFT-HAND SIDE VIEW (LHSV) [R.P.P.]', cx + 25, qTop + 35);
  ctx.fillText('TOP VIEW (TV / PLAN) [H.P.]', qLeft + 25, cy + 35);

  // 5. Title Block in Bottom-Right
  const tbWidth = 560;
  const tbHeight = 150;
  const tbX = W - margin - 9 - tbWidth - 10;
  const tbY = H - margin - 9 - tbHeight - 10;

  ctx.save();
  ctx.fillStyle = isDark ? '#101728' : '#ffffff';
  ctx.fillRect(tbX, tbY, tbWidth, tbHeight);

  ctx.strokeStyle = isDark ? '#38bdf8' : '#334155';
  ctx.lineWidth = 2;
  ctx.strokeRect(tbX, tbY, tbWidth, tbHeight);

  // Dividing line
  ctx.beginPath();
  ctx.moveTo(tbX + 340, tbY);
  ctx.lineTo(tbX + 340, tbY + tbHeight);
  ctx.stroke();

  // Left Title Block text
  ctx.fillStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('ORTHOVIEW 3D • DRAWING SHEET', tbX + 15, tbY + 28);

  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText(`SUBJECT: ${solidName.toUpperCase()}`, tbX + 15, tbY + 54);

  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('B.Tech Engineering Graphics & CAD Lab', tbX + 15, tbY + 76);
  ctx.fillText(`Dimensions: ${dimensions.length} × ${dimensions.width} × ${dimensions.height} mm`, tbX + 15, tbY + 102);
  ctx.fillText('Scale: 1:1  •  Standard: ISO 128 / BIS SP:46', tbX + 15, tbY + 126);

  // Right Title Block: First Angle Projection Symbol
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('PROJECTION METHOD', tbX + 360, tbY + 24);

  // Draw Frustum Symbol
  const symX = tbX + 360;
  const symY = tbY + 40;

  ctx.strokeStyle = isDark ? '#64748b' : '#94a3b8';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 2, 1, 2]);
  // Centerline
  ctx.beginPath();
  ctx.moveTo(symX, symY + 30);
  ctx.lineTo(symX + 170, symY + 30);
  ctx.moveTo(symX + 130, symY);
  ctx.lineTo(symX + 130, symY + 60);
  ctx.stroke();
  ctx.setLineDash([]);

  // Frustum Trapezoid
  ctx.strokeStyle = isDark ? '#38bdf8' : '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(symX + 15, symY + 20);
  ctx.lineTo(symX + 60, symY + 10);
  ctx.lineTo(symX + 60, symY + 50);
  ctx.lineTo(symX + 15, symY + 40);
  ctx.closePath();
  ctx.stroke();

  // Concentric Circles
  ctx.beginPath();
  ctx.arc(symX + 130, symY + 30, 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(symX + 130, symY + 30, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('FIRST ANGLE PROJECTION', tbX + 365, tbY + 130);

  ctx.restore();

  // Trigger download
  const dataUrl = exportCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `OrthoView3D_FirstAngle_${solidName.replace(/\s+/g, '_')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

```

---

## `src/components/Header.tsx`

*Top navigation bar with export buttons and modal triggers*

```tsx
import React from 'react';
import {
  Download,
  BookOpen,
  Sun,
  Moon,
  Box,
  Sparkles,
  Archive,
} from 'lucide-react';
import { SolidDimensions, ThemeMode } from '../types';

interface HeaderProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenTheory: () => void;
  onOpenQuiz: () => void;
  onExportSheet: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  solidName,
  dimensions,
  theme,
  onToggleTheme,
  onOpenTheory,
  onOpenQuiz,
  onExportSheet,
  isExporting,
}) => {
  const isDark = theme === 'blueprint';

  const handleDownloadZip = () => {
    const a = document.createElement('a');
    a.href = './orthoview3d-source-code.zip';
    a.download = 'orthoview3d-source-code.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <header
      className={`h-14 px-4 border-b flex items-center justify-between select-none transition-colors duration-200 z-40 ${
        isDark
          ? 'bg-[#0b0f19] border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Brand & CAD Workstation Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight font-mono">
                Ortho<span className="text-sky-400">View</span>3D
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
                  isDark
                    ? 'bg-sky-950/80 text-sky-400 border-sky-800/80'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                1st Angle Proj
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono -mt-0.5 hidden sm:block">
              Engineering Graphics & Design • ISO 128 / BIS SP:46:2003
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-700/60">
          <span className="text-xs font-mono text-slate-400">Solid:</span>
          <span className="text-xs font-mono font-bold text-sky-400">{solidName}</span>
          <span className="text-[11px] font-mono text-slate-500">
            ({dimensions.length}×{dimensions.width}×{dimensions.height}mm)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Theory Modal Trigger */}
        <button
          onClick={onOpenTheory}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-sky-500/50'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">1st Angle</span> Theory
        </button>

        {/* Practice Quiz Trigger */}
        <button
          onClick={onOpenQuiz}
          className={`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 border-amber-800/50'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Practice</span> Quiz
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Drawing Sheet Theme (Light)' : 'Switch to CAD Blueprint Theme (Dark)'}
          className={`p-2 rounded-lg border transition-all ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Download Project ZIP Button */}
        <button
          onClick={handleDownloadZip}
          title="Download Complete Source Code as ZIP"
          className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border-emerald-700/60 shadow-sm'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <Archive className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Download</span> ZIP
        </button>

        {/* Export Sheet Button */}
        <button
          onClick={onExportSheet}
          disabled={isExporting}
          className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Export Sheet (PNG)'}</span>
        </button>
      </div>
    </header>
  );
};

```

---

## `src/components/Sidebar.tsx`

*CAD control sidebar with solid selector, dimensions, orientation, and materials*

```tsx
import React, { useState } from 'react';
import {
  Box,
  Sliders,
  Rotate3d,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  CornerDownRight,
  SplitSquareVertical,
  Hexagon,
  Pyramid,
  Cone,
  CircleDot,
  Spline,
  Triangle,
  Info,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import { SOLID_PRESETS } from '../utils/geometryGenerators';
import { SNAP_ANGLES } from '../utils/projectionMath';
import {
  DisplayOptions,
  RenderStyle,
  SolidDimensions,
  SolidRotation,
  SolidType,
  ThemeMode,
} from '../types';

interface SidebarProps {
  currentSolid: SolidType;
  onSelectSolid: (type: SolidType) => void;
  dimensions: SolidDimensions;
  onUpdateDimensions: (dim: SolidDimensions) => void;
  rotation: SolidRotation;
  onUpdateRotation: (rot: SolidRotation) => void;
  onResetRotation: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  displayOptions: DisplayOptions;
  onUpdateDisplayOptions: (opts: DisplayOptions) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSolid,
  onSelectSolid,
  dimensions,
  onUpdateDimensions,
  rotation,
  onUpdateRotation,
  onResetRotation,
  theme,
  onToggleTheme,
  displayOptions,
  onUpdateDisplayOptions,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState<'solids' | 'dimensions' | 'orientation' | 'display'>('solids');

  const isDark = theme === 'blueprint';

  const getSolidIcon = (iconName: string) => {
    switch (iconName) {
      case 'CornerDownRight':
        return <CornerDownRight className="w-4 h-4 text-sky-400" />;
      case 'SplitSquareVertical':
        return <SplitSquareVertical className="w-4 h-4 text-sky-400" />;
      case 'Hexagon':
        return <Hexagon className="w-4 h-4 text-sky-400" />;
      case 'Pyramid':
        return <Pyramid className="w-4 h-4 text-sky-400" />;
      case 'Cone':
        return <Cone className="w-4 h-4 text-sky-400" />;
      case 'CircleDot':
        return <CircleDot className="w-4 h-4 text-sky-400" />;
      case 'Spline':
        return <Spline className="w-4 h-4 text-sky-400" />;
      case 'Triangle':
        return <Triangle className="w-4 h-4 text-sky-400" />;
      default:
        return <Box className="w-4 h-4 text-sky-400" />;
    }
  };

  if (isCollapsed) {
    return (
      <div
        className={`w-14 h-full flex flex-col items-center py-4 border-r select-none transition-colors duration-200 z-30 ${
          isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          onClick={onToggleCollapse}
          title="Expand Control Panel"
          className={`p-2.5 rounded-lg mb-6 transition-all ${
            isDark ? 'hover:bg-slate-800 text-sky-400' : 'hover:bg-slate-100 text-blue-600'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('solids');
            }}
            title="Engineering Solids"
            className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400"
          >
            <Box className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('dimensions');
            }}
            title="Parametric Dimensions"
            className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400"
          >
            <Sliders className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('orientation');
            }}
            title="Orientation & Inclination"
            className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400"
          >
            <Rotate3d className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              onToggleCollapse();
              setActiveTab('display');
            }}
            title="Display Options"
            className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Drawing Sheet (White)' : 'Switch to CAD Blueprint (Dark)'}
            className="p-2.5 rounded-lg text-amber-400 hover:bg-slate-800"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`w-80 h-full flex flex-col border-r select-none transition-colors duration-200 z-30 ${
        isDark ? 'bg-[#0f172a] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Sidebar Header */}
      <div className="px-4 py-3.5 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          <span className="font-mono font-bold text-xs tracking-wider uppercase">
            CONTROL PALETTE
          </span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Collapse Sidebar"
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-slate-700/50 p-1 text-[11px] font-mono">
        <button
          onClick={() => setActiveTab('solids')}
          className={`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'solids'
              ? isDark
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                : 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Solids</span>
        </button>

        <button
          onClick={() => setActiveTab('dimensions')}
          className={`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'dimensions'
              ? isDark
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                : 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Dimens</span>
        </button>

        <button
          onClick={() => setActiveTab('orientation')}
          className={`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'orientation'
              ? isDark
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                : 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Rotate3d className="w-3.5 h-3.5" />
          <span>Rotate</span>
        </button>

        <button
          onClick={() => setActiveTab('display')}
          className={`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${
            activeTab === 'display'
              ? isDark
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                : 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Display</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* TAB 1: SOLIDS PRESETS */}
        {activeTab === 'solids' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Standard Engineering Solids</span>
              <span className="text-[10px] text-sky-400">{SOLID_PRESETS.length} models</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {SOLID_PRESETS.map((preset) => {
                const isSelected = currentSolid === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectSolid(preset.id)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-950/40 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'bg-blue-50 border-blue-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        isSelected
                          ? isDark
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-blue-100 text-blue-700'
                          : isDark
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {getSolidIcon(preset.iconName)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold truncate ${
                            isSelected
                              ? isDark
                                ? 'text-sky-300'
                                : 'text-blue-700'
                              : isDark
                              ? 'text-slate-200'
                              : 'text-slate-800'
                          }`}
                        >
                          {preset.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {preset.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PARAMETRIC DIMENSIONS */}
        {activeTab === 'dimensions' && (
          <div className="space-y-4">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Parametric Dimensions</span>
              <span className="text-[10px] text-amber-400">All in millimeters (mm)</span>
            </div>

            {/* Length (L) */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Length (L) [X-axis]
                </span>
                <span className="font-bold text-sky-400">{dimensions.length} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="2"
                value={dimensions.length}
                onChange={(e) =>
                  onUpdateDimensions({ ...dimensions, length: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20 mm</span>
                <span>60 mm</span>
                <span>100 mm</span>
              </div>
            </div>

            {/* Width / Depth (W) */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Width / Depth (W) [Z-axis]
                </span>
                <span className="font-bold text-sky-400">{dimensions.width} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="2"
                value={dimensions.width}
                onChange={(e) =>
                  onUpdateDimensions({ ...dimensions, width: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20 mm</span>
                <span>50 mm</span>
                <span>100 mm</span>
              </div>
            </div>

            {/* Height (H) */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Height (H) [Y-axis]
                </span>
                <span className="font-bold text-sky-400">{dimensions.height} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="2"
                value={dimensions.height}
                onChange={(e) =>
                  onUpdateDimensions({ ...dimensions, height: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20 mm</span>
                <span>50 mm</span>
                <span>100 mm</span>
              </div>
            </div>

            {/* Quick Dimension Ratios */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Quick Presets:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onUpdateDimensions({ length: 60, width: 40, height: 50 })}
                  className="px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  60×40×50
                </button>
                <button
                  onClick={() => onUpdateDimensions({ length: 50, width: 50, height: 50 })}
                  className="px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  Cube 50³
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORIENTATION / INCLINATION */}
        {activeTab === 'orientation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
              <span>Inclination / Rotation</span>
              <button
                onClick={onResetRotation}
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset (0,0,0)
              </button>
            </div>

            {/* Rotate X */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-red-400">Tilt X (θ to HP)</span>
                <span className="font-bold text-sky-400">{rotation.x}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.x}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, x: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, x: angle })}
                    className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                      rotation.x === angle
                        ? 'bg-red-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            {/* Rotate Y */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-400">Spin Y (Azimuth)</span>
                <span className="font-bold text-sky-400">{rotation.y}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.y}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, y: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, y: angle })}
                    className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                      rotation.y === angle
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            {/* Rotate Z */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-blue-400">Tilt Z (φ to VP)</span>
                <span className="font-bold text-sky-400">{rotation.z}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation.z}
                onChange={(e) =>
                  onUpdateRotation({ ...rotation, z: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {SNAP_ANGLES.map((angle) => (
                  <button
                    key={angle}
                    onClick={() => onUpdateRotation({ ...rotation, z: angle })}
                    className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                      rotation.z === angle
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADVANCED GRAPHICS & PEDAGOGY TOGGLES */}
        {activeTab === 'display' && (
          <div className="space-y-4">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Drafting & Render Styles
            </div>

            {/* 3D Material / Shading Style */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-200">
                3D CAD Material Finish
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['aluminum', 'steel', 'polymer', 'glass', 'anodized'] as RenderStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      onUpdateDisplayOptions({ ...displayOptions, renderStyle: style })
                    }
                    className={`py-1.5 px-2 rounded border text-[10px] font-mono uppercase font-bold transition-all ${
                      displayOptions.renderStyle === style
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Method: 45° Miter vs Compass Arcs */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-200">
                Quadrant 4 Depth Transfer
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() =>
                    onUpdateDisplayOptions({ ...displayOptions, transferMethod: 'miter' })
                  }
                  className={`py-1.5 px-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                    displayOptions.transferMethod === 'miter'
                      ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>45° Miter Line</span>
                </button>
                <button
                  onClick={() =>
                    onUpdateDisplayOptions({ ...displayOptions, transferMethod: 'compass' })
                  }
                  className={`py-1.5 px-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                    displayOptions.transferMethod === 'compass'
                      ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Compass Arcs</span>
                </button>
              </div>
            </div>

            {/* Hidden Lines (Dashed) */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  Hidden Lines (Dashed)
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Renders occluded edges behind solid faces
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showHiddenLines}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showHiddenLines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Dimension Callout Lines */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  Dimension Lines (L, W, H)
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  BIS SP:46 aligned dimension arrows & text
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showDimensions}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showDimensions: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-red-500 cursor-pointer"
              />
            </div>

            {/* Observer Sight Arrows */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  Observer Sight Arrows
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Visual sight-rays pointing to FV, TV, LHSV
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showSightArrows}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showSightArrows: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Center Lines */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  Axis & Center Lines
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  BIS Type G dash-dot symmetry axes
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showCenterLines}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showCenterLines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-red-500 cursor-pointer"
              />
            </div>

            {/* Alignment / Projector Lines */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-200">
                  Alignment Projectors
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Faint rays connecting FV, TV, and LHSV
                </div>
              </div>
              <input
                type="checkbox"
                checked={displayOptions.showProjectors}
                onChange={(e) =>
                  onUpdateDisplayOptions({
                    ...displayOptions,
                    showProjectors: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Theme Toggle Button Card */}
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-200">
                Visual Drafting Theme
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => theme !== 'blueprint' && onToggleTheme()}
                  className={`p-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                    isDark
                      ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold shadow'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>CAD Blueprint</span>
                </button>

                <button
                  onClick={() => theme !== 'paper' && onToggleTheme()}
                  className={`p-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                    !isDark
                      ? 'bg-white border-blue-600 text-blue-700 font-bold shadow'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Drawing Sheet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-slate-700/50 text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>BIS SP:46 / ISO 128</span>
        </span>
        <span>v1.1.0</span>
      </div>
    </aside>
  );
};

```

---

## `src/components/Viewport3D.tsx`

*Interactive Three.js 3D viewport with OrbitControls, studio lighting, materials, and sight arrows*

```tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Compass,
  RotateCcw,
  Box,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';
import { ViewCube } from './ViewCube';
import { DisplayOptions, SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface Viewport3DProps {
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  displayOptions: DisplayOptions;
  onResetRotation: () => void;
  onUpdateDisplayOptions: (opts: DisplayOptions) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  geometry,
  dimensions,
  rotation,
  theme,
  displayOptions,
  onResetRotation,
  onUpdateDisplayOptions,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [cameraMode, setCameraMode] = useState<'isometric' | 'front' | 'top' | 'side' | 'free'>('isometric');
  const [isUnfoldPlaying, setIsUnfoldPlaying] = useState<boolean>(false);
  const [cameraMatrix, setCameraMatrix] = useState<number[]>([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);

  const isDark = theme === 'blueprint';

  // Animation of the Unfold Glass Box
  useEffect(() => {
    if (!isUnfoldPlaying) return;
    const interval = setInterval(() => {
      onUpdateDisplayOptions({
        ...displayOptions,
        unfoldProgress: (displayOptions.unfoldProgress + 2) % 102,
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isUnfoldPlaying, displayOptions, onUpdateDisplayOptions]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Renderer with high shadow fidelity and tone mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.05;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x070b14 : 0xedf2f7);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    const isoDist = 185;
    camera.position.set(isoDist, isoDist * 0.85, isoDist * 1.15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 750;
    controls.minDistance = 50;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 4-Point CAD Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x94a3b8 : 0xffffff,
      isDark ? 0.8 : 0.95
    );
    scene.add(ambientLight);

    // 1. Key Light (Soft Warm Studio Key)
    const keyLight = new THREE.DirectionalLight(0xfffaed, isDark ? 1.6 : 1.3);
    keyLight.position.set(160, 240, 180);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // 2. Fill Light (Cool Sky Blue)
    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x93c5fd, isDark ? 0.9 : 0.6);
    fillLight.position.set(-180, 120, -140);
    scene.add(fillLight);

    // 3. Rim / Specular Edge Light
    const rimLight = new THREE.DirectionalLight(isDark ? 0xf59e0b : 0xfde68a, isDark ? 0.8 : 0.5);
    rimLight.position.set(0, -120, -220);
    scene.add(rimLight);

    // 4. Top Softbox
    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 300, 0);
    scene.add(topLight);

    // Drafting Table Ground Grid
    const maxDim = Math.max(dimensions.height, dimensions.width, dimensions.length);
    const gridY = -maxDim * 0.78;
    const gridHelper = new THREE.GridHelper(
      240,
      24,
      isDark ? 0x38bdf8 : 0x2563eb,
      isDark ? 0x1e293b : 0xcbd5e1
    );
    gridHelper.position.y = gridY;
    gridHelper.visible = displayOptions.show3DGrid;
    scene.add(gridHelper);

    // Soft Ambient Contact Shadow Underneath Solid
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      gradient.addColorStop(0, isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(15, 23, 42, 0.5)');
      gradient.addColorStop(0.5, isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(15, 23, 42, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const contactShadowGeom = new THREE.PlaneGeometry(maxDim * 1.8, maxDim * 1.8);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeom, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = gridY + 0.5;
    scene.add(contactShadow);

    // Coordinate Axes Triad (Red=X, Green=Y, Blue=Z)
    const axesHelper = new THREE.AxesHelper(70);
    axesHelper.visible = displayOptions.show3DAxes;
    axesHelper.position.set(-75, gridY + 2, -75);
    scene.add(axesHelper);

    // ==========================================
    // GLASS BOX & UNFOLDING PROJECTION PLANES
    // ==========================================
    const boxSize = 140;
    const unfoldRatio = displayOptions.unfoldProgress / 100;

    const glassBoxGroup = new THREE.Group();
    glassBoxGroup.visible = displayOptions.show3DPlanes;

    // 1. Vertical Plane (V.P.) - Fixed at the rear
    const vpMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const vpGeom = new THREE.PlaneGeometry(boxSize, boxSize);
    const vpMesh = new THREE.Mesh(vpGeom, vpMat);
    vpMesh.position.set(0, 0, -boxSize / 2);
    glassBoxGroup.add(vpMesh);

    const vpEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(vpGeom),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    vpEdges.position.copy(vpMesh.position);
    glassBoxGroup.add(vpEdges);

    // 2. Horizontal Plane (H.P.) - Hinged at bottom-back X-Y line
    const hpMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hpGeom = new THREE.PlaneGeometry(boxSize, boxSize);

    const hpPivot = new THREE.Group();
    hpPivot.position.set(0, -boxSize / 2, -boxSize / 2);

    const hpMesh = new THREE.Mesh(hpGeom, hpMat);
    hpMesh.rotation.x = Math.PI / 2;
    hpMesh.position.set(0, 0, boxSize / 2);
    hpPivot.add(hpMesh);

    const hpEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(hpGeom),
      new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 })
    );
    hpEdges.position.copy(hpMesh.position);
    hpEdges.rotation.copy(hpMesh.rotation);
    hpPivot.add(hpEdges);

    hpPivot.rotation.x = unfoldRatio * (Math.PI / 2);
    glassBoxGroup.add(hpPivot);

    // 3. Right Profile Plane (R.P.P.) - Hinged along vertical X1-Y1 line
    const ppMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ppGeom = new THREE.PlaneGeometry(boxSize, boxSize);

    const ppPivot = new THREE.Group();
    ppPivot.position.set(boxSize / 2, 0, -boxSize / 2);

    const ppMesh = new THREE.Mesh(ppGeom, ppMat);
    ppMesh.rotation.y = Math.PI / 2;
    ppMesh.position.set(0, 0, boxSize / 2);
    ppPivot.add(ppMesh);

    const ppEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(ppGeom),
      new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 })
    );
    ppEdges.position.copy(ppMesh.position);
    ppEdges.rotation.copy(ppMesh.rotation);
    ppPivot.add(ppEdges);

    ppPivot.rotation.y = unfoldRatio * (Math.PI / 2);
    glassBoxGroup.add(ppPivot);

    scene.add(glassBoxGroup);

    // ==========================================
    // OBSERVER SIGHT ARROWS (EYES)
    // ==========================================
    const sightGroup = new THREE.Group();
    sightGroup.visible = displayOptions.showSightArrows;

    const createSightArrow = (
      origin: THREE.Vector3,
      dir: THREE.Vector3,
      color: number
    ) => {
      const arrowHelper = new THREE.ArrowHelper(dir, origin, 45, color, 12, 7);
      sightGroup.add(arrowHelper);
    };

    createSightArrow(
      new THREE.Vector3(0, 0, maxDim + 55),
      new THREE.Vector3(0, 0, -1),
      0x38bdf8
    );
    createSightArrow(
      new THREE.Vector3(0, maxDim + 55, 0),
      new THREE.Vector3(0, -1, 0),
      0x10b981
    );
    createSightArrow(
      new THREE.Vector3(-maxDim - 55, 0, 0),
      new THREE.Vector3(1, 0, 0),
      0xf59e0b
    );

    scene.add(sightGroup);

    // ==========================================
    // SOLID MESH WITH SUPERB CAD MATERIALS
    // ==========================================
    const solidGroup = new THREE.Group();
    solidGroup.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z),
      'XYZ'
    );
    scene.add(solidGroup);

    let solidMaterial: THREE.Material;

    if (displayOptions.renderStyle === 'aluminum') {
      // 1. Brushed Aerospace Aluminum
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xc8d5e0 : 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.22,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'steel') {
      // 2. Machined Tool Steel
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x64748b : 0x94a3b8,
        metalness: 0.85,
        roughness: 0.32,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'anodized') {
      // 3. Anodized Electric Cobalt
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0284c7 : 0x0369a1,
        metalness: 0.75,
        roughness: 0.25,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (displayOptions.renderStyle === 'glass') {
      // 4. Optical Smoked Resin / Polycarbonate
      solidMaterial = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x38bdf8 : 0x0284c7,
        metalness: 0.05,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 2.5,
        transparent: true,
        opacity: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else {
      // 5. High-Precision Polymer (Delrin White / Matte CAD)
      solidMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xf1f5f9,
        metalness: 0.15,
        roughness: 0.38,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    }

    const solidMesh = new THREE.Mesh(geometry, solidMaterial);
    solidMesh.castShadow = true;
    solidMesh.receiveShadow = true;
    solidGroup.add(solidMesh);

    // Visible Edge Lines (Razor Sharp Engineering Line Type A)
    const edgesGeom = new THREE.EdgesGeometry(geometry, 24);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0f172a,
      linewidth: 2,
    });
    const edgeLines = new THREE.LineSegments(edgesGeom, edgesMaterial);
    solidGroup.add(edgeLines);

    // Hidden Lines in 3D View
    if (displayOptions.showHiddenLines) {
      const hiddenGeom = edgesGeom.clone();
      const dashedMat = new THREE.LineDashedMaterial({
        color: isDark ? 0xf59e0b : 0x94a3b8,
        dashSize: 3,
        gapSize: 2,
        depthFunc: THREE.GreaterDepth,
        depthWrite: false,
      });
      const hiddenLines = new THREE.LineSegments(hiddenGeom, dashedMat);
      hiddenLines.computeLineDistances();
      solidGroup.add(hiddenLines);
    }

    // Animation Loop
    let animId: number;
    let lastMatrixUpdate = 0;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      // Throttled ViewCube sync
      if (time - lastMatrixUpdate > 30) {
        setCameraMatrix(Array.from(camera.matrixWorldInverse.elements));
        lastMatrixUpdate = time;
      }
    };
    animate(0);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      solidMaterial.dispose();
      edgesMaterial.dispose();
      edgesGeom.dispose();
      vpMat.dispose();
      hpMat.dispose();
      ppMat.dispose();
      contactShadowMat.dispose();
      contactShadowGeom.dispose();
      shadowTexture.dispose();
      controls.dispose();
    };
  }, [geometry, dimensions, rotation, theme, displayOptions, isDark]);

  const setCameraPreset = (preset: 'isometric' | 'front' | 'top' | 'side' | 'back' | 'right' | 'left' | 'bottom' | 'reset') => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    if (!controls || !camera) return;

    const dist = 190;
    switch (preset) {
      case 'isometric':
        camera.position.set(dist * 0.9, dist * 0.85, dist * 1.15);
        camera.up.set(0, 1, 0);
        setCameraMode('isometric');
        break;
      case 'front':
        camera.position.set(0, 0, dist * 1.35);
        camera.up.set(0, 1, 0);
        setCameraMode('front');
        break;
      case 'top':
        camera.position.set(0, dist * 1.35, 0);
        camera.up.set(0, 0, -1);
        setCameraMode('top');
        break;
      case 'side':
      case 'left':
        camera.position.set(-dist * 1.35, 0, 0);
        camera.up.set(0, 1, 0);
        setCameraMode('side');
        break;
      case 'right':
        camera.position.set(dist * 1.35, 0, 0);
        camera.up.set(0, 1, 0);
        setCameraMode('free');
        break;
      case 'back':
        camera.position.set(0, 0, -dist * 1.35);
        camera.up.set(0, 1, 0);
        setCameraMode('free');
        break;
      case 'bottom':
        camera.position.set(0, -dist * 1.35, 0);
        camera.up.set(0, 0, 1);
        setCameraMode('free');
        break;
      case 'reset':
        camera.position.set(dist * 0.9, dist * 0.85, dist * 1.15);
        camera.up.set(0, 1, 0);
        onResetRotation();
        setCameraMode('isometric');
        break;
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${
        isDark ? 'bg-[#070b14]' : 'bg-[#edf2f7]'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Header Badge */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
        <div
          className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-mono font-semibold backdrop-blur shadow-lg ${
            isDark
              ? 'bg-slate-900/90 text-sky-400 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
              : 'bg-white/95 text-slate-800 border-slate-300'
          }`}
        >
          <Box className="w-4 h-4 text-sky-400" />
          <span>3D SPACE (FIRST QUADRANT)</span>
        </div>
      </div>

      {/* 3D CAD ViewCube (Top Right) */}
      <div className="absolute top-3 right-4 z-20">
        <ViewCube
          cameraMatrix={cameraMatrix}
          onSelectView={(view) => {
            if (view === 'isometric') setCameraPreset('isometric');
            else if (view === 'front') setCameraPreset('front');
            else if (view === 'top') setCameraPreset('top');
            else if (view === 'left') setCameraPreset('left');
            else if (view === 'right') setCameraPreset('right');
            else if (view === 'back') setCameraPreset('back');
            else if (view === 'bottom') setCameraPreset('bottom');
          }}
          theme={theme}
        />
      </div>

      {/* Quick Camera Preset Toolbar (Top Center) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-lg border backdrop-blur bg-slate-900/85 border-slate-700/80 text-white shadow-xl">
        <button
          onClick={() => setCameraPreset('isometric')}
          title="Isometric View (Standard 30° CAD perspective)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'isometric'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Iso</span>
        </button>

        <button
          onClick={() => setCameraPreset('front')}
          title="Direct Front View (Look along +Z onto VP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'front'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-sky-400 font-bold">FV</span>
        </button>

        <button
          onClick={() => setCameraPreset('top')}
          title="Direct Top View (Look down +Y onto HP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'top'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-emerald-400 font-bold">TV</span>
        </button>

        <button
          onClick={() => setCameraPreset('side')}
          title="Direct Left Side View (Look from -X onto RPP)"
          className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
            cameraMode === 'side'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span className="text-amber-400 font-bold">LHSV</span>
        </button>

        <div className="w-[1px] h-4 bg-slate-700 mx-1" />

        <button
          onClick={() => setCameraPreset('reset')}
          title="Reset Camera & Orientation"
          className="px-2 py-1 text-xs font-mono rounded hover:bg-slate-800 text-slate-300 flex items-center gap-1 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset</span>
        </button>
      </div>

      {/* Glass Box Folding Controller Bar */}
      <div
        className={`absolute bottom-14 left-4 right-4 z-10 p-3 rounded-xl border backdrop-blur flex items-center justify-between gap-4 shadow-xl transition-all ${
          isDark
            ? 'bg-slate-950/85 border-sky-800/60 text-slate-200'
            : 'bg-white/95 border-slate-300 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUnfoldPlaying(!isUnfoldPlaying)}
            className={`p-2 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
              isUnfoldPlaying
                ? 'bg-amber-500 text-slate-950'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
            }`}
          >
            {isUnfoldPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isUnfoldPlaying ? 'Pause' : 'Unfold Planes'}</span>
          </button>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              GLASS BOX ROTATION (HP & RPP)
            </span>
            <span className="text-[10px] text-slate-400">
              Visual proof of why Top View is below FV & LHSV is on the right
            </span>
          </div>
        </div>

        {/* Unfold Progress Slider */}
        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <span className="text-[11px] font-mono font-bold text-slate-400">3D Box</span>
          <input
            type="range"
            min="0"
            max="100"
            value={displayOptions.unfoldProgress}
            onChange={(e) => {
              setIsUnfoldPlaying(false);
              onUpdateDisplayOptions({
                ...displayOptions,
                show3DPlanes: true,
                unfoldProgress: Number(e.target.value),
              });
            }}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <span className="text-[11px] font-mono font-bold text-amber-400">2D Sheet</span>
          <span className="text-xs font-mono font-bold w-10 text-right text-sky-400">
            {displayOptions.unfoldProgress}%
          </span>
        </div>
      </div>

      {/* Axis Triad Legend (Bottom Left) */}
      <div
        className={`absolute bottom-3 left-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur flex items-center gap-3 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
            : 'bg-white/90 border-slate-300 text-slate-700 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="font-bold">X (Length)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="font-bold">Y (Height)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span className="font-bold">Z (Width)</span>
        </div>
      </div>

      {/* Real-time Orientation Readout */}
      <div
        className={`absolute bottom-3 right-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-400'
            : 'bg-white/90 border-slate-300 text-slate-600 shadow-sm'
        }`}
      >
        <span>Orientation: </span>
        <span className="text-sky-400 font-bold">θx {rotation.x}°</span> •{' '}
        <span className="text-emerald-400 font-bold">θy {rotation.y}°</span> •{' '}
        <span className="text-amber-400 font-bold">θz {rotation.z}°</span>
      </div>
    </div>
  );
};

```

---

## `src/components/ViewCube.tsx`

*Interactive 3D CSS orientation ViewCube with camera snap and live tracking*

```tsx
import React from 'react';
import { Home } from 'lucide-react';

interface ViewCubeProps {
  cameraMatrix: number[];
  onSelectView: (view: 'front' | 'top' | 'left' | 'right' | 'back' | 'bottom' | 'isometric') => void;
  theme: 'blueprint' | 'paper';
}

export const ViewCube: React.FC<ViewCubeProps> = ({ cameraMatrix, onSelectView, theme }) => {
  const isDark = theme === 'blueprint';

  // Construct CSS 3D transform matrix from camera inverse matrix
  // cameraMatrix is array of 16 elements
  const [
    m0, m1, m2, ,
    m4, m5, m6, ,
    m8, m9, m10, ,
  ] = cameraMatrix.length === 16 ? cameraMatrix : [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];

  // Rotate opposite to camera so cube looks like the object
  // Invert rotation matrix (transpose of 3x3 orthonormal rotation part)
  const cssMatrix = [
    m0, m4, m8, 0,
    -m1, -m5, -m9, 0,
    m2, m6, m10, 0,
    0, 0, 0, 1,
  ];

  const transformStyle = `matrix3d(${cssMatrix.join(',')})`;

  const faceBaseClass = `absolute w-[68px] h-[68px] flex flex-col items-center justify-center font-mono font-bold text-[10px] tracking-wider border transition-all cursor-pointer select-none backface-visible ${
    isDark
      ? 'bg-slate-900/90 hover:bg-sky-500 hover:text-slate-950 text-slate-300 border-sky-500/40 shadow-[inset_0_0_10px_rgba(56,189,248,0.15)]'
      : 'bg-white/95 hover:bg-blue-600 hover:text-white text-slate-700 border-slate-300 shadow-sm'
  }`;

  const halfSize = 34; // px

  return (
    <div className="relative flex flex-col items-center">
      {/* Home / Isometric Quick Button */}
      <button
        onClick={() => onSelectView('isometric')}
        title="Isometric Home Orientation"
        className={`absolute -top-7 -left-1 p-1 rounded-md border text-xs transition-all z-20 ${
          isDark
            ? 'bg-slate-900/80 border-slate-700 text-sky-400 hover:bg-slate-800 hover:text-white'
            : 'bg-white/90 border-slate-300 text-blue-600 hover:bg-slate-100'
        }`}
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      {/* 3D Perspective Viewport for Cube */}
      <div
        className="w-24 h-24 flex items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <div
          className="relative w-[68px] h-[68px] transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: transformStyle,
          }}
        >
          {/* FRONT FACE (Z = +halfSize) */}
          <div
            onClick={() => onSelectView('front')}
            className={faceBaseClass}
            style={{ transform: `translateZ(${halfSize}px)` }}
          >
            <span>FRONT</span>
            <span className="text-[8px] opacity-70">V.P.</span>
          </div>

          {/* BACK FACE (Z = -halfSize) */}
          <div
            onClick={() => onSelectView('back')}
            className={faceBaseClass}
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
          >
            <span>BACK</span>
          </div>

          {/* TOP FACE (Y = +halfSize) */}
          <div
            onClick={() => onSelectView('top')}
            className={faceBaseClass}
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
          >
            <span>TOP</span>
            <span className="text-[8px] opacity-70">H.P.</span>
          </div>

          {/* BOTTOM FACE (Y = -halfSize) */}
          <div
            onClick={() => onSelectView('bottom')}
            className={faceBaseClass}
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
          >
            <span>BOTTOM</span>
          </div>

          {/* RIGHT FACE (X = +halfSize) */}
          <div
            onClick={() => onSelectView('right')}
            className={faceBaseClass}
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
          >
            <span>RIGHT</span>
          </div>

          {/* LEFT FACE (X = -halfSize) */}
          <div
            onClick={() => onSelectView('left')}
            className={faceBaseClass}
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
          >
            <span>LEFT</span>
            <span className="text-[8px] opacity-70">R.P.P.</span>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 -mt-1">
        CAD VIEWCUBE
      </div>
    </div>
  );
};

```

---

## `src/components/ViewCanvas2D.tsx`

*Real-time orthographic 2D canvas with visible/hidden lines and dimension callouts*

```tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface ViewCanvas2DProps {
  viewType: 'front' | 'top' | 'leftSide';
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  showHiddenLines: boolean;
  showDimensions: boolean;
  showCenterLines: boolean;
  label: string;
  sublabel: string;
  planeName: string;
  quadrant: string;
  dimensionsSummary: string;
  onCanvasReady?: (type: 'front' | 'top' | 'leftSide', canvas: HTMLCanvasElement) => void;
}

export const ViewCanvas2D: React.FC<ViewCanvas2DProps> = ({
  viewType,
  geometry,
  dimensions,
  rotation,
  theme,
  showHiddenLines,
  showDimensions,
  showCenterLines,
  label,
  sublabel,
  planeName,
  quadrant,
  dimensionsSummary,
  onCanvasReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (onCanvasReady) {
      onCanvasReady(viewType, canvas);
    }

    const isDark = theme === 'blueprint';
    const bgColor = isDark ? 0x0c1222 : 0xf8fafc;
    const meshFaceColor = isDark ? 0x111a2e : 0xffffff;
    const visibleEdgeColor = isDark ? 0x38bdf8 : 0x0f172a;
    const hiddenEdgeColor = isDark ? 0xf59e0b : 0x64748b;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(bgColor, 1);

    // Scene
    const scene = new THREE.Scene();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.4 : 0.2);
    dirLight.position.set(50, 100, 100);
    scene.add(dirLight);

    // Group for the solid with applied rotation
    const solidGroup = new THREE.Group();
    solidGroup.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z),
      'XYZ'
    );
    scene.add(solidGroup);

    // 1. Shaded Solid Mesh
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: meshFaceColor,
      roughness: 0.6,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: 1.5,
      polygonOffsetUnits: 1.5,
      depthTest: true,
      depthWrite: true,
    });
    const solidMesh = new THREE.Mesh(geometry, meshMaterial);
    solidMesh.renderOrder = 0;
    solidGroup.add(solidMesh);

    // 2. Visible Edges (Solid Lines)
    const edgesGeom = new THREE.EdgesGeometry(geometry, 20);
    const visibleLineMat = new THREE.LineBasicMaterial({
      color: visibleEdgeColor,
      linewidth: 2,
      depthTest: true,
      depthWrite: true,
      depthFunc: THREE.LessEqualDepth,
    });
    const visibleEdges = new THREE.LineSegments(edgesGeom, visibleLineMat);
    visibleEdges.renderOrder = 1;
    solidGroup.add(visibleEdges);

    // 3. Hidden Edges (Dashed Lines)
    if (showHiddenLines) {
      const hiddenGeom = edgesGeom.clone();
      const dashedLineMat = new THREE.LineDashedMaterial({
        color: hiddenEdgeColor,
        dashSize: 2.2,
        gapSize: 1.5,
        scale: 1,
        depthTest: true,
        depthWrite: false,
        depthFunc: THREE.GreaterDepth,
      });
      const hiddenEdges = new THREE.LineSegments(hiddenGeom, dashedLineMat);
      hiddenEdges.computeLineDistances();
      hiddenEdges.renderOrder = 2;
      solidGroup.add(hiddenEdges);
    }

    // 4. Center Lines (BIS Type G: Long Dash - Dot - Long Dash)
    if (showCenterLines) {
      const centerMat = new THREE.LineDashedMaterial({
        color: isDark ? 0xef4444 : 0xdc2626,
        dashSize: 6,
        gapSize: 2,
        scale: 1,
      });
      const centerGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -60, 0),
        new THREE.Vector3(0, 60, 0),
        new THREE.Vector3(-60, 0, 0),
        new THREE.Vector3(60, 0, 0),
      ]);
      const centerLines = new THREE.LineSegments(centerGeom, centerMat);
      centerLines.computeLineDistances();
      solidGroup.add(centerLines);
    }

    // Camera setup for Orthographic Views
    const frustumSize = 135;
    const aspect = container.clientWidth / container.clientHeight;
    let camera: THREE.OrthographicCamera;
    const camDistance = 300;

    if (viewType === 'front') {
      camera = new THREE.OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(0, 0, camDistance);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
    } else if (viewType === 'top') {
      camera = new THREE.OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(0, camDistance, 0);
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    } else {
      camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / 2,
        (-frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        1000
      );
      camera.position.set(-camDistance, 0, 0);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
    }

    camera.updateProjectionMatrix();

    // Render
    const render = () => {
      renderer.render(scene, camera);
    };
    render();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      const newAspect = w / h;
      if (viewType === 'leftSide') {
        camera.left = (frustumSize * newAspect) / 2;
        camera.right = (-frustumSize * newAspect) / 2;
      } else {
        camera.left = (-frustumSize * newAspect) / 2;
        camera.right = (frustumSize * newAspect) / 2;
      }
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      render();
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      meshMaterial.dispose();
      visibleLineMat.dispose();
      edgesGeom.dispose();
    };
  }, [viewType, geometry, dimensions, rotation, theme, showHiddenLines, showCenterLines, onCanvasReady]);

  const isDark = theme === 'blueprint';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#0c1222]' : 'bg-[#f8fafc]'
      }`}
    >
      {/* Millimeter Engineering Graph Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
               linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(100, 116, 139, 0.2) 1px, transparent 1px),
               linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <canvas ref={canvasRef} className="w-full h-full block relative z-0" />

      {/* Engineering View Header & Quadrant Tag */}
      <div className="absolute top-2 left-3 z-10 pointer-events-none flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${
              isDark
                ? 'bg-sky-950/80 text-sky-300 border-sky-800/80 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            {label}
          </span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              isDark ? 'bg-slate-800/80 text-slate-400' : 'bg-slate-200/80 text-slate-600'
            }`}
          >
            {planeName}
          </span>
        </div>
        <span
          className={`text-[10px] font-mono mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {sublabel} • {dimensionsSummary}
        </span>
      </div>

      {/* Aligned Engineering Dimension Callouts Overlay */}
      {showDimensions && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {viewType === 'front' && (
            <>
              {/* Length L Dimension Line (Bottom) */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold">
                <span className="w-2 h-[1px] bg-red-400" />
                <span>◄── L = {dimensions.length} mm ──►</span>
                <span className="w-2 h-[1px] bg-red-400" />
              </div>
              {/* Height H Dimension Line (Right) */}
              <div className="absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90">
                <span>◄── H = {dimensions.height} mm ──►</span>
              </div>
            </>
          )}

          {viewType === 'top' && (
            <>
              {/* Length L Dimension Line */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold">
                <span>◄── L = {dimensions.length} mm ──►</span>
              </div>
              {/* Width W Dimension Line */}
              <div className="absolute left-6 flex flex-col items-center gap-1 font-mono text-[10px] text-blue-400 font-bold -rotate-90">
                <span>◄── W = {dimensions.width} mm ──►</span>
              </div>
            </>
          )}

          {viewType === 'leftSide' && (
            <>
              {/* Width W Dimension Line (Bottom) */}
              <div className="absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-blue-400 font-bold">
                <span>◄── W = {dimensions.width} mm ──►</span>
              </div>
              {/* Height H Dimension Line */}
              <div className="absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90">
                <span>◄── H = {dimensions.height} mm ──►</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Faint Center Crosshair */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`w-4 h-[1px] ${
            isDark ? 'bg-sky-500/30' : 'bg-slate-400/40'
          }`}
        />
        <div
          className={`h-4 w-[1px] absolute ${
            isDark ? 'bg-sky-500/30' : 'bg-slate-400/40'
          }`}
        />
      </div>

      {/* Quadrant Indicator Badge */}
      <div className="absolute bottom-2 right-3 pointer-events-none">
        <span
          className={`text-[9px] font-mono tracking-widest uppercase ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {quadrant}
        </span>
      </div>
    </div>
  );
};

```

---

## `src/components/OrthographicSheet.tsx`

*ISO A3 drafting sheet layout with zone markings, miter line, and alignment projectors*

```tsx
import React, { useRef } from 'react';
import * as THREE from 'three';
import { ViewCanvas2D } from './ViewCanvas2D';
import { TitleBlock } from './TitleBlock';
import { DisplayOptions, SolidDimensions, SolidRotation, ThemeMode } from '../types';

interface OrthographicSheetProps {
  geometry: THREE.BufferGeometry;
  dimensions: SolidDimensions;
  rotation: SolidRotation;
  theme: ThemeMode;
  displayOptions: DisplayOptions;
  solidName: string;
  onCanvasesReady?: (canvases: {
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
  }) => void;
}

export const OrthographicSheet: React.FC<OrthographicSheetProps> = ({
  geometry,
  dimensions,
  rotation,
  theme,
  displayOptions,
  solidName,
  onCanvasesReady,
}) => {
  const isDark = theme === 'blueprint';
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const topCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sideCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasReady = (type: 'front' | 'top' | 'leftSide', canvas: HTMLCanvasElement) => {
    if (type === 'front') frontCanvasRef.current = canvas;
    if (type === 'top') topCanvasRef.current = canvas;
    if (type === 'leftSide') sideCanvasRef.current = canvas;

    if (onCanvasesReady) {
      onCanvasesReady({
        front: frontCanvasRef.current,
        top: topCanvasRef.current,
        leftSide: sideCanvasRef.current,
      });
    }
  };

  return (
    <div
      id="orthographic-sheet-container"
      className={`relative w-full h-full p-3 flex flex-col select-none transition-colors duration-200 ${
        isDark ? 'bg-[#060a12]' : 'bg-[#e2e8f0]'
      }`}
    >
      {/* Outer ISO A3 Technical Drawing Sheet Border with Zone Coordinates */}
      <div
        className={`relative flex-1 rounded-xl border-2 overflow-hidden flex flex-col shadow-2xl transition-colors duration-200 ${
          isDark
            ? 'bg-[#0b101d] border-sky-600/50 shadow-[0_0_35px_rgba(11,16,29,0.9)]'
            : 'bg-[#f8fafc] border-slate-500 shadow-xl'
        }`}
      >
        {/* ISO Standard Zone Coordinate Bar (Top: 1 - 8) */}
        <div
          className={`h-5 border-b grid grid-cols-8 text-[9px] font-mono font-bold items-center text-center ${
            isDark
              ? 'bg-[#0e1628] border-slate-800 text-slate-500'
              : 'bg-slate-200 border-slate-300 text-slate-600'
          }`}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((zone) => (
            <div key={zone} className="border-r border-slate-800/40 last:border-r-0">
              {zone}
            </div>
          ))}
        </div>

        {/* Inner Sheet Area with Left/Right Zone Coordinate Margins */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Left Zone Coordinates (A - D) */}
          <div
            className={`w-5 border-r flex flex-col justify-around text-[9px] font-mono font-bold items-center text-center ${
              isDark
                ? 'bg-[#0e1628] border-slate-800 text-slate-500'
                : 'bg-slate-200 border-slate-300 text-slate-600'
            }`}
          >
            {['A', 'B', 'C', 'D'].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>

          {/* Main 2x2 Orthographic Quadrant Drawing Workspace */}
          <div className="relative flex-1 grid grid-cols-2 grid-rows-2">
            {/* Quadrant 1 (Top-Left): FRONT VIEW (Elevation on VP) */}
            <div className="relative border-r border-b border-dashed border-slate-600/30 overflow-hidden">
              <ViewCanvas2D
                viewType="front"
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label="FRONT VIEW (FV)"
                sublabel="ELEVATION"
                planeName="V.P."
                quadrant="Quadrant 1"
                dimensionsSummary={`L: ${dimensions.length}mm × H: ${dimensions.height}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 2 (Top-Right): LEFT-HAND SIDE VIEW (on RPP) */}
            <div className="relative border-b border-dashed border-slate-600/30 overflow-hidden">
              <ViewCanvas2D
                viewType="leftSide"
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label="LEFT SIDE VIEW (LHSV)"
                sublabel="PROFILE VIEW"
                planeName="R.P.P."
                quadrant="Quadrant 2"
                dimensionsSummary={`W: ${dimensions.width}mm × H: ${dimensions.height}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 3 (Bottom-Left): TOP VIEW (Plan on HP) */}
            <div className="relative border-r border-dashed border-slate-600/30 overflow-hidden">
              <ViewCanvas2D
                viewType="top"
                geometry={geometry}
                dimensions={dimensions}
                rotation={rotation}
                theme={theme}
                showHiddenLines={displayOptions.showHiddenLines}
                showDimensions={displayOptions.showDimensions}
                showCenterLines={displayOptions.showCenterLines}
                label="TOP VIEW (TV)"
                sublabel="PLAN"
                planeName="H.P."
                quadrant="Quadrant 3"
                dimensionsSummary={`L: ${dimensions.length}mm × W: ${dimensions.width}mm`}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* Quadrant 4 (Bottom-Right): 45° MITER / COMPASS ARCS & TITLE BLOCK */}
            <div
              className={`relative p-3 flex flex-col justify-between overflow-hidden ${
                isDark ? 'bg-[#0d1424]' : 'bg-[#f1f5f9]'
              }`}
            >
              {/* 45-Degree Miter or Compass Arcs Graphics */}
              <div className="relative flex-1 flex flex-col items-center justify-center p-1">
                <svg className="w-full h-full max-h-[140px]" viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
                  {displayOptions.showMiterLine && (
                    <>
                      {displayOptions.transferMethod === 'miter' ? (
                        /* 45° Straight Miter Line Method */
                        <g>
                          <line
                            x1="10"
                            y1="10"
                            x2="160"
                            y2="110"
                            stroke={isDark ? '#38bdf8' : '#2563eb'}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />
                          <text
                            x="95"
                            y="62"
                            fill={isDark ? '#38bdf8' : '#2563eb'}
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            45° MITER LINE
                          </text>

                          {/* Projector rays reflecting at 45° */}
                          {displayOptions.showProjectors && (
                            <g
                              stroke={isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.4)'}
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            >
                              <line x1="10" y1="45" x2="60" y2="45" />
                              <line x1="60" y1="45" x2="60" y2="5" />

                              <line x1="10" y1="85" x2="116" y2="85" />
                              <line x1="116" y1="85" x2="116" y2="5" />
                            </g>
                          )}
                        </g>
                      ) : (
                        /* Compass Arc Projection Method */
                        <g>
                          <path
                            d="M 10,50 A 45,45 0 0,0 55,5"
                            fill="none"
                            stroke={isDark ? '#38bdf8' : '#2563eb'}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />
                          <path
                            d="M 10,90 A 85,85 0 0,0 95,5"
                            fill="none"
                            stroke={isDark ? '#38bdf8' : '#2563eb'}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />
                          <text
                            x="70"
                            y="55"
                            fill={isDark ? '#38bdf8' : '#2563eb'}
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            COMPASS ARCS
                          </text>
                        </g>
                      )}
                    </>
                  )}
                </svg>
              </div>

              {/* Title Block in bottom right */}
              <div className="w-full mt-auto">
                <TitleBlock solidName={solidName} dimensions={dimensions} theme={theme} />
              </div>
            </div>

            {/* SVG Overlay for Real-time Alignment Projector Lines across Quadrants */}
            {displayOptions.showProjectors && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vertical Projectors: Front View to Top View */}
                <line
                  x1="28%"
                  y1="18%"
                  x2="28%"
                  y2="82%"
                  stroke={isDark ? '#38bdf8' : '#3b82f6'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
                <line
                  x1="38%"
                  y1="18%"
                  x2="38%"
                  y2="82%"
                  stroke={isDark ? '#38bdf8' : '#3b82f6'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />

                {/* Horizontal Projectors: Front View to LHSV */}
                <line
                  x1="15%"
                  y1="22%"
                  x2="85%"
                  y2="22%"
                  stroke={isDark ? '#38bdf8' : '#3b82f6'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
                <line
                  x1="15%"
                  y1="36%"
                  x2="85%"
                  y2="36%"
                  stroke={isDark ? '#38bdf8' : '#3b82f6'}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={isDark ? 0.35 : 0.45}
                />
              </svg>
            )}

            {/* Crisp Horizontal Reference Line X — Y */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-30 flex items-center">
              <div
                className={`absolute left-2 -top-6 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${
                  isDark ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-white text-slate-800 border border-slate-300'
                }`}
              >
                X
              </div>

              <div
                className={`w-full h-[2px] ${
                  isDark ? 'bg-sky-500/80 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'bg-slate-700'
                }`}
              />

              <div
                className={`absolute right-2 -top-6 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${
                  isDark ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-white text-slate-800 border border-slate-300'
                }`}
              >
                Y
              </div>
            </div>

            {/* Crisp Vertical Reference Line X1 — Y1 */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex justify-center">
              <div
                className={`absolute top-2 -left-8 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${
                  isDark ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-white text-slate-800 border border-slate-300'
                }`}
              >
                X₁
              </div>

              <div
                className={`h-full w-[2px] ${
                  isDark ? 'bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'
                }`}
              />

              <div
                className={`absolute bottom-2 -left-8 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${
                  isDark ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-white text-slate-800 border border-slate-300'
                }`}
              >
                Y₁
              </div>

              {/* Origin Intersection O Badge */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] border shadow-lg ${
                  isDark
                    ? 'bg-slate-900 text-sky-300 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'bg-white text-slate-900 border-slate-600 shadow-md'
                }`}
              >
                O
              </div>
            </div>
          </div>

          {/* Right Zone Coordinates (A - D) */}
          <div
            className={`w-5 border-l flex flex-col justify-around text-[9px] font-mono font-bold items-center text-center ${
              isDark
                ? 'bg-[#0e1628] border-slate-800 text-slate-500'
                : 'bg-slate-200 border-slate-300 text-slate-600'
            }`}
          >
            {['A', 'B', 'C', 'D'].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </div>

        {/* ISO Standard Zone Coordinate Bar (Bottom: 1 - 8) */}
        <div
          className={`h-5 border-t grid grid-cols-8 text-[9px] font-mono font-bold items-center text-center ${
            isDark
              ? 'bg-[#0e1628] border-slate-800 text-slate-500'
              : 'bg-slate-200 border-slate-300 text-slate-600'
          }`}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((zone) => (
            <div key={zone} className="border-r border-slate-800/40 last:border-r-0">
              {zone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/TitleBlock.tsx`

*Mechanical engineering institutional title block with tolerances and projection symbol*

```tsx
import React from 'react';
import { SolidDimensions, ThemeMode } from '../types';

interface TitleBlockProps {
  solidName: string;
  dimensions: SolidDimensions;
  theme: ThemeMode;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ solidName, dimensions, theme }) => {
  const isDark = theme === 'blueprint';

  return (
    <div
      className={`border text-[10px] font-mono select-none rounded p-2.5 transition-colors ${
        isDark
          ? 'bg-[#0f172a]/95 border-sky-800/80 text-slate-300 shadow-xl'
          : 'bg-white border-slate-400 text-slate-800 shadow-md'
      }`}
    >
      <div className="grid grid-cols-12 gap-2">
        {/* Left Section: Institutional Header & Drawing Specs */}
        <div className="col-span-8 flex flex-col justify-between border-r pr-2 border-slate-700/60">
          <div>
            <div className="flex items-center justify-between border-b pb-1 border-slate-700/40">
              <span
                className={`font-bold tracking-wider text-[11px] uppercase ${
                  isDark ? 'text-sky-400' : 'text-blue-700'
                }`}
              >
                DEPT. OF MECHANICAL ENGINEERING • CAD LAB
              </span>
              <span
                className={`text-[8px] px-1 py-0.2 rounded border font-bold ${
                  isDark
                    ? 'border-sky-500/40 text-sky-300 bg-sky-950/60'
                    : 'border-slate-300 text-slate-600 bg-slate-100'
                }`}
              >
                ISO 128 / BIS SP:46:2003
              </span>
            </div>

            <div className="mt-1 flex items-baseline justify-between">
              <div>
                <span className="text-[9px] text-slate-400">PART: </span>
                <span className="text-xs font-bold text-slate-100 uppercase">
                  {solidName}
                </span>
              </div>
              <div className="text-[9px] text-slate-400">
                DRG NO: <span className="font-bold text-sky-400">OV3D-EG-101</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 mt-0.5">
              Dimensions: <span className="text-sky-300 font-bold">{dimensions.length} × {dimensions.width} × {dimensions.height} mm</span> • Scale: <span className="font-bold text-amber-400">1:1</span>
            </div>
          </div>

          {/* Technical Engineering Specifications Box */}
          <div className="mt-1.5 pt-1 border-t border-slate-700/40 grid grid-cols-2 gap-1 text-[8px] text-slate-400">
            <div>
              <span>TOLERANCES: </span>
              <span className="text-slate-300 font-semibold">LINEAR ±0.1 mm, ANGULAR ±0.5°</span>
            </div>
            <div>
              <span>SURFACE FINISH: </span>
              <span className="text-slate-300 font-semibold">Ra 1.6 μm (N7 MACHINED)</span>
            </div>
          </div>
        </div>

        {/* Right Section: Official ISO First-Angle Projection Symbol */}
        <div className="col-span-4 flex flex-col items-center justify-center pl-1">
          <div className="text-[8px] font-bold tracking-wider uppercase mb-0.5 text-slate-400">
            PROJECTION METHOD
          </div>

          {/* Authentic First-Angle Symbol */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/30 border border-slate-800">
            <svg
              width="80"
              height="36"
              viewBox="0 0 80 36"
              className={isDark ? 'stroke-sky-400' : 'stroke-slate-900'}
              fill="none"
              strokeWidth="1.5"
            >
              {/* Horizontal Center Line (dash-dot) */}
              <line
                x1="2"
                y1="18"
                x2="78"
                y2="18"
                stroke={isDark ? '#64748b' : '#94a3b8'}
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />

              {/* Vertical Center Line for Concentric Circles */}
              <line
                x1="62"
                y1="3"
                x2="62"
                y2="33"
                stroke={isDark ? '#64748b' : '#94a3b8'}
                strokeWidth="1"
                strokeDasharray="5 2 1 2"
              />

              {/* Truncated Cone Trapezoid (small end left, big end right) */}
              <polygon
                points="10,12 30,6 30,30 10,24"
                fill={isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(15, 23, 42, 0.05)'}
              />

              {/* Outer Circle (matching larger diameter = 24px) */}
              <circle cx="62" cy="18" r="12" />

              {/* Inner Circle (matching smaller diameter = 12px) */}
              <circle cx="62" cy="18" r="6" />
            </svg>
          </div>

          <div
            className={`text-[8px] font-bold tracking-widest mt-1 uppercase ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            FIRST ANGLE PROJECTION
          </div>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/TheoryModal.tsx`

*First-Angle projection interactive theory and reference modal*

```tsx
import React from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const isDark = theme === 'blueprint';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${
          isDark
            ? 'bg-[#0f172a] border-slate-700 text-slate-200'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold font-mono tracking-tight text-slate-100">
                FIRST-ANGLE ORTHOGRAPHIC PROJECTION GUIDE
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                ISO 128 / BIS SP:46 Engineering Graphics Theory for First-Year B.Tech
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm custom-scrollbar">
          {/* Section 1: Fundamental Principle */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-sky-950/20 border-sky-800/50' : 'bg-blue-50/50 border-blue-200'
            }`}
          >
            <h3 className="text-sm font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              1. The Golden Rule of First-Angle Projection
            </h3>
            <p className="leading-relaxed">
              In First-Angle Projection, the object is imagined to be situated in the{' '}
              <strong className="text-sky-400">First Quadrant</strong>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-xs text-slate-300">
              <li>
                <strong>Above</strong> the Horizontal Plane (H.P.)
              </li>
              <li>
                <strong>In front of</strong> the Vertical Plane (V.P.)
              </li>
              <li>
                The <strong>Object lies BETWEEN the Observer and the Plane of Projection</strong>.
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              When the rays of sight strike the object, its shadow or image is cast onto the plane
              behind it. Thus, each view is projected onto the opposite side of the observer!
            </p>
          </div>

          {/* Section 2: Layout on the Drawing Sheet */}
          <div>
            <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-3">
              2. Standard Drawing Sheet Layout (ISO / BIS)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-sky-300 mb-2">
                  TOP-LEFT: FRONT VIEW (FV / ELEVATION)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drawn on the Vertical Plane (V.P.) <strong>ABOVE</strong> the reference line{' '}
                  <code className="text-amber-400 font-bold">X — Y</code>.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Length (L)</strong> along horizontal and <strong>Height (H)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-amber-300 mb-2">
                  TOP-RIGHT: LEFT-HAND SIDE VIEW (LHSV)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Projected onto the Right Profile Plane (R.P.P.) to the <strong>RIGHT</strong> of
                  the Front View, beyond the reference line{' '}
                  <code className="text-amber-400 font-bold">X₁ — Y₁</code>.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Width/Depth (W)</strong> along horizontal and <strong>Height (H)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-emerald-300 mb-2">
                  BOTTOM-LEFT: TOP VIEW (TV / PLAN)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drawn on the Horizontal Plane (H.P.) <strong>BELOW</strong> the reference line{' '}
                  <code className="text-amber-400 font-bold">X — Y</code>, aligned directly under the Front View.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Shows: <strong>Length (L)</strong> along horizontal and <strong>Width/Depth (W)</strong> along vertical.
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-mono font-bold text-xs text-purple-300 mb-2">
                  BOTTOM-RIGHT: 45° MITER LINE & TITLE BLOCK
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A 45° construction line drawn from the intersection of X-Y and X₁-Y₁ that transfers
                  depth dimensions from the Top View directly up into the Side View.
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  • Accommodates the official First-Angle Projection symbol and drawing credentials.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Why 2nd and 4th Quadrant are not used */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-800/40' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              3. Classic Exam Question: Why are 2nd & 4th Angle Projections NOT used?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When preparing an orthographic projection sheet, the Horizontal Plane (H.P.) is rotated{' '}
              <strong>90° clockwise</strong> about the reference line X-Y to bring it into the same
              plane as the Vertical Plane (V.P.):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="p-2.5 rounded bg-black/20 text-xs">
                <span className="font-bold text-amber-300">In the 2nd Quadrant:</span> The H.P. is
                above the reference line. When rotated 90° clockwise, the H.P. swings upward and{' '}
                <strong>overlaps directly with the V.P.</strong> The Front View and Top View lie on top of
                one another, resulting in an unintelligible mess of overlapping lines!
              </div>
              <div className="p-2.5 rounded bg-black/20 text-xs">
                <span className="font-bold text-amber-300">In the 4th Quadrant:</span> Both V.P. and
                H.P. end up <strong>below</strong> the reference line after rotation. Again, the Front View
                and Top View overlap each other, making the drawing unusable.
              </div>
            </div>
          </div>

          {/* Section 4: Line Types (BIS SP:46 Standard) */}
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider mb-3">
              4. Engineering Line Standards (BIS SP:46)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-left text-slate-400">
                    <th className="pb-2">Line Style</th>
                    <th className="pb-2">Standard Name</th>
                    <th className="pb-2">Thickness</th>
                    <th className="pb-2">Application in OrthoView3D</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2 text-sky-400 font-bold">──────</td>
                    <td className="py-2">Continuous Thick (Type A)</td>
                    <td className="py-2">0.5 mm</td>
                    <td className="py-2 text-slate-300">Visible object outlines & edges</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-amber-400 font-bold">- - - -</td>
                    <td className="py-2">Dashed Medium (Type F)</td>
                    <td className="py-2">0.3 mm</td>
                    <td className="py-2 text-slate-300">Hidden outlines & edges (occluded features)</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-400 font-bold">─ · ─ ·</td>
                    <td className="py-2">Long Dash-Dotted Thin (Type G)</td>
                    <td className="py-2">0.2 mm</td>
                    <td className="py-2 text-slate-300">Center lines, axes of cylinders & cones</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sky-300/60 font-bold">······</td>
                    <td className="py-2">Continuous / Faint Thin (Type B)</td>
                    <td className="py-2">0.2 mm</td>
                    <td className="py-2 text-slate-300">Projectors, dimension lines, 45° miter line</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-end ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors"
          >
            Got It, Back to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/QuizModal.tsx`

*Interactive 6-question engineering graphics mastery quiz*

```tsx
import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeMode } from '../types';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'In ISO First-Angle Projection, where is the Top View (Plan) drawn on the drawing sheet?',
    options: [
      'Directly BELOW the Front View, on the Horizontal Plane (H.P.)',
      'Directly ABOVE the Front View, on the Vertical Plane (V.P.)',
      'To the right of the Front View, on the Profile Plane (P.P.)',
      'At any arbitrary position as long as dimensions are noted',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle projection, the observer looks from above, projecting down onto H.P. When H.P. rotates 90° clockwise down, Top View appears directly BELOW the Front View.',
  },
  {
    id: 2,
    question: 'When drawing a First-Angle projection, which side view is placed to the RIGHT of the Front View?',
    options: [
      'Left-Hand Side View (LHSV)',
      'Right-Hand Side View (RHSV)',
      'Bottom View (Inverted Plan)',
      'Axonometric Isometric View',
    ],
    correctIndex: 0,
    explanation:
      'Looking from the left, rays pass through the object and project onto the Right Profile Plane (R.P.P.). When R.P.P. is unfolded to the right, LHSV appears to the RIGHT of Front View.',
  },
  {
    id: 3,
    question: 'What is the spatial relationship between Observer, Object, and Projection Plane in First-Angle?',
    options: [
      'Observer → Object → Plane (Object is between observer and plane)',
      'Observer → Plane → Object (Plane is between observer and object)',
      'Plane → Observer → Object',
      'Object → Observer → Plane',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle, the object is placed in the First Quadrant between the observer and the plane of projection.',
  },
  {
    id: 4,
    question: 'Why are 2nd-Angle and 4th-Angle projections never utilized in engineering drawing practice?',
    options: [
      'Rotating H.P. by 90° causes Front View and Top View to overlap, creating unreadable clutter',
      'They do not support millimeter or metric dimensioning systems',
      'Computer-aided design software cannot compute negative quadrant coordinates',
      'They require 4 orthogonal projection planes instead of 3',
    ],
    correctIndex: 0,
    explanation:
      'In both 2nd and 4th quadrants, rotating H.P. 90° clockwise brings H.P. and V.P. into the same plane on the same side of the X-Y line, causing views to overlap completely.',
  },
  {
    id: 5,
    question: 'According to BIS SP:46 / ISO standards, what line type must represent hidden features and interior edges?',
    options: [
      'Dashed medium line (Type F)',
      'Continuous thick line (Type A)',
      'Long dash-dotted thin line (Type G)',
      'Wavy freehand line (Type C)',
    ],
    correctIndex: 0,
    explanation:
      'Dashed lines (Type F, medium thickness ~0.3mm) represent hidden outlines and occluded edges behind solid faces.',
  },
  {
    id: 6,
    question: 'In the official ISO First-Angle Projection symbol, which element appears on the RIGHT side?',
    options: [
      'Concentric circles with center crosshairs (representing cone view from smaller end)',
      'Truncated cone trapezoid with smaller end on the left',
      'A shaded equilateral triangle',
      'Two concentric squares with diagonal alignment lines',
    ],
    correctIndex: 0,
    explanation:
      'In First-Angle, observer looks at the frustum cone from its smaller left end; the concentric circles projection is drawn on the RIGHT side.',
  },
];

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, theme }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const isDark = theme === 'blueprint';
  const q = QUESTIONS[currentIdx];
  const userAns = selectedAnswers[q.id];
  const isAnswered = userAns !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    const newAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(newAnswers);

    // If last question answered, trigger results & check score
    if (Object.keys(newAnswers).length === QUESTIONS.length) {
      const score = QUESTIONS.filter((item) => newAnswers[item.id] === item.correctIndex).length;
      if (score >= 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const calculateScore = () => {
    return QUESTIONS.filter((item) => selectedAnswers[item.id] === item.correctIndex).length;
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${
          isDark
            ? 'bg-[#0f172a] border-slate-700 text-slate-200'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#131c31]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold font-mono tracking-tight text-slate-100">
                B.TECH ENGINEERING GRAPHICS QUIZ
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                First-Angle Projection & Technical Drawing Conventions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5 custom-scrollbar">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>
                    Question {currentIdx + 1} of {QUESTIONS.length}
                  </span>
                  <span>
                    Answered: {Object.keys(selectedAnswers).length} / {QUESTIONS.length}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-300"
                    style={{
                      width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1">
                  Question #{q.id}
                </div>
                <h3 className="text-sm font-semibold leading-relaxed text-slate-100">{q.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((option, idx) => {
                  let optStyle = isDark
                    ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700';

                  if (isAnswered) {
                    if (idx === q.correctIndex) {
                      optStyle = isDark
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold';
                    } else if (idx === userAns) {
                      optStyle = isDark
                        ? 'bg-red-950/40 border-red-500 text-red-300'
                        : 'bg-red-50 border-red-500 text-red-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center font-mono text-[10px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && idx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === userAns && idx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown upon answering) */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                    userAns === q.correctIndex
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isDark
                      ? 'bg-amber-950/20 border-amber-800/50 text-amber-300'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <div className="font-bold font-mono uppercase mb-1 flex items-center gap-1.5">
                    {userAns === q.correctIndex ? '✓ Correct Answer!' : '✗ Explanation:'}
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30"
                >
                  Previous
                </button>

                {currentIdx < QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(QUESTIONS.length - 1, prev + 1))}
                    className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
                  >
                    <span>View Score Card</span>
                    <Trophy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-mono text-slate-100">QUIZ COMPLETE!</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  You scored {calculateScore()} out of {QUESTIONS.length} points
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border inline-block min-w-[280px] font-mono ${
                  calculateScore() >= 4
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                }`}
              >
                <div className="text-2xl font-bold">
                  {Math.round((calculateScore() / QUESTIONS.length) * 100)}%
                </div>
                <div className="text-xs mt-1">
                  {calculateScore() === 6
                    ? 'Outstanding! University Gold Medal Grade.'
                    : calculateScore() >= 4
                    ? 'Well Done! Clear grasp of First-Angle Projections.'
                    : 'Review the First-Angle Theory Guide and try again!'}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono"
                >
                  Close & Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

```

---

## `README.md`

*Project overview, ISO standard references, and local setup guide*

```markdown
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

```

---

