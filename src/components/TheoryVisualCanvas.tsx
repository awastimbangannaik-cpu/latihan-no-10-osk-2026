import React, { useState } from 'react';
import type { TheoryModule } from '../types/physics';

export const TheoryVisualCanvas: React.FC<{ module: TheoryModule }> = ({ module }) => {
  const [angleDeg, setAngleDeg] = useState(37);
  const [pathChoice, setPathChoice] = useState<'lurus' | 'kurva' | 'tangga'>('lurus');

  const rad = (angleDeg * Math.PI) / 180;
  const fProj = Math.cos(rad);

  return (
    <div className="rounded-xl border border-teal-200/80 bg-white p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-teal-800">
          Stimulus Visual Ilmiah — Modul {module.code}
        </span>

        {module.visualType === 'dot-product-def' ||
        module.visualType === 'graph-angle-work' ||
        module.visualType === 'variables-projection' ? (
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor={`theta-${module.id}`} className="font-medium text-slate-700">
              Sudut θ: <span className="font-mono-tabular font-semibold">{angleDeg}°</span>
            </label>
            <input
              id={`theta-${module.id}`}
              type="range"
              min={0}
              max={180}
              value={angleDeg}
              onChange={(e) => setAngleDeg(Number(e.target.value))}
              className="w-28 accent-teal-600 cursor-pointer"
            />
          </div>
        ) : null}

        {module.visualType === 'laws-conservation' && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {(['lurus', 'kurva', 'tangga'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPathChoice(p)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize cursor-pointer ${
                  pathChoice === p ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scientific SVG Graphics tailored to each Module A..L */}
      <svg viewBox="0 0 520 220" className="w-full h-auto rounded-lg bg-slate-50 border border-slate-100">
        <defs>
          <marker id="tv-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill="#0D9488" />
          </marker>
          <marker id="tv-emerald" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill="#059669" />
          </marker>
          <marker id="tv-slate" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748B" />
          </marker>
        </defs>

        {(module.visualType === 'phenomenon-xy' || module.visualType === 'prereq-vectors') && (
          <g>
            {/* Grid & Axes */}
            <line x1="60" y1="185" x2="470" y2="185" stroke="#64748B" strokeWidth="1.4" markerEnd="url(#tv-slate)" />
            <line x1="60" y1="185" x2="60" y2="25" stroke="#64748B" strokeWidth="1.4" markerEnd="url(#tv-slate)" />
            <text x="475" y="189" className="fill-slate-600 text-[11px] font-semibold">x</text>
            <text x="55" y="18" className="fill-slate-600 text-[11px] font-semibold">y</text>
            <text x="42" y="198" className="fill-slate-500 text-[10px]">O(0,0)</text>

            {/* r1 and r2 vectors */}
            <line x1="60" y1="185" x2="175" y2="75" stroke="#64748B" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#tv-slate)" />
            <text x="102" y="118" className="fill-slate-700 text-[11px] font-semibold">r₁</text>

            <line x1="60" y1="185" x2="365" y2="135" stroke="#64748B" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#tv-slate)" />
            <text x="215" y="175" className="fill-slate-700 text-[11px] font-semibold">r₂</text>

            {/* Δr */}
            <line x1="175" y1="75" x2="365" y2="135" stroke="#0D9488" strokeWidth="2.8" markerEnd="url(#tv-teal)" />
            <text x="262" y="96" className="fill-teal-800 text-[12px] font-bold">Δr = r₂ - r₁</text>

            {/* Force F */}
            <line x1="175" y1="75" x2="265" y2="35" stroke="#059669" strokeWidth="2.8" markerEnd="url(#tv-emerald)" />
            <text x="272" y="42" className="fill-emerald-800 text-[12px] font-bold">F (gaya konstan)</text>

            <circle cx="175" cy="75" r="5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.2" />
            <circle cx="365" cy="135" r="5" fill="#0D9488" />
          </g>
        )}

        {(module.visualType === 'dot-product-def' ||
          module.visualType === 'variables-projection' ||
          module.visualType === 'graph-angle-work') && (
          <g>
            {/* Left side: Interactive angle vectors */}
            <line x1="60" y1="145" x2="245" y2="145" stroke="#0D9488" strokeWidth="3" markerEnd="url(#tv-teal)" />
            <text x="145" y="166" className="fill-teal-800 text-[12px] font-bold">Δr</text>

            {/* Force rotated by angleDeg */}
            {(() => {
              const fx = 60 + 95 * Math.cos(rad);
              const fy = 145 - 95 * Math.sin(rad);
              const projX = 60 + 95 * Math.cos(rad);
              return (
                <>
                  <line x1="60" y1="145" x2={fx} y2={fy} stroke="#059669" strokeWidth="3" markerEnd="url(#tv-emerald)" />
                  <line x1={fx} y1={fy} x2={projX} y2="145" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
                  <line x1="60" y1="145" x2={projX} y2="145" stroke="#047857" strokeWidth="4.5" opacity="0.65" />
                  <text x={fx + 6} y={fy - 4} className="fill-emerald-800 text-[12px] font-bold">F</text>
                  <text x="60" y="34" className="fill-slate-800 text-[12px] font-semibold">
                    F_sejajar = F cos({angleDeg}°) = {(fProj * 100).toFixed(0)}% |F|
                  </text>
                  <text x="60" y="196" className="fill-slate-700 text-[11px] font-medium">
                    Status Usaha:{' '}
                    {fProj > 0.02
                      ? 'POSITIF (Menambah Energi)'
                      : fProj < -0.02
                        ? 'NEGATIF (Mengurangi Energi)'
                        : 'NOL (Tegak Lurus)'}
                  </text>
                </>
              );
            })()}

            {/* Right side: Cosine curve */}
            <line x1="295" y1="115" x2="490" y2="115" stroke="#94A3B8" strokeWidth="1.2" />
            <line x1="305" y1="35" x2="305" y2="195" stroke="#94A3B8" strokeWidth="1.2" />
            <path
              d={Array.from({ length: 37 }, (_, i) => {
                const deg = i * 5;
                const x = 305 + (deg / 180) * 175;
                const y = 115 - Math.cos((deg * Math.PI) / 180) * 65;
                return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
              }).join(' ')}
              fill="none"
              stroke="#0D9488"
              strokeWidth="2.2"
            />
            <circle
              cx={305 + (angleDeg / 180) * 175}
              cy={115 - Math.cos(rad) * 65}
              r="5"
              fill="#059669"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <text x="305" y="208" className="fill-slate-500 text-[10px]">0°</text>
            <text x="387" y="208" className="fill-slate-500 text-[10px]">90°</text>
            <text x="470" y="208" className="fill-slate-500 text-[10px]">180°</text>
          </g>
        )}

        {module.visualType === 'laws-conservation' && (
          <g>
            <line x1="90" y1="165" x2="410" y2="65" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="4 4" />
            {pathChoice === 'lurus' && (
              <line x1="90" y1="165" x2="410" y2="65" stroke="#0D9488" strokeWidth="3" markerEnd="url(#tv-teal)" />
            )}
            {pathChoice === 'kurva' && (
              <path d="M 90 165 Q 200 20 410 65" fill="none" stroke="#0D9488" strokeWidth="3" markerEnd="url(#tv-teal)" />
            )}
            {pathChoice === 'tangga' && (
              <path d="M 90 165 L 410 165 L 410 65" fill="none" stroke="#0D9488" strokeWidth="3" markerEnd="url(#tv-teal)" />
            )}
            <circle cx="90" cy="165" r="5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.5" />
            <text x="72" y="185" className="fill-slate-800 text-[11px] font-bold">Titik 1</text>
            <circle cx="410" cy="65" r="5" fill="#0D9488" />
            <text x="405" y="50" className="fill-slate-800 text-[11px] font-bold">Titik 2</text>
            <text x="90" y="204" className="fill-emerald-800 text-[11px] font-semibold">
              Gaya Konstan F: Lintasan "{pathChoice}" memberi usaha identik W = F · (r₂ - r₁)
            </text>
          </g>
        )}

        {(module.visualType === 'units-dimensions' ||
          module.visualType === 'derivation-integral' ||
          module.visualType === 'real-application' ||
          module.visualType === 'olympiad-strategy' ||
          module.visualType === 'misconceptions' ||
          module.visualType === 'concept-links') && (
          <g>
            {/* Clean Schematic Concept Flow Diagram */}
            <rect x="28" y="32" width="132" height="62" rx="10" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.6" />
            <text x="94" y="58" textAnchor="middle" className="fill-teal-900 text-[11px] font-bold">
              {module.visualType === 'units-dimensions'
                ? 'Gaya [M L T⁻²]'
                : module.visualType === 'derivation-integral'
                  ? 'Elemen dr = dx î + dy ĵ'
                  : module.visualType === 'misconceptions'
                    ? 'SALAH: |F|·|Δr|'
                    : 'Vektor r₁, r₂, F'}
            </text>
            <text x="94" y="76" textAnchor="middle" className="fill-slate-600 text-[10px]">
              {module.visualType === 'units-dimensions' ? 'Newton (N)' : 'Analisis Komponen'}
            </text>

            <line x1="160" y1="63" x2="195" y2="63" stroke="#0D9488" strokeWidth="2" markerEnd="url(#tv-teal)" />

            <rect x="198" y="32" width="132" height="62" rx="10" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
            <text x="264" y="58" textAnchor="middle" className="fill-emerald-900 text-[11px] font-bold">
              {module.visualType === 'units-dimensions'
                ? 'Perpindahan [L]'
                : module.visualType === 'derivation-integral'
                  ? 'Integral ∫ F · dr'
                  : module.visualType === 'misconceptions'
                    ? 'BENAR: FxΔx + FyΔy'
                    : 'Dot Product F · Δr'}
            </text>
            <text x="264" y="76" textAnchor="middle" className="fill-slate-600 text-[10px]">
              {module.visualType === 'units-dimensions' ? 'meter (m)' : 'Skalar Bertanda'}
            </text>

            <line x1="330" y1="63" x2="365" y2="63" stroke="#059669" strokeWidth="2" markerEnd="url(#tv-emerald)" />

            <rect x="368" y="32" width="124" height="62" rx="10" fill="#0F766E" />
            <text x="430" y="58" textAnchor="middle" className="fill-white text-[11px] font-bold">
              {module.visualType === 'units-dimensions' ? 'Usaha [M L² T⁻²]' : 'W (Joule) & ΔEk'}
            </text>
            <text x="430" y="76" textAnchor="middle" className="fill-teal-100 text-[10px]">
              {module.visualType === 'units-dimensions' ? '1 J = 1 N·m' : 'Hasil Akhir Valid'}
            </text>

            <rect x="28" y="122" width="464" height="68" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <text x="46" y="148" className="fill-slate-900 text-[11px] font-semibold">
              Prinsip Kunci Soal #10 OSK:
            </text>
            <text x="46" y="168" className="fill-slate-600 text-[11px]">
              {module.keyTakeaway.slice(0, 88)}
            </text>
          </g>
        )}
      </svg>

      <p className="text-xs text-slate-600">{module.visualCaption}</p>
    </div>
  );
};
