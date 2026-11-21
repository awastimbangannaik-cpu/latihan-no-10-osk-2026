import React, { useState } from 'react';
import type { ForceVectorSpec, PhysicsQuestion } from '../types/physics';
import { MathText } from './MathText';

interface DiagramMapper {
  toSvgX: (x: number) => number;
  toSvgY: (y: number) => number;
  width: number;
  height: number;
  pad: number;
}

function createMapper(question: PhysicsQuestion, width = 480, height = 320, pad = 42): DiagramMapper {
  const { xMin, xMax, yMin, yMax } = question.diagram;
  const spanX = xMax - xMin || 1;
  const spanY = yMax - yMin || 1;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  return {
    width,
    height,
    pad,
    toSvgX: (x: number) => pad + ((x - xMin) / spanX) * innerW,
    toSvgY: (y: number) => height - pad - ((y - yMin) / spanY) * innerH,
  };
}

export function buildPathD(question: PhysicsQuestion, mapper: DiagramMapper): string {
  const { diagram } = question;
  const { r1, r2, pathType, viaPoints, circleCenter, circleRadius } = diagram;

  if (pathType === 'semicircle' && circleCenter && circleRadius) {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const angle = Math.PI * (1 - i / 40);
      const x = circleCenter.x + circleRadius * Math.cos(angle);
      const y = circleCenter.y + circleRadius * Math.sin(angle);
      pts.push(`${i === 0 ? 'M' : 'L'} ${mapper.toSvgX(x).toFixed(1)} ${mapper.toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  if (pathType === 'segmented' && viaPoints && viaPoints.length > 0) {
    const segs = [r1, ...viaPoints, r2];
    return segs
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapper.toSvgX(p.x).toFixed(1)} ${mapper.toSvgY(p.y).toFixed(1)}`)
      .join(' ');
  }

  if (pathType === 'parabola') {
    const pts: string[] = [];
    for (let i = 0; i <= 32; i++) {
      const x = r1.x + ((r2.x - r1.x) * i) / 32;
      const y = 0.5 * x * x;
      pts.push(`${i === 0 ? 'M' : 'L'} ${mapper.toSvgX(x).toFixed(1)} ${mapper.toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  if (pathType === 'circle' && circleCenter && circleRadius) {
    const angleEnd = Math.atan2(4, 3);
    const pts: string[] = [];
    for (let i = 0; i <= 30; i++) {
      const a = (angleEnd * i) / 30;
      const x = circleCenter.x + circleRadius * Math.cos(a);
      const y = circleCenter.y + circleRadius * Math.sin(a);
      pts.push(`${i === 0 ? 'M' : 'L'} ${mapper.toSvgX(x).toFixed(1)} ${mapper.toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  if (pathType === 'parametric') {
    const pts: string[] = [];
    for (let i = 0; i <= 32; i++) {
      const t = (2.0 * i) / 32;
      const x = 2.0 * t;
      const y = 1.5 * t * t - t;
      pts.push(`${i === 0 ? 'M' : 'L'} ${mapper.toSvgX(x).toFixed(1)} ${mapper.toSvgY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  return `M ${mapper.toSvgX(r1.x).toFixed(1)} ${mapper.toSvgY(r1.y).toFixed(1)} L ${mapper.toSvgX(r2.x).toFixed(1)} ${mapper.toSvgY(r2.y).toFixed(1)}`;
}

export const QuestionStimulusDiagram: React.FC<{ question: PhysicsQuestion }> = ({ question }) => {
  const mapper = createMapper(question);
  const { diagram } = question;
  const { xMin, xMax, yMin, yMax, r1, r2 } = diagram;

  const originX = mapper.toSvgX(0);
  const originY = mapper.toSvgY(0);
  const showXAxis = yMin <= 0 && yMax >= 0;
  const showYAxis = xMin <= 0 && xMax >= 0;

  const xTicks: number[] = [];
  const stepX = xMax - xMin > 10 ? 2 : 1;
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += stepX) {
    xTicks.push(x);
  }
  const yTicks: number[] = [];
  const stepY = yMax - yMin > 10 ? 2 : 1;
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += stepY) {
    yTicks.push(y);
  }

  const p1x = mapper.toSvgX(r1.x);
  const p1y = mapper.toSvgY(r1.y);
  const p2x = mapper.toSvgX(r2.x);
  const p2y = mapper.toSvgY(r2.y);

  // Force arrow preview (normalized visual vector anchored at midpoint or r1, only when showForceVector=true)
  let forceArrowEnd: { x: number; y: number } | null = null;
  if (diagram.showForceVector && diagram.primaryForce) {
    const fMag = Math.hypot(diagram.primaryForce.x, diagram.primaryForce.y) || 1;
    const scalePx = 56;
    forceArrowEnd = {
      x: p1x + (diagram.primaryForce.x / fMag) * scalePx,
      y: p1y - (diagram.primaryForce.y / fMag) * scalePx,
    };
  }

  const pathD = buildPathD(question, mapper);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-teal-800">
          Diagram Koordinat & Stimulus Fisika
        </span>
        {diagram.extraNotes && (
          <span className="text-xs text-slate-500 truncate">{diagram.extraNotes}</span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${mapper.width} ${mapper.height}`}
        className="w-full h-auto rounded-lg bg-slate-50/70 border border-slate-100"
        role="img"
        aria-label={`Diagram koordinat bidang xy untuk Soal ${question.id}`}
      >
        <defs>
          <marker id={`arrow-disp-${question.id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,1 L7,4 L0,7 Z" fill="#0D9488" />
          </marker>
          <marker id={`arrow-force-${question.id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
          </marker>
          <marker id={`arrow-axis-${question.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748B" />
          </marker>
        </defs>

        {/* Grid lines */}
        {xTicks.map((x) => {
          const sx = mapper.toSvgX(x);
          return (
            <g key={`gx-${x}`}>
              <line
                x1={sx}
                y1={mapper.pad}
                x2={sx}
                y2={mapper.height - mapper.pad}
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              <text
                x={sx}
                y={mapper.height - mapper.pad + 16}
                textAnchor="middle"
                className="fill-slate-500 text-[10px] font-mono"
              >
                {x}
              </text>
            </g>
          );
        })}

        {yTicks.map((y) => {
          const sy = mapper.toSvgY(y);
          return (
            <g key={`gy-${y}`}>
              <line
                x1={mapper.pad}
                y1={sy}
                x2={mapper.width - mapper.pad}
                y2={sy}
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              <text
                x={mapper.pad - 8}
                y={sy + 3}
                textAnchor="end"
                className="fill-slate-500 text-[10px] font-mono"
              >
                {y}
              </text>
            </g>
          );
        })}

        {/* Main Axes */}
        {showXAxis && (
          <line
            x1={mapper.pad - 6}
            y1={originY}
            x2={mapper.width - mapper.pad + 12}
            y2={originY}
            stroke="#64748B"
            strokeWidth="1.4"
            markerEnd={`url(#arrow-axis-${question.id})`}
          />
        )}
        {showYAxis && (
          <line
            x1={originX}
            y1={mapper.height - mapper.pad + 6}
            x2={originX}
            y2={mapper.pad - 12}
            stroke="#64748B"
            strokeWidth="1.4"
            markerEnd={`url(#arrow-axis-${question.id})`}
          />
        )}

        <text x={mapper.width - mapper.pad + 14} y={(showXAxis ? originY : mapper.height - mapper.pad) + 4} className="fill-slate-700 text-[11px] font-semibold">
          x (m)
        </text>
        <text x={(showYAxis ? originX : mapper.pad) - 10} y={mapper.pad - 16} className="fill-slate-700 text-[11px] font-semibold">
          y (m)
        </text>

        {/* Special Context Geometry: Inclined plane wedge for Soal 8 */}
        {diagram.pathType === 'inclined' && (
          <polygon
            points={`${p1x},${p1y} ${p2x},${p1y} ${p2x},${p2y}`}
            fill="#CCFBF1"
            fillOpacity="0.45"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
        )}

        {/* Full dashed circle for Soal 13 */}
        {diagram.pathType === 'circle' && diagram.circleCenter && diagram.circleRadius && (
          <g>
            <ellipse
              cx={mapper.toSvgX(diagram.circleCenter.x)}
              cy={mapper.toSvgY(diagram.circleCenter.y)}
              rx={Math.abs(mapper.toSvgX(diagram.circleCenter.x + diagram.circleRadius) - mapper.toSvgX(diagram.circleCenter.x))}
              ry={Math.abs(mapper.toSvgY(diagram.circleCenter.y + diagram.circleRadius) - mapper.toSvgY(diagram.circleCenter.y))}
              fill="none"
              stroke="#94A3B8"
              strokeDasharray="4 4"
              strokeWidth="1.2"
            />
            <circle
              cx={mapper.toSvgX(diagram.circleCenter.x)}
              cy={mapper.toSvgY(diagram.circleCenter.y)}
              r="3.5"
              fill="#64748B"
            />
            <text
              x={mapper.toSvgX(diagram.circleCenter.x) - 18}
              y={mapper.toSvgY(diagram.circleCenter.y) + 14}
              className="fill-slate-600 text-[10px] font-semibold"
            >
              C(1,0; 2,0)
            </text>
          </g>
        )}

        {/* Spring line for Soal 14 */}
        {diagram.pathType === 'spring' && diagram.springAnchor && (
          <line
            x1={mapper.toSvgX(diagram.springAnchor.x)}
            y1={mapper.toSvgY(diagram.springAnchor.y)}
            x2={p1x}
            y2={p1y}
            stroke="#D97706"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
        )}

        {/* Position vectors r1 and r2 from Origin */}
        {showXAxis && showYAxis && (
          <g opacity="0.55">
            <line x1={originX} y1={originY} x2={p1x} y2={p1y} stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1={originX} y1={originY} x2={p2x} y2={p2y} stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
          </g>
        )}

        {/* Actual Path Curve */}
        <path
          d={pathD}
          fill="none"
          stroke="#0D9488"
          strokeWidth="2.6"
          markerEnd={diagram.pathType === 'linear' ? `url(#arrow-disp-${question.id})` : undefined}
        />

        {/* Via Point for Segmented Path */}
        {diagram.viaPoints?.map((vp, idx) => (
          <g key={idx}>
            <circle cx={mapper.toSvgX(vp.x)} cy={mapper.toSvgY(vp.y)} r="4" fill="#0F766E" />
            <text
              x={mapper.toSvgX(vp.x) + 8}
              y={mapper.toSvgY(vp.y) + 4}
              className="fill-teal-900 text-[10px] font-semibold"
            >
              ({vp.x}; {vp.y})
            </text>
          </g>
        ))}

        {/* Net displacement dashed line when path is curved/segmented */}
        {diagram.pathType !== 'linear' && diagram.showDisplacementVector && (
          <line
            x1={p1x}
            y1={p1y}
            x2={p2x}
            y2={p2y}
            stroke="#0D9488"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            markerEnd={`url(#arrow-disp-${question.id})`}
          />
        )}

        {/* Primary Force Vector (only when non-spoiling) */}
        {forceArrowEnd && (
          <g>
            <line
              x1={p1x}
              y1={p1y}
              x2={forceArrowEnd.x}
              y2={forceArrowEnd.y}
              stroke="#059669"
              strokeWidth="2.6"
              markerEnd={`url(#arrow-force-${question.id})`}
            />
            <text
              x={forceArrowEnd.x + (forceArrowEnd.x >= p1x ? 8 : -8)}
              y={forceArrowEnd.y + (forceArrowEnd.y <= p1y ? -8 : 14)}
              textAnchor={forceArrowEnd.x >= p1x ? 'start' : 'end'}
              paintOrder="stroke"
              stroke="#F8FAFC"
              strokeWidth="4"
              strokeLinejoin="round"
              className="fill-emerald-800 text-[11px] font-bold"
            >
              {diagram.primaryForceLabel ?? 'F'}
            </text>
          </g>
        )}

        {/* Start & End Points */}
        <circle cx={p1x} cy={p1y} r="5.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.5" />
        <text
          x={p1x + (p2x >= p1x ? -8 : 8)}
          y={p1y + (p2y <= p1y ? 16 : -10)}
          textAnchor={p2x >= p1x ? 'end' : 'start'}
          paintOrder="stroke"
          stroke="#F8FAFC"
          strokeWidth="4"
          strokeLinejoin="round"
          className="fill-slate-900 text-[11px] font-bold"
        >
          r₁({String(r1.x).replace('.', ',')}; {String(r1.y).replace('.', ',')})
        </text>

        {diagram.pathType !== 'circle' && (
          <g>
            <circle cx={p2x} cy={p2y} r="5.5" fill="#0D9488" stroke="#FFFFFF" strokeWidth="1.8" />
            <text
              x={p2x + (p2x >= p1x ? 8 : -8)}
              y={p2y + (p2y <= p1y ? -10 : 16)}
              textAnchor={p2x >= p1x ? 'start' : 'end'}
              paintOrder="stroke"
              stroke="#F8FAFC"
              strokeWidth="4"
              strokeLinejoin="round"
              className="fill-teal-900 text-[11px] font-bold"
            >
              r₂({String(r2.x).replace('.', ',')}; {String(r2.y).replace('.', ',')})
            </text>
          </g>
        )}
      </svg>

      <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-teal-600 inline-block" /> Lintasan / Perpindahan Δr
        </span>
        {forceArrowEnd && (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Vektor Gaya F
          </span>
        )}
      </div>
    </div>
  );
};

export const FreeBodyDiagram: React.FC<{ question: PhysicsQuestion }> = ({ question }) => {
  const [selectedForceId, setSelectedForceId] = useState<string>(
    question.fbdForces[0]?.id ?? ''
  );

  const selectedForce: ForceVectorSpec | undefined =
    question.fbdForces.find((f) => f.id === selectedForceId) ?? question.fbdForces[0];

  const maxForceMag = Math.max(
    1,
    ...question.fbdForces.map((f) => Math.hypot(f.fx, f.fy))
  );

  const cx = 170;
  const cy = 125;
  const maxArrowPx = 82;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Free Body Diagram (FBD) — Gaya Nyata pada Objek
          </h4>
          <p className="text-xs text-slate-500">{question.fbdObjectLabel}</p>
        </div>
        <span className="text-xs font-medium text-teal-700">
          Klik gaya untuk detail analisis
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* SVG FBD Canvas */}
        <div className="lg:col-span-5">
          <svg
            viewBox="0 0 340 250"
            className="w-full h-auto rounded-lg bg-slate-50 border border-slate-100"
            role="img"
            aria-label={`Free Body Diagram untuk Soal ${question.id}`}
          >
            <defs>
              {question.fbdForces.map((f) => (
                <marker
                  key={f.id}
                  id={`fbd-arrow-${question.id}-${f.id}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,1 L7,4 L0,7 Z" fill={f.color} />
                </marker>
              ))}
            </defs>

            {/* Coordinate Axes Crosshair */}
            <line x1="25" y1={cy} x2="315" y2={cy} stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1={cx} y1="20" x2={cx} y2="230" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="318" y={cy + 4} className="fill-slate-500 text-[10px] font-semibold">+x</text>
            <text x={cx + 6} y="22" className="fill-slate-500 text-[10px] font-semibold">+y</text>

            {/* Displacement direction indicator */}
            {(() => {
              const dx = question.diagram.r2.x - question.diagram.r1.x;
              const dy = question.diagram.r2.y - question.diagram.r1.y;
              const mag = Math.hypot(dx, dy) || 1;
              const ax = cx + (dx / mag) * 65;
              const ay = cy - (dy / mag) * 65;
              return (
                <g opacity="0.6">
                  <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x={ax + 5} y={ay} className="fill-slate-500 text-[10px]">arah Δr</text>
                </g>
              );
            })()}

            {/* Isolated Body */}
            <rect
              x={cx - 14}
              y={cy - 14}
              width="28"
              height="28"
              rx="6"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="2.5" fill="#0F172A" />

            {/* Force Vectors */}
            {question.fbdForces.map((f) => {
              const mag = Math.hypot(f.fx, f.fy) || 1;
              const len = Math.max(28, (mag / maxForceMag) * maxArrowPx);
              const ex = cx + (f.fx / mag) * len;
              const ey = cy - (f.fy / mag) * len;
              const isSelected = selectedForce?.id === f.id;

              return (
                <g
                  key={f.id}
                  onClick={() => setSelectedForceId(f.id)}
                  className="cursor-pointer"
                >
                  <line
                    x1={cx}
                    y1={cy}
                    x2={ex}
                    y2={ey}
                    stroke={f.color}
                    strokeWidth={isSelected ? '3.4' : '2.4'}
                    markerEnd={`url(#fbd-arrow-${question.id}-${f.id})`}
                  />
                  <text
                    x={ex + (f.fx >= 0 ? 7 : -26)}
                    y={ey + (f.fy >= 0 ? -6 : 14)}
                    fill={f.color}
                    className="text-[12px] font-bold"
                  >
                    {f.name.split(' ')[0]} {f.symbol.replace(/\\vec\{([^}]+)\}/g, '$1').replace(/\\text\{([^}]+)\}/g, '$1').replace(/[\\{}]/g, '')}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-slate-600">
            <strong className="text-slate-800">Arah Percepatan / Gerak:</strong> {question.fbdAccelerationDesc}
          </p>
        </div>

        {/* Interactive Force Inspector */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap gap-2">
            {question.fbdForces.map((f) => {
              const active = selectedForce?.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedForceId(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>

          {selectedForce && (
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 space-y-2 text-xs text-slate-700">
              <div className="font-semibold text-sm text-slate-900">{selectedForce.name}</div>
              <div>
                <span className="font-semibold text-slate-800">Mengapa muncul: </span>
                {selectedForce.originReason}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Asal gaya: </span>
                {selectedForce.source}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Arah vektor: </span>
                {selectedForce.directionDesc}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Penentuan komponen: </span>
                <MathText text={`$${selectedForce.componentFormula}$`} />
              </div>
              <div>
                <span className="font-semibold text-slate-800">Peran dalam persamaan: </span>
                <MathText text={selectedForce.equationRole} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
