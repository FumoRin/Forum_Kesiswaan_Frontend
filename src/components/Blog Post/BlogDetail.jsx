import React from 'react';
import { File, Building, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL

  // Contoh data dummy (ganti dengan fetch dari API atau context di implementasi nyata)
  const blogData = [
    {
      id: '1',
      title: 'Lomba Kebersihan Antar Sekolah',
      school: 'SMK Negeri 1 Cimahi',
      event: 'Lomba WS Terbersih',
      date: '16 Agustus 2024',
      content:
        'Kegiatan lomba kebersihan ini bertujuan untuk meningkatkan kesadaran para siswa akan pentingnya kebersihan lingkungan sekolah. Lomba ini melibatkan seluruh jurusan di sekolah dengan kriteria penilaian meliputi kebersihan, kerapihan, dan kreativitas dalam mendekorasi ruang belajar serta kamar mandi. Pemenang akan diumumkan pada akhir lomba dan diberikan penghargaan berupa piala untuk juara 1, 2, dan 3.',
    },
    {
      id: '2',
      title: 'Pentas Seni Tahunan',
      school: 'SMK Negeri 2 Cimahi',
      event: 'Pentas Seni 2024',
      date: '20 September 2024',
      content:
        'Pentas seni tahunan ini menjadi ajang untuk menampilkan kreativitas siswa melalui berbagai pertunjukan seni seperti musik, tari, drama, dan lainnya. Acara ini juga dihadiri oleh tamu undangan dari beberapa sekolah sekitar dan menjadi momen untuk mempererat hubungan antar sekolah.',
    },
  ];

  // Cari data blog berdasarkan ID
  const blog = blogData.find((item) => item.id === id);

  // Jika blog tidak ditemukan
  if (!blog) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Blog tidak ditemukan</h2>
        <p className="text-gray-600">Silakan kembali ke halaman sebelumnya.</p>
      </div>
    );
  }

  // Tampilan blog detail
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">{blog.title}</h1>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Building />
            <span>{blog.school}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <File />
            <span>{blog.event}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar />
            <span>{blog.date}</span>
          </div>
        </div>

        <div className="text-gray-800 leading-relaxed">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
