import { useEffect, useState } from "react";
import AccordionComponent from "./AccordionComponent";
import { createModule, createVideo, getModulesByCourseId } from "../libs/api";
import { useParams } from "react-router-dom";
import EditVideo from "./EditVideo";
import { triggerDataUpdateState } from "../atom/formAtom";
import { useRecoilState } from "recoil";
import { coursePriceState } from "../atom/courseAtom";
import { loadingState } from "../atom/loadingAtom";

// ... (other imports and code)

export default function EditModul() {
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );
  const [modules, setModules] = useState([]);
  const { id } = useParams();
  const [coursePrice] = useRecoilState(coursePriceState);
  const [isLoading, setIsLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useRecoilState(loadingState);

  const [firstFetch, setFirstFetch] = useState(true);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        setIsLoading(firstFetch);
        setGlobalLoading(!firstFetch);
        const data = await getModulesByCourseId(id);
        setModules(data);
        setFirstFetch(false);
      } catch (error) {
        console.log("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
        setGlobalLoading(false);
      }
    };
    fetchModuleData();
  }, [id, triggerDataUpdate]);

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      setGlobalLoading(true);
      await createModule({
        title: "New Module",
        isLocked: false,
        courseId: id,
      });

      setTriggerDataUpdate(!triggerDataUpdate);
    } catch (err) {
      console.log(err);
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleAddVideo = async (index, moduleId) => {
    try {
      setGlobalLoading(true);
      await createVideo({
        no: modules[index].Videos.length + 1,
        title: "New Video",
        videoUrl: "test",
        duration: "0",
        moduleId: moduleId,
      });

      setTriggerDataUpdate(!triggerDataUpdate);
    } catch (err) {
      console.log(err);
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start justify-center p-4">
      {!isLoading && (
        <>
          <h1 className="text-costumeBlue text-2xl md:text-3xl font-bold mb-3">
            Modul
          </h1>
          {modules.length > 0 ? (
            <>
              {modules &&
                modules.map((data, index) => (
                  <AccordionComponent
                    id={data.id}
                    title={data.title}
                    index={data.id}
                    key={data.id}
                    isLocked={data.isLocked}
                    price={coursePrice}
                    type="module"
                  >
                    {data.Videos.map((video) => (
                      <AccordionComponent
                        id={video.id}
                        title={video.title}
                        index={video.id}
                        key={video.title}
                        type="video"
                      >
                        <EditVideo video={video} />
                      </AccordionComponent>
                    ))}
                    <button
                      className="p-2 border-2 border-costumeBlue text-costumeBlue rounded-lg opacity-50 text-sm"
                      onClick={() => handleAddVideo(index, data.id)}
                    >
                      + Tambah Video
                    </button>
                  </AccordionComponent>
                ))}
            </>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="text-3xl">Tidak ada modul</h1>
            </div>
          )}
          <button
            className="p-2 border-2 border-costumeBlue text-costumeBlue rounded-lg opacity-50 text-sm"
            onClick={handleAddModule}
          >
            + Tambah Modul
          </button>
        </>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-1/3 w-full py-10">
          <div className="custom-loader"></div>
        </div>
      )}
    </div>
  );
}
