import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      <span className="text-sm text-gray-600 font-medium">Pages</span>

      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-black hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* Page numbers */}
      {pages.slice(0, 4).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-md border text-sm transition ${
            currentPage === page
              ? "bg-gray-800 text-white border-gray-800"
              : "border-gray-300 text-gray-800 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis if more pages exist */}
      {totalPages > 4 && <span className="px-2 text-sm text-gray-600">...</span>}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-black hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
