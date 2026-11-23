import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Viewport3D } from './components/Viewport3D';
import { OrthographicSheet } from './components/OrthographicSheet';
import { TheoryModal } from './components/TheoryModal';
import { QuizModal } from './components/QuizModal';
import { QuestionSolverModal } from './components/QuestionSolverModal';
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
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('orthoview-theme');
      if (saved === 'paper' || saved === 'blueprint') return saved;
    } catch {
      // ignore storage errors
    }
    return 'blueprint';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'blueprint') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('orthoview-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSolverOpen, setIsSolverOpen] = useState<boolean>(false);
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

  const handleApplyQuestionSolution = ({
    solidType,
    dimensions: nextDims,
    rotation: nextRot,
    exportAfter,
  }: {
    solidType: SolidType;
    dimensions: SolidDimensions;
    rotation: SolidRotation;
    exportAfter?: boolean;
  }) => {
    setCurrentSolid(solidType);
    setDimensions(nextDims);
    setRotation(nextRot);
    if (exportAfter) {
      setTimeout(() => {
        const preset = SOLID_PRESETS.find((p) => p.id === solidType) || SOLID_PRESETS[0];
        exportSheetAsPNG({
          canvases: canvasesRef.current,
          solidName: preset.name,
          dimensions: nextDims,
          theme,
          showMiterLine: displayOptions.showMiterLine,
          showProjectors: displayOptions.showProjectors,
        }).catch((err) => console.error('Export error:', err));
      }, 350);
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
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-300 ${
        isDark
          ? 'dark liquid-ambient-dark text-[#f3f2fa]'
          : 'liquid-ambient-light text-[#141326]'
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
        onOpenSolver={() => setIsSolverOpen(true)}
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
          <section className={`lg:col-span-5 h-full relative border-r overflow-hidden flex flex-col ${isDark ? 'border-white/10' : 'border-indigo-950/10'}`}>
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

      {/* Question-to-Drawing Solver Modal */}
      <QuestionSolverModal
        isOpen={isSolverOpen}
        onClose={() => setIsSolverOpen(false)}
        theme={theme}
        onApplySolution={handleApplyQuestionSolution}
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
