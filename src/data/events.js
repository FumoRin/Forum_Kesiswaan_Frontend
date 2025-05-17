// Static events data based on the database dump
const events = [
  {
    id: 1,
    title: "Lomba Kebersihan Antar Sekolah",
    school: "SMK Negeri 1 Cimahi",
    event: "Lomba",
    date: "2024-08-15T00:00:00.000Z",
    content:
      '<h2>Kegiatan Lomba Kebersihan</h2><p>Kegiatan lomba kebersihan ini bertujuan untuk meningkatkan kesadaran para siswa akan pentingnya kebersihan lingkungan sekolah. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl risus, sodales eu sem vel, fermentum suscipit justo. Nam ut ex ut orci placerat ultrices non vel quam. Aenean ac nisi vitae felis eleifend lobortis. Donec convallis fermentum arcu, eu maximus ex facilisis quis. Vivamus vitae dui ut ex convallis aliquam ultricies sit amet dui. Vivamus sed laoreet diam, non auctor arcu. Sed sodales quam id semper tincidunt. Phasellus lobortis porta faucibus. Vestibulum eu mauris urna.</p><p>Lomba ini melibatkan seluruh jurusan di sekolah dengan kriteria penilaian meliputi:</p><ul><li><p>Kebersihan</p></li><li><p>Kerapihan</p></li><li><p>Kreativitas dalam mendekorasi ruang belajar</p></li><li><p>Kebersihan kamar mandi</p></li></ul><p>Pemenang akan diumumkan pada akhir lomba dan diberikan penghargaan berupa piala untuk juara 1, 2, dan 3.</p><img src="https://picsum.photos/id/1018/800/600" alt="Dokumentasi Lomba">',
    thumbnail: "https://picsum.photos/id/1018/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1018/800/600",
        thumbnail: "https://picsum.photos/id/1018/200/150",
      },
      {
        original: "https://picsum.photos/id/1025/800/600",
        thumbnail: "https://picsum.photos/id/1025/200/150",
      },
    ],
    status: "published",
    created_at: "2025-05-02T02:45:00.000Z",
    updated_at: "2025-05-10T01:43:04.000Z",
  },
  {
    id: 21,
    title: "Lomba Debat Bahasa Inggris",
    school: "SMKN 1 CIMAHI",
    event: "Lomba",
    date: "2025-05-06T00:00:00.000Z",
    content:
      "<p><strong><em><u>Lomba Debat Tingkat Kota</u></em></strong></p><p>Lomba debat bahasa Inggris antar sekolah di Kota Cimahi akan diadakan untuk meningkatkan kemampuan komunikasi dan berpikir kritis para siswa. Acara ini merupakan bagian dari program tahunan Dinas Pendidikan Kota Cimahi.</p><h3>Ketentuan Lomba:</h3><ul><li>Tim terdiri dari 3 orang siswa</li><li>Tema debat akan diumumkan 15 menit sebelum sesi dimulai</li><li>Waktu presentasi maksimal 5 menit per pembicara</li></ul><p>Pendaftaran dapat dilakukan melalui website resmi atau menghubungi panitia pelaksana.</p>",
    thumbnail: "https://picsum.photos/id/1023/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1023/800/600",
        thumbnail: "https://picsum.photos/id/1023/200/150",
      },
      {
        original: "https://picsum.photos/id/1024/800/600",
        thumbnail: "https://picsum.photos/id/1024/200/150",
      },
    ],
    status: "published",
    created_at: "2025-05-01T10:15:00.000Z",
    updated_at: "2025-05-01T10:15:00.000Z",
  },
  {
    id: 22,
    title: "Workshop Fotografi Digital",
    school: "SMKN 2 Cimahi",
    event: "Workshop",
    date: "2025-06-12T00:00:00.000Z",
    content:
      "<h2>Workshop Fotografi Digital</h2><p>SMKN 2 Cimahi dengan bangga mempersembahkan workshop fotografi digital untuk siswa-siswi se-Kota Cimahi. Workshop ini akan membahas teknik-teknik dasar fotografi, penggunaan kamera DSLR, dan editing foto menggunakan Adobe Lightroom dan Photoshop.</p><p>Pembicara dalam workshop ini adalah fotografer profesional Bapak Rendy Purnama yang telah berpengalaman lebih dari 10 tahun di bidang fotografi komersial.</p><h3>Materi Workshop:</h3><ol><li>Pengenalan kamera dan komposisi</li><li>Teknik pencahayaan</li><li>Pengambilan foto portrait dan landscape</li><li>Editing foto digital</li></ol><p>Peserta akan mendapatkan sertifikat resmi dan kesempatan untuk memamerkan karya terbaik mereka di pameran sekolah.</p>",
    thumbnail: "https://picsum.photos/id/1025/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1025/800/600",
        thumbnail: "https://picsum.photos/id/1025/200/150",
      },
      {
        original: "https://picsum.photos/id/1026/800/600",
        thumbnail: "https://picsum.photos/id/1026/200/150",
      },
    ],
    status: "published",
    created_at: "2025-05-02T14:30:00.000Z",
    updated_at: "2025-05-02T14:30:00.000Z",
  },
  {
    id: 23,
    title: "Festival Seni dan Budaya",
    school: "SMA Negeri 3 Cimahi",
    event: "Festival",
    date: "2025-07-20T00:00:00.000Z",
    content:
      '<h2>Festival Seni dan Budaya Tradisional</h2><p>SMA Negeri 3 Cimahi menyelenggarakan Festival Seni dan Budaya Tradisional yang akan menampilkan berbagai bentuk kesenian daerah dari seluruh Indonesia. Acara ini bertujuan untuk melestarikan dan mengenalkan kembali nilai-nilai budaya tradisional kepada generasi muda.</p><h3>Rangkaian Acara:</h3><ul><li>Pameran kerajinan tangan tradisional</li><li>Pertunjukan tari daerah</li><li>Workshop pembuatan batik</li><li>Lomba kuliner tradisional</li><li>Penampilan musik etnik</li></ul><p>Festival ini terbuka untuk umum dan akan berlangsung selama tiga hari di lingkungan SMA Negeri 3 Cimahi. Pengunjung diharapkan dapat merasakan pengalaman budaya yang autentik dan mendapatkan wawasan baru tentang kekayaan budaya Indonesia.</p><p>Untuk informasi lebih lanjut, silakan hubungi panitia pelaksana melalui email: festival@sman3cimahi.sch.id</p><img src="https://picsum.photos/id/1036/800/600" alt="Dokumentasi Festival">',
    thumbnail: "https://picsum.photos/id/1036/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1036/800/600",
        thumbnail: "https://picsum.photos/id/1036/200/150",
      },
      {
        original: "https://picsum.photos/id/1037/800/600",
        thumbnail: "https://picsum.photos/id/1037/200/150",
      },
      {
        original: "https://picsum.photos/id/1040/800/600",
        thumbnail: "https://picsum.photos/id/1040/200/150",
      },
    ],
    status: "published",
    created_at: "2025-06-01T08:15:00.000Z",
    updated_at: "2025-06-05T11:20:00.000Z",
  },
  {
    id: 24,
    title: "Kompetisi Robotika Nasional",
    school: "SMK Negeri 2 Cimahi",
    event: "Kompetisi",
    date: "2025-08-05T00:00:00.000Z",
    content:
      "<h2>Kompetisi Robotika Tingkat Nasional</h2><p>SMK Negeri 2 Cimahi akan menjadi tuan rumah Kompetisi Robotika Nasional yang akan diikuti oleh ratusan tim dari seluruh Indonesia. Acara ini merupakan ajang bergengsi bagi para pelajar untuk menunjukkan kemampuan mereka dalam bidang teknologi dan robotika.</p><h3>Kategori Lomba:</h3><ul><li>Robot Line Follower</li><li>Robot Soccer</li><li>Drone Racing</li><li>Autonomous Robot Challenge</li></ul><p>Pendaftaran dibuka untuk siswa SMA/SMK di seluruh Indonesia dengan batas maksimal 3 tim per sekolah. Tim pemenang akan mewakili Indonesia pada kompetisi robotika internasional di Singapura.</p>",
    thumbnail: "https://picsum.photos/id/1033/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1033/800/600",
        thumbnail: "https://picsum.photos/id/1033/200/150",
      },
      {
        original: "https://picsum.photos/id/1035/800/600",
        thumbnail: "https://picsum.photos/id/1035/200/150",
      },
    ],
    status: "published",
    created_at: "2025-06-10T09:45:00.000Z",
    updated_at: "2025-06-12T14:30:00.000Z",
  },
  {
    id: 25,
    title: "Seminar Kesehatan Mental Remaja",
    school: "SMA Negeri 4 Cimahi",
    event: "Seminar",
    date: "2025-09-22T00:00:00.000Z",
    content:
      '<h2>Seminar Kesehatan Mental Remaja di Era Digital</h2><p>SMA Negeri 4 Cimahi mengadakan seminar tentang kesehatan mental remaja dengan tema "Menjaga Keseimbangan Mental di Era Digital". Seminar ini menghadirkan psikolog anak dan remaja serta pakar media sosial untuk membahas dampak teknologi terhadap kesehatan mental pelajar.</p><h3>Topik Pembahasan:</h3><ol><li>Pengaruh media sosial terhadap self-esteem remaja</li><li>Strategi mengatasi cyberbullying</li><li>Manajemen stres akademik</li><li>Digital wellbeing dan screen time management</li></ol><p>Seminar akan dilaksanakan secara hybrid (offline dan online) dan terbuka untuk umum. Peserta offline akan mendapatkan sertifikat dan merchandise eksklusif.</p>',
    thumbnail: "https://picsum.photos/id/1042/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1042/800/600",
        thumbnail: "https://picsum.photos/id/1042/200/150",
      },
      {
        original: "https://picsum.photos/id/1045/800/600",
        thumbnail: "https://picsum.photos/id/1045/200/150",
      },
    ],
    status: "published",
    created_at: "2025-08-15T11:20:00.000Z",
    updated_at: "2025-08-20T13:45:00.000Z",
  },
  {
    id: 26,
    title: "Pelatihan Leadership dan Organisasi",
    school: "SMA Negeri 1 Cimahi",
    event: "Pelatihan",
    date: "2025-10-18T00:00:00.000Z",
    content:
      "<h2>Pelatihan Kepemimpinan dan Manajemen Organisasi</h2><p>OSIS SMA Negeri 1 Cimahi menyelenggarakan pelatihan kepemimpinan dan manajemen organisasi untuk pengurus OSIS, MPK, dan organisasi siswa lainnya se-Kota Cimahi. Pelatihan ini bertujuan untuk meningkatkan soft skill dan kapasitas kepemimpinan para siswa.</p><h3>Materi Pelatihan:</h3><ul><li>Dasar-dasar kepemimpinan efektif</li><li>Manajemen konflik dalam organisasi</li><li>Public speaking dan komunikasi</li><li>Perencanaan program kerja dan evaluasi</li><li>Team building dan kolaborasi</li></ul><p>Fasilitator pelatihan adalah alumni SMA Negeri 1 Cimahi yang kini menjadi professional trainer dan motivator nasional. Peserta akan mendapat modul pelatihan dan sertifikat resmi.</p>",
    thumbnail: "https://picsum.photos/id/1048/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1048/800/600",
        thumbnail: "https://picsum.photos/id/1048/200/150",
      },
      {
        original: "https://picsum.photos/id/1049/800/600",
        thumbnail: "https://picsum.photos/id/1049/200/150",
      },
      {
        original: "https://picsum.photos/id/1050/800/600",
        thumbnail: "https://picsum.photos/id/1050/200/150",
      },
    ],
    status: "published",
    created_at: "2025-09-05T08:30:00.000Z",
    updated_at: "2025-09-10T16:15:00.000Z",
  },
  {
    id: 27,
    title: "Olimpiade Sains dan Matematika",
    school: "SMP Negeri 3 Cimahi",
    event: "Olimpiade",
    date: "2025-11-08T00:00:00.000Z",
    content:
      "<h2>Olimpiade Sains dan Matematika Tingkat SMP</h2><p>SMP Negeri 3 Cimahi akan mengadakan Olimpiade Sains dan Matematika untuk siswa SMP se-Kota Cimahi. Olimpiade ini bertujuan untuk meningkatkan minat dan prestasi siswa dalam bidang sains dan matematika.</p><h3>Kategori Olimpiade:</h3><ol><li>Matematika</li><li>Fisika</li><li>Biologi</li><li>IPA Terpadu</li></ol><p>Olimpiade akan dilaksanakan dalam dua tahap: babak penyisihan (tertulis) dan babak final (praktikum dan presentasi). Pemenang akan menerima trofi, medali, sertifikat, dan hadiah menarik lainnya.</p><p>Pendaftaran dibuka mulai 1 Oktober 2025 dan ditutup pada 31 Oktober 2025.</p>",
    thumbnail: "https://picsum.photos/id/1051/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1051/800/600",
        thumbnail: "https://picsum.photos/id/1051/200/150",
      },
      {
        original: "https://picsum.photos/id/1052/800/600",
        thumbnail: "https://picsum.photos/id/1052/200/150",
      },
    ],
    status: "published",
    created_at: "2025-10-01T10:00:00.000Z",
    updated_at: "2025-10-05T15:30:00.000Z",
  },
  {
    id: 28,
    title: "Pameran Karya Siswa Jurusan Seni",
    school: "SMKN 3 Cimahi",
    event: "Pameran",
    date: "2025-12-15T00:00:00.000Z",
    content:
      '<h2>Pameran Seni Akhir Semester</h2><p>Jurusan Seni Rupa dan Desain SMKN 3 Cimahi dengan bangga mempersembahkan pameran karya siswa akhir semester dengan tema "Identitas Lokal dalam Perspektif Global". Pameran ini menampilkan karya lukis, patung, grafis, fotografi, dan seni instalasi dari siswa kelas X hingga XII.</p><h3>Jadwal Pameran:</h3><ul><li>Pembukaan: 15 Desember 2025, pukul 09.00 WIB</li><li>Durasi: 15-20 Desember 2025</li><li>Lokasi: Aula SMKN 3 Cimahi</li></ul><p>Selain pameran, akan diadakan juga workshop seni untuk pengunjung dan talkshow dengan seniman profesional. Pameran terbuka untuk umum dan tidak dipungut biaya masuk.</p><p>Untuk informasi lebih lanjut, hubungi panitia pameran di email: pameran@smkn3cimahi.sch.id</p>',
    thumbnail: "https://picsum.photos/id/1055/800/600",
    gallery: [
      {
        original: "https://picsum.photos/id/1055/800/600",
        thumbnail: "https://picsum.photos/id/1055/200/150",
      },
      {
        original: "https://picsum.photos/id/1057/800/600",
        thumbnail: "https://picsum.photos/id/1057/200/150",
      },
      {
        original: "https://picsum.photos/id/1059/800/600",
        thumbnail: "https://picsum.photos/id/1059/200/150",
      },
    ],
    status: "published",
    created_at: "2025-11-20T13:45:00.000Z",
    updated_at: "2025-11-25T09:20:00.000Z",
  },
];

export default events;
