import React from 'react';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import type { PhysicsQuestion } from '../types/physics';
import { MathBlock, MathText } from './MathText';
import { misterJoNarrator } from '../utils/ttsNarrator';

interface CollapsibleSolutionProps {
  question: PhysicsQuestion;
  isOpen: boolean;
  onToggle: () => void;
}

export const CollapsibleSolution: React.FC<CollapsibleSolutionProps> = ({
  question,
  isOpen,
  onToggle,
}) => {
  const { solution } = question;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">
          Pembahasan Lengkap Soal {question.id}
        </div>
        <div className="flex items-center gap-2">
          {isOpen && (
            <button
              type="button"
              onClick={() =>
                misterJoNarrator.speak(
                  `Pembahasan Soal ${question.id}`,
                  solution.narrationScript
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengar Pembahasan</span>
            </button>
          )}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{isOpen ? 'Tutup Pembahasan' : 'Lihat Pembahasan'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-5 space-y-5 text-sm text-slate-700 leading-relaxed">
          {/* 1 & 2: Diketahui & Ditanyakan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <h5 className="text-xs font-semibold text-teal-800 mb-2">
                1. Identifikasi Informasi yang Diketahui
              </h5>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-700">
                {solution.known.map((item, idx) => (
                  <li key={idx}>
                    <MathText text={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <h5 className="text-xs font-semibold text-teal-800 mb-2">
                2. Identifikasi Besaran yang Ditanyakan
              </h5>
              <p className="text-xs text-slate-700">
                <MathText text={solution.asked} />
              </p>
              <h5 className="text-xs font-semibold text-teal-800 mt-3 mb-1">
                3. Konsep Fisika yang Digunakan
              </h5>
              <p className="text-xs text-slate-700">{solution.concepts.join(' · ')}</p>
            </div>
          </div>

          {/* 4 & 5: Kondisi Fisis & Analisis Stimulus */}
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-slate-900">4. Penjelasan Kondisi Fisis: </span>
              <MathText text={solution.physicalCondition} />
            </div>
            <div>
              <span className="font-semibold text-slate-900">5. Analisis Stimulus Gambar / Diagram: </span>
              <MathText text={solution.diagramAnalysis} />
            </div>
          </div>

          {/* 6 & 7: Hukum Relevan & Alasan Pemilihan Rumus */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-4 space-y-2">
            <div className="font-semibold text-slate-900 text-xs">
              6. Penentuan Hukum & Persamaan yang Relevan
            </div>
            <ul className="space-y-1 text-xs">
              {solution.relevantLaws.map((law, idx) => (
                <li key={idx}>
                  <MathText text={law} />
                </li>
              ))}
            </ul>
            <div className="pt-1 text-xs">
              <span className="font-semibold text-slate-900">7. Alasan Pemilihan Rumus: </span>
              <MathText text={solution.formulaReason} />
            </div>
          </div>

          {/* 8: Penurunan Persamaan Secara Bertahap */}
          <div>
            <h5 className="font-semibold text-slate-900 mb-2">
              8. Penurunan Persamaan Secara Bertahap
            </h5>
            <div className="space-y-3">
              {solution.derivationSteps.map((step, idx) => (
                <div key={idx}>
                  <MathBlock latex={step.latex} label={step.label} accent={idx === 0} />
                  <p className="text-xs text-slate-600 px-1">
                    <MathText text={step.explanation} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 9 & 10: Substitusi & Perhitungan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-xs font-semibold text-slate-900 mb-1">
                9. Substitusi Angka dengan Satuan
              </div>
              <div className="text-sm">
                <MathText text={solution.substitution} />
              </div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="text-xs font-semibold text-emerald-900 mb-1">
                10. Perhitungan Matematis
              </div>
              <div className="text-sm font-medium text-slate-900">
                <MathText text={solution.calculation} />
              </div>
            </div>
          </div>

          {/* 11, 12, 13: Dimensi, Pembulatan, Kesimpulan, & Kesalahan Umum */}
          <div className="space-y-2 border-t border-slate-200 pt-4 text-xs">
            <div>
              <span className="font-semibold text-slate-900">11. Pemeriksaan Dimensi & Satuan: </span>
              <MathText text={solution.dimensionalCheck} />
            </div>
            <div>
              <span className="font-semibold text-slate-900">12. Pembulatan Hasil Akhir: </span>
              <MathText text={solution.roundingStep} />
            </div>
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-950 font-medium">
              <span className="font-bold">13. Kesimpulan Jawaban: </span>
              <MathText text={solution.conclusion} />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-4 py-2.5 text-xs text-amber-950">
              <span className="font-semibold">Waspada Kesalahan Umum: </span>
              <MathText text={solution.commonMistake} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
