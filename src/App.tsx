import React, { useEffect, useState } from 'react';
import {
  Home,
  Network,
  BookOpen,
  PlaySquare,
  Target,
  FileCheck2,
  BarChart3,
  BookMarked,
  Menu,
  X,
} from 'lucide-react';
import type { AppSection, QuestionAttempt } from './types/physics';
import { ALL_QUESTIONS } from './data/questions';
import { computeEvaluationSummary } from './utils/numberFormat';
import { BerandaView } from './components/views/BerandaView';
import { PetaKonsepView } from './components/views/PetaKonsepView';
import { MasteringPhysicsView } from './components/views/MasteringPhysicsView';
import { GaleriVisualisasiView } from './components/views/GaleriVisualisasiView';
import { LatihanSoalView } from './components/views/LatihanSoalView';
import { PembahasanView } from './components/views/PembahasanView';
import { EvaluasiView } from './components/views/EvaluasiView';
import { KamusFisikaView } from './components/views/KamusFisikaView';

const STORAGE_KEY = 'misterjo_osk10_attempts_v1';

const NAV_ITEMS: Array<{
  id: AppSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'peta-konsep', label: 'Peta Konsep', icon: Network },
  { id: 'mastering-physics', label: 'Mastering Physics', icon: BookOpen },
  { id: 'galeri-visualisasi', label: 'Galeri Visualisasi', icon: PlaySquare },
  { id: 'latihan-soal', label: 'Latihan 15 Soal', icon: Target },
  { id: 'pembahasan', label: 'Pembahasan', icon: FileCheck2 },
  { id: 'evaluasi', label: 'Evaluasi', icon: BarChart3 },
  { id: 'kamus-fisika', label: 'Kamus Fisika', icon: BookMarked },
];

function getInitialSection(): AppSection {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      return 'latihan-soal';
    }
  }
  return 'beranda';
}

function loadSavedAttempts(): Record<number, QuestionAttempt> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>(getInitialSection);
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [activeTheoryModuleId, setActiveTheoryModuleId] = useState<string>('A');
  const [attempts, setAttempts] = useState<Record<number, QuestionAttempt>>(loadSavedAttempts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [attempts]);

  const summary = computeEvaluationSummary(ALL_QUESTIONS, attempts);

  const handleNavigate = (section: AppSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestion = (questionId: number) => {
    setActiveQuestionId(questionId);
    setActiveSection('latihan-soal');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTheoryModule = (moduleId: string) => {
    setActiveTheoryModuleId(moduleId);
    setActiveSection('mastering-physics');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecordAttempt = (attempt: QuestionAttempt) => {
    setAttempts((prev) => ({
      ...prev,
      [attempt.questionId]: attempt,
    }));
  };

  const handleResetAttempts = () => {
    setAttempts({});
  };

  const activeNavLabel =
    NAV_ITEMS.find((item) => item.id === activeSection)?.label ?? 'Beranda';

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-slate-200 bg-white sticky top-0 h-screen">
        <div className="p-5 border-b border-slate-100">
          <div className="font-display font-extrabold text-lg tracking-tight text-teal-900">
            MISTER JO
          </div>
          <div className="text-xs font-medium text-slate-500 mt-0.5">
            Physics Olympiad Lab · OSK #10
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Menu Utama">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-teal-50/70 hover:text-teal-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/70">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Progres Latihan</span>
            <span className="font-mono-tabular font-bold text-teal-800">
              {summary.correctCount}/{summary.totalQuestions} Benar
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              style={{ width: `${summary.accuracyPct}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col border-r border-slate-200 z-10">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-display font-extrabold text-base text-teal-900">
                  MISTER JO
                </div>
                <div className="text-xs text-slate-500">Physics Olympiad Lab</div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu navigasi"
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Menu Mobile">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold'
                        : 'text-slate-700 hover:bg-teal-50/70'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Clean Single-Row Top Bar */}
        <header className="h-14 border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-display font-bold text-sm md:text-base text-slate-900 truncate">
              {activeNavLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline text-xs font-mono-tabular text-slate-600">
              Skor: <strong className="text-teal-800">{summary.correctCount}/15</strong>
            </span>
            <button
              type="button"
              onClick={() =>
                handleNavigate(
                  activeSection === 'latihan-soal' ? 'evaluasi' : 'latihan-soal'
                )
              }
              className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {activeSection === 'latihan-soal' ? 'Lihat Evaluasi' : 'Latihan Soal'}
            </button>
          </div>
        </header>

        {/* Active View Content */}
        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
          {activeSection === 'beranda' && (
            <BerandaView
              questions={ALL_QUESTIONS}
              attempts={attempts}
              onNavigate={handleNavigate}
              onJumpToQuestion={handleJumpToQuestion}
            />
          )}

          {activeSection === 'peta-konsep' && (
            <PetaKonsepView
              onOpenTheoryModule={handleOpenTheoryModule}
              onJumpToQuestion={handleJumpToQuestion}
            />
          )}

          {activeSection === 'mastering-physics' && (
            <MasteringPhysicsView
              activeModuleId={activeTheoryModuleId}
              onSelectModule={setActiveTheoryModuleId}
              onStartExercises={() => handleNavigate('latihan-soal')}
            />
          )}

          {activeSection === 'galeri-visualisasi' && (
            <GaleriVisualisasiView questions={ALL_QUESTIONS} />
          )}

          {activeSection === 'latihan-soal' && (
            <LatihanSoalView
              questions={ALL_QUESTIONS}
              activeQuestionId={activeQuestionId}
              onSelectQuestion={setActiveQuestionId}
              attempts={attempts}
              onRecordAttempt={handleRecordAttempt}
            />
          )}

          {activeSection === 'pembahasan' && (
            <PembahasanView
              questions={ALL_QUESTIONS}
              onJumpToQuestion={handleJumpToQuestion}
            />
          )}

          {activeSection === 'evaluasi' && (
            <EvaluasiView
              questions={ALL_QUESTIONS}
              attempts={attempts}
              onJumpToQuestion={handleJumpToQuestion}
              onOpenTheoryModule={handleOpenTheoryModule}
              onResetAttempts={handleResetAttempts}
            />
          )}

          {activeSection === 'kamus-fisika' && <KamusFisikaView />}
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>MISTER JO – PHYSICS OLYMPIAD LAB · Program Latihan OSK Fisika</span>
          <span>Pengembangan Khusus Soal Nomor 10 (Usaha & Energi Vektor)</span>
        </footer>
      </div>
    </div>
  );
}
