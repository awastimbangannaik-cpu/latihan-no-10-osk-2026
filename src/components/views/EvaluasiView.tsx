import React from 'react';
import { BookOpen, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { PhysicsQuestion, QuestionAttempt } from '../../types/physics';
import { THEORY_MODULES } from '../../data/theoryModules';
import { computeEvaluationSummary } from '../../utils/numberFormat';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';

interface EvaluasiViewProps {
  questions: PhysicsQuestion[];
  attempts: Record<number, QuestionAttempt>;
  onJumpToQuestion: (id: number) => void;
  onOpenTheoryModule: (moduleId: string) => void;
  onResetAttempts: () => void;
}

export const EvaluasiView: React.FC<EvaluasiViewProps> = ({
  questions,
  attempts,
  onJumpToQuestion,
  onOpenTheoryModule,
  onResetAttempts,
}) => {
  const summary = computeEvaluationSummary(questions, attempts);
  const weakModules = THEORY_MODULES.filter((m) =>
    summary.weakTheoryIds.includes(m.id)
  );

  const evalScript = `Laporan evaluasi belajar Anda bersama Mister Jo. Dari lima belas soal latihan, Anda telah mengerjakan ${summary.attemptedCount} soal, dengan ${summary.correctCount} jawaban benar dan ${summary.incorrectCount} jawaban belum tepat. Persentase keberhasilan Anda saat ini adalah ${summary.accuracyPct} persen. Gunakan rincian per tingkatan untuk meninjau kembali modul teori yang masih perlu diperkuat.`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Evaluasi & Diagnostik Penguasaan Konsep
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pemantauan hasil belajar berbasis tingkat kesulitan dan rekomendasi materi Mastering Physics.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetAttempts}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progres Latihan</span>
        </button>
      </div>

      <MisterJoNarratorBar title="Evaluasi Belajar Mister Jo" script={evalScript} />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Soal Benar</div>
          <div className="mt-1 text-2xl font-display font-bold text-emerald-700 font-mono-tabular">
            {summary.correctCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">dari 15 soal latihan</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Soal Belum Tepat</div>
          <div className="mt-1 text-2xl font-display font-bold text-rose-700 font-mono-tabular">
            {summary.incorrectCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">perlu tinjauan ulang</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Belum Dikerjakan</div>
          <div className="mt-1 text-2xl font-display font-bold text-slate-900 font-mono-tabular">
            {summary.unansweredCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">soal menanti diselesaikan</div>
        </div>

        <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5">
          <div className="text-xs font-medium text-teal-800">Persentase Keberhasilan</div>
          <div className="mt-1 text-2xl font-display font-bold text-teal-900 font-mono-tabular">
            {summary.accuracyPct}%
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-white overflow-hidden border border-teal-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              style={{ width: `${summary.accuracyPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3-Tier Mastery Breakdown */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-slate-900">
          Rekap Penguasaan Tiga Tingkatan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.levelBreakdown.map((lvl) => (
            <div key={lvl.level} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
              <div className="text-sm font-bold text-slate-900">{lvl.label}</div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Benar: <strong className="font-mono-tabular text-slate-900">{lvl.correct}/{lvl.total}</strong></span>
                <span className="font-semibold text-teal-800">{lvl.masteryStatus}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-teal-600 transition-all duration-300"
                  style={{ width: `${lvl.accuracyPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lvl.masteryStatus === 'Menguasai'
                  ? 'Sangat baik! Seluruh konsep pada tingkatan ini telah dikuasai.'
                  : lvl.masteryStatus === 'Berkembang'
                    ? 'Progres bagus. Perbaiki soal yang tersisa untuk penguasaan penuh.'
                    : lvl.masteryStatus === 'Perlu Penguatan'
                      ? 'Perlu meninjau ulang konsep vektor dasar dan diagram benda bebas di Mastering Physics.'
                      : 'Belum ada jawaban tersimpan di tingkatan ini.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Per-Question Status Matrix */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-slate-900">
          Status Pengerjaan Soal 1 – 15
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {questions.map((q) => {
            const att = attempts[q.id];
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onJumpToQuestion(q.id)}
                className="text-left rounded-xl border border-slate-200 p-3.5 hover:border-teal-300 transition-colors cursor-pointer flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-teal-700">
                    Soal {q.id} · {q.level}
                  </div>
                  <div className="text-xs font-semibold text-slate-900 truncate mt-0.5">
                    {q.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono-tabular">
                    {att ? `Jawaban: ${att.rawInput} ${q.unit}` : 'Belum dikerjakan'}
                  </div>
                </div>
                <div className="shrink-0 mt-0.5">
                  {att?.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : att ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">Kosong</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Pedagogical Remediation Recommendations */}
      <section className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 space-y-3">
        <h3 className="text-base font-display font-bold text-slate-900">
          Rekomendasi Penguatan Materi (Umpan Balik Pedagogis)
        </h3>
        {weakModules.length > 0 ? (
          <>
            <p className="text-xs md:text-sm text-slate-700">
              Berdasarkan soal yang masih belum tepat, Mister Jo menyarankan Anda mempelajari kembali modul teori berikut:
            </p>
            <div className="flex flex-wrap gap-2">
              {weakModules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onOpenTheoryModule(mod.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-teal-200 text-teal-900 hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Modul {mod.code}: {mod.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs md:text-sm text-slate-700">
            {summary.attemptedCount === 0
              ? 'Mulai kerjakan soal latihan untuk mendapatkan analisis kelemahan konsep dan rekomendasi modul teori secara otomatis.'
              : 'Luar biasa! Belum ada kesalahan konsep yang terdeteksi pada soal-soal yang telah Anda selesaikan.'}
          </p>
        )}
      </section>
    </div>
  );
};
