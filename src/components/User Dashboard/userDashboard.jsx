import React, { useState } from 'react';
import EditOverlay from './editOverlay';
import AccountOverlay from './AccountOverlay';

const fieldConfigs = {
  name: {
    title: 'Ubah Nama Sekolah',
    description: 'Pengubahan nama sekolah ini harus berdasarkan data valid yang ada. Hindari perubahan nama jika tidak terlalu penting'
  },
  email: {
    title: 'Ubah Email Sekolah',
    description: 'Pastikan email yang dimasukkan valid dan aktif. Perubahan email akan mempengaruhi sistem notifikasi'
  },
  admin: {
    title: 'Ubah Nama Admin',
    description: 'Nama admin yang terdaftar akan digunakan untuk keperluan administrasi dan verifikasi'
  },
  phone: {
    title: 'Ubah Nomor HP',
    description: 'Nomor HP harus aktif dan dapat dihubungi. Akan digunakan untuk verifikasi dua langkah'
  }
};

const UserDashboard = () => {
  const [schoolData, setSchoolData] = useState([
    { id: 'name', label: 'Nama Sekolah', value: 'SMK Negeri 1 Cimahi' },
    { id: 'email', label: 'Email Sekolah', value: 'smknrcmh@sch.id' },
    { id: 'admin', label: 'Nama Admin', value: 'Yuki Tsunoda' },
    { id: 'phone', label: 'Nomor HP', value: '089034798234' }
  ]);

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showAccountOverlay, setShowAccountOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState('');

  const handlePasswordChange = (passwordData) => {
    // Implementasi ganti password
    console.log('Password changed:', passwordData);
  };

  const handleAccountDelete = (password) => {
    // Implementasi hapus akun
    console.log('Account deletion confirmed with password:', password);
  };

  const handleUpdate = (fieldId, newValue) => {
    setSchoolData(prev =>
      prev.map(item =>
        item.id === fieldId ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-navbar">
      {/* Overlay */}
      {showOverlay && (
        <EditOverlay
          {...fieldConfigs[selectedField]}
          currentValue={
            schoolData.find(item => item.id === selectedField)?.value || ''
          }
          onClose={() => setShowOverlay(false)}
          onSave={handleUpdate}
          field={selectedField}
        />
      )}

      {/* Overlay Akun */}
      {showAccountOverlay && (
        <AccountOverlay
          title={overlayType === 'password' 
            ? "Ubah Kata Sandi" 
            : "Hapus Akun Permanen"}
          description={overlayType === 'password'
            ? "Pastikan password baru Anda kuat dan berbeda dari password sebelumnya"
            : "Tindakan ini tidak dapat dibatalkan. Semua data akan dihapus secara permanen"}
          type={overlayType}
          onClose={() => setShowAccountOverlay(false)}
          onConfirm={overlayType === 'password' 
            ? handlePasswordChange 
            : handleAccountDelete}
        />
      )}

      {/* Bagian lainnya tetap sama */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">SMK Negeri 1 Cimahi</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Informasi Sekolah</h2>
          </div>
          
          <div className="space-y-4">
            {schoolData.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div className="w-1/3">
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <div className="w-1/3">
                  <span className="text-gray-800">{item.value}</span>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    setSelectedField(item.id);
                    setShowOverlay(true);
                  }}
                >
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
          
          <button 
            className="w-full px-4 py-3 text-left bg-yellow-100 hover:bg-yellow-200 rounded-md transition-colors"
            onClick={() => {
              setOverlayType('password');
              setShowAccountOverlay(true);
            }}
          >
            Ubah Kata Sandi
          </button>
          
          <button 
            className="w-full px-4 py-3 text-left bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
            onClick={() => {
              setOverlayType('delete');
              setShowAccountOverlay(true);
            }}
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default UserDashboard;