import { QUESTIONS_DASAR } from './questionsDasar';
import { QUESTIONS_MENENGAH } from './questionsMenengah';
import { QUESTIONS_OLIMPIADE } from './questionsOlimpiade';
import type { PhysicsQuestion } from '../types/physics';

export const ALL_QUESTIONS: PhysicsQuestion[] = [
  ...QUESTIONS_DASAR,
  ...QUESTIONS_MENENGAH,
  ...QUESTIONS_OLIMPIADE,
];

export const SOURCE_QUESTION_10_META = {
  sourceTitle: 'Soal OSK Fisika SMA 2026 — Nomor 10 (Usaha dan Energi)',
  exactQuote:
    'Suatu partikel telah bergerak sepanjang lintasan di bidang xy dari titik 1 yang vektor posisinya r₁ = (1î + 2ĵ) m ke titik 2 dengan vektor posisi r₂ = (2î - 3ĵ) m. Selama waktu tersebut, partikel mengalami gaya F = (3î + 4ĵ) N. Kerja yang dilakukan gaya F adalah … Joule.',
  exactAnswerFormatted: '-17,0 Joule',
  analysisItems: [
    {
      label: 'Pokok Bahasan',
      value: 'Usaha (Kerja) dan Energi dalam Mekanika Vektor 2D',
    },
    {
      label: 'Submateri Terkait',
      value: 'Vektor Posisi & Perpindahan, Perkalian Titik (Dot Product), Kebebasan Lintasan Gaya Konstan, Teorema Usaha–Energi',
    },
    {
      label: 'Konsep Fundamental',
      value: 'Usaha adalah skalar hasil dot product W = F · Δr; hanya komponen gaya sejajar perpindahan yang melakukan kerja.',
    },
    {
      label: 'Prinsip & Hukum Fisika',
      value: 'Definisi Kerja Mekanik (W = ∫ F · dr), Sifat Konservatif Gaya Konstan, Superposisi Gaya, Teorema Usaha–Energi Kinetik.',
    },
    {
      label: 'Besaran & Hubungan Matematis',
      value: 'Δr = r₂ - r₁ = (1î - 5ĵ) m; W = FxΔx + FyΔy = (3)(1) + (4)(-5) = -17,0 J.',
    },
    {
      label: 'Asumsi & Kondisi Fisis',
      value: 'Partikel massa titik pada bidang xy, kerangka inersial, gaya F konstan di sepanjang lintasan.',
    },
  ],
};
