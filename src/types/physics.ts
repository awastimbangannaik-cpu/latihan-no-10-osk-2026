export type DifficultyLevel = 'dasar' | 'menengah' | 'olimpiade';

export type AppSection =
  | 'beranda'
  | 'peta-konsep'
  | 'mastering-physics'
  | 'galeri-visualisasi'
  | 'latihan-soal'
  | 'pembahasan'
  | 'evaluasi'
  | 'kamus-fisika';

export interface Vec2 {
  x: number;
  y: number;
}

export interface ForceVectorSpec {
  id: string;
  symbol: string;
  name: string;
  fx: number;
  fy: number;
  color: string;
  originReason: string;
  source: string;
  directionDesc: string;
  componentFormula: string;
  equationRole: string;
}

export interface AnimationStage {
  stepNumber: number;
  title: string;
  progress: number; // 0.0 to 1.0 along path
  whatHappens: string;
  whyItMoves: string;
  actingForces: string;
  motionChange: string;
  physicsPrinciple: string;
  narration: string;
}

export interface SolutionDetails {
  known: string[];
  asked: string;
  concepts: string[];
  physicalCondition: string;
  diagramAnalysis: string;
  relevantLaws: string[];
  formulaReason: string;
  derivationSteps: Array<{
    label: string;
    latex: string;
    explanation: string;
  }>;
  substitution: string;
  calculation: string;
  dimensionalCheck: string;
  roundingStep: string;
  conclusion: string;
  commonMistake: string;
  narrationScript: string;
}

export interface StimulusDataTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface DiagramConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  r1: Vec2;
  r2: Vec2;
  viaPoints?: Vec2[];
  pathType: 'linear' | 'semicircle' | 'inclined' | 'segmented' | 'parabola' | 'circle' | 'spring' | 'parametric';
  circleCenter?: Vec2;
  circleRadius?: number;
  springAnchor?: Vec2;
  springRestLength?: number;
  inclineAngleDeg?: number;
  showDisplacementVector?: boolean;
  showForceVector?: boolean;
  primaryForce?: Vec2;
  primaryForceLabel?: string;
  extraNotes?: string;
}

export interface PhysicsQuestion {
  id: number;
  level: DifficultyLevel;
  levelLabel: string;
  title: string;
  subtopic: string;
  relationToSource10: string;
  prompt: string;
  unit: string;
  exactAnswer: number;
  expectedFormatted: string; // e.g. "29,0", "-22,0", "43,3"
  tolerance?: number;
  stimulusNarrative: string;
  stimulusTable?: StimulusDataTable;
  diagram: DiagramConfig;
  requiresFbd: boolean;
  fbdAxisAngleDeg?: number;
  fbdObjectLabel: string;
  fbdAccelerationDesc: string;
  fbdForces: ForceVectorSpec[];
  animationStages: AnimationStage[];
  hintOnWrong: string;
  relatedTheoryIds: string[];
  solution: SolutionDetails;
  narrationPrompt: string;
}

export interface QuestionAttempt {
  questionId: number;
  rawInput: string;
  parsedValue: number | null;
  isCorrect: boolean;
  attemptsCount: number;
  lastUpdatedAt: number;
}

export interface TheoryModule {
  id: string; // 'A' .. 'L'
  code: string;
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string;
    formulaLatex?: string;
    formulaLabel?: string;
  }>;
  visualType:
    | 'phenomenon-xy'
    | 'prereq-vectors'
    | 'dot-product-def'
    | 'units-dimensions'
    | 'laws-conservation'
    | 'derivation-integral'
    | 'variables-projection'
    | 'graph-angle-work'
    | 'real-application'
    | 'olympiad-strategy'
    | 'misconceptions'
    | 'concept-links';
  visualCaption: string;
  keyTakeaway: string;
  narrationScript: string;
}

export interface ConceptMapNode {
  id: string;
  label: string;
  category: 'core' | 'vector' | 'dynamics' | 'energy' | 'calculus';
  x: number;
  y: number;
  description: string;
  keyFormulaLatex: string;
  relatedQuestionIds: number[];
  relatedTheoryId: string;
}

export interface ConceptMapEdge {
  from: string;
  to: string;
  label: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  symbol: string;
  category: 'Besaran Vektor' | 'Besaran Skalar' | 'Hukum & Prinsip' | 'Matematika Fisika';
  unit: string;
  dimension: string;
  definition: string;
  exampleInSoal10: string;
}
