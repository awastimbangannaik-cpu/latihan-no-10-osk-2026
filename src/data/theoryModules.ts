import type { TheoryModule } from '../types/physics';

export const THEORY_MODULES: TheoryModule[] = [
  {
    id: 'A',
    code: 'A',
    title: 'Pengenalan Fenomena Fisika: Usaha Vektor di Bidang xy',
    summary:
      'Memahami makna fisis dari transfer energi mekanik ketika sebuah partikel berpindah di bawah pengaruh gaya pada bidang dua dimensi.',
    sections: [
      {
        heading: 'Mengapa Usaha Menjadi Kunci pada Soal Nomor 10?',
        body: 'Bayangkan sebuah partikel kecil meluncur di atas meja licin bidang $xy$ dari koordinat $\\vec{r}_1$ menuju koordinat $\\vec{r}_2$. Selama bergerak, tangan atau medan gaya mendorong partikel dengan vektor gaya $\\vec{F}$ yang arahnya belum tentu sejajar dengan arah gerak partikel. Dalam Fisika, "seberapa efektif gaya tersebut mengubah energi gerak partikel" diukur melalui besaran Usaha (Kerja) $W$.',
      },
      {
        heading: 'Apa yang Terjadi Secara Fisis?',
        body: 'Hanya komponen gaya yang searah atau berlawanan dengan perpindahan partikel yang benar-benar menambah atau mengurangi laju partikel. Komponen gaya yang tegak lurus terhadap perpindahan hanya membelokkan arah lintasan tanpa melakukan kerja sedikit pun. Inilah inti fisik dari soal nomor 10 OSK Fisika 2026.',
        formulaLatex: 'W = \\vec{F} \\cdot \\Delta\\vec{r}',
        formulaLabel: 'Definisi Fundamental Usaha oleh Gaya Konstan',
      },
    ],
    visualType: 'phenomenon-xy',
    visualCaption:
      'Partikel berpindah dari r1 ke r2 di bidang xy. Hanya proyeksi gaya F pada arah perpindahan Δr yang menghasilkan usaha mekanik.',
    keyTakeaway:
      'Usaha adalah ukuran transfer energi oleh gaya sepanjang perpindahan vektor; arah gaya terhadap perpindahan menentukan tanda positif, nol, atau negatif.',
    narrationScript:
      'Selamat datang di modul pengenalan fenomena fisika bersama Mister Jo. Pada soal nomor 10 OSK Fisika, kita mempelajari bagaimana sebuah gaya vektor bekerja pada partikel yang berpindah di bidang x y. Ingat prinsip utamanya: hanya komponen gaya yang sejajar dengan vektor perpindahan yang menghasilkan usaha mekanik. Komponen gaya yang tegak lurus tidak menambah atau mengurangi energi kinetik partikel.',
  },
  {
    id: 'B',
    code: 'B',
    title: 'Pengetahuan Awal yang Wajib Dikuasai',
    summary:
      'Menguasai sistem koordinat Kartesius 2D, vektor satuan i topi dan j topi, serta penjumlahan dan pengurangan vektor komponen.',
    sections: [
      {
        heading: 'Representasi Vektor Posisi dan Perpindahan',
        body: 'Setiap titik pada bidang datar $xy$ ditentukan secara unik oleh vektor posisi $\\vec{r} = x\\hat{i} + y\\hat{j}$ yang berpangkal di titik asal $O(0,0)$. Jika partikel berpindah dari titik 1 ke titik 2, vektor perpindahannya selalu didefinisikan sebagai posisi akhir dikurangi posisi awal.',
        formulaLatex: '\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (x_2 - x_1)\\hat{i} + (y_2 - y_1)\\hat{j}',
        formulaLabel: 'Vektor Perpindahan di Bidang xy',
      },
      {
        heading: 'Sifat Ortogonal Vektor Satuan',
        body: 'Vektor satuan $\\hat{i}$ (sepanjang sumbu $+x$) dan $\\hat{j}$ (sepanjang sumbu $+y$) memiliki besar tepat 1 dan saling tegak lurus ($90^\\circ$). Sifat perkalian titiknya sangat sederhana: $\\hat{i}\\cdot\\hat{i} = 1$, $\\hat{j}\\cdot\\hat{j} = 1$, dan $\\hat{i}\\cdot\\hat{j} = 0$.',
      },
    ],
    visualType: 'prereq-vectors',
    visualCaption:
      'Aturan segitiga vektor menunjukkan bahwa Δr = r2 - r1 menghubungkan ujung r1 langsung ke ujung r2.',
    keyTakeaway:
      'Jangan pernah tertukar urutan pengurangan: perpindahan selalu r akhir dikurangi r awal (r2 - r1).',
    narrationScript:
      'Sebelum menghitung usaha, pastikan Anda menguasai aljabar vektor dasar. Vektor perpindahan delta r selalu dihitung dari vektor posisi akhir r dua dikurangi vektor posisi awal r satu. Karena vektor satuan i topi dan j topi saling tegak lurus, perkalian titik keduanya bernilai nol, sedangkan i topi dot i topi dan j topi dot j topi bernilai satu.',
  },
  {
    id: 'C',
    code: 'C',
    title: 'Definisi dan Pengertian Konsep Utama',
    summary:
      'Definisi formal usaha sebagai perkalian skalar (dot product) vektor gaya dan vektor perpindahan beserta kasus positif, nol, dan negatif.',
    sections: [
      {
        heading: 'Perkalian Titik (Dot Product) Dua Vektor',
        body: 'Meskipun gaya $\\vec{F}$ dan perpindahan $\\Delta\\vec{r}$ adalah besaran vektor yang memiliki arah, hasil perkalian titik keduanya menghasilkan besaran **skalar** (hanya memiliki nilai dan tanda aljabar, tanpa arah). Secara geometris dan aljabar:',
        formulaLatex: 'W = \\vec{F}\\cdot\\Delta\\vec{r} = |\\vec{F}|\\,|\\Delta\\vec{r}|\\cos\\theta = F_x\\Delta x + F_y\\Delta y',
        formulaLabel: 'Bentuk Geometris dan Komponen Usaha',
      },
      {
        heading: 'Makna Tanda Aljabar Usaha',
        body: 'Usaha bernilai **positif** ($W > 0$) jika $0^\\circ \\le \\theta < 90^\\circ$ (gaya membantu gerak dan cenderung menambah energi kinetik). Usaha bernilai **nol** ($W = 0$) jika $\\theta = 90^\\circ$ atau $\\Delta\\vec{r} = 0$. Usaha bernilai **negatif** ($W < 0$) jika $90^\\circ < \\theta \\le 180^\\circ$ (gaya menghambat gerak dan menyerap energi kinetik).',
      },
    ],
    visualType: 'dot-product-def',
    visualCaption:
      'Perbandingan tiga rezim sudut apit θ: usaha positif (lancip), usaha nol (tegak lurus), dan usaha negatif (tumpul).',
    keyTakeaway:
      'Tanda negatif pada usaha (seperti -17,0 J pada soal sumber) bukan berarti arah ke kiri, melainkan gaya mengurangi energi mekanik/kinetik partikel.',
    narrationScript:
      'Secara formal, usaha didefinisikan sebagai perkalian titik antara vektor gaya dan vektor perpindahan. Hasilnya adalah besaran skalar. Jika sudut apit antara gaya dan perpindahan lancip, usahanya positif. Jika tegak lurus, usahanya nol. Jika tumpul, usahanya negatif karena gaya melawan komponen perpindahan.',
  },
  {
    id: 'D',
    code: 'D',
    title: 'Besaran, Satuan, dan Dimensi',
    summary:
      'Analisis satuan SI (Joule, Newton, meter) serta pemeriksaan konsistensi dimensi untuk memvalidasi setiap rumus energi.',
    sections: [
      {
        heading: 'Konsistensi Satuan SI dan Dimensi',
        body: 'Dalam Sistem Internasional (SI), gaya diukur dalam Newton ($\\text{N} = \\text{kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$) dan perpindahan dalam meter ($\\text{m}$). Hasil perkaliannya adalah $\\text{N}\\cdot\\text{m}$, yang diberi nama khusus **Joule (J)**.',
        formulaLatex: '[W] = [F][\\Delta r] = (\\text{M}\\text{L}\\text{T}^{-2})(\\text{L}) = \\text{M}\\text{L}^2\\text{T}^{-2}',
        formulaLabel: 'Dimensi Usaha dan Energi',
      },
      {
        heading: 'Perbedaan Penting: Joule vs Newton-meter pada Torka',
        body: 'Secara dimensional, usaha ($W = \\vec{F}\\cdot\\Delta\\vec{r}$) dan torka ($\\vec{\\tau} = \\vec{r}\\times\\vec{F}$) sama-sama memiliki dimensi $\\text{M}\\text{L}^2\\text{T}^{-2}$. Namun usaha adalah skalar yang menggunakan satuan **Joule**, sedangkan torka adalah vektor aksial yang dinyatakan dalam $\\text{N}\\cdot\\text{m}$.',
      },
    ],
    visualType: 'units-dimensions',
    visualCaption:
      'Pohon dimensi menunjukkan kesetaraan dimensi antara Usaha (F·Δr), Energi Kinetik (½mv²), dan Energi Potensial (mgh).',
    keyTakeaway:
      'Selalu pastikan semua posisi dalam meter (m) dan gaya dalam Newton (N) sebelum mengalikan komponen.',
    narrationScript:
      'Pemeriksaan dimensi adalah senjata wajib peserta olimpiade. Gaya berdimensi M L T pangkat minus dua, dikalikan perpindahan berdimensi L, menghasilkan dimensi usaha M L kuadrat T pangkat minus dua, dengan satuan Joule.',
  },
  {
    id: 'E',
    code: 'E',
    title: 'Hukum dan Prinsip Fisika yang Relevan',
    summary:
      'Prinsip superposisi usaha, sifat konservatif gaya konstan, dan Teorema Usaha-Energi Kinetik.',
    sections: [
      {
        heading: 'Teorema Usaha–Energi Kinetik',
        body: 'Usaha total yang dilakukan oleh seluruh gaya (resultan gaya) yang bekerja pada sebuah partikel sama dengan perubahan energi kinetik partikel tersebut. Prinsip ini menghubungkan informasi vektor posisi dan gaya langsung ke kelajuan partikel.',
        formulaLatex: 'W_{\\text{total}} = \\sum W_i = \\vec{F}_{\\text{res}}\\cdot\\Delta\\vec{r} = \\Delta E_k = \\frac{1}{2}m(v_2^2 - v_1^2)',
        formulaLabel: 'Teorema Usaha–Energi Kinetik',
      },
      {
        heading: 'Sifat Konservatif Gaya Konstan dan Kebebasan Lintasan',
        body: 'Setiap gaya vektor konstan $\\vec{F} = F_x\\hat{i} + F_y\\hat{j}$ (di mana $F_x$ dan $F_y$ tetap sepanjang waktu dan ruang) bersifat **konservatif**. Artinya, usaha dari titik 1 ke titik 2 sama sekali **tidak bergantung pada bentuk lintasan** (lurus, melengkung, parabola, ataupun berzig-zag), melainkan hanya bergantung pada titik awal dan titik akhir.',
      },
    ],
    visualType: 'laws-conservation',
    visualCaption:
      'Tiga lintasan berbeda (lurus, parabola, dan tangga) dari titik 1 ke titik 2 menghasilkan usaha yang identik untuk gaya konstan.',
    keyTakeaway:
      'Untuk gaya konstan, Anda boleh mengabaikan bentuk lintasan yang rumit dan cukup menghitung vektor perpindahan lurus Δr = r2 - r1.',
    narrationScript:
      'Dua hukum utama yang langsung terhubung dengan soal nomor 10 adalah Teorema Usaha-Energi Kinetik dan sifat kebebasan lintasan. Selama vektor gaya bersifat konstan, usaha hanya bergantung pada titik awal dan titik akhir, tidak peduli apakah partikel menempuh garis lurus atau lintasan melengkung.',
  },
  {
    id: 'F',
    code: 'F',
    title: 'Penurunan Persamaan Matematis Secara Bertahap',
    summary:
      'Menurunkan W = Fx Δx + Fy Δy dari definisi umum integral garis usaha dalam kalkulus vektor.',
    sections: [
      {
        heading: 'Dari Elemen Perpindahan Diferensial ke Gaya Konstan',
        body: 'Secara umum, untuk gaya sembarang $\\vec{F}(x,y)$ sepanjang lintasan lengkung $C$ dari titik 1 ke titik 2, elemen usaha didefinisikan sebagai $dW = \\vec{F}\\cdot d\\vec{r}$, dengan $d\\vec{r} = dx\\,\\hat{i} + dy\\,\\hat{j}$.',
        formulaLatex: 'W = \\int_{\\vec{r}_1}^{\\vec{r}_2} \\vec{F}\\cdot d\\vec{r} = \\int_{x_1}^{x_2} F_x\\,dx + \\int_{y_1}^{y_2} F_y\\,dy',
        formulaLabel: 'Persamaan Umum Integral Garis Usaha',
      },
      {
        heading: 'Reduksi ke Kasus Gaya Konstan (Soal #10)',
        body: 'Jika $F_x$ dan $F_y$ konstan, keduanya dapat dikeluarkan dari tanda integral sehingga diperoleh rumus aljabar sederhana:',
        formulaLatex: 'W = F_x\\int_{x_1}^{x_2} dx + F_y\\int_{y_1}^{y_2} dy = F_x(x_2 - x_1) + F_y(y_2 - y_1) = \\vec{F}\\cdot\\Delta\\vec{r}',
        formulaLabel: 'Bukti Matematis Rumus Soal Nomor 10',
      },
    ],
    visualType: 'derivation-integral',
    visualCaption:
      'Penjumlahan elemen kerja kecil dW = F · dr di sepanjang kurva tereduksi menjadi F · Δr ketika F konstan.',
    keyTakeaway:
      'Rumus dot product komponen adalah bentuk terintegrasi dari integral garis untuk gaya yang konstan.',
    narrationScript:
      'Mari kita turunkan rumusnya secara bertahap. Secara umum, usaha adalah integral garis dari F dot d r. Karena elemen d r sama dengan d x i topi ditambah d y j topi, maka ketika komponen F x dan F y bernilai konstan, keduanya keluar dari integral, menyisakan F x kali delta x ditambah F y kali delta y.',
  },
  {
    id: 'G',
    code: 'G',
    title: 'Makna Fisis Setiap Variabel dalam Persamaan',
    summary:
      'Membedah peran fisis x1, y1, x2, y2, Fx, Fy, dan sudut apit θ dalam analisis mekanika.',
    sections: [
      {
        heading: 'Arti Tiap Simbol di Bidang xy',
        body: 'Dalam persamaan $W = F_x(x_2 - x_1) + F_y(y_2 - y_1)$: suku $F_x(x_2 - x_1)$ adalah **kontribusi energi** akibat gerak searah sumbu-$x$, sedangkan $F_y(y_2 - y_1)$ adalah **kontribusi energi** akibat gerak searah sumbu-$y$.',
        formulaLatex: 'W = \\underbrace{F_x \\Delta x}_{W_x} + \\underbrace{F_y \\Delta y}_{W_y}',
        formulaLabel: 'Dekomposisi Usaha per Sumbu Koordinat',
      },
      {
        heading: 'Proyeksi Gaya Sejajar dan Tegak Lurus',
        body: 'Kita juga dapat menguraikan $\\vec{F} = \\vec{F}_\\parallel + \\vec{F}_\\perp$ relatif terhadap arah $\\Delta\\vec{r}$. Besarnya $F_\\parallel = \\vec{F}\\cdot\\hat{u}_{\\Delta r}$ mengubah kelajuan partikel, sedangkan $F_\\perp$ hanya mengubah kelengkungan lintasan.',
      },
    ],
    visualType: 'variables-projection',
    visualCaption:
      'Proyeksi orthogonal gaya F pada vektor perpindahan Δr menghasilkan komponen efektif F_parallel.',
    keyTakeaway:
      'Meskipun satu komponen sumbu menyumbang usaha positif (misalnya W_x > 0), komponen sumbu lain dapat menyumbang negatif lebih besar sehingga usaha totalnya negatif.',
    narrationScript:
      'Perhatikan makna fisis setiap suku. Suku F x dikali delta x adalah kontribusi usaha pada arah horizontal, sementara F y dikali delta y adalah kontribusi usaha pada arah vertikal. Pada soal nomor 10 asli, kontribusi sumbu x positif tiga Joule, namun kontribusi sumbu y negatif dua puluh Joule, sehingga hasil akhirnya negatif tujuh belas Joule.',
  },
  {
    id: 'H',
    code: 'H',
    title: 'Hubungan Antarbesaran dan Interpretasi Matematis',
    summary:
      'Membaca grafik hubungan F_x terhadap x, grafik W terhadap sudut θ, dan hubungan W terhadap energi kinetik.',
    sections: [
      {
        heading: 'Interpretasi Luas di Bawah Kurva Gaya vs Posisi',
        body: 'Dalam grafik $F_x$ terhadap $x$ dan $F_y$ terhadap $y$, usaha merupakan **luas daerah bertanda** di bawah kurva. Jika lintasan mundur ($x_2 < x_1$ atau $y_2 < y_1$) sementara gaya bernilai positif, luas bertanda tersebut bernilai negatif.',
        formulaLatex: 'W(\\theta) = F\\,\\Delta r\\,\\cos\\theta',
        formulaLabel: 'Ketergantungan Kosinus terhadap Sudut Apit',
      },
      {
        heading: 'Analisis Maksimum dan Minimum Usaha',
        body: 'Untuk besar $|\\vec{F}|$ dan $|\\Delta\\vec{r}|$ tetap, usaha mencapai nilai maksimum $+F\\Delta r$ saat $\\theta = 0^\\circ$, bernilai nol saat $\\theta = 90^\\circ$, dan mencapai nilai minimum $-F\\Delta r$ saat $\\theta = 180^\\circ$.',
      },
    ],
    visualType: 'graph-angle-work',
    visualCaption:
      'Kurva W(θ) = F Δr cos(θ) menunjukkan transisi halus dari kerja maksimum positif, titik nol di 90°, hingga minimum negatif di 180°.',
    keyTakeaway:
      'Memahami bentuk fungsi cosinus dan luas bertanda membantu menyelesaikan variasi soal grafik maupun optimasi sudut.',
    narrationScript:
      'Secara matematis, hubungan usaha terhadap sudut apit teta mengikuti kurva kosinus. Pada sudut nol derajat usaha mencapai puncak maksimum, tepat pada sembilan puluh derajat nilainya memotong sumbu nol, dan pada seratus delapan puluh derajat mencapai nilai paling negatif.',
  },
  {
    id: 'I',
    code: 'I',
    title: 'Contoh Penerapan dalam Fenomena Nyata',
    summary:
      'Aplikasi analisis usaha vektor 2D pada navigasi drone terkena angin, satelit/probe, dan gerak benda di bidang miring.',
    sections: [
      {
        heading: 'Navigasi Drone dalam Medan Angin Konstan',
        body: 'Sebuah drone survei terbang dari titik koordinat $A$ ke titik $B$ di udara sambil diterpa angin konstan $\\vec{F}_{\\text{angin}}$. Energi tambahan atau beban hambatan yang diterima drone akibat angin sepanjang penerbangan langsung dihitung dari $\\vec{F}_{\\text{angin}}\\cdot(\\vec{r}_B - \\vec{r}_A)$, tanpa perlu melacak setiap belokan drone.',
      },
      {
        heading: 'Gerak Balok di Bidang Miring & Medan Gravitasi',
        body: 'Dalam koordinat $(x,y)$ vertikal, gaya gravitasi $\\vec{W}_g = -mg\\hat{j}$ melakukan usaha $W_g = (-mg)(y_2 - y_1) = -mg\\Delta y$, membuktikan mengapa usaha gravitasi hanya bergantung pada perubahan ketinggian.',
      },
    ],
    visualType: 'real-application',
    visualCaption:
      'Penerapan dot product vektor pada lintasan drone menembus angin samping dan gerak pada bidang miring.',
    keyTakeaway:
      'Konsep vektor usaha bukan sekadar hitungan abstrak, melainkan cara tercepat menghitung pertukaran energi di dunia nyata 2D dan 3D.',
    narrationScript:
      'Dalam kehidupan nyata, konsep soal nomor 10 digunakan untuk menghitung kerja angin pada penerbangan drone, dorongan mesin kapal terhadap arus laut, hingga membuktikan mengapa kerja gravitasi di bidang miring hanya bergantung pada selisih ketinggian.',
  },
  {
    id: 'J',
    code: 'J',
    title: 'Strategi Penyelesaian Soal Olimpiade',
    summary:
      'Protokol sistematis 5 langkah agar cepat, akurat, dan bebas kesalahan tanda saat menghadapi variasi OSK.',
    sections: [
      {
        heading: 'Protokol 5 Langkah Mister Jo',
        body: '1) Identifikasi apakah gaya **konstan**, **bergantung posisi**, atau **selalu berlawanan gerak** (seperti gesekan kinetik). 2) Tuliskan vektor posisi $\\vec{r}_1$ dan $\\vec{r}_2$ dengan teliti beserta tandanya. 3) Hitung $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$. 4) Pilih metode tercepat: dot product komponen untuk gaya konstan, panjang lintasan untuk gesekan, atau integral/potensial untuk gaya berubah. 5) Cek ulang tanda positif/negatif dan bulatkan satu angka di belakang koma dengan koma.',
        formulaLatex: '\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 \\implies W = F_x\\Delta x + F_y\\Delta y',
        formulaLabel: 'Alur Eksekusi Cepat OSK',
      },
    ],
    visualType: 'olympiad-strategy',
    visualCaption:
      'Pohon keputusan strategi memilih metode antara gaya konstan, gaya non-konservatif gesek, atau integral garis.',
    keyTakeaway:
      'Selalu klasifikasikan sifat gaya terlebih dahulu sebelum memilih rumus: apakah gaya konstan, konservatif, atau bergantung lintasan?',
    narrationScript:
      'Saat menghadapi soal olimpiade, terapkan protokol lima langkah Mister Jo. Pertama, klasifikasikan sifat gayanya. Kedua, tulis koordinat awal dan akhir dengan teliti. Ketiga, hitung delta r sama dengan r dua dikurangi r satu. Keempat, eksekusi perkalian titik atau integral. Kelima, periksa tanda aljabar dan pembulatan satu angka di belakang koma.',
  },
  {
    id: 'K',
    code: 'K',
    title: 'Kesalahan Umum dan Miskonsepsi Siswa',
    summary:
      'Mengenali 4 jebakan klasik yang sering membuat peserta OSK kehilangan poin pada soal vektor usaha.',
    sections: [
      {
        heading: 'Empat Jebakan Klasik yang Wajib Dihindari',
        body: '1) **Terbalik menghitung perpindahan**: Menghitung $\\vec{r}_1 - \\vec{r}_2$ sehingga tanda usaha terbalik! 2) **Mengalikan besar vektor tanpa $\\cos\\theta$**: Menghitung $|\\vec{F}|\\cdot|\\Delta\\vec{r}|$ padahal arahnya tidak sejajar. 3) **Menjumlahkan komponen silang**: Salah mengalikan $F_x$ dengan $\\Delta y$ atau mengira usaha masih berbentuk vektor $(W_x\\hat{i} + W_y\\hat{j})$. 4) **Menyamakan gesekan dengan gaya konstan**: Untuk gesekan kinetik pada lintasan berbelok atau melengkung, arah gesekan berubah mengikuti lintasan sehingga harus memakai panjang lintasan $s$, bukan $|\\Delta\\vec{r}|$.',
        formulaLatex: 'W_{\\text{salah}} \\neq (F_x\\Delta x)\\hat{i} + (F_y\\Delta y)\\hat{j} \\quad (\\text{Usaha adalah skalar!})',
        formulaLabel: 'Peringatan Miskonsepsi Utama',
      },
    ],
    visualType: 'misconceptions',
    visualCaption:
      'Perbandingan langsung perhitungan yang keliru (terbalik r1 - r2 atau memakai |F||Δr|) melawan analisis vektor yang tepat.',
    keyTakeaway:
      'Usaha adalah skalar: komponen x dan y dijumlahkan menjadi satu angka tunggal, bukan dipisahkan sebagai vektor.',
    narrationScript:
      'Waspadai empat kesalahan paling sering terjadi. Pertama, terbalik menghitung r satu dikurangi r dua. Kedua, lupa mengalikan kosinus sudut apit. Ketiga, menulis usaha sebagai vektor bertopi i dan topi j, padahal usaha adalah skalar. Keempat, menyamakan jarak tempuh gaya gesek dengan besar perpindahan lurus.',
  },
  {
    id: 'L',
    code: 'L',
    title: 'Hubungan Konsep Utama dengan Konsep Pendukung',
    summary:
      'Menghubungkan usaha vektor 2D dengan kinematika parametrik, dinamika Hukum II Newton, pegas, dan medan konservatif.',
    sections: [
      {
        heading: 'Jaringan Konsep Tingkat Olimpiade',
        body: 'Konsep usaha vektor $\\vec{F}\\cdot\\Delta\\vec{r}$ terhubung erat dengan empat pilar fisika lainnya: (1) **Kinematika**: $\\vec{v}(t) = d\\vec{r}/dt$ memungkinkan kita menghitung usaha melalui daya sesaat $W = \\int \\vec{F}\\cdot\\vec{v}\\,dt$. (2) **Dinamika**: melalui FBD, usaha total adalah jumlah usaha setiap gaya nyata. (3) **Energi Potensial**: untuk gaya konservatif 2D seperti pegas atau medan eksak $\\partial F_x/\\partial y = \\partial F_y/\\partial x$, berlaku $W = -\\Delta U$.',
        formulaLatex: 'W_{\\text{total}} = \\int_{t_1}^{t_2} \\vec{F}_{\\text{res}}\\cdot\\vec{v}\\,dt = \\Delta\\left(\\frac{1}{2}mv^2\\right)',
        formulaLabel: 'Penyatuan Kinematika, Dinamika, dan Energi',
      },
    ],
    visualType: 'concept-links',
    visualCaption:
      'Integrasi antara Vektor Posisi, Free Body Diagram, Integral Garis, dan Teorema Usaha-Energi Kinetik.',
    keyTakeaway:
      'Menguasai soal nomor 10 secara mendalam membuka kunci untuk menaklukkan soal dinamika, kinematika, dan energi potensial olimpiade.',
    narrationScript:
      'Pada bagian akhir modul ini, lihat bagaimana usaha vektor menyatukan seluruh cabang mekanika. Dari kinematika kita memperoleh kecepatan dan lintasan, dari dinamika dan diagram benda bebas kita memetakan gaya nyata, dan dari teorema usaha energi kita mengekstrak kecepatan maupun energi tanpa harus memecahkan persamaan gerak yang rumit.',
  },
];
