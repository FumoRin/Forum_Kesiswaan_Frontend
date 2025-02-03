import React from 'react';
import { File, Building, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery'
import thumbnail from '../../assets/thumbnail.jpg';
import 'react-image-gallery/styles/css/image-gallery.css';

const BlogDetail = () => {
  const { id } = useParams();

  const blogData = [
    {
      id: '1',
      title: 'Lomba Kebersihan Antar Sekolah',
      school: 'SMK Negeri 1 Cimahi',
      event: 'Lomba WS Terbersih',
      date: '16 Agustus 2024',
      content:
        'Kegiatan lomba kebersihan ini bertujuan untuk meningkatkan kesadaran para siswa akan pentingnya kebersihan lingkungan sekolah. Lomba ini melibatkan seluruh jurusan di sekolah dengan kriteria penilaian meliputi kebersihan, kerapihan, dan kreativitas dalam mendekorasi ruang belajar serta kamar mandi. Pemenang akan diumumkan pada akhir lomba dan diberikan penghargaan berupa piala untuk juara 1, 2, dan 3.',
      thumbnail: thumbnail,
      gallery: [
        {
          original: 'https://picsum.photos/id/1018/800/600',
          thumbnail: 'https://picsum.photos/id/1018/200/150',
        },
        {
          original: 'https://picsum.photos/id/1025/800/600',
          thumbnail: 'https://picsum.photos/id/1025/200/150',
        },
        {
          original: 'https://picsum.photos/id/1035/800/600',
          thumbnail: 'https://picsum.photos/id/1035/200/150',
        },
        {
          original: 'https://picsum.photos/id/1040/800/600',
          thumbnail: 'https://picsum.photos/id/1040/200/150',
        },
      ],
    
    },
    {
      id: '2',
      title: 'Pentas Seni Tahunan',
      school: 'SMK Negeri 2 Cimahi',
      event: 'Pentas Seni 2024',
      date: '20 September 2024',
      content:
        'Pentas seni tahunan ini menjadi ajang untuk menampilkan kreativitas siswa melalui berbagai pertunjukan seni seperti musik, tari, drama, dan lainnya. Acara ini juga dihadiri oleh tamu undangan dari beberapa sekolah sekitar dan menjadi momen untuk mempererat hubungan antar sekolah.',
      thumbnail: 'https://via.placeholder.com/150',
    },
  ];

  const blog = blogData.find((item) => item.id === id);

  if (!blog) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Blog tidak ditemukan</h2>
        <p className="text-gray-600">Silakan kembali ke halaman sebelumnya.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-gray-50 w-full">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Main Content Area */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                {/* Metadata Items */}
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <Building className="w-5 h-5" />
                  <span>{blog.school}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <File className="w-5 h-5" />
                  <span>{blog.event}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  <span>{blog.date}</span>
                </div>              
              </div>
            </div>

            {/* Thumbnail Image */}
            <div className="w-full md:w-96 flex-shrink-0">
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="mt-8 prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg">{blog.content}</p>
          </div>

          {/* Gallery Section */}
          {blog.gallery && blog.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-100 pb-2">
                Dokumentasi Acara
              </h2>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <ImageGallery
                  items={blog.gallery}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showThumbnails={true}
                  thumbnailPosition="bottom"
                  lazyLoad={true}
                  slideInterval={3000}
                  renderItem={(item) => (
                    <div className="image-gallery-image aspect-video">
                      <img
                        src={item.original}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  renderThumbInner={(item) => (
                    <div className="aspect-square">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;