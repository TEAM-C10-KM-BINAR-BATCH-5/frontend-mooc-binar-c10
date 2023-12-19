import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import EditCourse from "../components/EditCourse";
import EditModul from "../components/EditModul";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

export default function KelolaCourse() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="grid grid-cols-1  gap-4 ">
        <div
          className="flex flex-row gap-2 items-center rounded-full hover:bg-gray-200 w-fit cursor-pointer p-3 font-bold"
          onClick={goBack}
        >
          <CaretLeft />
          <p className="hidden md:block"> Kembali </p>
        </div>
        <div className="mb-3">
          <EditCourse />
        </div>
        <div className="mb-3">
          <EditModul />
        </div>
      </div>
    </>
  );
}
