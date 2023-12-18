import { useEffect, useState } from "react";
import AccordionComponent from "./AccordionComponent";
import { getModulesByCourseId } from "../libs/api";
import { useParams } from "react-router-dom";

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
      <h1 className="text-xl lg:text-2xl font-bold text-center text-costumeBlue">
        Detail Modul
      </h1>
      <div className="p-5 shadow-xl rounded-lg w-full">
        {module &&
          module.map((data) => (
            <AccordionComponent
              title={data.title}
              index={data.id}
              key={data.id}
            >
              {data.Videos.map((video) => (
                <AccordionComponent
                  title={video.title}
                  index={video.id}
                  key={video.id}
                >
                  <div className="w-full  p-3">
                    <iframe
                      className="w-full md:h-[300px] lg:h-[500px]"
                      src={`https://www.youtube.com/embed/${video.videoUrl}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </div>
                </AccordionComponent>
              ))}
            </AccordionComponent>
          ))}
        <button
          className="p-2 border-2 border-costumeBlue text-costumeBlue rounded-lg opacity-50 text-sm"
          onClick={handleAddModule}
        >
          Tambah Modul
        </button>
      </div>
    </div>
  );
}
