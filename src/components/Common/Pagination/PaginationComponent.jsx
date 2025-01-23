import React from "react";

const PaginationComponent = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center space-x-1 md:space-x-2 px-4 py-3">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-2 py-2 md:px-4 
          text-sm font-medium
          border border-gray-300
          md:rounded-full rounded-md
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }
        `}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex space-x-1 md:space-x-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : null
            }
            className={`
              px-3 py-2
              text-sm font-medium
              border border-gray-300
              md:rounded-full rounded-md
              ${
                typeof page !== "number"
                  ? "cursor-default bg-white text-gray-700"
                  : page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Mobile Page Indicator */}
      <span className="sm:hidden text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-2 py-2 md:px-4
          text-sm font-medium
          border border-gray-300
          md:rounded-full rounded-md
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }
        `}
      >
        Next
      </button>
    </nav>
  );
};

export default PaginationComponent;
