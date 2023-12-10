import { useState } from "react";
import AddVideoForm from "./AddVideoForm";

export default function AddModuleForm() {
  const [moduleCount, setModuleCount] = useState(1);

  const handleAddModule = (e) => {
    e.preventDefault();
    setModuleCount((prev) => prev + 1); // Step 2
  };
  const handleDeleteModule = (e) => {
    e.preventDefault();
    setModuleCount((prev) => prev - 1); // Step 2
  };

  return (
    <div className="w-full">
      <p className="py-5 text-costumeBlue font-bold text-2xl text-center">
        Tambah Modul
      </p>
      <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
        {[...Array(moduleCount)].map((_, index) => (
          <div
            key={index}
            className=" w-full shadow-md border-2 border-gray-300 p-5 rounded-lg m-3"
          >
            <p className="py-5 text-costumeBlue font-bold text-xl text-start">
              Modul {index + 1}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Judul
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukan judul modul"
              />
            </div>
            <AddVideoForm />
          </div>
        ))}
        <div className="flex justify-end gap-3">
          <button
            className="p-4 py-0 bg-costumeBlue text-white rounded-full text-2xl disabled:opacity-75"
            onClick={handleDeleteModule}
            disabled={moduleCount <= 1 ? true : false}
          >
            -
          </button>
          <button
            className="p-3 py-1 bg-costumeBlue text-white rounded-full text-2xl"
            onClick={handleAddModule}
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
}
