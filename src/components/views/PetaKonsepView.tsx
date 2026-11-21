import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CONCEPT_MAP_EDGES, CONCEPT_MAP_NODES } from '../../data/conceptMapAndGlossary';
import { MathBlock } from '../MathText';
import { MisterJoNarratorBar } from '../MisterJoNarratorBar';

interface PetaKonsepViewProps {
  onOpenTheoryModule: (moduleId: string) => void;
  onJumpToQuestion: (questionId: number) => void;
}

const CATEGORY_COLORS: Record<string, { fill: string; stroke: string; text: string; label: string }> = {
  core: { fill: '#0F766E', stroke: '#0D9488', text: '#FFFFFF', label: 'Konsep Inti Soal #10' },
  vector: { fill: '#ECFDF5', stroke: '#059669', text: '#065F46', label: 'Aljabar Vektor' },
  dynamics: { fill: '#F0FDFA', stroke: '#0D9488', text: '#115E59', label: 'Dinamika & FBD' },
  energy: { fill: '#ECFEFF', stroke: '#0891B2', text: '#155E75', label: 'Usaha & Energi' },
  calculus: { fill: '#F8FAFC', stroke: '#475569', text: '#0F172A', label: 'Generalisasi Olimpiade' },
};

export const PetaKonsepView: React.FC<PetaKonsepViewProps> = ({
  onOpenTheoryModule,
  onJumpToQuestion,
}) => {
  const [selectedId, setSelectedId] = useState<string>('core');

  const selectedNode =
    CONCEPT_MAP_NODES.find((n) => n.id === selectedId) ?? CONCEPT_MAP_NODES[0];

  const narrationScript = `Peta Konsep Soal Nomor 10. Inti pembelajaran berada pada Usaha Vektor dua dimensi, W sama dengan F dot delta r. Konsep ini terhubung langsung ke vektor posisi dan perpindahan, proyeksi sudut apit, Free Body Diagram, teorema usaha energi kinetik, kebebasan lintasan melawan gaya gesek, hingga integral garis dan kinematika waktu tingkat olimpiade.`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Peta Konsep – Jejaring Ilmu Soal Nomor 10
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Klik setiap simpul konsep pada diagram di bawah untuk meninjau persamaan inti dan melompat ke modul atau soal terkait.
          </p>
        </div>
      </div>

      <MisterJoNarratorBar
        title="Penjelasan Peta Konsep oleh Mister Jo"
        script={narrationScript}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Concept Graph SVG */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-4">
          <svg
            viewBox="0 0 840 460"
            className="w-full h-auto rounded-xl bg-slate-50/70 border border-slate-100"
            role="img"
            aria-label="Peta Konsep Interaktif Soal Nomor 10"
          >
            <defs>
              <marker id="cm-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill="#64748B" />
              </marker>
            </defs>

            {/* Edges */}
            {CONCEPT_MAP_EDGES.map((edge, idx) => {
              const fromNode = CONCEPT_MAP_NODES.find((n) => n.id === edge.from);
              const toNode = CONCEPT_MAP_NODES.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              const mx = (fromNode.x + toNode.x) / 2;
              const my = (fromNode.y + toNode.y) / 2;
              const isHighlighted =
                selectedId === edge.from || selectedId === edge.to;

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? '#0D9488' : '#CBD5E1'}
                    strokeWidth={isHighlighted ? '2.4' : '1.6'}
                    markerEnd="url(#cm-arrow)"
                  />
                  <rect
                    x={mx - 48}
                    y={my - 10}
                    width="96"
                    height="18"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="0.8"
                  />
                  <text
                    x={mx}
                    y={my + 3}
                    textAnchor="middle"
                    className="fill-slate-600 text-[10px] font-medium"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {CONCEPT_MAP_NODES.map((node) => {
              const style = CATEGORY_COLORS[node.category];
              const isSelected = node.id === selectedId;
              const w = node.id === 'core' ? 210 : 186;
              const h = 56;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={node.x - w / 2}
                    y={node.y - h / 2}
                    width={w}
                    height={h}
                    rx="12"
                    fill={style.fill}
                    stroke={isSelected ? '#0F172A' : style.stroke}
                    strokeWidth={isSelected ? '3' : '1.8'}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={style.text}
                    className="text-[12px] font-bold"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Details */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <div>
            <div className="text-xs font-semibold text-teal-700">
              {CATEGORY_COLORS[selectedNode.category].label}
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mt-1">
              {selectedNode.label}
            </h3>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">{selectedNode.description}</p>

          <MathBlock latex={selectedNode.keyFormulaLatex} label="Persamaan Kunci" accent />

          <div className="space-y-2 pt-1">
            <div className="text-xs font-semibold text-slate-800">
              Latihan Terkait Konsep Ini:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedNode.relatedQuestionIds.map((qId) => (
                <button
                  key={qId}
                  type="button"
                  onClick={() => onJumpToQuestion(qId)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-teal-200 bg-teal-50 text-teal-900 hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  <span>Soal {qId}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenTheoryModule(selectedNode.relatedTheoryId)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Modul {selectedNode.relatedTheoryId} di Mastering Physics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
