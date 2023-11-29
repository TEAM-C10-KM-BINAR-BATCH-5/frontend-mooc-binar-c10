const Navbar = () => {
  return (
    <nav className="bg-lightBlue shadow p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-costumeBlue text-xl font-bold">Hi, Admin</span>
        </div>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            className="bg-white border-2 border-indigo-500 rounded-lg py-2 px-6 focus:outline-none focus:border-rose-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
            <svg
              width="28"
              height="28"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="38" height="38" rx="10" fill="#6148FF" />
              <path
                d="M17 25C18.775 24.9996 20.4988 24.4054 21.897 23.312L26.293 27.708L27.707 26.294L23.311 21.898C24.405 20.4997 24.9996 18.7754 25 17C25 12.589 21.411 9 17 9C12.589 9 9 12.589 9 17C9 21.411 12.589 25 17 25ZM17 11C20.309 11 23 13.691 23 17C23 20.309 20.309 23 17 23C13.691 23 11 20.309 11 17C11 13.691 13.691 11 17 11Z"
                fill="#EBF3FC"
              />
              <path
                d="M18.4121 15.5861C18.7911 15.9661 19.0001 16.4681 19.0001 17.0001H21.0001C21.001 16.4745 20.8977 15.954 20.6961 15.4686C20.4946 14.9832 20.1989 14.5425 19.8261 14.1721C18.3121 12.6601 15.6871 12.6601 14.1741 14.1721L15.5861 15.5881C16.3461 14.8301 17.6561 14.8321 18.4121 15.5861Z"
                fill="#EBF3FC"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
