import React, { useState } from 'react';
import type { DifficultyLevel, PhysicsQuestion } from '../../types/physics';
import { CollapsibleSolution } from '../CollapsibleSolution';
import { MathText } from '../MathText';

interface PembahasanViewProps {
  questions: PhysicsQuestion[];
  onJumpToQuestion: (id: number) => void;
}

export const PembahasanView: React.FC<PembahasanViewProps> = ({
  questions,
  onJumpToQuestion,
}) => {
  const [filter, setFilter] = useState<'all' | DifficultyLevel>('all');
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({ 1: true });

  const list =
    filter === 'all' ? questions : questions.filter((q) => q.level === filter);

  const toggleOne = (id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Direktori Pembahasan 15 Soal Olimpiade
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Setiap pembahasan disusun dalam 13 langkah analisis lengkap dengan penurunan persamaan KaTeX dan narasi Mister Jo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(
            [
              { id: 'all', label: 'Semua' },
              { id: 'dasar', label: 'Dasar (1–5)' },
              { id: 'menengah', label: 'Menengah (6–10)' },
              { id: 'olimpiade', label: 'Olimpiade (11–15)' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === t.id
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {list.map((q) => (
          <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-teal-700">
                  Soal {q.id} · {q.levelLabel} · Kunci: {q.expectedFormatted} {q.unit}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-0.5">
                  {q.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onJumpToQuestion(q.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-teal-200 bg-teal-50 text-teal-900 hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Buka Simulasi & Latihan
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              <MathText text={q.prompt} />
            </p>

            <CollapsibleSolution
              question={q}
              isOpen={Boolean(openMap[q.id])}
              onToggle={() => toggleOne(q.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
