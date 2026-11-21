import React from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { THEORY_MODULES } from '../../data/theoryModules';
import { MathBlock, MathText } from '../MathText';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';
import { TheoryVisualCanvas } from '../TheoryVisualCanvas';

interface MasteringPhysicsViewProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  onStartExercises: () => void;
}

export const MasteringPhysicsView: React.FC<MasteringPhysicsViewProps> = ({
  activeModuleId,
  onSelectModule,
  onStartExercises,
}) => {
  const currentIdx = Math.max(
    0,
    THEORY_MODULES.findIndex((m) => m.id === activeModuleId)
  );
  const currentModule = THEORY_MODULES[currentIdx] ?? THEORY_MODULES[0];

  const handlePrev = () => {
    if (currentIdx > 0) {
      onSelectModule(THEORY_MODULES[currentIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIdx < THEORY_MODULES.length - 1) {
      onSelectModule(THEORY_MODULES[currentIdx + 1].id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-700">
            Kurikulum Bertingkat A – L · Berbasis Analisis Soal Nomor 10
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mt-0.5">
            Pusat Belajar – Mastering Physics
          </h2>
        </div>

        <button
          type="button"
          onClick={onStartExercises}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Lanjut ke Latihan 15 Soal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Module Selector Grid A-L */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {THEORY_MODULES.map((mod) => {
          const isActive = mod.id === currentModule.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              className={`text-left px-3 py-2.5 rounded-xl border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className={`text-xs font-bold ${isActive ? 'text-teal-100' : 'text-teal-700'}`}>
                Modul {mod.code}
              </div>
              <div className="text-xs font-medium truncate mt-0.5">{mod.title.split(':')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Mister Jo Voice Narrator for Active Module */}
      <MisterJoNarratorBar
        title={`Modul ${currentModule.code}: ${currentModule.title}`}
        script={currentModule.narrationScript}
      />

      {/* Active Module Content Card */}
      <article className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
        <header className="border-b border-slate-100 pb-4">
          <div className="text-xs font-semibold text-emerald-700">
            Submateri {currentModule.code} dari L
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-1">
            {currentModule.title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{currentModule.summary}</p>
        </header>

        {/* Scientific Visual Stimulus */}
        <TheoryVisualCanvas module={currentModule} />

        {/* Deep Textbook Sections */}
        <div className="space-y-5">
          {currentModule.sections.map((sec, idx) => (
            <section key={idx} className="space-y-2">
              <h4 className="text-base font-display font-bold text-slate-900">{sec.heading}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                <MathText text={sec.body} />
              </p>
              {sec.formulaLatex && (
                <MathBlock latex={sec.formulaLatex} label={sec.formulaLabel} accent />
              )}
            </section>
          ))}
        </div>

        {/* Key Takeaway */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold">Intisari Penguasaan: </span>
            {currentModule.keyTakeaway}
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Modul Sebelumnya</span>
          </button>

          <span className="text-xs font-mono-tabular text-slate-500">
            {currentIdx + 1} / {THEORY_MODULES.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIdx >= THEORY_MODULES.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Modul Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
};
