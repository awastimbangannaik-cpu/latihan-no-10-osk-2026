import React, { useEffect, useState } from 'react';
import { Volume2, Pause, Play, RotateCcw, FileText } from 'lucide-react';
import { misterJoNarrator, type TtsStateSnapshot } from '../utils/ttsNarrator';

interface MisterJoNarratorBarProps {
  title: string;
  script: string;
  compact?: boolean;
}

export const MisterJoNarratorBar: React.FC<MisterJoNarratorBarProps> = ({
  title,
  script,
  compact = false,
}) => {
  const [ttsState, setTtsState] = useState<TtsStateSnapshot>(() => misterJoNarrator.getState());
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    return misterJoNarrator.subscribe(setTtsState);
  }, []);

  const isThisPlaying = ttsState.status === 'speaking' && ttsState.activeTitle === title;
  const isThisPaused = ttsState.status === 'paused' && ttsState.activeTitle === title;

  const statusText =
    ttsState.status === 'unsupported'
      ? 'Browser tidak mendukung suara TTS; gunakan transkrip lisan.'
      : isThisPlaying
        ? 'Mister Jo sedang menjelaskan...'
        : isThisPaused
          ? 'Narasi dijeda'
          : 'Siap membimbing dengan suara tegas';

  return (
    <div className="rounded-xl border border-teal-200/80 bg-gradient-to-r from-emerald-50/70 via-teal-50/60 to-white p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center font-display font-bold text-sm shrink-0">
            MJ
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-semibold text-slate-900">
              <span>Narator Suara: Mister Jo</span>
              <span className="hidden sm:inline text-slate-400" aria-hidden="true">·</span>
              <span className="text-xs font-medium text-teal-700">{statusText}</span>
            </div>
            {!compact && (
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{title}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => misterJoNarrator.speak(title, script)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>

          <button
            type="button"
            onClick={() => misterJoNarrator.pause()}
            disabled={ttsState.status !== 'speaking'}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause Suara</span>
          </button>

          <button
            type="button"
            onClick={() => misterJoNarrator.resume()}
            disabled={ttsState.status !== 'paused'}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Lanjutkan</span>
          </button>

          <button
            type="button"
            onClick={() => misterJoNarrator.speak(title, script)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-teal-200 bg-teal-50/70 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Narasi</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showTranscript ? 'Tutup Naskah' : 'Naskah Lisan'}</span>
          </button>
        </div>
      </div>

      {showTranscript && (
        <div className="mt-3 pt-3 border-t border-teal-200/70 text-xs leading-relaxed text-slate-700">
          {script}
        </div>
      )}
    </div>
  );
};
