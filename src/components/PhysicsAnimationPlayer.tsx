import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import type { PhysicsQuestion } from '../types/physics';
import { evaluateSimulationAtProgress } from '../utils/physicsSimulation';
import { formatIndoDecimal } from '../utils/numberFormat';
import { misterJoNarrator } from '../utils/ttsNarrator';
import { buildPathD } from './PhysicsDiagrams';

interface PhysicsAnimationPlayerProps {
  question: PhysicsQuestion;
  revealNumericValues?: boolean;
}

export const PhysicsAnimationPlayer: React.FC<PhysicsAnimationPlayerProps> = ({
  question,
  revealNumericValues = false,
}) => {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Reset when switching question
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setActiveStageIdx(0);
    lastTimeRef.current = null;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, [question.id]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const durationMs = isSlowMotion ? 9000 : 3800;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      setProgress((prev) => {
        const next = prev + dt / durationMs;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, isSlowMotion]);

  // Sync active stage index to progress
  useEffect(() => {
    const stages = question.animationStages;
    let idx = 0;
    for (let i = 0; i < stages.length; i++) {
      if (progress >= stages[i].progress - 0.02) {
        idx = i;
      }
    }
    setActiveStageIdx(idx);
  }, [progress, question.animationStages]);

  const stages = question.animationStages;
  const activeStage = stages[activeStageIdx] ?? stages[0];

  const handlePlay = () => {
    if (progress >= 0.999) {
      setProgress(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setProgress(0);
    setActiveStageIdx(0);
    setTimeout(() => setIsPlaying(true), 30);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    const nextIdx = Math.min(stages.length - 1, activeStageIdx + 1);
    setActiveStageIdx(nextIdx);
    setProgress(stages[nextIdx].progress);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    const prevIdx = Math.max(0, activeStageIdx - 1);
    setActiveStageIdx(prevIdx);
    setProgress(stages[prevIdx].progress);
  };

  // Precompute work curve samples across [0, 1]
  const samples = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      arr.push({ u, ...evaluateSimulationAtProgress(question, u) });
    }
    return arr;
  }, [question]);

  const currentSample = useMemo(
    () => evaluateSimulationAtProgress(question, progress),
    [question, progress]
  );

  // Coordinate mapper for SVG animation stage
  const svgW = 460;
  const svgH = 290;
  const pad = 38;
  const { xMin, xMax, yMin, yMax } = question.diagram;
  const spanX = xMax - xMin || 1;
  const spanY = yMax - yMin || 1;
  const toSvgX = (x: number) => pad + ((x - xMin) / spanX) * (svgW - pad * 2);
  const toSvgY = (y: number) => svgH - pad - ((y - yMin) / spanY) * (svgH - pad * 2);

  const mapper = { width: svgW, height: svgH, pad, toSvgX, toSvgY };
  const pathD = useMemo(() => buildPathD(question, mapper), [question]);

  const curX = toSvgX(currentSample.pos.x);
  const curY = toSvgY(currentSample.pos.y);
  const startX = toSvgX(question.diagram.r1.x);
  const startY = toSvgY(question.diagram.r1.y);

  // Primary force arrow attached to particle during animation
  const primaryF = question.fbdForces[0];
  const fMag = primaryF ? Math.hypot(primaryF.fx, primaryF.fy) || 1 : 1;
  const fArrowX = primaryF ? curX + (primaryF.fx / fMag) * 44 : curX;
  const fArrowY = primaryF ? curY - (primaryF.fy / fMag) * 44 : curY;

  // Tangent / velocity direction arrow
  const tMag = Math.hypot(currentSample.tangentDir.x, currentSample.tangentDir.y) || 1;
  const vArrowX = curX + (currentSample.tangentDir.x / tMag) * 34;
  const vArrowY = curY - (currentSample.tangentDir.y / tMag) * 34;

  // Work graph scaling
  const workValues = samples.map((s) => s.cumulativeWork);
  const wMin = Math.min(0, ...workValues);
  const wMax = Math.max(0, ...workValues);
  const wSpan = wMax - wMin || 1;
  const gW = 280;
  const gH = 190;
  const gPad = 32;
  const toGraphX = (u: number) => gPad + u * (gW - gPad * 2);
  const toGraphY = (w: number) => gH - gPad - ((w - wMin) / wSpan) * (gH - gPad * 2);

  const zeroLineY = toGraphY(0);
  const graphPathFull = samples
    .map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${toGraphX(s.u).toFixed(1)} ${toGraphY(s.cumulativeWork).toFixed(1)}`)
    .join(' ');
  const activeSamples = samples.filter((s) => s.u <= progress + 0.001);
  const graphPathActive = [
    ...activeSamples.map(
      (s, idx) => `${idx === 0 ? 'M' : 'L'} ${toGraphX(s.u).toFixed(1)} ${toGraphY(s.cumulativeWork).toFixed(1)}`
    ),
    `L ${toGraphX(progress).toFixed(1)} ${toGraphY(currentSample.cumulativeWork).toFixed(1)}`,
  ].join(' ');

  return (
    <div
      className="rounded-xl border border-teal-200 bg-white p-4 space-y-4"
      data-testid={`animation-player-${question.id}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Animasi Pembuktian Fenomena Fisika — Tahap {activeStage.stepNumber} dari {stages.length}
          </h4>
          <p className="text-xs text-slate-500">{activeStage.title}</p>
        </div>

        <div className="text-xs font-mono-tabular text-teal-800 bg-teal-50 border border-teal-200 rounded-lg px-2.5 py-1">
          Posisi: ({formatIndoDecimal(currentSample.pos.x)}; {formatIndoDecimal(currentSample.pos.y)}) m
        </div>
      </div>

      {/* Controls Bar: PLAY, PAUSE, REPLAY, SLOW MOTION, NEXT STEP, PREVIOUS STEP */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Play</span>
        </button>

        <button
          type="button"
          onClick={handlePause}
          disabled={!isPlaying}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Pause className="w-3.5 h-3.5" />
          <span>Pause</span>
        </button>

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>

        <button
          type="button"
          onClick={() => setIsSlowMotion((v) => !v)}
          aria-pressed={isSlowMotion}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            isSlowMotion
              ? 'bg-teal-600 text-white border-teal-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Slow Motion {isSlowMotion ? '(0,4x Aktif)' : ''}</span>
        </button>

        <button
          type="button"
          onClick={handlePrevStep}
          disabled={activeStageIdx === 0}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <SkipBack className="w-3.5 h-3.5" />
          <span>Previous Step</span>
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          disabled={activeStageIdx >= stages.length - 1}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Next Step</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="flex items-center gap-3">
        <label htmlFor={`anim-range-${question.id}`} className="text-xs font-medium text-slate-600 whitespace-nowrap">
          Progres Kejadian:
        </label>
        <input
          id={`anim-range-${question.id}`}
          type="range"
          min={0}
          max={100}
          value={Math.round(progress * 100)}
          onChange={(e) => {
            setIsPlaying(false);
            setProgress(Number(e.target.value) / 100);
          }}
          className="w-full accent-teal-600 cursor-pointer"
        />
        <span className="text-xs font-mono-tabular text-slate-700 w-10 text-right">
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* Two-Column Visual Stage: Motion Canvas + Live Cumulative Work Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-slate-50/70 p-2">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-auto"
            role="img"
            aria-label={`Animasi gerak partikel Soal ${question.id}`}
          >
            <defs>
              <marker id={`anim-vel-${question.id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill="#0891B2" />
              </marker>
              <marker id={`anim-frc-${question.id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill="#059669" />
              </marker>
            </defs>

            {/* Coordinate Axes */}
            {yMin <= 0 && yMax >= 0 && (
              <line x1={pad} y1={toSvgY(0)} x2={svgW - pad} y2={toSvgY(0)} stroke="#CBD5E1" strokeWidth="1.2" />
            )}
            {xMin <= 0 && xMax >= 0 && (
              <line x1={toSvgX(0)} y1={pad} x2={toSvgX(0)} y2={svgH - pad} stroke="#CBD5E1" strokeWidth="1.2" />
            )}

            {/* Spring connection if spring path */}
            {question.diagram.pathType === 'spring' && question.diagram.springAnchor && (
              <line
                x1={toSvgX(question.diagram.springAnchor.x)}
                y1={toSvgY(question.diagram.springAnchor.y)}
                x2={curX}
                y2={curY}
                stroke="#D97706"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            )}

            {/* Full planned path ghost */}
            <path d={pathD} fill="none" stroke="#CBD5E1" strokeWidth="2.2" strokeDasharray="5 4" />

            {/* Displacement vector from r1 to current position */}
            <line
              x1={startX}
              y1={startY}
              x2={curX}
              y2={curY}
              stroke="#0D9488"
              strokeWidth="2.2"
            />

            {/* Velocity / Direction Tangent Arrow */}
            <line
              x1={curX}
              y1={curY}
              x2={vArrowX}
              y2={vArrowY}
              stroke="#0891B2"
              strokeWidth="2.2"
              markerEnd={`url(#anim-vel-${question.id})`}
            />

            {/* Force Vector acting on particle (revealed when non-spoiling or allowed) */}
            {(revealNumericValues || question.diagram.showForceVector !== false) && primaryF && (
              <line
                x1={curX}
                y1={curY}
                x2={fArrowX}
                y2={fArrowY}
                stroke="#059669"
                strokeWidth="2.5"
                markerEnd={`url(#anim-frc-${question.id})`}
              />
            )}

            {/* Start point marker */}
            <circle cx={startX} cy={startY} r="4.5" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />

            {/* Moving Particle */}
            <circle cx={curX} cy={curY} r="8" fill="#059669" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
          <div className="flex flex-wrap gap-4 px-2 pb-1 text-[11px] text-slate-600">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Partikel
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-0.5 bg-teal-600 inline-block" /> Perpindahan Δr(t)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-0.5 bg-cyan-600 inline-block" /> Arah Gerak dr
            </span>
            {(revealNumericValues || question.diagram.showForceVector !== false) && (
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Vektor Gaya
              </span>
            )}
          </div>
        </div>

        {/* Live Work Graph */}
        <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
            <span>Grafik Perkembangan Usaha</span>
            <span className="font-mono-tabular text-teal-800">
              {revealNumericValues
                ? `W = ${formatIndoDecimal(currentSample.cumulativeWork)} J`
                : currentSample.cumulativeWork > 0.05
                  ? 'W > 0 (Bertambah)'
                  : currentSample.cumulativeWork < -0.05
                    ? 'W < 0 (Negatif)'
                    : 'W ≈ 0'}
            </span>
          </div>

          <svg viewBox={`0 0 ${gW} ${gH}`} className="w-full h-auto">
            {/* Zero baseline */}
            <line
              x1={gPad}
              y1={zeroLineY}
              x2={gW - gPad}
              y2={zeroLineY}
              stroke="#94A3B8"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <text x={gPad - 6} y={zeroLineY + 3} textAnchor="end" className="fill-slate-500 text-[9px] font-mono">
              0
            </text>

            {/* Axes */}
            <line x1={gPad} y1={gPad - 8} x2={gPad} y2={gH - gPad + 8} stroke="#64748B" strokeWidth="1.2" />
            <text x={gPad + 4} y={gPad - 12} className="fill-slate-600 text-[9px] font-semibold">W</text>
            <text x={gW - gPad} y={gH - 8} textAnchor="end" className="fill-slate-600 text-[9px] font-semibold">Progres Lintasan</text>

            {/* Ghost curve */}
            <path d={graphPathFull} fill="none" stroke="#CBD5E1" strokeWidth="1.8" strokeDasharray="4 3" />

            {/* Active progress curve */}
            <path d={graphPathActive} fill="none" stroke="#059669" strokeWidth="2.8" />

            {/* Live point */}
            <circle
              cx={toGraphX(progress)}
              cy={toGraphY(currentSample.cumulativeWork)}
              r="5"
              fill="#0D9488"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          <p className="text-[11px] text-slate-500 leading-snug">
            {revealNumericValues
              ? 'Skala numerik aktif: grafik menunjukkan evolusi usaha kumulatif sesuai perhitungan eksak.'
              : 'Skala kualitatif aktif agar tidak membocorkan kunci sebelum menjawab. Nilai numerik otomatis muncul setelah menjawab.'}
          </p>
        </div>
      </div>

      {/* Stage Pedagogical Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {stages.map((st, idx) => (
              <button
                key={st.stepNumber}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStageIdx(idx);
                  setProgress(st.progress);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  idx === activeStageIdx
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                Tahap {st.stepNumber}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              misterJoNarrator.speak(
                `Animasi Soal ${question.id} – ${activeStage.title}`,
                activeStage.narration
              )
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengar Narasi Tahap Ini</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
          <div>
            <span className="font-semibold text-slate-900">Apa yang terjadi? </span>
            {activeStage.whatHappens}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Mengapa benda bergerak demikian? </span>
            {activeStage.whyItMoves}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Gaya apa yang bekerja? </span>
            {activeStage.actingForces}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Perubahan gerak & energi: </span>
            {activeStage.motionChange}
          </div>
          <div className="md:col-span-2 pt-1 border-t border-slate-200 text-teal-900">
            <span className="font-semibold">Prinsip Fisika Penjelas: </span>
            {activeStage.physicsPrinciple}
          </div>
        </div>
      </div>
    </div>
  );
};
