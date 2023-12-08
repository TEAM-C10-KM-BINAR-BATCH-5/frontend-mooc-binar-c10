import React from "react";

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex list-none">
        {Array.from({ length: pageNumbers }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              } px-3 py-1 border border-gray-300 rounded-lg mr-2 focus:outline-none`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
