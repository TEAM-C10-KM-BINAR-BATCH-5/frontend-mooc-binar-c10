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
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
