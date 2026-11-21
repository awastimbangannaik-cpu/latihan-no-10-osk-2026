import type { DifficultyLevel, PhysicsQuestion, QuestionAttempt } from '../types/physics';

export interface ParsedAnswerResult {
  valid: boolean;
  numericValue: number | null;
  normalizedCommaString: string | null;
  errorMessage: string | null;
}

/**
 * Standard mathematical rounding half away from zero to 1 decimal place.
 * E.g. 12.456 -> 12.5, -3.55 -> -3.6, 12.44 -> 12.4
 */
export function roundToOneDecimal(value: number): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }
  const sign = value < 0 ? -1 : 1;
  const absScaled = Math.abs(value) * 10;
  // Add small epsilon to prevent IEEE-754 representations like 12.45 * 10 = 124.49999999999999
  const roundedAbs = Math.floor(absScaled + 0.5 + 1e-9) / 10;
  const result = sign * roundedAbs;
  return Object.is(result, -0) ? 0 : result;
}

/**
 * Formats a number into Indonesian 1-decimal comma notation (e.g. "12,5", "-17,0").
 */
export function formatIndoDecimal(value: number): string {
  const rounded = roundToOneDecimal(value);
  const fixed = rounded.toFixed(1);
  return fixed.replace('.', ',');
}

/**
 * Validates strict Indonesian numeric input:
 * - Must use comma (,) as decimal separator, NEVER dot (.)
 * - Must have exactly 1 digit after the comma (e.g. "12,4", "-3,5", "0,8")
 * - Optional leading minus (-) or plus (+) sign
 */
export function parseIndonesianOneDecimalInput(rawInput: string): ParsedAnswerResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      numericValue: null,
      normalizedCommaString: null,
      errorMessage: 'Masukkan nilai numerik terlebih dahulu (contoh: 12,4 atau -17,0).',
    };
  }

  if (trimmed.includes('.')) {
    return {
      valid: false,
      numericValue: null,
      normalizedCommaString: null,
      errorMessage: 'Gunakan tanda koma (,) sebagai pemisah desimal, bukan tanda titik (.).',
    };
  }

  // Must match optional +/- sign, one or more digits, comma, and exactly one digit
  const strictPattern = /^[+-]?\d+,\d$/;
  if (!strictPattern.test(trimmed)) {
    if (/^[+-]?\d+$/.test(trimmed)) {
      return {
        valid: false,
        numericValue: null,
        normalizedCommaString: null,
        errorMessage: 'Jawaban wajib memiliki tepat satu angka di belakang koma (contoh: ' + trimmed + ',0).',
      };
    }
    if (/^[+-]?\d+,\d{2,}$/.test(trimmed)) {
      return {
        valid: false,
        numericValue: null,
        normalizedCommaString: null,
        errorMessage: 'Bulatkan jawaban hingga tepat satu angka di belakang koma (contoh: 12,5).',
      };
    }
    return {
      valid: false,
      numericValue: null,
      normalizedCommaString: null,
      errorMessage: 'Format jawaban harus berupa angka dengan tepat satu desimal koma (contoh: 12,4 atau -3,5).',
    };
  }

  const numericValue = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(numericValue)) {
    return {
      valid: false,
      numericValue: null,
      normalizedCommaString: null,
      errorMessage: 'Nilai numerik tidak valid.',
    };
  }

  const normalizedVal = roundToOneDecimal(numericValue);
  return {
    valid: true,
    numericValue: normalizedVal,
    normalizedCommaString: formatIndoDecimal(normalizedVal),
    errorMessage: null,
  };
}

export interface GradeResult {
  validFormat: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
  expectedFormatted: string;
  feedbackTitle: string;
  feedbackMessage: string;
  errorMessage: string | null;
}

/**
 * Evaluates a user's string answer against the exact physics answer rounded to 1 decimal place.
 */
export function evaluateNumericAnswer(
  rawInput: string,
  exactAnswer: number,
  hintOnWrong: string
): GradeResult {
  const parsed = parseIndonesianOneDecimalInput(rawInput);
  const expectedRounded = roundToOneDecimal(exactAnswer);
  const expectedFormatted = formatIndoDecimal(expectedRounded);

  if (!parsed.valid || parsed.numericValue === null) {
    return {
      validFormat: false,
      isCorrect: false,
      parsedValue: null,
      expectedFormatted,
      feedbackTitle: 'Format Jawaban Belum Sesuai',
      feedbackMessage: parsed.errorMessage ?? 'Periksa format angka Anda.',
      errorMessage: parsed.errorMessage,
    };
  }

  const diff = Math.abs(parsed.numericValue - expectedRounded);
  const isCorrect = diff < 0.05; // exact match at 1-decimal precision

  if (isCorrect) {
    return {
      validFormat: true,
      isCorrect: true,
      parsedValue: parsed.numericValue,
      expectedFormatted,
      feedbackTitle: 'Jawaban Benar',
      feedbackMessage: `Tepat sekali! Hasil perhitungan Anda (${parsed.normalizedCommaString}) sesuai dengan analisis fisis dan pembulatan satu desimal.`,
      errorMessage: null,
    };
  }

  return {
    validFormat: true,
    isCorrect: false,
    parsedValue: parsed.numericValue,
    expectedFormatted,
    feedbackTitle: 'Jawaban Belum Tepat',
    feedbackMessage: `Nilai ${parsed.normalizedCommaString} belum sesuai. Petunjuk konsep: ${hintOnWrong}`,
    errorMessage: null,
  };
}

export interface LevelStats {
  level: DifficultyLevel;
  label: string;
  total: number;
  attempted: number;
  correct: number;
  incorrect: number;
  accuracyPct: number;
  masteryStatus: 'Belum Mulai' | 'Perlu Penguatan' | 'Berkembang' | 'Menguasai';
}

export interface EvaluationSummary {
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  completionPct: number;
  accuracyPct: number;
  levelBreakdown: LevelStats[];
  weakTheoryIds: string[];
}

export function computeEvaluationSummary(
  questions: PhysicsQuestion[],
  attempts: Record<number, QuestionAttempt>
): EvaluationSummary {
  const levels: Array<{ level: DifficultyLevel; label: string }> = [
    { level: 'dasar', label: 'Tingkat 1: Penguasaan Dasar (1–5)' },
    { level: 'menengah', label: 'Tingkat 2: Penguasaan Menengah (6–10)' },
    { level: 'olimpiade', label: 'Tingkat 3: Penguasaan Olimpiade (11–15)' },
  ];

  let correctCount = 0;
  let incorrectCount = 0;
  let attemptedCount = 0;
  const weakTheorySet = new Set<string>();

  for (const q of questions) {
    const att = attempts[q.id];
    if (att) {
      attemptedCount += 1;
      if (att.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
        for (const tid of q.relatedTheoryIds) {
          weakTheorySet.add(tid);
        }
      }
    }
  }

  const levelBreakdown: LevelStats[] = levels.map(({ level, label }) => {
    const qs = questions.filter((q) => q.level === level);
    let lvlAttempted = 0;
    let lvlCorrect = 0;
    let lvlIncorrect = 0;
    for (const q of qs) {
      const att = attempts[q.id];
      if (att) {
        lvlAttempted += 1;
        if (att.isCorrect) lvlCorrect += 1;
        else lvlIncorrect += 1;
      }
    }
    const accuracyPct = qs.length > 0 ? Math.round((lvlCorrect / qs.length) * 100) : 0;
    let masteryStatus: LevelStats['masteryStatus'] = 'Belum Mulai';
    if (lvlAttempted > 0) {
      if (lvlCorrect === qs.length) masteryStatus = 'Menguasai';
      else if (lvlCorrect >= Math.ceil(qs.length * 0.6)) masteryStatus = 'Berkembang';
      else masteryStatus = 'Perlu Penguatan';
    }
    return {
      level,
      label,
      total: qs.length,
      attempted: lvlAttempted,
      correct: lvlCorrect,
      incorrect: lvlIncorrect,
      accuracyPct,
      masteryStatus,
    };
  });

  const totalQuestions = questions.length;
  return {
    totalQuestions,
    attemptedCount,
    correctCount,
    incorrectCount,
    unansweredCount: totalQuestions - attemptedCount,
    completionPct: totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0,
    accuracyPct: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
    levelBreakdown,
    weakTheoryIds: Array.from(weakTheorySet),
  };
}
