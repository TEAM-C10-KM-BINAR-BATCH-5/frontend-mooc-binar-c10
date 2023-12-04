import React from "react";

export default function AddCourseModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
    >
      <div className="bg-white w-[720px] p-2 rounded-lg flex flex-col relative">
        <button
          onClick={() => onClose()}
          className="w-8 absolute top-0 right-0 m-2 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          X
        </button>
        <p className="py-5 text-costumeBlue font-bold text-2xl text-center">
          Tambah Kelas
        </p>
        <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Masukan nama kelas"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kategori
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Pilih kategori"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipe Kelas
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Masukan Tipe Kelas"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Level
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Masukan level kelas"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Harga
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Masukan Harga kelas"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-costumeBlue text-white font-bold py-2 px-4 my-8 rounded-lg w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
