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
        console.log(data);
        setModule(data);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleSetEditMode = (index) => {
    setEditMode((prev) => {
      const newEditMode = [...prev];
      newEditMode[index] = !newEditMode[index];
      return newEditMode;
    });
  };

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

    handleSetEditMode(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-center text-costumeBlue">
        Detail Modul
      </h1>
      <div className="p-5 shadow-xl rounded-lg w-full">
        {module &&
          module.map((data, index) => (
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
                  <div className="video-responsive">
                    <iframe
                      width="853"
                      height="480"
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
