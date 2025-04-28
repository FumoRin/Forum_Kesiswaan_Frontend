import React from 'react';

const AccountOverlay = ({ title, description, type, onClose, onConfirm }) => {
  const [passwordData, setPasswordData] = React.useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [deleteData, setDeleteData] = React.useState({
    password: '',
    confirmation: false
  });

  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if(type === 'password') {
      if(passwordData.new !== passwordData.confirm) {
        return setError('Password baru dan konfirmasi tidak sama');
      }
      onConfirm(passwordData);
    }
    
    if(type === 'delete') {
      if(!deleteData.confirmation) {
        return setError('Anda harus mencentang kotak konfirmasi');
      }
      onConfirm(deleteData.password);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <form onSubmit={handleSubmit}>
          {type === 'password' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Saat Ini
                </label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    current: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    new: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    confirm: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 bg-red-50 p-4 rounded-md">
                <p className="text-red-600 text-sm">
                  ⚠️ Perhatian! Penghapusan akun bersifat permanen dan tidak dapat dibatalkan.
                  Semua data yang terkait dengan akun ini akan dihapus secara permanen.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Masukkan Password Anda
                </label>
                <input
                  type="password"
                  value={deleteData.password}
                  onChange={(e) => setDeleteData(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                />
              </div>

              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={deleteData.confirmation}
                  onChange={(e) => setDeleteData(prev => ({
                    ...prev,
                    confirmation: e.target.checked
                  }))}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Saya mengerti konsekuensi dari penghapusan akun ini
                </label>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                type === 'delete' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {type === 'delete' ? 'Hapus Akun' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountOverlay;