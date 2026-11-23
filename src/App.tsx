import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Viewport3D } from './components/Viewport3D';
import { OrthographicSheet } from './components/OrthographicSheet';
import { TheoryModal } from './components/TheoryModal';
import { QuizModal } from './components/QuizModal';
import { QuestionSolverModal } from './components/QuestionSolverModal';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { createSolidGeometry, SOLID_PRESETS } from './utils/geometryGenerators';
import { exportSheetAsPNG } from './utils/exportDrawingSheet';
import {
  AppView,
  DisplayOptions,
  SavedQuestionRecord,
  SolidDimensions,
  SolidRotation,
  SolidType,
  ThemeMode,
  UserProfile,
} from './types';

const DEFAULT_SAVED_QUESTIONS: SavedQuestionRecord[] = [
  {
    id: 'q-1',
    title: 'Hexagonal Prism (30° HP)',
    question: 'Hexagonal prism of base 40mm and height 75mm inclined at 30 degrees to HP.',
    solidType: 'hex-prism',
    dimensions: { length: 40, width: 40, height: 75 },
    rotation: { x: 30, y: 0, z: 0 },
    createdAt: 'Sample',
  },
  {
    id: 'q-2',
    title: 'Stepped L-Block (80×45×60)',
    question: 'Front, top, and left side views of a stepped L-block 80x45x60mm.',
    solidType: 'l-block',
    dimensions: { length: 80, width: 45, height: 60 },
    rotation: { x: 0, y: 0, z: 0 },
    createdAt: 'Sample',
  },
  {
    id: 'q-3',
    title: 'Square Pyramid (25° VP)',
    question: 'Square pyramid of base 50mm and height 70mm inclined at 25 degrees to VP.',
    solidType: 'square-pyramid',
    dimensions: { length: 50, width: 50, height: 70 },
    rotation: { x: 0, y: 25, z: 0 },
    createdAt: 'Sample',
  },
];

export function App() {
  // User & Navigation State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('orthoview-user');
      return saved ? (JSON.parse(saved) as UserProfile) : null;
    } catch {
      return null;
    }
  });

  const [view, setView] = useState<AppView>('landing');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authContext, setAuthContext] = useState<string | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<'dashboard' | 'solver' | null>(null);

  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionRecord[]>(() => {
    try {
      const raw = localStorage.getItem('orthoview-questions');
      if (raw) {
        const parsed = JSON.parse(raw) as SavedQuestionRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SAVED_QUESTIONS;
  });

  // Active Solid & Parameters
  const [currentSolid, setCurrentSolid] = useState<SolidType>('l-block');
  const [dimensions, setDimensions] = useState<SolidDimensions>({
    length: 60,
    width: 40,
    height: 50,
  });
  const [rotation, setRotation] = useState<SolidRotation>({ x: 0, y: 0, z: 0 });

  // Theme & Modals
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('orthoview-theme');
      if (saved === 'paper' || saved === 'blueprint') return saved;
    } catch {
      // ignore
    }
    return 'paper';
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSolverOpen, setIsSolverOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

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
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('orthoview-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('orthoview-user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('orthoview-questions', JSON.stringify(savedQuestions));
    } catch {
      // ignore
    }
  }, [savedQuestions]);

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

  const canvasesRef = useRef<{
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
  }>({
    front: null,
    top: null,
    leftSide: null,
  });

  const geometry = useMemo(() => {
    return createSolidGeometry(currentSolid, dimensions);
  }, [currentSolid, dimensions]);

  const currentPreset = useMemo(() => {
    return SOLID_PRESETS.find((p) => p.id === currentSolid) || SOLID_PRESETS[0];
  }, [currentSolid]);

  const openAuthGate = (nextAction: 'dashboard' | 'solver', message?: string) => {
    setPendingAction(nextAction);
    setAuthContext(message);
    setIsAuthOpen(true);
  };

  const handleAuthenticated = (profile: UserProfile) => {
    setUser(profile);
    if (pendingAction === 'solver') {
      setView('studio');
      setIsSolverOpen(true);
    } else {
      setView('dashboard');
    }
    setPendingAction(null);
  };

  const handleSignOut = () => {
    setUser(null);
    setView('landing');
  };

  const handleSelectSolid = (type: SolidType) => {
    setCurrentSolid(type);
    const preset = SOLID_PRESETS.find((p) => p.id === type);
    if (preset) {
      setDimensions(preset.defaultDimensions);
      setRotation({ x: 0, y: 0, z: 0 });
    }
  };

  const saveQuestionToHistory = (
    solidType: SolidType,
    nextDims: SolidDimensions,
    nextRot: SolidRotation,
    questionText?: string
  ) => {
    const preset = SOLID_PRESETS.find((p) => p.id === solidType) || SOLID_PRESETS[0];
    const newRecord: SavedQuestionRecord = {
      id: `q-${Date.now()}`,
      title: `${preset.name.split('(')[0].trim()} (${nextDims.length}×${nextDims.width}×${nextDims.height})`,
      question:
        questionText ||
        `${preset.name} ${nextDims.length}x${nextDims.width}x${nextDims.height}mm`,
      solidType,
      dimensions: nextDims,
      rotation: nextRot,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSavedQuestions((prev) => [newRecord, ...prev].slice(0, 12));
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
    saveQuestionToHistory(solidType, nextDims, nextRot);
    setView('studio');

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

  const handleQuickSolveFromDashboard = ({
    question,
    solidType,
    dimensions: nextDims,
    rotation: nextRot,
  }: {
    question: string;
    solidType: SolidType;
    dimensions: SolidDimensions;
    rotation: SolidRotation;
  }) => {
    setCurrentSolid(solidType);
    setDimensions(nextDims);
    setRotation(nextRot);
    saveQuestionToHistory(solidType, nextDims, nextRot, question);
    setView('studio');
  };

  const handleLoadRecord = (record: SavedQuestionRecord) => {
    setCurrentSolid(record.solidType);
    setDimensions(record.dimensions);
    setRotation(record.rotation);
    setView('studio');
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

  const handleOpenSolverGated = () => {
    if (!user) {
      openAuthGate('solver', 'Sign in to ask questions and save accurate orthographic drawings to your dashboard.');
      return;
    }
    setIsSolverOpen(true);
  };

  const isDark = theme === 'blueprint';

  return (
    <>
      {view === 'landing' && (
        <LandingPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          user={user}
          onOpenAuth={(msg) => openAuthGate('dashboard', msg)}
          onEnterDashboard={() => setView('dashboard')}
          onOpenStudio={() => setView('studio')}
          onOpenTheory={() => setIsTheoryOpen(true)}
        />
      )}

      {view === 'dashboard' && user && (
        <Dashboard
          user={user}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          currentSolid={currentSolid}
          dimensions={dimensions}
          savedQuestions={savedQuestions}
          onSignOut={handleSignOut}
          onGoHome={() => setView('landing')}
          onOpenStudio={() => setView('studio')}
          onOpenSolverModal={() => setIsSolverOpen(true)}
          onOpenTheory={() => setIsTheoryOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onLoadRecord={handleLoadRecord}
          onQuickSolveQuestion={handleQuickSolveFromDashboard}
        />
      )}

      {view === 'studio' && (
        <div
          className={`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-300 ${
            isDark ? 'dark mono-canvas-dark text-[#f4f4f6]' : 'mono-canvas-light text-[#0d0d10]'
          }`}
        >
          <Header
            solidName={currentPreset.name}
            dimensions={dimensions}
            theme={theme}
            user={user}
            onBackToDashboard={() =>
              user
                ? setView('dashboard')
                : openAuthGate('dashboard', 'Sign in to open your personalized dashboard.')
            }
            onGoHome={() => setView('landing')}
            onToggleTheme={handleToggleTheme}
            onOpenTheory={() => setIsTheoryOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenSolver={handleOpenSolverGated}
            onExportSheet={handleExportSheet}
            isExporting={isExporting}
          />

          <div className="flex-1 flex overflow-hidden relative">
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

            <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-full">
              <section
                className={`lg:col-span-5 h-full relative border-r overflow-hidden flex flex-col ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
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
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        theme={theme}
        onAuthenticated={handleAuthenticated}
        contextMessage={authContext}
      />

      {/* Question-to-Drawing Solver Modal */}
      <QuestionSolverModal
        isOpen={isSolverOpen}
        onClose={() => setIsSolverOpen(false)}
        theme={theme}
        onApplySolution={handleApplyQuestionSolution}
      />

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
    </>
  );
}

export default App;
