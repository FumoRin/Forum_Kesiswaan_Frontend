import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <img src="/api/placeholder/60/60" alt="Logo" className="w-16 h-16" />
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Link One</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Link Two</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Link Three</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Link Four</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Link Five</a>
          </div>
          <div className="text-sm text-gray-500 flex flex-wrap justify-center gap-4">
            <span>© 2024 Bclume. All rights reserved.</span>
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;