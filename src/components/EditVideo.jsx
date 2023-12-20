import { FloppyDisk } from "@phosphor-icons/react";
import React from "react";

export default function EditVideo({ video }) {
  return (
    <div className="w-full  flex flex-col md:flex-row gap-2 md:gap-12 justify-center items-start">
      <iframe
        className="md:w-1/2 lg:w-1/2 w-full md:h-[150px] lg:h-[250px] rounded-lg"
        src={`https://www.youtube.com/embed/${video.videoUrl}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <div className="flex flex-col justify-start">
        <label className="block text-gray-700 mb-2">
          <p className="text-sm font-bold">ID Youtube </p>
          <input
            className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
            type="text"
            value={video.videoUrl}
          />
        </label>
        <label className="block text-gray-700 mb-2">
          <p className="text-sm font-bold">Nomor urut video </p>
          <input
            className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
            type="number"
            value={video.no}
          />
        </label>
        <label className="block text-gray-700 mb-2">
          <p className="text-sm font-bold">Durasi video (menit)</p>
          <input
            className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
            type="number"
            value={video.duration}
          />
        </label>

        <button
          type="button"
          name="image"
          className="bg-costumeBlue w-fit flex items-center justify-center gap-1 rounded-lg py-3 p-5"
        >
          <FloppyDisk size={24} color="#FFFFFF" weight="bold" />
          <p className="font-bold text-md text-white">Simpan</p>
        </button>
      </div>
    </div>
  );
}
