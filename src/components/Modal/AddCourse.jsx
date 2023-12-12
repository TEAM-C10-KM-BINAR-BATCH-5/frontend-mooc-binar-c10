import { StepperWithContent } from "../StepperWithContent";
import AddCourseForm from "../Forms/AddCourseForm";
import AddModuleForm from "../Forms/AddModulesForm";
import { XCircle } from "@phosphor-icons/react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atom/loadingAtom";
import LoadingModal from "./LoadingModal";

export default function AddCourseModal({ isVisible, onClose }) {
  const [isLoading] = useRecoilState(loadingState);
  if (!isVisible) return null;

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
    >
      <div className="bg-white w-[370px] sm:w-[720px] h-4/5 p-2 rounded-lg flex flex-col relative overflow-y-auto">
        <button
          onClick={() => onClose()}
          className="w-8 absolute top-0 right-0 m-2 flex justify-center items-center  rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <XCircle size={32} />
        </button>
        {isLoading && <LoadingModal />}
        <StepperWithContent
          addCourse={<AddCourseForm />}
          addModule={<AddModuleForm />}
        />
      </div>
    </div>
  );
}
