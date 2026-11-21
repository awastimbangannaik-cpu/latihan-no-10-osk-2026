import React from 'react';
import { ArrowRight, BookOpen, Compass, Layers, Target } from 'lucide-react';
import type { AppSection, PhysicsQuestion, QuestionAttempt } from '../../types/physics';
import { SOURCE_QUESTION_10_META } from '../../data/questions';
import { computeEvaluationSummary } from '../../utils/numberFormat';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';

interface BerandaViewProps {
  questions: PhysicsQuestion[];
  attempts: Record<number, QuestionAttempt>;
  onNavigate: (section: AppSection) => void;
  onJumpToQuestion: (questionId: number) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  questions,
  attempts,
  onNavigate,
  onJumpToQuestion,
}) => {
  const summary = computeEvaluationSummary(questions, attempts);

  const introScript =
    'Selamat datang di Mister Jo Physics Olympiad Lab, program latihan Olimpiade Sains Fisika tingkat Kota dan Kabupaten. Kita berfokus penuh pada pengembangan mendalam Soal Nomor Sepuluh OSK Fisika 2026 tentang Usaha dan Energi Vektor di bidang x y. Kuasai teori di Mastering Physics, uji pemahaman lewat animasi pembuktian dan diagram benda bebas, lalu taklukkan seluruh lima belas soal numerik progresif.';

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 text-white p-6 md:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-100">
            City Level Physics Olympiad Training · Fokus Khusus Soal Nomor 10 OSK 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            MISTER JO – PHYSICS OLYMPIAD LAB
          </h1>
          <p className="text-sm md:text-base text-teal-50/95 leading-relaxed">
            Lingkungan pembelajaran Fisika interaktif untuk mengubah pemahaman dasar menjadi penguasaan
            analisis vektor, hukum usaha–energi, diagram benda bebas, dan penyelesaian variasi soal
            olimpiade tingkat Kota/Kabupaten secara mandiri.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('mastering-physics')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white text-teal-900 hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onJumpToQuestion(1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-white/40 bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Langsung ke Latihan 15 Soal</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mister Jo Audio Welcome */}
      <MisterJoNarratorBar
        title="Pengantar Program Olimpiade bersama Mister Jo"
        script={introScript}
      />

      {/* 4-Column Key Summary & Progress Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Total Soal Pengembangan</div>
          <div className="mt-1 text-2xl font-display font-bold text-slate-900 font-mono-tabular">
            15 Soal
          </div>
          <div className="mt-1 text-xs text-teal-700">Dasar · Menengah · Olimpiade</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Progres Pengerjaan</div>
          <div className="mt-1 text-2xl font-display font-bold text-slate-900 font-mono-tabular">
            {summary.attemptedCount} / {summary.totalQuestions}
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${summary.completionPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Jawaban Benar</div>
          <div className="mt-1 text-2xl font-display font-bold text-emerald-700 font-mono-tabular">
            {summary.correctCount} Soal
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Akurasi saat ini: {summary.accuracyPct}%
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">Format Jawaban Sistem</div>
          <div className="mt-1 text-2xl font-display font-bold text-slate-900 font-mono-tabular">
            1 Desimal (,)
          </div>
          <div className="mt-1 text-xs text-slate-500">Isian numerik (misal: -17,0)</div>
        </div>
      </section>

      {/* Source Document Analysis: Soal Nomor 10 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-teal-700">
              Analisis Dokumen Sumber (OSK Fisika SMA 2026)
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-1">
              {SOURCE_QUESTION_10_META.sourceTitle}
            </h2>
          </div>
          <div className="text-xs font-mono-tabular font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
            Kunci Soal Sumber: {SOURCE_QUESTION_10_META.exactAnswerFormatted}
          </div>
        </div>

        <blockquote className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 text-sm text-slate-800 leading-relaxed">
          “{SOURCE_QUESTION_10_META.exactQuote}”
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOURCE_QUESTION_10_META.analysisItems.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="text-xs font-semibold text-teal-800 mb-1">{item.label}</div>
              <p className="text-xs text-slate-700 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guided Learning Path Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('peta-konsep')}
          className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 transition-colors cursor-pointer"
        >
          <Compass className="w-5 h-5 text-teal-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">1. Peta Konsep</h3>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Pahami jejaring konsep vektor posisi, dot product, FBD, dan teorema energi.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('mastering-physics')}
          className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 transition-colors cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-emerald-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">2. Mastering Physics</h3>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Pelajari modul bertahap A–L lengkap dengan penurunan rumus dan stimulus visual.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('galeri-visualisasi')}
          className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 transition-colors cursor-pointer"
        >
          <Layers className="w-5 h-5 text-cyan-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">3. Galeri Visualisasi</h3>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Eksperimen bebas dengan simulator vektor gaya dan animasi pembuktian fisika.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('latihan-soal')}
          className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 transition-colors cursor-pointer"
        >
          <Target className="w-5 h-5 text-teal-700 mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">4. Latihan 15 Soal</h3>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Uji kemampuan pada 3 tingkat kesulitan dengan validasi desimal koma otomatis.
          </p>
        </button>
      </section>
    </div>
  );
};
