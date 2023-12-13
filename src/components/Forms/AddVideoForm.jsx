import { useRecoilState } from "recoil";
import { addModuleFormState } from "../../atom/formAtom";

export default function AddVideoForm({ moduleIndex }) {
  const [formData, setFormData] = useRecoilState(addModuleFormState);

  const handleAddVideo = (e, moduleIndex) => {
    e.preventDefault();
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[moduleIndex] = {
        ...updatedFormData[moduleIndex],
        videos: [
          ...updatedFormData[moduleIndex].videos,
          { videoNo: 0, videoTitle: "", videoLink: "", videoDuration: 0 },
        ],
      };
      return updatedFormData;
    });
  };

  const handleDeleteLatestVideo = (e, moduleIndex) => {
    e.preventDefault();
    setFormData((prev) => {
      const updatedFormData = [...prev];
      const moduleVideos = updatedFormData[moduleIndex].videos;

      if (moduleVideos.length > 0) {
        updatedFormData[moduleIndex] = {
          ...updatedFormData[moduleIndex],
          videos: moduleVideos.slice(0, -1),
        };
      }

      return updatedFormData;
    });
  };

  const handleInputChange = (e, videoIndex) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[moduleIndex] = {
        ...updatedFormData[moduleIndex],
        videos: updatedFormData[moduleIndex].videos.map((video, idx) =>
          idx === videoIndex
            ? { ...video, videoNo: videoIndex + 1, [name]: value }
            : video
        ),
      };
      return updatedFormData;
    });
    console.log(formData);
  };

  return (
    <div className="w-full">
      <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
        {formData[moduleIndex].videos.map((_, index) => (
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
                name="videoTitle"
                onChange={(e) => handleInputChange(e, index)}
                defaultValue={formData[moduleIndex].videos[index].videoTitle}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Link Video
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukan link video"
                name="videoLink"
                onChange={(e) => handleInputChange(e, index)}
                defaultValue={formData[moduleIndex].videos[index].videoLink}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Durasi Video (menit)
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Masukan link video"
                name="videoDuration"
                onChange={(e) => handleInputChange(e, index)}
                min={1}
                onWheel={(e) => e.target.blur()}
                defaultValue={formData[moduleIndex].videos[index].videoDuration}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-start gap-3">
          <button
            className="p-3 py-1 border-costumeBlue border-2 text-costumeBlue rounded-lg text-base opacity-50 disabled:hidden"
            onClick={(e) => handleDeleteLatestVideo(e, moduleIndex)}
            disabled={formData[moduleIndex].videos.length === 1 ? true : false}
          >
            - Kurangi Video
          </button>
          <button
            className="p-3 py-1 border-costumeBlue border-2 text-costumeBlue rounded-lg text-base opacity-50"
            onClick={(e) => handleAddVideo(e, moduleIndex)}
          >
            + Tambah Video
          </button>
        </div>
      </form>
    </div>
  );
}
