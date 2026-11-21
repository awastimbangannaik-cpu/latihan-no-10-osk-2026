import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { PhysicsQuestion } from '../../types/physics';
import { formatIndoDecimal } from '../../utils/numberFormat';
import { MathBlock } from '../MathText';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';
import { PhysicsAnimationPlayer } from '../PhysicsAnimationPlayer';

interface GaleriVisualisasiViewProps {
  questions: PhysicsQuestion[];
}

export const GaleriVisualisasiView: React.FC<GaleriVisualisasiViewProps> = ({ questions }) => {
  // Interactive Sandbox initialized with EXACT Soal #10 OSK parameters!
  const [x1, setX1] = useState(1);
  const [y1, setY1] = useState(2);
  const [x2, setX2] = useState(2);
  const [y2, setY2] = useState(-3);
  const [fx, setFx] = useState(3);
  const [fy, setFy] = useState(4);

  const [selectedAnimQuestionId, setSelectedAnimQuestionId] = useState<number>(10);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const wx = fx * dx;
  const wy = fy * dy;
  const workTotal = wx + wy;
  const fMag = Math.hypot(fx, fy);
  const drMag = Math.hypot(dx, dy);
  const cosTheta = fMag > 0 && drMag > 0 ? workTotal / (fMag * drMag) : 0;
  const thetaDeg =
    fMag > 0 && drMag > 0
      ? (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI
      : 0;

  const resetToSource10 = () => {
    setX1(1);
    setY1(2);
    setX2(2);
    setY2(-3);
    setFx(3);
    setFy(4);
  };

  // Map [-6, 6] to SVG
  const mapX = (v: number) => 40 + ((v + 6) / 12) * 340;
  const mapY = (v: number) => 300 - ((v + 6) / 12) * 260;

  const selectedQuestion =
    questions.find((q) => q.id === selectedAnimQuestionId) ?? questions[0];

  const labNarration = `Selamat datang di Galeri Visualisasi dan Laboratorium Interaktif Soal Nomor 10. Di bagian atas, Anda dapat menggeser koordinat r satu, r dua, dan vektor gaya F secara langsung untuk melihat bagaimana perubahan arah dan besar komponen mengubah hasil dot product dan tanda usaha secara seketika. Di bagian bawah, Anda dapat memutar animasi pembuktian untuk seluruh lima belas soal.`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Galeri Visualisasi & Simulator Vektor Interaktif
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Eksplorasi langsung hubungan geometris dan aljabar antara vektor posisi, perpindahan, gaya, sudut apit, dan usaha.
        </p>
      </div>

      <MisterJoNarratorBar
        title="Panduan Laboratorium Visualisasi Mister Jo"
        script={labNarration}
      />

      {/* Interactive Dot Product Sandbox */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900">
              Simulator Laboratorium Soal Nomor 10 OSK (Parameter Live)
            </h3>
            <p className="text-xs text-slate-500">
              Nilai awal disetel persis ke Soal #10 OSK: r₁ = (1î + 2ĵ), r₂ = (2î - 3ĵ), F = (3î + 4ĵ) → W = -17,0 J.
            </p>
          </div>
          <button
            type="button"
            onClick={resetToSource10}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-teal-200 bg-teal-50 text-teal-900 hover:bg-teal-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Parameter Soal #10</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Coordinate Canvas */}
          <div className="lg:col-span-6">
            <svg viewBox="0 0 420 340" className="w-full h-auto rounded-xl bg-slate-50 border border-slate-200">
              <defs>
                <marker id="lab-teal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,1 L7,4 L0,7 Z" fill="#0D9488" />
                </marker>
                <marker id="lab-em" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
                </marker>
              </defs>

              {/* Grid */}
              {[-6, -4, -2, 0, 2, 4, 6].map((g) => (
                <g key={g}>
                  <line x1={mapX(g)} y1="25" x2={mapX(g)} y2="315" stroke={g === 0 ? '#64748B' : '#E2E8F0'} strokeWidth={g === 0 ? '1.5' : '1'} />
                  <line x1="25" y1={mapY(g)} x2="395" y2={mapY(g)} stroke={g === 0 ? '#64748B' : '#E2E8F0'} strokeWidth={g === 0 ? '1.5' : '1'} />
                </g>
              ))}

              {/* r1 and r2 dashed */}
              <line x1={mapX(0)} y1={mapY(0)} x2={mapX(x1)} y2={mapY(y1)} stroke="#64748B" strokeWidth="1.4" strokeDasharray="4 3" />
              <line x1={mapX(0)} y1={mapY(0)} x2={mapX(x2)} y2={mapY(y2)} stroke="#64748B" strokeWidth="1.4" strokeDasharray="4 3" />

              {/* Δr vector */}
              <line
                x1={mapX(x1)}
                y1={mapY(y1)}
                x2={mapX(x2)}
                y2={mapY(y2)}
                stroke="#0D9488"
                strokeWidth="2.8"
                markerEnd="url(#lab-teal)"
              />

              {/* Force vector anchored at r1 */}
              {fMag > 0 && (
                <line
                  x1={mapX(x1)}
                  y1={mapY(y1)}
                  x2={mapX(x1) + (fx / fMag) * 68}
                  y2={mapY(y1) - (fy / fMag) * 68}
                  stroke="#059669"
                  strokeWidth="2.8"
                  markerEnd="url(#lab-em)"
                />
              )}

              <circle cx={mapX(x1)} cy={mapY(y1)} r="5.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.4" />
              <text x={mapX(x1) + 8} y={mapY(y1) - 6} className="fill-slate-900 text-[11px] font-bold">
                r₁({x1}; {y1})
              </text>

              <circle cx={mapX(x2)} cy={mapY(y2)} r="5.5" fill="#0D9488" />
              <text x={mapX(x2) + 8} y={mapY(y2) + 12} className="fill-teal-900 text-[11px] font-bold">
                r₂({x2}; {y2})
              </text>
            </svg>
          </div>

          {/* Sliders & Live Readout */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-200 p-3 space-y-2">
                <div className="font-semibold text-slate-900">Posisi Awal r₁</div>
                <label className="flex justify-between">
                  <span>x₁: <strong className="font-mono-tabular">{x1} m</strong></span>
                </label>
                <input type="range" min={-5} max={5} value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full accent-teal-600" />
                <label className="flex justify-between">
                  <span>y₁: <strong className="font-mono-tabular">{y1} m</strong></span>
                </label>
                <input type="range" min={-5} max={5} value={y1} onChange={(e) => setY1(Number(e.target.value))} className="w-full accent-teal-600" />
              </div>

              <div className="rounded-lg border border-slate-200 p-3 space-y-2">
                <div className="font-semibold text-slate-900">Posisi Akhir r₂</div>
                <label className="flex justify-between">
                  <span>x₂: <strong className="font-mono-tabular">{x2} m</strong></span>
                </label>
                <input type="range" min={-5} max={5} value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-full accent-teal-600" />
                <label className="flex justify-between">
                  <span>y₂: <strong className="font-mono-tabular">{y2} m</strong></span>
                </label>
                <input type="range" min={-5} max={5} value={y2} onChange={(e) => setY2(Number(e.target.value))} className="w-full accent-teal-600" />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-3 space-y-2 text-xs">
              <div className="font-semibold text-slate-900">Vektor Gaya Konstan F</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">
                    Fx: <strong className="font-mono-tabular">{fx} N</strong>
                  </label>
                  <input type="range" min={-8} max={8} value={fx} onChange={(e) => setFx(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
                <div>
                  <label className="block mb-1">
                    Fy: <strong className="font-mono-tabular">{fy} N</strong>
                  </label>
                  <input type="range" min={-8} max={8} value={fy} onChange={(e) => setFy(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
              </div>
            </div>

            <MathBlock
              latex={`W = (${fx})(${dx}) + (${fy})(${dy}) = ${wx} + (${wy}) = ${formatIndoDecimal(workTotal)}\\text{ J}`}
              label="Hasil Perhitungan Langsung"
              accent
            />

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                <div className="text-slate-500">Besar |Δr|</div>
                <div className="font-mono-tabular font-bold text-slate-900">{formatIndoDecimal(drMag)} m</div>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                <div className="text-slate-500">Sudut Apit θ</div>
                <div className="font-mono-tabular font-bold text-slate-900">{formatIndoDecimal(thetaDeg)}°</div>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                <div className="text-slate-500">Tipe Usaha</div>
                <div className="font-bold text-teal-800">
                  {workTotal > 0 ? 'Positif' : workTotal < 0 ? 'Negatif' : 'Nol'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery of All 15 Question Animations */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900">
              Galeri Animasi Pembuktian 15 Soal
            </h3>
            <p className="text-xs text-slate-500">
              Pilih nomor soal untuk menjalankan simulasi pembuktian lengkap beserta skala numeriknya.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedAnimQuestionId(q.id)}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono-tabular transition-colors cursor-pointer ${
                  q.id === selectedQuestion.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300'
                }`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>

        <PhysicsAnimationPlayer question={selectedQuestion} revealNumericValues />
      </section>
    </div>
  );
};
