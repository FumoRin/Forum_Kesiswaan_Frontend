import React from 'react';
import { File, Building, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const SearchResultCard = ({ id, school, event, date }) => {
  return (
    <Link to={`/blog/${id}`} className="block"> {/* Bungkus seluruh kartu dengan Link */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition">
        <div className="flex gap-4">
          {/* Placeholder image container */}
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-blue-600">Title Card</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Building />
              <span>{school}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <File />
              <span>{event}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
