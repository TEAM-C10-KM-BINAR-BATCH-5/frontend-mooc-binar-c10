import { useState } from "react";

export default function AddVideoForm() {
  const [videoCount, setVideoCount] = useState(1);

  const handleAddvideo = (e) => {
    e.preventDefault();
    setVideoCount((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
        {[...Array(videoCount)].map((_, index) => (
          <div key={index}>
            <p className="py-5 text-costumeBlue font-bold text-lg text-start">
              Video {index + 1}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Judul Video
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukan link video"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Link Video
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukan link video"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-start gap-3">
          <button
            className="p-3 py-1 border-costumeBlue border-2 text-costumeBlue rounded-lg text-base opacity-50"
            onClick={handleAddvideo}
          >
            Tambah Video
          </button>
        </div>
      </form>
    </div>
  );
}
