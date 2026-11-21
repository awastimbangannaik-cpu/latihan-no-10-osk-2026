import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  HelpCircle,
  Send,
} from 'lucide-react';
import type {
  DifficultyLevel,
  PhysicsQuestion,
  QuestionAttempt,
} from '../../types/physics';
import { evaluateNumericAnswer, type GradeResult } from '../../utils/numberFormat';
import { MathText } from '../MathText';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';
import { FreeBodyDiagram, QuestionStimulusDiagram } from '../PhysicsDiagrams';
import { PhysicsAnimationPlayer } from '../PhysicsAnimationPlayer';
import { CollapsibleSolution } from '../CollapsibleSolution';

interface LatihanSoalViewProps {
  questions: PhysicsQuestion[];
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  attempts: Record<number, QuestionAttempt>;
  onRecordAttempt: (attempt: QuestionAttempt) => void;
}

export const LatihanSoalView: React.FC<LatihanSoalViewProps> = ({
  questions,
  activeQuestionId,
  onSelectQuestion,
  attempts,
  onRecordAttempt,
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | DifficultyLevel>('all');
  const [inputValue, setInputValue] = useState('');
  const [lastGrade, setLastGrade] = useState<GradeResult | null>(null);
  const [showFbd, setShowFbd] = useState(true);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const currentQuestion =
    questions.find((q) => q.id === activeQuestionId) ?? questions[0];
  const currentAttempt = attempts[currentQuestion.id];

  // Sync input and UI state when switching questions
  useEffect(() => {
    const existing = attempts[currentQuestion.id];
    setInputValue(existing?.rawInput ?? '');
    setLastGrade(null);
    setSolutionOpen(false);
  }, [currentQuestion.id]);

  const filteredQuestions =
    levelFilter === 'all'
      ? questions
      : questions.filter((q) => q.level === levelFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = evaluateNumericAnswer(
      inputValue,
      currentQuestion.exactAnswer,
      currentQuestion.hintOnWrong
    );
    setLastGrade(result);

    if (result.validFormat) {
      const prevCount = currentAttempt?.attemptsCount ?? 0;
      onRecordAttempt({
        questionId: currentQuestion.id,
        rawInput: inputValue.trim(),
        parsedValue: result.parsedValue,
        isCorrect: result.isCorrect,
        attemptsCount: prevCount + 1,
        lastUpdatedAt: Date.now(),
      });
    }
  };

  const currentIdx = questions.findIndex((q) => q.id === currentQuestion.id);
  const hasAttemptedValid = Boolean(currentAttempt);
  const revealAnimationNumbers = Boolean(
    currentAttempt?.isCorrect || solutionOpen || lastGrade?.validFormat
  );

  return (
    <div className="space-y-6">
      {/* Header & Level Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Latihan 15 Soal Progresif (Isian Numerik)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Masukkan jawaban dengan tepat satu angka di belakang koma menggunakan tanda koma (contoh: <span className="font-mono-tabular font-semibold">12,4</span> atau <span className="font-mono-tabular font-semibold">-17,0</span>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(
            [
              { id: 'all', label: 'Semua (1–15)' },
              { id: 'dasar', label: 'Dasar (1–5)' },
              { id: 'menengah', label: 'Menengah (6–10)' },
              { id: 'olimpiade', label: 'Olimpiade (11–15)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setLevelFilter(tab.id);
                if (tab.id !== 'all') {
                  const firstInLevel = questions.find((q) => q.level === tab.id);
                  if (firstInLevel && currentQuestion.level !== tab.id) {
                    onSelectQuestion(firstInLevel.id);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                levelFilter === tab.id
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Number Strip */}
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap items-center gap-2">
          {filteredQuestions.map((q) => {
            const att = attempts[q.id];
            const isActive = q.id === currentQuestion.id;
            let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300';
            if (isActive) {
              btnStyle = 'bg-teal-600 text-white border-teal-600';
            } else if (att?.isCorrect) {
              btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
            } else if (att && !att.isCorrect) {
              btnStyle = 'bg-rose-50 text-rose-800 border-rose-300';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(q.id)}
                aria-label={`Pilih Soal ${q.id}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono-tabular transition-colors cursor-pointer ${btnStyle}`}
              >
                <span>{q.id}</span>
                {att?.isCorrect && <CheckCircle2 className="w-3.5 h-3.5" />}
                {att && !att.isCorrect && <XCircle className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mister Jo Reads the Question */}
      <MisterJoNarratorBar
        title={`Pembacaan Soal ${currentQuestion.id}: ${currentQuestion.title}`}
        script={`${currentQuestion.narrationPrompt} ${currentQuestion.stimulusNarrative}`}
      />

      {/* Main Question Card */}
      <article className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <header className="border-b border-slate-100 pb-4 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-teal-700">
              Soal {currentQuestion.id} dari 15 · {currentQuestion.levelLabel} · {currentQuestion.subtopic}
            </span>
            {currentAttempt && (
              <span
                className={`font-semibold inline-flex items-center gap-1 ${
                  currentAttempt.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {currentAttempt.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Status: Benar
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> Status: Perlu Perbaikan
                  </>
                )}
              </span>
            )}
          </div>
          <h3 className="text-xl font-display font-bold text-slate-900">
            {currentQuestion.title}
          </h3>
          <p className="text-xs text-slate-500">
            <strong className="text-slate-700">Keterkaitan dengan Soal #10 OSK:</strong>{' '}
            {currentQuestion.relationToSource10}
          </p>
        </header>

        {/* Question Prompt */}
        <div className="text-base text-slate-900 leading-relaxed">
          <MathText text={currentQuestion.prompt} />
        </div>

        {/* Stimulus Narrative & Optional Table */}
        <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4 space-y-3">
          <div className="text-xs font-semibold text-teal-900">Stimulus Fenomena Fisis</div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            {currentQuestion.stimulusNarrative}
          </p>

          {currentQuestion.stimulusTable && (
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-xs text-left border-collapse rounded-lg overflow-hidden border border-slate-200 bg-white">
                <caption className="text-left font-semibold text-slate-800 pb-1.5">
                  {currentQuestion.stimulusTable.caption}
                </caption>
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    {currentQuestion.stimulusTable.headers.map((h) => (
                      <th key={h} className="px-3 py-2 border-b border-slate-200 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentQuestion.stimulusTable.rows.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-3 py-2 ${cIdx > 0 ? 'font-mono-tabular' : 'font-medium text-slate-900'}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stimulus Diagram & Toggleable FBD */}
        <div className="space-y-3">
          {currentQuestion.requiresFbd && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Visualisasi Koordinat & Diagram Gaya (Free Body Diagram)
              </span>
              <button
                type="button"
                onClick={() => setShowFbd((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showFbd ? 'Sembunyikan FBD' : 'Tampilkan FBD'}</span>
              </button>
            </div>
          )}

          <div
            className={`grid grid-cols-1 gap-4 items-stretch ${
              currentQuestion.requiresFbd && showFbd ? 'xl:grid-cols-12' : ''
            }`}
          >
            <div className={currentQuestion.requiresFbd && showFbd ? 'xl:col-span-6' : 'max-w-2xl'}>
              <QuestionStimulusDiagram question={currentQuestion} />
            </div>

            {currentQuestion.requiresFbd && showFbd && (
              <div className="xl:col-span-6">
                <FreeBodyDiagram question={currentQuestion} />
              </div>
            )}
          </div>
        </div>

        {/* Mandatory Physics Proof Animation */}
        <PhysicsAnimationPlayer
          question={currentQuestion}
          revealNumericValues={revealAnimationNumbers}
        />

        {/* Strict Numeric Input Answer Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-teal-200 bg-gradient-to-r from-emerald-50/60 to-teal-50/50 p-5 space-y-4"
        >
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[220px]">
              <label
                htmlFor={`answer-input-${currentQuestion.id}`}
                className="block text-xs font-bold text-slate-900 mb-1.5"
              >
                Jawaban Numerik (1 angka desimal dengan koma, satuan: {currentQuestion.unit})
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`answer-input-${currentQuestion.id}`}
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Contoh: 12,4 atau -17,0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-mono-tabular font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                  {currentQuestion.unit}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Periksa Jawaban</span>
            </button>
          </div>

          {/* Grading Feedback */}
          {lastGrade && (
            <div
              role="status"
              className={`rounded-xl border p-4 text-xs md:text-sm space-y-1 ${
                lastGrade.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {lastGrade.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-rose-700" />
                )}
                <span>{lastGrade.feedbackTitle}</span>
              </div>
              <p className="leading-relaxed">{lastGrade.feedbackMessage}</p>
            </div>
          )}

          {!lastGrade && hasAttemptedValid && (
            <div className="text-xs text-slate-600">
              Jawaban tersimpan terakhir:{' '}
              <strong className="font-mono-tabular text-slate-900">
                {currentAttempt?.rawInput} {currentQuestion.unit}
              </strong>{' '}
              ({currentAttempt?.isCorrect ? 'Benar' : 'Belum Tepat'}).
            </div>
          )}
        </form>

        {/* Collapsible 13-Step Solution */}
        <CollapsibleSolution
          question={currentQuestion}
          isOpen={solutionOpen}
          onToggle={() => setSolutionOpen((v) => !v)}
        />

        {/* Prev / Next Question Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (currentIdx > 0) onSelectQuestion(questions[currentIdx - 1].id);
            }}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Soal Sebelumnya</span>
          </button>

          <span className="text-xs font-mono-tabular text-slate-500">
            Soal {currentQuestion.id} / {questions.length}
          </span>

          <button
            type="button"
            onClick={() => {
              if (currentIdx < questions.length - 1)
                onSelectQuestion(questions[currentIdx + 1].id);
            }}
            disabled={currentIdx >= questions.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Soal Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
};
