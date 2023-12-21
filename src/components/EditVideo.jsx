import { FloppyDisk } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { shallowEqual } from "shallow-equal";
import { swalFireConfirm, swalFireResult } from "../libs/swalFire";
import { editVideo } from "../libs/api";
import { useRecoilState } from "recoil";
import { triggerDataUpdateState } from "../atom/formAtom";

export default function EditVideo({ video }) {
  const [currentVideo, setCurrentVideo] = useState(video);
  const isEdited = shallowEqual(currentVideo, video);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );

  const handleInputChange = (event) => {
    try {
      const { name, value } = event.target;
      setCurrentVideo({ ...currentVideo, [name]: value });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateVideo = async () => {
    try {
      const response = await swalFireConfirm(
        "Apakah anda yakin?",
        "Anda dapat mengubahnya lagi nanti",
        "question"
      );
      if (response.isConfirmed) {
        await editVideo(currentVideo, video.id);
        swalFireResult("Berhasil!", "Berhasil ubah data video", "success");
        setTriggerDataUpdate(!triggerDataUpdate);
      }
    } catch {
      swalFireResult("Gagal", "Gagal ubah data video", "error");
    }
  };

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
            name="videoUrl"
            value={currentVideo.videoUrl}
            onChange={handleInputChange}
          />
        </label>
        <label className="block text-gray-700 mb-2">
          <p className="text-sm font-bold">Nomor urut video </p>
          <input
            className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
            type="number"
            name="no"
            value={currentVideo.no}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
          />
        </label>
        <label className="block text-gray-700 mb-2">
          <p className="text-sm font-bold">Durasi video (menit)</p>
          <input
            className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
            type="number"
            name="duration"
            value={currentVideo.duration}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
          />
        </label>

        <button
          type="button"
          name="image"
          className="bg-costumeBlue w-fit flex items-center justify-center gap-1 rounded-lg py-3 p-5 disabled:opacity-50"
          disabled={isEdited}
          onClick={handleUpdateVideo}
        >
          <FloppyDisk size={24} color="#FFFFFF" weight="bold" />
          <p className="font-bold text-md text-white">Simpan</p>
        </button>
      </div>
    </div>
  );
}
