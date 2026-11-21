import type { PhysicsQuestion } from '../types/physics';

export const QUESTIONS_DASAR: PhysicsQuestion[] = [
  {
    id: 1,
    level: 'dasar',
    levelLabel: 'Tingkat 1 · Penguasaan Dasar',
    title: 'Vektor Perpindahan & Usaha Dasar di Kuadran I',
    subtopic: 'Dot Product Komponen Gaya Konstan',
    relationToSource10:
      'Mengenalkan struktur dasar Soal #10 OSK: menentukan Δr = r₂ - r₁ dari dua vektor posisi di bidang xy lalu menghitung W = F · Δr.',
    prompt:
      'Sebuah partikel bermassa $m = 2{,}0\\text{ kg}$ bergerak pada bidang horizontal licin $xy$ dari titik $A$ dengan vektor posisi $\\vec{r}_1 = (2{,}0\\hat{i} + 1{,}0\\hat{j})\\text{ m}$ menuju titik $B$ dengan vektor posisi $\\vec{r}_2 = (6{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ m}$. Selama perpindahan tersebut, bekerja gaya konstan $\\vec{F} = (5{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ N}$. Usaha yang dilakukan oleh gaya $\\vec{F}$ adalah ... Joule.',
    unit: 'Joule',
    exactAnswer: 29.0,
    expectedFormatted: '29,0',
    stimulusNarrative:
      'Partikel meluncur di atas meja udara horizontal licin (tanpa gesekan) dari koordinat awal (2,0; 1,0) m ke (6,0; 4,0) m sementara dorongan magnetik konstan menjaga vektor gaya tetap di kuadran I.',
    diagram: {
      xMin: 0,
      xMax: 8,
      yMin: 0,
      yMax: 6,
      r1: { x: 2, y: 1 },
      r2: { x: 6, y: 4 },
      pathType: 'linear',
      showDisplacementVector: true,
      showForceVector: true,
      primaryForce: { x: 5, y: 3 },
      primaryForceLabel: 'F = (5,0î + 3,0ĵ) N',
      extraNotes: 'Bidang horizontal licin xy (tampak atas)',
    },
    requiresFbd: true,
    fbdObjectLabel: 'Partikel m = 2,0 kg (tampak bidang gerak xy)',
    fbdAccelerationDesc: 'Percepatan sejajar gaya resultan F di bidang xy.',
    fbdForces: [
      {
        id: 'f-ext',
        symbol: '\\vec{F}',
        name: 'Gaya Konstan Magnetik',
        fx: 5,
        fy: 3,
        color: '#059669',
        originReason: 'Tarikan medan eksternal konstan yang diberikan pada partikel selama meluncur.',
        source: 'Interaksi medan eksternal',
        directionDesc: 'Mengalami komponen +5,0 N ke arah +x dan +3,0 N ke arah +y.',
        componentFormula: 'F_x = +5{,}0\\text{ N},\\quad F_y = +3{,}0\\text{ N}',
        equationRole: 'Berkontribusi langsung pada usaha W = F_x Δx + F_y Δy.',
      },
    ],
    animationStages: [
      {
        stepNumber: 1,
        title: 'Posisi Awal r₁',
        progress: 0,
        whatHappens: 'Partikel berada di titik awal A(2,0; 1,0) m sebelum mulai bergeser.',
        whyItMoves: 'Gaya dorong konstan F = (5,0î + 3,0ĵ) N mulai bekerja pada partikel.',
        actingForces: 'Hanya gaya bidang F (gaya berat dan normal tegak lurus bidang xy saling meniadakan).',
        motionChange: 'Partikel mulai dipercepat sepanjang arah gaya/lintasan.',
        physicsPrinciple: 'Vektor posisi awal r₁ menentukan titik pangkal perpindahan.',
        narration:
          'Tahap satu. Partikel berada pada posisi awal r satu yaitu dua koma nol i topi ditambah satu koma nol j topi meter. Gaya konstan F mulai bekerja.',
      },
      {
        stepNumber: 2,
        title: 'Pertumbuhan Perpindahan Δr',
        progress: 0.45,
        whatHappens: 'Partikel menempuh lintasan menuju kuadran I; Δx dan Δy bertambah positif.',
        whyItMoves: 'Komponen gaya Fx dan Fy keduanya searah dengan perpindahan positif.',
        actingForces: 'Gaya konstan F tetap mempertahankan besar dan arahnya.',
        motionChange: 'Energi kinetik partikel meningkat karena W > 0.',
        physicsPrinciple: 'Usaha positif terjadi ketika komponen gaya searah dengan komponen perpindahan.',
        narration:
          'Tahap dua. Partikel bergerak menuju kanan dan atas. Karena arah gaya searah dengan perpindahan pada sumbu x maupun sumbu y, usaha yang dihasilkan terus bertambah positif.',
      },
      {
        stepNumber: 3,
        title: 'Pencapaian Titik Akhir r₂',
        progress: 1.0,
        whatHappens: 'Partikel tiba di B(6,0; 4,0) m dengan perpindahan total Δr = (4,0î + 3,0ĵ) m.',
        whyItMoves: 'Selisih posisi r₂ - r₁ menghasilkan pergeseran bersih +4,0 m pada x dan +3,0 m pada y.',
        actingForces: 'Total kerja sumbu x adalah 20,0 J dan sumbu y adalah 9,0 J.',
        motionChange: 'Total energi yang ditransfer mencapai 29,0 Joule.',
        physicsPrinciple: 'W = F · Δr = Fx Δx + Fy Δy = 20,0 + 9,0 = 29,0 J.',
        narration:
          'Tahap tiga. Partikel tiba di r dua. Perpindahan bersihnya empat meter ke kanan dan tiga meter ke atas. Usaha sumbu x dua puluh Joule ditambah sumbu y sembilan Joule menghasilkan total dua puluh sembilan koma nol Joule.',
      },
    ],
    hintOnWrong:
      'Hitung vektor perpindahan terlebih dahulu: Δr = r₂ - r₁ = (x₂ - x₁)î + (y₂ - y₁)ĵ, lalu kalikan masing-masing komponen dengan komponen gaya F yang bersesuaian.',
    relatedTheoryIds: ['A', 'B', 'C'],
    narrationPrompt:
      'Soal nomor satu. Sebuah partikel bermassa dua koma nol kilogram bergerak pada bidang horizontal licin x y dari titik A dengan vektor posisi r satu sama dengan dua koma nol i topi ditambah satu koma nol j topi meter, menuju titik B dengan vektor posisi r dua sama dengan enam koma nol i topi ditambah empat koma nol j topi meter. Selama perpindahan tersebut bekerja gaya konstan F sama dengan lima koma nol i topi ditambah tiga koma nol j topi Newton. Hitung usaha yang dilakukan oleh gaya F dalam satuan Joule.',
    solution: {
      known: [
        'Vektor posisi awal $\\vec{r}_1 = (2{,}0\\hat{i} + 1{,}0\\hat{j})\\text{ m}$',
        'Vektor posisi akhir $\\vec{r}_2 = (6{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ m}$',
        'Vektor gaya konstan $\\vec{F} = (5{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ N}$',
      ],
      asked: 'Usaha (kerja) $W$ yang dilakukan gaya $\\vec{F}$ dalam satuan Joule.',
      concepts: ['Vektor Posisi dan Perpindahan 2D', 'Perkalian Titik (Dot Product) Usaha Mekanik'],
      physicalCondition:
        'Partikel berpindah pada bidang datar licin $xy$. Gaya berat dan gaya normal bekerja pada sumbu-$z$ yang tegak lurus bidang gerak sehingga tidak melakukan usaha.',
      diagramAnalysis:
        'Dari diagram koordinat $xy$, vektor $\\Delta\\vec{r}$ mengarah dari $(2{,}0; 1{,}0)$ ke $(6{,}0; 4{,}0)$, membentuk komponen $\\Delta x = +4{,}0\\text{ m}$ dan $\\Delta y = +3{,}0\\text{ m}$. Vektor $\\vec{F}$ berada di kuadran yang sama sehingga sudut apitnya lancip ($W > 0$).',
      relevantLaws: [
        'Definisi Vektor Perpindahan: $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$',
        'Definisi Usaha oleh Gaya Konstan: $W = \\vec{F}\\cdot\\Delta\\vec{r}$',
      ],
      formulaReason:
        'Karena gaya $\\vec{F}$ konstan dan dinyatakan dalam komponen Kartesius $\\hat{i}, \\hat{j}$, bentuk dot product komponen adalah cara paling langsung dan bebas kesalahan sudut.',
      derivationSteps: [
        {
          label: 'Menentukan vektor perpindahan',
          latex: '\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (6{,}0 - 2{,}0)\\hat{i} + (4{,}0 - 1{,}0)\\hat{j} = (4{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}',
          explanation: 'Kurangkan posisi akhir dengan posisi awal pada masing-masing komponen sumbu.',
        },
        {
          label: 'Persamaan utama perkalian titik',
          latex: 'W = \\vec{F}\\cdot\\Delta\\vec{r} = F_x\\Delta x + F_y\\Delta y',
          explanation: 'Karena $\\hat{i}\\cdot\\hat{i} = \\hat{j}\\cdot\\hat{j} = 1$ dan $\\hat{i}\\cdot\\hat{j} = 0$, hanya komponen sejenis yang dikalikan.',
        },
      ],
      substitution: '$W = (5{,}0\\text{ N})(4{,}0\\text{ m}) + (3{,}0\\text{ N})(3{,}0\\text{ m})$',
      calculation: '$W = 20{,}0 + 9{,}0 = 29{,}0\\text{ J}$',
      dimensionalCheck: '$[\\text{N}][\\text{m}] = (\\text{kg}\\cdot\\text{m}\\cdot\\text{s}^{-2})(\\text{m}) = \\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2} = \\text{Joule}$ (Konsisten).',
      roundingStep: 'Hasil eksak $29$ ditulis dengan satu angka di belakang koma menjadi $29,0$.',
      conclusion: 'Usaha yang dilakukan gaya $\\vec{F}$ adalah **29,0 Joule**.',
      commonMistake: 'Terbalik menghitung $\\vec{r}_1 - \\vec{r}_2$ sehingga menghasilkan $-29,0\\text{ J}$, atau mengalikan besar $|\\vec{F}|\\cdot|\\Delta\\vec{r}|$ tanpa $\\cos\\theta$.',
      narrationScript:
        'Pembahasan soal satu. Langkah pertama, hitung vektor perpindahan delta r sama dengan r dua dikurangi r satu, menghasilkan empat koma nol i topi ditambah tiga koma nol j topi meter. Langkah kedua, lakukan perkalian titik F dot delta r, yaitu lima dikali empat ditambah tiga dikali tiga, sama dengan dua puluh ditambah sembilan, sehingga hasilnya dua puluh sembilan koma nol Joule.',
    },
  },
  {
    id: 2,
    level: 'dasar',
    levelLabel: 'Tingkat 1 · Penguasaan Dasar',
    title: 'Usaha Bernilai Negatif pada Gerak Berlawanan Komponen',
    subtopic: 'Karakteristik Langsung Soal #10 (Usaha Negatif)',
    relationToSource10:
      'Menguji langsung fenomena khas Soal #10 OSK: gaya konstan kuadran I tetapi perpindahan memiliki komponen negatif besar di sumbu y sehingga kerja bernilai negatif.',
    prompt:
      'Sebuah wahana mikro bergerak lurus di bidang $xy$ dari posisi awal $\\vec{r}_1 = (1{,}5\\hat{i} + 4{,}0\\hat{j})\\text{ m}$ ke posisi akhir $\\vec{r}_2 = (3{,}5\\hat{i} - 2{,}5\\hat{j})\\text{ m}$. Sepanjang lintasan, sebuah medan gaya konstan $\\vec{F} = (2{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ N}$ bekerja pada wahana tersebut. Usaha yang dilakukan oleh medan gaya $\\vec{F}$ adalah ... Joule.',
    unit: 'Joule',
    exactAnswer: -22.0,
    expectedFormatted: '-22,0',
    stimulusNarrative:
      'Meskipun wahana bergeser sedikit ke arah $+x$, perpindahannya ke arah $-y$ cukup besar sementara gaya justru mendorong ke arah $+y$. Ini memodelkan perlambatan komponen vertikal oleh medan.',
    diagram: {
      xMin: 0,
      xMax: 6,
      yMin: -4,
      yMax: 6,
      r1: { x: 1.5, y: 4 },
      r2: { x: 3.5, y: -2.5 },
      pathType: 'linear',
      showDisplacementVector: true,
      showForceVector: true,
      primaryForce: { x: 2, y: 4 },
      primaryForceLabel: 'F = (2,0î + 4,0ĵ) N',
      extraNotes: 'Sudut apit antara F dan Δr lebih dari 90°',
    },
    requiresFbd: true,
    fbdObjectLabel: 'Wahana mikro pada bidang xy',
    fbdAccelerationDesc: 'Komponen Fy (+4,0 N) berlawanan dengan Δy (-6,5 m).',
    fbdForces: [
      {
        id: 'f-field',
        symbol: '\\vec{F}',
        name: 'Gaya Medan Konstan',
        fx: 2,
        fy: 4,
        color: '#0D9488',
        originReason: 'Gaya dorong medan eksternal yang selalu menunjuk ke arah (+2,0î + 4,0ĵ).',
        source: 'Medan vektor eksternal',
        directionDesc: 'Membentuk sudut tumpul (>90°) terhadap vektor perpindahan Δr.',
        componentFormula: 'F_x = +2{,}0\\text{ N},\\quad F_y = +4{,}0\\text{ N}',
        equationRole: 'Suku Fx Δx positif (+4,0 J), tetapi suku Fy Δy negatif besar (-26,0 J).',
      },
    ],
    animationStages: [
      {
        stepNumber: 1,
        title: 'Keadaan Awal di r₁(1,5; 4,0)',
        progress: 0,
        whatHappens: 'Wahana berada di kuadran I dengan koordinat y = +4,0 m.',
        whyItMoves: 'Wahana bergerak turun menyilang ke kanan menuju kuadran IV sambil ditahan gaya F.',
        actingForces: 'Gaya konstan F = (2,0î + 4,0ĵ) N.',
        motionChange: 'Komponen kecepatan pada arah +y diperlambat/ditarik ke atas.',
        physicsPrinciple: 'Gaya tidak harus searah dengan kecepatan atau perpindahan sesaat.',
        narration:
          'Tahap satu. Wahana mulai dari koordinat satu koma lima, empat koma nol meter. Gaya medan menunjuk ke kanan atas, sementara wahana berpindah ke kanan bawah.',
      },
      {
        stepNumber: 2,
        title: 'Melintasi Sumbu-x',
        progress: 0.62,
        whatHappens: 'Wahana melewati sumbu-x (y = 0) dan terus menuju nilai y negatif.',
        whyItMoves: 'Perpindahan ke bawah (-y) berlawanan dengan komponen gaya +4,0 N ke atas.',
        actingForces: 'Gaya medan F terus melakukan kerja negatif pada komponen vertikal.',
        motionChange: 'Grafik usaha kumulatif W turun melewati angka nol menuju negatif.',
        physicsPrinciple: 'Saat sudut apit tumpul (> 90°), proyeksi gaya berlawanan arah perpindahan.',
        narration:
          'Tahap dua. Wahana melintasi sumbu x ke kuadran empat. Perhatikan grafik usaha: karena komponen gaya sumbu y melawan arah gerak ke bawah, usaha total menjadi negatif.',
      },
      {
        stepNumber: 3,
        title: 'Posisi Akhir r₂(3,5; -2,5)',
        progress: 1.0,
        whatHappens: 'Wahana tiba di r₂ dengan Δx = +2,0 m dan Δy = -6,5 m.',
        whyItMoves: 'Kontribusi kerja sumbu y (-26,0 J) jauh melampaui kontribusi sumbu x (+4,0 J).',
        actingForces: 'Gaya konstan F menghasilkan usaha bersih W = -22,0 J.',
        motionChange: 'Energi kinetik berkurang sebesar 22,0 Joule akibat medan gaya ini.',
        physicsPrinciple: 'W = (2,0)(2,0) + (4,0)(-6,5) = -22,0 J.',
        narration:
          'Tahap tiga. Wahana mencapai titik akhir. Kontribusi sumbu x positif empat Joule, sedangkan sumbu y negatif dua puluh enam Joule. Total usaha adalah minus dua puluh dua koma nol Joule.',
      },
    ],
    hintOnWrong:
      'Perhatikan tanda negatif pada koordinat akhir y₂ = -2,5 m. Hitung Δy = y₂ - y₁ = -2,5 - 4,0 dengan teliti dan sertakan tanda minus jika hasilnya negatif.',
    relatedTheoryIds: ['B', 'C', 'G'],
    narrationPrompt:
      'Soal nomor dua. Sebuah wahana mikro bergerak lurus di bidang x y dari posisi awal r satu sama dengan satu koma lima i topi ditambah empat koma nol j topi meter ke posisi akhir r dua sama dengan tiga koma lima i topi dikurangi dua koma lima j topi meter. Medan gaya konstan F sama dengan dua koma nol i topi ditambah empat koma nol j topi Newton bekerja padanya. Hitung usaha oleh gaya F.',
    solution: {
      known: [
        '$\\vec{r}_1 = (1{,}5\\hat{i} + 4{,}0\\hat{j})\\text{ m}$',
        '$\\vec{r}_2 = (3{,}5\\hat{i} - 2{,}5\\hat{j})\\text{ m}$',
        '$\\vec{F} = (2{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ N}$',
      ],
      asked: 'Usaha $W$ yang dilakukan medan gaya $\\vec{F}$ (Joule).',
      concepts: ['Vektor Perpindahan', 'Usaha Negatif pada Dot Product'],
      physicalCondition:
        'Gerak 2D melintasi kuadran I ke kuadran IV di bawah pengaruh gaya medan vektor konstan.',
      diagramAnalysis:
        'Perpindahan mengarah ke kanan-bawah ($\\Delta x > 0, \\Delta y < 0$), sedangkan gaya menunjuk ke kanan-atas ($F_x > 0, F_y > 0$). Sudut apit keduanya tumpul, sehingga hasil dot product pasti negatif.',
      relevantLaws: ['$\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$', '$W = \\vec{F}\\cdot\\Delta\\vec{r}$'],
      formulaReason:
        'Gaya konstan memungkinkan penggunaan langsung selisih koordinat awal dan akhir dalam perkalian titik komponen.',
      derivationSteps: [
        {
          label: 'Menghitung komponen perpindahan',
          latex: '\\Delta\\vec{r} = (3{,}5 - 1{,}5)\\hat{i} + (-2{,}5 - 4{,}0)\\hat{j} = (2{,}0\\hat{i} - 6{,}5\\hat{j})\\text{ m}',
          explanation: 'Nilai $\\Delta y$ bernilai negatif karena wahana bergerak ke arah $-y$.',
        },
        {
          label: 'Menghitung perkalian titik',
          latex: 'W = F_x\\Delta x + F_y\\Delta y',
          explanation: 'Kalikan tiap pasang komponen sejenis beserta tanda aljabarnya.',
        },
      ],
      substitution: '$W = (2{,}0\\text{ N})(2{,}0\\text{ m}) + (4{,}0\\text{ N})(-6{,}5\\text{ m})$',
      calculation: '$W = 4{,}0 - 26{,}0 = -22{,}0\\text{ J}$',
      dimensionalCheck: '$\\text{N}\\cdot\\text{m} = \\text{Joule}$, tanda negatif bermakna pengurangan energi oleh gaya tersebut.',
      roundingStep: 'Nilai tepat $-22$ ditulis dalam format satu desimal koma sebagai $-22,0$.',
      conclusion: 'Usaha yang dilakukan medan gaya $\\vec{F}$ adalah **-22,0 Joule**.',
      commonMistake: 'Melupakan tanda minus pada $y_2 = -2,5$, atau mengabaikan tanda negatif saat menulis jawaban akhir.',
      narrationScript:
        'Pembahasan soal dua. Perpindahan delta x adalah tiga koma lima dikurangi satu koma lima sama dengan dua koma nol meter. Delta y adalah minus dua koma lima dikurangi empat koma nol sama dengan minus enam koma lima meter. Maka usahanya dua dikali dua ditambah empat dikali minus enam koma lima, sama dengan empat dikurangi dua puluh enam, hasilnya minus dua puluh dua koma nol Joule.',
    },
  },
  {
    id: 3,
    level: 'dasar',
    levelLabel: 'Tingkat 1 · Penguasaan Dasar',
    title: 'Menentukan Komponen Gaya yang Hilang dari Nilai Usaha',
    subtopic: 'Inversi Aljabar Persamaan Dot Product',
    relationToSource10:
      'Membalik peran besaran diketahui pada Soal #10: nilai W, r₁, r₂, dan Fx diketahui untuk mencari komponen gaya Fy.',
    prompt:
      'Suatu partikel bergerak di bidang $xy$ dari titik awal $\\vec{r}_1 = (-1{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$ menuju titik akhir $\\vec{r}_2 = (4{,}0\\hat{i} + 1{,}0\\hat{j})\\text{ m}$ akibat gaya konstan $\\vec{F} = (6{,}0\\hat{i} + F_y\\hat{j})\\text{ N}$. Jika usaha total yang dilakukan gaya $\\vec{F}$ selama proses tersebut tercatat sebesar $W = 19{,}0\\text{ J}$, maka besar komponen gaya $F_y$ adalah ... N.',
    unit: 'N',
    exactAnswer: 5.5,
    expectedFormatted: '5,5',
    stimulusNarrative:
      'Sensor energi mencatat kerja total 19,0 J pada partikel yang berpindah ke kanan-bawah, namun alat ukur komponen gaya vertikal perlu dikalibrasi melalui persamaan dot product.',
    diagram: {
      xMin: -2,
      xMax: 6,
      yMin: -1,
      yMax: 5,
      r1: { x: -1, y: 3 },
      r2: { x: 4, y: 1 },
      pathType: 'linear',
      showDisplacementVector: true,
      showForceVector: false,
      extraNotes: 'Komponen Fy tidak digambar berskala agar tidak membocorkan jawaban',
    },
    requiresFbd: true,
    fbdObjectLabel: 'Partikel pada bidang xy (gaya dengan komponen Fy)',
    fbdAccelerationDesc: 'F memiliki Fx = +6,0 N dan komponen vertikal Fy yang dicari.',
    fbdForces: [
      {
        id: 'f-unk',
        symbol: '\\vec{F}',
        name: 'Gaya dengan Komponen Vertikal Fy',
        fx: 6,
        fy: 5.5,
        color: '#0891B2',
        originReason: 'Gaya penggerak konstan yang komponen horizontalnya +6,0 N.',
        source: 'Aktuator 2-sumbu',
        directionDesc: 'Komponen x menarik searah +i, komponen y berperan mengompensasi usaha.',
        componentFormula: 'F_x = 6{,}0\\text{ N},\\quad F_y = ?',
        equationRole: 'F_x Δx = 30,0 J melebihi W = 19,0 J, sehingga F_y Δy harus menyumbang -11,0 J.',
      },
    ],
    animationStages: [
      {
        stepNumber: 1,
        title: 'Identifikasi Titik Awal (-1,0; 3,0)',
        progress: 0,
        whatHappens: 'Partikel berawal di kuadran II pada x = -1,0 m dan y = 3,0 m.',
        whyItMoves: 'Komponen gaya horizontal +6,0 N menarik kuat ke arah kanan.',
        actingForces: 'Gaya F = 6,0î + Fy ĵ bekerja konstan.',
        motionChange: 'Partikel mulai bergeser melintasi sumbu-y menuju kuadran I.',
        physicsPrinciple: 'Usaha total adalah jumlah aljabar kerja komponen sumbu x dan sumbu y.',
        narration:
          'Tahap satu. Partikel dimulai di koordinat minus satu koma nol, tiga koma nol meter. Komponen gaya ke kanan sebesar enam Newton siap melakukan usaha positif.',
      },
      {
        stepNumber: 2,
        title: 'Kontribusi Usaha Sumbu-x vs Target Total',
        progress: 0.55,
        whatHappens: 'Kontribusi gaya Fx sepanjang Δx = +5,0 m akan mencapai +30,0 J di akhir.',
        whyItMoves: 'Karena usaha total hanya 19,0 J, suku Fy Δy wajib bernilai -11,0 J.',
        actingForces: 'Karena Δy = -2,0 m negatif, maka Fy harus bertanda positif agar Fy Δy negatif!',
        motionChange: 'Energi kinetik bertambah lebih lambat dari 30,0 J karena hambatan komponen vertikal.',
        physicsPrinciple: '19,0 = 30,0 + Fy(-2,0).',
        narration:
          'Tahap dua. Perhatikan logika fisisnya: komponen x saja menyumbang tiga puluh Joule, padahal kerja total hanya sembilan belas Joule. Berarti komponen y harus mengurangi sebelas Joule sepanjang perpindahan minus dua meter.',
      },
      {
        stepNumber: 3,
        title: 'Tiba di (4,0; 1,0) dengan W = 19,0 J',
        progress: 1.0,
        whatHappens: 'Partikel mencapai r₂ dengan Δr = (5,0î - 2,0ĵ) m.',
        whyItMoves: 'Dengan Fy = +5,5 N, kerja vertikal tepat (-2,0)(5,5) = -11,0 J.',
        actingForces: 'Total kerja: 30,0 - 11,0 = 19,0 J.',
        motionChange: 'Sistem mencapai keseimbangan data antara sensor posisi dan energi.',
        physicsPrinciple: 'Fy = (30,0 - 19,0) / 2,0 = 5,5 N.',
        narration:
          'Tahap tiga. Dengan membagi minus sebelas Joule oleh perpindahan vertikal minus dua meter, kita dapatkan komponen F y sebesar lima koma lima Newton.',
      },
    ],
    hintOnWrong:
      'Hitung dulu Δx = 4,0 - (-1,0) dan Δy = 1,0 - 3,0. Masukkan ke persamaan 19,0 = 6,0·Δx + Fy·Δy, perhatikan tanda minus pada Δy!',
    relatedTheoryIds: ['B', 'C', 'G'],
    narrationPrompt:
      'Soal nomor tiga. Suatu partikel bergerak di bidang x y dari titik awal r satu sama dengan minus satu koma nol i topi ditambah tiga koma nol j topi meter menuju titik akhir r dua sama dengan empat koma nol i topi ditambah satu koma nol j topi meter akibat gaya konstan enam koma nol i topi ditambah F y j topi Newton. Jika usaha total sebesar sembilan belas koma nol Joule, tentukan nilai komponen F y dalam Newton.',
    solution: {
      known: [
        '$\\vec{r}_1 = (-1{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$',
        '$\\vec{r}_2 = (4{,}0\\hat{i} + 1{,}0\\hat{j})\\text{ m}$',
        '$\\vec{F} = (6{,}0\\hat{i} + F_y\\hat{j})\\text{ N}$',
        'Usaha total $W = 19{,}0\\text{ J}$',
      ],
      asked: 'Komponen gaya vertikal $F_y$ dalam Newton.',
      concepts: ['Vektor Perpindahan', 'Aljabar Dot Product'],
      physicalCondition: 'Partikel bergerak lurus efektif dengan perpindahan $\\Delta x > 0$ dan $\\Delta y < 0$.',
      diagramAnalysis:
        'Dari $(-1{,}0; 3{,}0)$ ke $(4{,}0; 1{,}0)$, partikel bergeser $5{,}0\\text{ m}$ ke kanan dan $2{,}0\\text{ m}$ ke bawah.',
      relevantLaws: ['$W = F_x\\Delta x + F_y\\Delta y$'],
      formulaReason:
        'Persamaan dot product menghubungkan langsung komponen gaya yang tidak diketahui dengan vektor perpindahan dan nilai usaha terukur.',
      derivationSteps: [
        {
          label: 'Hitung vektor perpindahan',
          latex: '\\Delta\\vec{r} = (4{,}0 - (-1{,}0))\\hat{i} + (1{,}0 - 3{,}0)\\hat{j} = (5{,}0\\hat{i} - 2{,}0\\hat{j})\\text{ m}',
          explanation: 'Hati-hati dengan pengurangan bilangan negatif: $4{,}0 - (-1{,}0) = +5{,}0\\text{ m}$.',
        },
        {
          label: 'Isolasi variabel $F_y$',
          latex: 'F_y = \\frac{W - F_x\\Delta x}{\\Delta y}',
          explanation: 'Pindahkan suku $F_x\\Delta x$ ke ruas kiri lalu bagi dengan $\\Delta y$.',
        },
      ],
      substitution: '$F_y = \\frac{19{,}0\\text{ J} - (6{,}0\\text{ N})(5{,}0\\text{ m})}{-2{,}0\\text{ m}}$',
      calculation: '$F_y = \\frac{19{,}0 - 30{,}0}{-2{,}0} = \\frac{-11{,}0}{-2{,}0} = 5{,}5\\text{ N}$',
      dimensionalCheck: '$\\frac{[\\text{J}]}{[\\text{m}]} = \\frac{\\text{N}\\cdot\\text{m}}{\\text{m}} = \\text{Newton}$ (Konsisten).',
      roundingStep: 'Hasil eksak $5{,}5$ sudah memiliki tepat satu angka di belakang koma.',
      conclusion: 'Besar komponen gaya $F_y$ adalah **5,5 N**.',
      commonMistake: 'Menghitung $\\Delta x = 4 - 1 = 3$ (lupa tanda minus pada $x_1 = -1$) atau melupakan tanda minus pada pembagi $\\Delta y = -2,0$.',
      narrationScript:
        'Pembahasan soal tiga. Perpindahan delta x adalah empat dikurangi minus satu sama dengan lima koma nol meter. Delta y adalah satu dikurangi tiga sama dengan minus dua koma nol meter. Substitusi ke W sama dengan F x delta x ditambah F y delta y memberikan sembilan belas sama dengan tiga puluh dikurangi dua F y. Jadi dua F y sama dengan sebelas, sehingga F y sama dengan lima koma lima Newton.',
    },
  },
  {
    id: 4,
    level: 'dasar',
    levelLabel: 'Tingkat 1 · Penguasaan Dasar',
    title: 'Hubungan Bentuk Geometris F·Δr cos θ dengan Koordinat xy',
    subtopic: 'Besar Vektor Perpindahan & Sudut Apit',
    relationToSource10:
      'Menjembatani soal koordinat posisi (r₁, r₂) pada Soal #10 dengan rumus sudut apit W = |F||Δr|cos θ.',
    prompt:
      'Sebuah balok kecil ditarik sepanjang lantai datar bidang $xy$ dari titik awal $\\vec{r}_1 = (0\\hat{i} + 0\\hat{j})\\text{ m}$ menuju titik akhir $\\vec{r}_2 = (4{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$. Gaya tarik konstan berbesar $|\\vec{F}| = 10{,}0\\text{ N}$ membentuk sudut $\\theta = 30^\\circ$ terhadap arah vektor perpindahan $\\Delta\\vec{r}$. (Gunakan $\\cos 30^\\circ = \\frac{1}{2}\\sqrt{3} \\approx 0{,}8660$). Usaha yang dilakukan oleh gaya tarik tersebut adalah ... Joule.',
    unit: 'Joule',
    exactAnswer: 25 * Math.sqrt(3), // 43.30127... -> 43,3
    expectedFormatted: '43,3',
    stimulusNarrative:
      'Balok digeser lurus menyilang lantai laboratorium dari titik asal menuju koordinat (4,0; 3,0) m oleh tali bersudut konstan 30 derajat terhadap arah gerak balok.',
    diagram: {
      xMin: -0.5,
      xMax: 5.5,
      yMin: -0.5,
      yMax: 4.5,
      r1: { x: 0, y: 0 },
      r2: { x: 4, y: 3 },
      pathType: 'linear',
      showDisplacementVector: true,
      showForceVector: true,
      primaryForce: { x: 2.8, y: 4.8 }, // schematic non-parallel force at ~30° above Δr (which is at 36.87°)
      primaryForceLabel: '|F| = 10,0 N (θ = 30°)',
      extraNotes: 'Sudut apit antara F dan Δr adalah θ = 30°',
    },
    requiresFbd: true,
    fbdObjectLabel: 'Balok pada bidang horizontal xy',
    fbdAccelerationDesc: 'Proyeksi F cos 30° sejajar Δr melakukan usaha; F sin 30° tegak lurus Δr tidak melakukan usaha.',
    fbdForces: [
      {
        id: 'f-pull',
        symbol: '\\vec{F}',
        name: 'Gaya Tarik Tali',
        fx: 4.33,
        fy: 7.5,
        color: '#059669',
        originReason: 'Tarikan tali eksternal dengan besar 10,0 N membentuk sudut 30° dari vektor perpindahan.',
        source: 'Tali penarik konstan',
        directionDesc: 'Membentuk sudut 30° terhadap arah Δr.',
        componentFormula: 'F_\\parallel = |\\vec{F}|\\cos 30^\\circ,\\quad F_\\perp = |\\vec{F}|\\sin 30^\\circ',
        equationRole: 'Hanya komponen F_parallel yang melakukan usaha sepanjang |Δr|.',
      },
    ],
    animationStages: [
      {
        stepNumber: 1,
        title: 'Menghitung Panjang Perpindahan |Δr|',
        progress: 0,
        whatHappens: 'Vektor perpindahan Δr = 4,0î + 3,0ĵ m membentuk segitiga siku-siku 3-4-5.',
        whyItMoves: 'Jarak lurus perpindahan balok adalah |Δr| = √(4² + 3²) = 5,0 m.',
        actingForces: 'Gaya tarik |F| = 10,0 N miring 30° dari lintasan.',
        motionChange: 'Komponen sejajar gaya bernilai 10,0 cos 30° ≈ 8,66 N.',
        physicsPrinciple: 'Besar vektor di bidang xy dihitung dengan Teorema Pythagoras.',
        narration:
          'Tahap satu. Dari koordinat nol koma nol ke empat koma nol, tiga koma nol, panjang vektor perpindahan delta r adalah akar empat kuadrat ditambah tiga kuadrat sama dengan lima koma nol meter.',
      },
      {
        stepNumber: 2,
        title: 'Dekomposisi Proyeksi Gaya F_parallel',
        progress: 0.5,
        whatHappens: 'Gaya F diproyeksikan menjadi F_parallel (sejajar gerak) dan F_perp (tegak lurus gerak).',
        whyItMoves: 'F_perp hanya menyimpangkan/menarik samping dan usahanya nol.',
        actingForces: 'F_parallel ≈ 8,660 N mendorong balok di sepanjang Δr.',
        motionChange: 'Usaha bertumbuh linear dengan jarak tempuh.',
        physicsPrinciple: 'W = F_parallel · |Δr| = |F||Δr|cos θ.',
        narration:
          'Tahap dua. Gaya tarik sepuluh Newton diuraikan terhadap arah gerak. Komponen tegak lurus melakukan nol kerja, sedangkan komponen sejajar sepuluh kosinus tiga puluh derajat melakukan kerja penuh.',
      },
      {
        stepNumber: 3,
        title: 'Pembulatan Hasil Akhir ke 1 Desimal',
        progress: 1.0,
        whatHappens: 'Balok mencapai (4,0; 3,0) m setelah menempuh 5,0 m.',
        whyItMoves: 'Hasil perkalian 10,0 × 5,0 × 0,866025... = 43,30127... J.',
        actingForces: 'Usaha efektif bernilai positif 43,3 J.',
        motionChange: 'Total energi yang masuk ke sistem adalah 43,3 Joule.',
        physicsPrinciple: 'Pembulatan 43,301... ke 1 angka di belakang koma menghasilkan 43,3 J.',
        narration:
          'Tahap tiga. Hasil perkalian lima puluh dikali setengah akar tiga adalah empat puluh tiga koma tiga nol satu Joule. Dibulatkan satu angka di belakang koma menjadi empat puluh tiga koma tiga Joule.',
      },
    ],
    hintOnWrong:
      'Cari terlebih dahulu panjang perpindahan |Δr| = √(Δx² + Δy²) dari (0,0) ke (4,0; 3,0), baru kalikan dengan |F| cos 30°.',
    relatedTheoryIds: ['C', 'D', 'H'],
    narrationPrompt:
      'Soal nomor empat. Sebuah balok ditarik di bidang x y dari titik nol koma nol ke empat koma nol, tiga koma nol meter oleh gaya tarik konstan berbesar sepuluh koma nol Newton dengan sudut apit tiga puluh derajat terhadap perpindahan. Hitung usahanya dalam Joule, bulatkan satu angka di belakang koma.',
    solution: {
      known: [
        '$\\vec{r}_1 = (0\\hat{i} + 0\\hat{j})\\text{ m}$ dan $\\vec{r}_2 = (4{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$',
        'Besar gaya $|\\vec{F}| = 10{,}0\\text{ N}$',
        'Sudut apit antara $\\vec{F}$ dan $\\Delta\\vec{r}$ adalah $\\theta = 30^\\circ$',
      ],
      asked: 'Usaha $W$ oleh gaya tarik dalam satuan Joule.',
      concepts: ['Magnitudo Vektor Perpindahan', 'Bentuk Geometris Dot Product'],
      physicalCondition: 'Gaya konstan menarik balok lurus di sepanjang lintasan bidang datar.',
      diagramAnalysis:
        'Vektor $\\Delta\\vec{r}$ memiliki komponen $(4{,}0; 3{,}0)\\text{ m}$ sehingga panjangnya membentuk tripel Pythagoras $5{,}0\\text{ m}$. Gaya membentuk sudut $30^\\circ$ dari garis perpindahan ini.',
      relevantLaws: ['$|\\Delta\\vec{r}| = \\sqrt{\\Delta x^2 + \\Delta y^2}$', '$W = |\\vec{F}|\\,|\\Delta\\vec{r}|\\cos\\theta$'],
      formulaReason:
        'Karena yang diketahui adalah besar gaya $|\\vec{F}|$ dan sudut apit $\\theta$ (bukan komponen $F_x, F_y$), kita memakai definisi geometris dot product.',
      derivationSteps: [
        {
          label: 'Menentukan besar vektor perpindahan',
          latex: '|\\Delta\\vec{r}| = \\sqrt{(4{,}0 - 0)^2 + (3{,}0 - 0)^2} = \\sqrt{16{,}0 + 9{,}0} = 5{,}0\\text{ m}',
          explanation: 'Panjang perpindahan adalah norma Euklidean dari $\\Delta\\vec{r}$.',
        },
        {
          label: 'Rumus usaha sudut apit',
          latex: 'W = |\\vec{F}|\\,|\\Delta\\vec{r}|\\cos\\theta',
          explanation: 'Mengambil komponen gaya yang sejajar dengan arah perpindahan.',
        },
      ],
      substitution: '$W = (10{,}0\\text{ N})(5{,}0\\text{ m})\\cos 30^\\circ = 50{,}0 \\times \\frac{\\sqrt{3}}{2}$',
      calculation: '$W = 25\\sqrt{3} \\approx 43{,}30127\\dots\\text{ J}$',
      dimensionalCheck: '$[\\text{N}][\\text{m}] \\times 1 = \\text{Joule}$ ($\\cos\\theta$ tak berdimensi).',
      roundingStep: 'Angka kedua di belakang koma adalah $0$ ($<5$), sehingga $43,301\\dots$ dibulatkan menjadi $43,3$.',
      conclusion: 'Usaha yang dilakukan gaya tarik adalah **43,3 Joule**.',
      commonMistake: 'Menggunakan $\\sin 30^\\circ$ alih-alih $\\cos 30^\\circ$, atau lupa mencari panjang $|\\Delta\\vec{r}| = 5,0\\text{ m}$ dan malah menjumlahkan $4+3=7\\text{ m}$.',
      narrationScript:
        'Pembahasan soal empat. Besar vektor perpindahan adalah akar empat kuadrat ditambah tiga kuadrat sama dengan lima koma nol meter. Lalu gunakan W sama dengan F kali delta r kali kosinus tiga puluh derajat, yaitu sepuluh dikali lima dikali setengah akar tiga, menghasilkan empat puluh tiga koma tiga nol satu Joule. Dibulatkan satu desimal menjadi empat puluh tiga koma tiga Joule.',
    },
  },
  {
    id: 5,
    level: 'dasar',
    levelLabel: 'Tingkat 1 · Penguasaan Dasar',
    title: 'Syarat Ortogonalitas dan Gaya Tanpa Usaha (W = 0)',
    subtopic: 'Kondisi Gaya Tegak Lurus Perpindahan',
    relationToSource10:
      'Menguji kasus batas kritis dari Soal #10: kapan dot product F · Δr = 0 di bidang xy meskipun F ≠ 0 dan Δr ≠ 0.',
    prompt:
      'Sebuah partikel bermuatan bergerak lurus pada bidang $xy$ dari titik $\\vec{r}_1 = (2{,}0\\hat{i} - 1{,}0\\hat{j})\\text{ m}$ ke titik $\\vec{r}_2 = (5{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$. Pada partikel bekerja gaya konstan $\\vec{F} = (8{,}0\\hat{i} + c\\hat{j})\\text{ N}$. Agar gaya $\\vec{F}$ tidak melakukan usaha sama sekali pada partikel ($W = 0$), nilai konstanta $c$ haruslah ... N.',
    unit: 'N',
    exactAnswer: -6.0,
    expectedFormatted: '-6,0',
    stimulusNarrative:
      'Dalam perancangan pemandu partikel, medan gaya diatur agar selalu tegak lurus dengan perpindahan partikel sehingga kelajuan partikel tetap terjaga konstan (tidak ada transfer energi).',
    diagram: {
      xMin: 0,
      xMax: 7,
      yMin: -3,
      yMax: 5,
      r1: { x: 2, y: -1 },
      r2: { x: 5, y: 3 },
      pathType: 'linear',
      showDisplacementVector: true,
      showForceVector: false,
      extraNotes: 'Syarat F ⊥ Δr berarti F · Δr = 0',
    },
    requiresFbd: true,
    fbdObjectLabel: 'Partikel bermuatan pada bidang xy',
    fbdAccelerationDesc: 'Ketika W = 0 pada gerak lurus ini, proyeksi gaya sepanjang lintasan nol.',
    fbdForces: [
      {
        id: 'f-ortho',
        symbol: '\\vec{F}',
        name: 'Gaya Pemandu Ortogonal',
        fx: 8,
        fy: -6,
        color: '#0D9488',
        originReason: 'Gaya medan eksternal yang dirancang agar tegak lurus terhadap vektor Δr.',
        source: 'Medan pemandu magnetik/listrik',
        directionDesc: 'Dengan Fx = +8,0 N dan Δr = (+3,0î + 4,0ĵ) m, maka Fy = c harus negatif agar F ⊥ Δr.',
        componentFormula: 'F_x = +8{,}0\\text{ N},\\quad F_y = c',
        equationRole: 'F_x Δx + F_y Δy = 0 memastikan tidak ada usaha neto.',
      },
    ],
    animationStages: [
      {
        stepNumber: 1,
        title: 'Menentukan Arah Perpindahan Δr',
        progress: 0,
        whatHappens: 'Partikel di r₁(2,0; -1,0) bersiap menuju r₂(5,0; 3,0).',
        whyItMoves: 'Perpindahan bersihnya adalah Δx = +3,0 m dan Δy = +4,0 m.',
        actingForces: 'Komponen gaya Fx = +8,0 N sudah pasti menyumbang usaha positif +24,0 J.',
        motionChange: 'Untuk menolkan usaha, komponen sumbu-y harus menyumbang -24,0 J.',
        physicsPrinciple: 'W = W_x + W_y = 0 berarti W_y = -W_x.',
        narration:
          'Tahap satu. Perpindahan partikel adalah tiga meter ke kanan dan empat meter ke atas. Karena komponen x gaya delapan Newton mendorong ke kanan, sumbu x menyumbang dua puluh empat Joule.',
      },
      {
        stepNumber: 2,
        title: 'Keseimbangan Kontribusi Sumbu-x dan Sumbu-y',
        progress: 0.5,
        whatHappens: 'Saat partikel bergerak naik ke kanan, komponen gaya negatif di y menahan ke bawah.',
        whyItMoves: 'Secara geometris, vektor F = (8î - 6ĵ) tegak lurus terhadap Δr = (3î + 4ĵ).',
        actingForces: 'Kerja sumbu x (+24,0 J) terus dinetralkan oleh kerja sumbu y (-24,0 J).',
        motionChange: 'Kelajuan partikel tetap konstan sepanjang lintasan karena usaha total nol.',
        physicsPrinciple: 'F ⊥ Δr ⇔ F · Δr = 0.',
        narration:
          'Tahap dua. Agar usaha total nol, gaya harus tegak lurus terhadap perpindahan. Kerja positif dari sumbu x tepat diimbangi kerja negatif dari sumbu y.',
      },
      {
        stepNumber: 3,
        title: 'Verifikasi Usaha Nol di Titik Akhir',
        progress: 1.0,
        whatHappens: 'Partikel tiba di (5,0; 3,0) m dengan total usaha tepat 0,0 J.',
        whyItMoves: '8,0(3,0) + (-6,0)(4,0) = 24,0 - 24,0 = 0.',
        actingForces: 'Nilai c = -6,0 N memenuhi kondisi ortogonalitas secara eksak.',
        motionChange: 'Tidak ada perubahan energi kinetik (ΔEk = 0).',
        physicsPrinciple: 'Dua vektor tak-nol saling tegak lurus jika dan hanya jika dot product-nya nol.',
        narration:
          'Tahap tiga. Dengan c sama dengan minus enam koma nol Newton, empat dikali minus enam menghasilkan minus dua puluh empat Joule, meniadakan dua puluh empat Joule dari sumbu x. Usaha total tepat nol.',
      },
    ],
    hintOnWrong:
      'Hitung Δx dan Δy terlebih dahulu dari r₂ - r₁, lalu gunakan syarat usaha nol: F_x·Δx + c·Δy = 0.',
    relatedTheoryIds: ['C', 'G', 'K'],
    narrationPrompt:
      'Soal nomor lima. Sebuah partikel bergerak lurus di bidang x y dari r satu sama dengan dua koma nol i topi dikurangi satu koma nol j topi meter ke r dua sama dengan lima koma nol i topi ditambah tiga koma nol j topi meter. Pada partikel bekerja gaya F sama dengan delapan koma nol i topi ditambah c j topi Newton. Agar gaya F tidak melakukan usaha sama sekali, tentukan nilai konstanta c.',
    solution: {
      known: [
        '$\\vec{r}_1 = (2{,}0\\hat{i} - 1{,}0\\hat{j})\\text{ m}$',
        '$\\vec{r}_2 = (5{,}0\\hat{i} + 3{,}0\\hat{j})\\text{ m}$',
        '$\\vec{F} = (8{,}0\\hat{i} + c\\hat{j})\\text{ N}$',
        'Syarat usaha nol: $W = 0\\text{ J}$',
      ],
      asked: 'Nilai komponen gaya $c$ dalam Newton.',
      concepts: ['Syarat Ortogonalitas Vektor', 'Usaha Nol'],
      physicalCondition: 'Gaya bukan nol bekerja pada partikel yang berpindah, tetapi tidak terjadi transfer energi.',
      diagramAnalysis:
        'Vektor perpindahan $\\Delta\\vec{r} = (3{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ m}$ berada di kuadran I. Agar $\\vec{F}$ tegak lurus terhadap $\\Delta\\vec{r}$ dengan $F_x > 0$, maka $\\vec{F}$ harus mengarah ke kuadran IV ($F_y = c < 0$).',
      relevantLaws: ['$\\vec{F}\\perp\\Delta\\vec{r} \\iff \\vec{F}\\cdot\\Delta\\vec{r} = 0$'],
      formulaReason:
        'Perkalian titik komponen secara langsung menyamakan jumlah kontribusi usaha sumbu-$x$ dan sumbu-$y$ menjadi nol.',
      derivationSteps: [
        {
          label: 'Menentukan vektor perpindahan',
          latex: '\\Delta\\vec{r} = (5{,}0 - 2{,}0)\\hat{i} + (3{,}0 - (-1{,}0))\\hat{j} = (3{,}0\\hat{i} + 4{,}0\\hat{j})\\text{ m}',
          explanation: 'Perhatikan $3{,}0 - (-1{,}0) = +4{,}0\\text{ m}$.',
        },
        {
          label: 'Menerapkan syarat usaha nol',
          latex: 'W = F_x\\Delta x + F_y\\Delta y = 0 \\implies 8{,}0(3{,}0) + c(4{,}0) = 0',
          explanation: 'Substitusikan nilai komponen yang diketahui.',
        },
      ],
      substitution: '$24{,}0 + 4{,}0\\,c = 0$',
      calculation: '$4{,}0\\,c = -24{,}0 \\implies c = -6{,}0\\text{ N}$',
      dimensionalCheck: '$\\frac{\\text{N}\\cdot\\text{m}}{\\text{m}} = \\text{Newton}$ (Konsisten).',
      roundingStep: 'Nilai tepat $-6$ ditulis dengan satu angka di belakang koma menjadi $-6,0$.',
      conclusion: 'Nilai konstanta $c$ agar usaha bernilai nol adalah **-6,0 N**.',
      commonMistake: 'Menghitung $\\Delta y = 3,0 - 1,0 = 2,0$ karena lupa bahwa $y_1 = -1,0$ bertanda negatif.',
      narrationScript:
        'Pembahasan soal lima. Perpindahan delta x adalah lima dikurangi dua sama dengan tiga meter, sedangkan delta y adalah tiga dikurangi minus satu sama dengan empat meter. Untuk usaha nol, delapan kali tiga ditambah c kali empat sama dengan nol, sehingga empat c sama dengan minus dua puluh empat, dan c sama dengan minus enam koma nol Newton.',
    },
  },
];
