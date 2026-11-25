import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Viewport3D } from './components/Viewport3D';
import { OrthographicSheet } from './components/OrthographicSheet';
import { LineSolverStudio } from './components/LineSolverStudio';
import { PlanometricStudio } from './components/PlanometricStudio';
import { TheoryModal } from './components/TheoryModal';
import { QuizModal } from './components/QuizModal';
import { QuestionSolverModal } from './components/QuestionSolverModal';
import { ImageSolverModal } from './components/ImageSolverModal';
import { ExportModal } from './components/ExportModal';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { createSolidGeometry, DEFAULT_SLOTTED_CYLINDER_SPEC, SOLID_PRESETS } from './utils/geometryGenerators';
import { exportSheetAsPNG } from './utils/exportDrawingSheet';
import { parseEngineeringQuestion } from './utils/questionParser';
import { Q1_DEFAULT_LINE, Q2_DEFAULT_PLANOMETRIC } from './utils/examBank';
import {
  AppView,
  CompositePartSpec,
  DEFAULT_LINE_COLORS,
  DEFAULT_TITLE_BLOCK_FIELDS,
  DEFAULT_TITLE_BLOCK_OPTIONS,
  DisplayOptions,
  LineProblemParams,
  PlanometricParams,
  SavedQuestionRecord,
  SideViewMode,
  SolidDimensions,
  SolidRotation,
  SolidType,
  StudioModule,
  ThemeMode,
  TitleBlockMeta,
  TitleBlockOptions,
  UniversalPartBlueprint,
  UserProfile,
} from './types';

const DEFAULT_SAVED_QUESTIONS: SavedQuestionRecord[] = [
  {
    id: 'q-1',
    title: 'Q1: Line AB (60mm, 30° HP / 45° VP)',
    question: 'Line AB 60mm, end A in HP & 30mm in front of VP, 30° HP, 45° VP.',
    module: 'lines',
    solidType: 'l-block',
    dimensions: { length: 60, width: 30, height: 0 },
    rotation: { x: 30, y: 45, z: 0 },
    lineParams: Q1_DEFAULT_LINE,
    createdAt: 'Module 1',
  },
  {
    id: 'q-2',
    title: 'Q2: Planometric (100×50 + 3 Blocks)',
    question: 'Planometric view 100x50mm base with 25/25/25, 20/10/10, 30/20/20 blocks.',
    module: 'planometric',
    solidType: 'l-block',
    dimensions: { length: 100, width: 50, height: 25 },
    rotation: { x: 0, y: 0, z: 0 },
    planometricParams: Q2_DEFAULT_PLANOMETRIC,
    createdAt: 'Module 1',
  },
  {
    id: 'q-3',
    title: 'Q3: Hexagonal Pyramid (45° HP / 40° VP)',
    question: 'Hexagonal pyramid resting on corner, slant edge 45° HP, axis 40° VP.',
    module: 'orthographic',
    solidType: 'hex-pyramid',
    dimensions: { length: 50, width: 50, height: 60 },
    rotation: { x: 45, y: 40, z: 0 },
    sideViewMode: 'left',
    createdAt: 'Module 2',
  },
  {
    id: 'q-9',
    title: 'Q9: Slotted Bracket (FV, TV & RHSV)',
    question: 'Machined bracket 100x64x75mm with Right-Hand Side View.',
    module: 'orthographic',
    solidType: 'machined-bracket',
    dimensions: { length: 100, width: 64, height: 75 },
    rotation: { x: 0, y: 0, z: 0 },
    sideViewMode: 'right',
    createdAt: 'Module 5',
  },
];

export function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('orthoview-user');
      return saved ? (JSON.parse(saved) as UserProfile) : null;
    } catch {
      return null;
    }
  });

  const [view, setView] = useState<AppView>('landing');
  const [activeModule, setActiveModule] = useState<StudioModule>('orthographic');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authContext, setAuthContext] = useState<string | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<'dashboard' | 'solver' | null>(null);
  const [phase2Banner, setPhase2Banner] = useState<string | null>(null);

  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionRecord[]>(() => {
    try {
      const raw = localStorage.getItem('orthoview-questions-v3');
      if (raw) {
        const parsed = JSON.parse(raw) as SavedQuestionRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SAVED_QUESTIONS;
  });

  // Module 1 State: Straight Lines & Planometric
  const [lineParams, setLineParams] = useState<LineProblemParams>(Q1_DEFAULT_LINE);
  const [planometricParams, setPlanometricParams] = useState<PlanometricParams>(Q2_DEFAULT_PLANOMETRIC);

  // Module 2 & 5 State: Orthographic & Solids
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
  const [isImageSolverOpen, setIsImageSolverOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [compositeSpec, setCompositeSpec] = useState<CompositePartSpec>(DEFAULT_SLOTTED_CYLINDER_SPEC);
  const [universalBlueprint, setUniversalBlueprint] = useState<UniversalPartBlueprint | undefined>(undefined);
  const [customPartName, setCustomPartName] = useState<string | null>(null);
  const [titleBlockMeta, setTitleBlockMeta] = useState<TitleBlockMeta>(() => {
    try {
      const saved = localStorage.getItem('orthoview-titleblock-meta');
      if (saved) return JSON.parse(saved) as TitleBlockMeta;
    } catch {
      // ignore
    }
    return {
      name: user?.name || 'Danish Jubily',
      className: user?.branch || 'RBA',
      rollNo: '28',
      dwgNo: 'EXP-01',
      date: new Date().toLocaleDateString('en-GB'),
      scale: '1:1',
      grade: '',
      valuedBy: '',
    };
  });

  const [titleBlockOptions, setTitleBlockOptions] = useState<TitleBlockOptions>(() => {
    try {
      const saved = localStorage.getItem('orthoview-titleblock-options');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_TITLE_BLOCK_OPTIONS,
          ...parsed,
          dividerStyle: parsed.dividerStyle || 'dotted',
          lineColors: {
            ...DEFAULT_LINE_COLORS,
            ...(parsed.lineColors || {}),
          },
          fields: {
            ...DEFAULT_TITLE_BLOCK_FIELDS,
            ...(parsed.fields || {}),
          },
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_TITLE_BLOCK_OPTIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('orthoview-titleblock-meta', JSON.stringify(titleBlockMeta));
    } catch {
      // ignore
    }
  }, [titleBlockMeta]);

  useEffect(() => {
    try {
      localStorage.setItem('orthoview-titleblock-options', JSON.stringify(titleBlockOptions));
    } catch {
      // ignore
    }
  }, [titleBlockOptions]);

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
      localStorage.setItem('orthoview-questions-v3', JSON.stringify(savedQuestions));
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
    sideViewMode: 'left',
    unfoldProgress: 0,
    showHatching: false,
    showContactShadow: true,
  });

  const canvasesRef = useRef<{
    front: HTMLCanvasElement | null;
    top: HTMLCanvasElement | null;
    leftSide: HTMLCanvasElement | null;
    isometric: HTMLCanvasElement | null;
  }>({
    front: null,
    top: null,
    leftSide: null,
    isometric: null,
  });

  const geometry = useMemo(() => {
    return createSolidGeometry(currentSolid, dimensions, compositeSpec, universalBlueprint);
  }, [currentSolid, dimensions, compositeSpec, universalBlueprint]);

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
    setCustomPartName(null);
    setUniversalBlueprint(undefined);
    setCurrentSolid(type);
    const preset = SOLID_PRESETS.find((p) => p.id === type);
    if (preset) {
      setDimensions(preset.defaultDimensions);
      setRotation({ x: 0, y: 0, z: 0 });
    }
  };

  const handleApplyQuestionSolution = ({
    targetModule,
    solidType,
    dimensions: nextDims,
    rotation: nextRot,
    sideViewMode,
    lineParams: nextLine,
    planometricParams: nextPlano,
    questionText,
    phase2Note,
    exportAfter,
  }: {
    targetModule: StudioModule;
    solidType: SolidType;
    dimensions: SolidDimensions;
    rotation: SolidRotation;
    sideViewMode?: SideViewMode;
    lineParams?: LineProblemParams;
    planometricParams?: PlanometricParams;
    questionText?: string;
    phase2Note?: string;
    exportAfter?: boolean;
  }) => {
    setActiveModule(targetModule);
    setPhase2Banner(phase2Note || null);

    if (targetModule === 'lines' && nextLine) {
      setLineParams(nextLine);
    } else if (targetModule === 'planometric' && nextPlano) {
      setPlanometricParams(nextPlano);
    } else {
      setCurrentSolid(solidType);
      setDimensions(nextDims);
      setRotation(nextRot);
      if (sideViewMode) {
        setDisplayOptions((prev) => ({ ...prev, sideViewMode }));
      }
    }

    const preset = SOLID_PRESETS.find((p) => p.id === solidType) || SOLID_PRESETS[0];
    const newRecord: SavedQuestionRecord = {
      id: `q-${Date.now()}`,
      title:
        questionText && questionText.length <= 42
          ? questionText
          : targetModule === 'lines'
          ? `Line AB (${nextLine?.trueLength ?? 60}mm)`
          : targetModule === 'planometric'
          ? `Planometric (${nextPlano?.baseX ?? 100}×${nextPlano?.baseY ?? 50})`
          : `${preset.name.split('(')[0].trim()} (${nextDims.length}×${nextDims.width}×${nextDims.height})`,
      question: questionText || preset.name,
      module: targetModule,
      solidType,
      dimensions: nextDims,
      rotation: nextRot,
      sideViewMode,
      lineParams: nextLine,
      planometricParams: nextPlano,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSavedQuestions((prev) => [newRecord, ...prev].slice(0, 12));
    setView('studio');

    if (exportAfter && targetModule === 'orthographic') {
      setTimeout(() => {
        exportSheetAsPNG({
          geometry: createSolidGeometry(solidType, nextDims, compositeSpec),
          solidName: preset.name,
          dimensions: nextDims,
          rotation: nextRot,
          sideViewMode: sideViewMode || displayOptions.sideViewMode,
          titleBlockMeta,
          titleBlockOptions,
        }).catch((err) => console.error('Export error:', err));
      }, 350);
    }
  };

  const handleQuickSolveFromDashboard = (rawText: string) => {
    const parsed = parseEngineeringQuestion(rawText);
    handleApplyQuestionSolution({
      targetModule: parsed.targetModule,
      solidType: parsed.solidType,
      dimensions: parsed.dimensions,
      rotation: parsed.rotation,
      sideViewMode: parsed.sideViewMode,
      lineParams: parsed.lineParams,
      planometricParams: parsed.planometricParams,
      questionText: rawText,
    });
  };

  const handleLoadRecord = (record: SavedQuestionRecord) => {
    const mod = record.module || 'orthographic';
    setActiveModule(mod);
    setPhase2Banner(null);
    if (mod === 'lines' && record.lineParams) {
      setLineParams(record.lineParams);
    } else if (mod === 'planometric' && record.planometricParams) {
      setPlanometricParams(record.planometricParams);
    } else {
      if (record.compositeSpec) {
        setCompositeSpec(record.compositeSpec);
      }
      setUniversalBlueprint(record.universalBlueprint);
      setCurrentSolid(record.solidType);
      setDimensions(record.dimensions);
      setRotation(record.rotation);
      if (record.sideViewMode) {
        setDisplayOptions((prev) => ({ ...prev, sideViewMode: record.sideViewMode! }));
      }
    }
    setView('studio');
  };

  const handleApplyImageSolution = ({
    partName,
    solidType,
    dimensions: nextDims,
    sideViewMode,
    compositeSpec: nextSpec,
    universalBlueprint: nextBp,
  }: {
    partName: string;
    solidType: SolidType;
    dimensions: SolidDimensions;
    sideViewMode: SideViewMode;
    compositeSpec?: CompositePartSpec;
    universalBlueprint?: UniversalPartBlueprint;
  }) => {
    setActiveModule('orthographic');
    if (nextSpec) setCompositeSpec(nextSpec);
    setUniversalBlueprint(nextBp);
    setCustomPartName(partName);
    setCurrentSolid(solidType);
    setDimensions(nextDims);
    setRotation({ x: 0, y: 0, z: 0 });
    setDisplayOptions((prev) => ({ ...prev, sideViewMode }));
    setSavedQuestions((prev) => [
      {
        id: `img-${Date.now()}`,
        title: partName.slice(0, 42),
        question: `Image-to-CAD: ${partName}`,
        module: 'orthographic' as StudioModule,
        solidType,
        dimensions: nextDims,
        rotation: { x: 0, y: 0, z: 0 },
        sideViewMode,
        compositeSpec: nextSpec,
        universalBlueprint: nextBp,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ].slice(0, 12));
    setView('studio');
  };

  const handleResetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'blueprint' ? 'paper' : 'blueprint'));
  };

  const handleExportSheet = () => {
    setIsExportModalOpen(true);
  };

  const handleOpenSolverGated = () => {
    if (!user) {
      openAuthGate('solver', 'Sign in to access the 24EST1004-C Exam Bank and Question Solver.');
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
          onOpenStudio={() => {
            setActiveModule('orthographic');
            setView('studio');
          }}
          onOpenTheory={() => setIsTheoryOpen(true)}
          onOpenImageSolver={() => setIsImageSolverOpen(true)}
          onSelectSolidAndOpen={(type) => {
            handleSelectSolid(type);
            setActiveModule('orthographic');
            setPhase2Banner(null);
            setView('studio');
          }}
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
          onOpenStudio={(mod) => {
            setActiveModule(mod || 'orthographic');
            setPhase2Banner(null);
            setView('studio');
          }}
          onOpenSolverModal={() => setIsSolverOpen(true)}
          onOpenImageSolver={() => setIsImageSolverOpen(true)}
          onOpenTheory={() => setIsTheoryOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onLoadRecord={handleLoadRecord}
          onDeleteRecord={(id) => setSavedQuestions((prev) => prev.filter((r) => r.id !== id))}
          onQuickSolveQuestion={handleQuickSolveFromDashboard}
          onSelectSolidAndOpen={(type) => {
            handleSelectSolid(type);
            setActiveModule('orthographic');
            setPhase2Banner(null);
            setView('studio');
          }}
          onOpenExport={handleExportSheet}
        />
      )}

      {view === 'studio' && (
        <div
          className={`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-300 ${
            isDark ? 'dark mono-canvas-dark text-[#f4f4f6]' : 'mono-canvas-light text-[#0d0d10]'
          }`}
        >
          <Header
            activeModule={activeModule}
            onSelectModule={(mod) => {
              setActiveModule(mod);
              setPhase2Banner(null);
            }}
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
            onOpenImageSolver={() => setIsImageSolverOpen(true)}
            onExportSheet={handleExportSheet}
            isExporting={false}
          />

          {phase2Banner && (
            <div className="px-5 py-2 text-xs border-b border-current/10 glass-panel flex items-center justify-between gap-3">
              <span className="opacity-85">{phase2Banner}</span>
              <button
                onClick={() => setPhase2Banner(null)}
                className="text-[11px] opacity-60 hover:opacity-100 underline cursor-pointer shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {activeModule === 'lines' && (
            <LineSolverStudio
              params={lineParams}
              onChangeParams={setLineParams}
              theme={theme}
              studentName={user?.name}
            />
          )}

          {activeModule === 'planometric' && (
            <PlanometricStudio
              params={planometricParams}
              onChangeParams={setPlanometricParams}
              theme={theme}
            />
          )}

          {activeModule === 'orthographic' && (
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

              <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden h-full">
                <section className="lg:col-span-5 h-full relative overflow-hidden flex flex-col">
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
                    solidName={customPartName || currentPreset.name}
                    titleBlockMeta={titleBlockMeta}
                    onUpdateTitleBlockMeta={setTitleBlockMeta}
                    onCanvasesReady={(canvases) => {
                      canvasesRef.current = canvases;
                    }}
                  />
                </section>
              </main>
            </div>
          )}
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        theme={theme}
        onAuthenticated={handleAuthenticated}
        contextMessage={authContext}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        theme={theme}
        geometry={geometry}
        solidName={customPartName || currentPreset.name}
        dimensions={dimensions}
        rotation={rotation}
        sideViewMode={displayOptions.sideViewMode}
        titleBlockMeta={titleBlockMeta}
        titleBlockOptions={titleBlockOptions}
        onUpdateTitleBlockMeta={setTitleBlockMeta}
        onUpdateTitleBlockOptions={setTitleBlockOptions}
      />

      <ImageSolverModal
        isOpen={isImageSolverOpen}
        onClose={() => setIsImageSolverOpen(false)}
        theme={theme}
        onApplyImageSolution={handleApplyImageSolution}
      />

      <QuestionSolverModal
        isOpen={isSolverOpen}
        onClose={() => setIsSolverOpen(false)}
        theme={theme}
        onApplySolution={handleApplyQuestionSolution}
      />

      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        theme={theme}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        theme={theme}
      />
    </>
  );
}

export default App;
