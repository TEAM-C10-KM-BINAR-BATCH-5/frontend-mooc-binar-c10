import { useEffect, useState } from "react";
import AccordionComponent from "./AccordionComponent";
import { getModulesByCourseId } from "../libs/api";
import { useParams } from "react-router-dom";
import EditVideo from "./EditVideo";
import { FloppyDisk } from "@phosphor-icons/react";

export default function EditModul() {
  const [module, setModule] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getModulesByCourseId(id);
        setModule(data);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleAddModule = (e) => {
    e.preventDefault();
    setModule((prev) => [
      ...prev,
      {
        title: "New Chapter",
        isLocked: false,
        Videos: [
          {
            no: 1,
            title: "New Video",
            videoUrl: "test",
            duration: "0",
          },
        ],
      },
    ]);

    const index = module.length;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl lg:text-2xl font-bold text-center text-costumeBlue mb-3">
        Detail Modul
      </h1>
      <div className="p-5 shadow-lg rounded-lg w-full  bg-white">
        {module &&
          module.map((data) => (
            <AccordionComponent
              title={data.title}
              index={data.id}
              key={data.id}
              isLocked={data.isLocked}
            >
              {data.Videos.map((video) => (
                <AccordionComponent
                  title={video.title}
                  index={video.id}
                  key={video.id}
                >
                  <EditVideo video={video} />
                </AccordionComponent>
              ))}
            </AccordionComponent>
          ))}
        <button
          className="p-2 border-2 border-costumeBlue text-costumeBlue rounded-lg opacity-50 text-sm"
          onClick={handleAddModule}
        >
          + Tambah Modul
        </button>
        <div className="mt-4 flex justify-end">
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
    </div>
  );
}
