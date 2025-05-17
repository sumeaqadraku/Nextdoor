import { FiChevronRight } from "react-icons/fi";

const Pagination = () => {
  const pages = [1, 2, 3, 4];

  return (
    <div className="flex items-center gap-2 mt-6">
      <span className="text-sm text-gray-600 font-medium">Pages</span>

      {pages.map((page) => (
        <button
          key={page}
          className="w-8 h-8 rounded-md border border-gray-300 text-sm text-gray-800 hover:bg-gray-100 transition"
        >
          {page}
        </button>
      ))}

      <span className="px-2 text-sm text-gray-600">...</span>

      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-black hover:bg-gray-100 transition">
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
