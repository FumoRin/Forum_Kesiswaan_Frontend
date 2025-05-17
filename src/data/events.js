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
    id: 3,
    title: "Pengumuman",
    school: "SMKN 1 CIMAHI",
    event: "Pengumuman",
    date: "2025-04-17T00:00:00.000Z",
    content:
      '<p><strong>INI ADALAH PENGUMUMAN</strong></p><img src="https://picsum.photos/id/1019/800/600">',
    thumbnail: "https://picsum.photos/id/1019/800/600",
    gallery: [
      "https://picsum.photos/id/1019/800/600",
      "https://picsum.photos/id/1020/800/600",
    ],
    status: "published",
    created_at: "2025-05-02T08:15:09.000Z",
    updated_at: "2025-05-10T01:42:25.000Z",
  },
  {
    id: 13,
    title: "ANOTHER TESTING",
    school: "SMKN 1 Cimahi",
    event: "Pengumuman",
    date: "2025-05-05T00:00:00.000Z",
    content:
      "<p>Hopefully the date handling and blog submission is <strong>FIXED</strong> after or else I'm losing my mind</p>",
    thumbnail: "https://picsum.photos/id/1021/800/600",
    gallery: ["https://picsum.photos/id/1021/800/600"],
    status: "published",
    created_at: "2025-05-05T10:06:49.000Z",
    updated_at: "2025-05-05T10:27:23.000Z",
  },
  {
    id: 20,
    title: "Yes",
    school: "SMAN 1 Cimahi",
    event: "Festival",
    date: "2025-05-26T00:00:00.000Z",
    content: "<p>nothing is here</p>",
    thumbnail: "https://picsum.photos/id/1022/800/600",
    gallery: [],
    status: "published",
    created_at: "2025-05-07T01:33:15.000Z",
    updated_at: "2025-05-07T01:37:57.000Z",
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
];

export default events;
