import React from 'react';

const UserDashboard = () => {
  // Data sekolah
  const schoolData = [
    { label: 'Nama Sekolah', value: 'SMK Negeri 1 Cimahi' },
    { label: 'Email Sekolah', value: 'smknrcmh@sch.id' },
    { label: 'Nama Admin', value: 'Yuki Tsunoda' },
    { label: 'Nomor HP', value: '089034798234' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-navbar">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">SMK Negeri 1 Cimahi</h1>
        
        {/* Card Informasi Sekolah */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Informasi Sekolah</h2>
          </div>
          
          {/* Data Sekolah */}
          <div className="space-y-4">
            {schoolData.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3">
                <div className="w-1/3">
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <div className="w-1/3">
                  <span className="text-gray-800">{item.value}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Ubah
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Pengaturan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Kelola Sekolah</h2>
          
          <div className="space-y-4">
            <button className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
              Kelola Postingan
            </button>
            
            <button className="w-full px-4 py-3 text-left bg-yellow-100 hover:bg-yellow-200 rounded-md transition-colors">
              Ubah Kata Sandi
            </button>
            
            <button className="w-full px-4 py-3 text-left bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors">
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;