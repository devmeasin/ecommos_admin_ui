import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PaginationProps {
  total: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ total, itemsPerPage }) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const currentPage = pageNumber ? parseInt(pageNumber) : 1;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 rounded-l-md"
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 rounded-r-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
