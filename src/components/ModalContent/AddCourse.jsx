import { StepperWithContent } from "../StepperWithContent";
import AddCourseForm from "../Forms/AddCourseForm";
import AddModuleForm from "../Forms/AddModulesForm";
import LoadingModal from "../Modal/LoadingModal";
import { XCircle } from "@phosphor-icons/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState } from "../../atom/loadingAtom";
import { modalState } from "../../atom/modalAtom";
import { motion } from "framer-motion";

export default function AddCourse() {
  const [isLoading] = useRecoilState(loadingState);
  const setShowModal = useSetRecoilState(modalState);
  return (
    <div className="bg-white w-[370px] sm:w-[720px] h-4/5 p-2 rounded-lg flex flex-col relative overflow-y-auto overflow-x-hidden">
      <button
        onClick={() => setShowModal(false)}
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
  );
}
