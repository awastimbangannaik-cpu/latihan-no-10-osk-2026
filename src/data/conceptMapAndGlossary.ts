import type { ConceptMapEdge, ConceptMapNode, GlossaryEntry } from '../types/physics';

export const CONCEPT_MAP_NODES: ConceptMapNode[] = [
  {
    id: 'core',
    label: 'Usaha Vektor 2D (Inti Soal #10)',
    category: 'core',
    x: 420,
    y: 230,
    description:
      'Konsep sentral Soal Nomor 10 OSK 2026: kerja mekanik sebagai perkalian titik (dot product) vektor gaya dengan vektor perpindahan di bidang xy.',
    keyFormulaLatex: 'W = \\vec{F}\\cdot\\Delta\\vec{r} = F_x\\Delta x + F_y\\Delta y',
    relatedQuestionIds: [1, 2, 3, 10],
    relatedTheoryId: 'A',
  },
  {
    id: 'disp',
    label: 'Vektor Posisi & Perpindahan',
    category: 'vector',
    x: 150,
    y: 100,
    description:
      'Menentukan vektor perpindahan Δr dari posisi awal r1 ke posisi akhir r2 pada sistem koordinat Kartesius.',
    keyFormulaLatex: '\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (x_2-x_1)\\hat{i} + (y_2-y_1)\\hat{j}',
    relatedQuestionIds: [1, 2, 3, 5],
    relatedTheoryId: 'B',
  },
  {
    id: 'proj',
    label: 'Proyeksi Gaya & Sudut Apit',
    category: 'vector',
    x: 150,
    y: 355,
    description:
      'Menguraikan gaya menjadi komponen sejajar perpindahan (menghasilkan usaha) dan tegak lurus (usaha nol).',
    keyFormulaLatex: 'W = |\\vec{F}||\\Delta\\vec{r}|\\cos\\theta = F_\\parallel\\,|\\Delta\\vec{r}|',
    relatedQuestionIds: [4, 5, 13],
    relatedTheoryId: 'C',
  },
  {
    id: 'fbd',
    label: 'FBD & Superposisi Gaya',
    category: 'dynamics',
    x: 420,
    y: 70,
    description:
      'Identifikasi seluruh gaya nyata pada benda melalui Free Body Diagram untuk menghitung usaha resultan.',
    keyFormulaLatex: 'W_{\\text{tot}} = \\left(\\sum \\vec{F}_i\\right)\\cdot\\Delta\\vec{r} = \\sum W_i',
    relatedQuestionIds: [6, 8, 9],
    relatedTheoryId: 'G',
  },
  {
    id: 'work-energy',
    label: 'Teorema Usaha–Energi Kinetik',
    category: 'energy',
    x: 700,
    y: 105,
    description:
      'Menghubungkan usaha total gaya vektor dengan perubahan kelajuan dan energi kinetik partikel.',
    keyFormulaLatex: 'W_{\\text{tot}} = \\Delta E_k = \\frac{1}{2}m(v_2^2 - v_1^2)',
    relatedQuestionIds: [6, 10, 15],
    relatedTheoryId: 'E',
  },
  {
    id: 'path',
    label: 'Kebebasan Lintasan vs Gesekan',
    category: 'energy',
    x: 420,
    y: 390,
    description:
      'Membedakan gaya konstan konservatif (bebas lintasan) dengan gaya gesek kinetik (bergantung panjang lintasan s).',
    keyFormulaLatex: 'W_{\\text{gesek}} = -\\int f_k\\,ds = -\\mu_k N s',
    relatedQuestionIds: [7, 8, 9, 14],
    relatedTheoryId: 'E',
  },
  {
    id: 'integral',
    label: 'Integral Garis & Kinematika r(t)',
    category: 'calculus',
    x: 700,
    y: 350,
    description:
      'Perluasan olimpiade: usaha oleh medan gaya berubah posisi F(x,y) atau lintasan parametrik waktu r(t).',
    keyFormulaLatex: 'W = \\int_C \\vec{F}(x,y)\\cdot d\\vec{r} = \\int_{t_1}^{t_2} \\vec{F}\\cdot\\vec{v}\\,dt',
    relatedQuestionIds: [11, 12, 14, 15],
    relatedTheoryId: 'F',
  },
];

export const CONCEPT_MAP_EDGES: ConceptMapEdge[] = [
  { from: 'disp', to: 'core', label: 'Membentuk Δr' },
  { from: 'proj', to: 'core', label: 'Dot Product cos θ' },
  { from: 'fbd', to: 'core', label: 'Resultan F' },
  { from: 'core', to: 'work-energy', label: 'Menghasilkan ΔEk' },
  { from: 'core', to: 'path', label: 'Sifat Konservatif' },
  { from: 'core', to: 'integral', label: 'Generalisasi F(x,y)' },
  { from: 'work-energy', to: 'integral', label: 'Daya & r(t)' },
];

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'usaha',
    term: 'Usaha (Kerja Mekanik)',
    symbol: 'W',
    category: 'Besaran Skalar',
    unit: 'Joule (J = N·m)',
    dimension: 'M L² T⁻²',
    definition:
      'Besaran skalar yang menyatakan energi yang ditransfer oleh suatu gaya ketika benda mengalami perpindahan. Nilainya dapat positif, nol, atau negatif.',
    exampleInSoal10: 'Pada soal sumber #10, W = (3)(1) + (4)(-5) = -17,0 J.',
  },
  {
    id: 'vektor-posisi',
    term: 'Vektor Posisi',
    symbol: '\\vec{r}',
    category: 'Besaran Vektor',
    unit: 'meter (m)',
    dimension: 'L',
    definition:
      'Vektor yang ditarik dari titik asal koordinat O(0,0) menuju lokasi partikel pada suatu saat di bidang xy: r = x î + y ĵ.',
    exampleInSoal10: 'r₁ = (1î + 2ĵ) m dan r₂ = (2î - 3ĵ) m.',
  },
  {
    id: 'vektor-perpindahan',
    term: 'Vektor Perpindahan',
    symbol: '\\Delta\\vec{r}',
    category: 'Besaran Vektor',
    unit: 'meter (m)',
    dimension: 'L',
    definition:
      'Perubahan posisi partikel dari posisi awal ke posisi akhir: Δr = r₂ - r₁ = Δx î + Δy ĵ, tidak bergantung pada bentuk lintasan.',
    exampleInSoal10: 'Δr = (2 - 1)î + (-3 - 2)ĵ = (1î - 5ĵ) m.',
  },
  {
    id: 'gaya',
    term: 'Vektor Gaya',
    symbol: '\\vec{F}',
    category: 'Besaran Vektor',
    unit: 'Newton (N = kg·m/s²)',
    dimension: 'M L T⁻²',
    definition:
      'Interaksi tarikan atau dorongan yang bekerja pada partikel yang mampu mengubah keadaan gerak (momentum/energi kinetik) partikel.',
    exampleInSoal10: 'F = (3î + 4ĵ) N.',
  },
  {
    id: 'dot-product',
    term: 'Perkalian Titik (Dot Product)',
    symbol: '\\vec{A}\\cdot\\vec{B}',
    category: 'Matematika Fisika',
    unit: 'Produk satuan A dan B',
    dimension: '[A][B]',
    definition:
      'Operasi dua vektor yang menghasilkan bilangan skalar: A·B = AxBx + AyBy = |A||B|cos θ. Bernilai nol jika kedua vektor saling tegak lurus.',
    exampleInSoal10: 'W = F·Δr = FxΔx + FyΔy.',
  },
  {
    id: 'energi-kinetik',
    term: 'Energi Kinetik',
    symbol: 'E_k',
    category: 'Besaran Skalar',
    unit: 'Joule (J)',
    dimension: 'M L² T⁻²',
    definition:
      'Energi yang dimiliki partikel akibat geraknya dengan kelajuan v, bernilai ½ m v². Selalu non-negatif.',
    exampleInSoal10: 'Digunakan pada Soal #6, #10, dan #15 melalui W_total = ΔEk.',
  },
  {
    id: 'gaya-konservatif',
    term: 'Gaya Konservatif',
    symbol: '\\vec{F}_{\\text{kons}}',
    category: 'Hukum & Prinsip',
    unit: 'Newton (N)',
    dimension: 'M L T⁻²',
    definition:
      'Gaya yang usahanya hanya bergantung pada posisi awal dan posisi akhir (tidak bergantung pada lintasan). Memenuhi syarat ∂Fx/∂y = ∂Fy/∂x di bidang xy.',
    exampleInSoal10: 'Setiap gaya vektor konstan dan gaya pegas ideal bersifat konservatif.',
  },
  {
    id: 'gaya-gesek',
    term: 'Gaya Gesek Kinetik',
    symbol: '\\vec{f}_k',
    category: 'Besaran Vektor',
    unit: 'Newton (N)',
    dimension: 'M L T⁻²',
    definition:
      'Gaya kontak non-konservatif yang besarnya μk·N dan arahnya selalu berlawanan arah gerak sesaat benda relatif terhadap permukaan.',
    exampleInSoal10: 'Pada Soal #9, usaha gesek bergantung pada panjang lintasan total s.',
  },
  {
    id: 'gaya-normal',
    term: 'Gaya Normal',
    symbol: '\\vec{N}',
    category: 'Besaran Vektor',
    unit: 'Newton (N)',
    dimension: 'M L T⁻²',
    definition:
      'Gaya reaksi kontak permukaan yang selalu tegak lurus terhadap bidang kontak. Karena tegak lurus perpindahan di bidang miring/datar diam, usahanya nol.',
    exampleInSoal10: 'Ditampilkan pada FBD Soal #8 dan #9.',
  },
  {
    id: 'integral-garis',
    term: 'Integral Garis Usaha',
    symbol: '\\int_C \\vec{F}\\cdot d\\vec{r}',
    category: 'Matematika Fisika',
    unit: 'Joule (J)',
    dimension: 'M L² T⁻²',
    definition:
      'Penjumlahan kontinu elemen usaha dW = F·dr sepanjang kurva C ketika gaya berubah terhadap posisi atau lintasan melengkung.',
    exampleInSoal10: 'Inti penyelesaian Tingkat Olimpiade Soal #11 dan #12.',
  },
  {
    id: 'gaya-pegas',
    term: 'Gaya Pemulih Pegas',
    symbol: '\\vec{F}_p',
    category: 'Besaran Vektor',
    unit: 'Newton (N)',
    dimension: 'M L T⁻²',
    definition:
      'Gaya radial menuju titik tambat pegas yang besarnya sebanding dengan pertambahan panjang dari panjang relaksnya: Fp = -k(|r| - l₀) r̂.',
    exampleInSoal10: 'Digunakan pada Soal #14 dalam koordinat xy.',
  },
  {
    id: 'teorema-usaha-energi',
    term: 'Teorema Usaha–Energi Kinetik',
    symbol: 'W_{\\text{tot}} = \\Delta E_k',
    category: 'Hukum & Prinsip',
    unit: 'Joule (J)',
    dimension: 'M L² T⁻²',
    definition:
      'Prinsip mekanika yang menyatakan bahwa usaha neto oleh seluruh gaya yang bekerja pada partikel sama persis dengan perubahan energi kinetiknya.',
    exampleInSoal10: 'Menghubungkan usaha vektor langsung ke kecepatan akhir pada Soal #6, #10, #15.',
  },
];
