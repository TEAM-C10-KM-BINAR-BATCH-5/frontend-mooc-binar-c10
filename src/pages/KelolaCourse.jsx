import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import EditCourse from "../components/EditCourse";
import EditModul from "../components/EditModul";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import LoadingModal from "../components/Modal/LoadingModal";
import { useRecoilState } from "recoil";
import { loadingState } from "../atom/loadingAtom";

export default function KelolaCourse() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [isLoading] = useRecoilState(loadingState);
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        className="flex flex-row gap-2 items-center rounded-full hover:bg-gray-300 w-fit cursor-pointer p-3 font-bold"
        onClick={goBack}
      >
        <CaretLeft />
        <p className="hidden md:block"> Kembali </p>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-costumeBlue mb-3">
        Detail Kelas
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-400">
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
