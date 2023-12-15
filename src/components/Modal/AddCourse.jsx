import { StepperWithContent } from "../StepperWithContent";
import AddCourseForm from "../Forms/AddCourseForm";
import AddModuleForm from "../Forms/AddModulesForm";
import { XCircle } from "@phosphor-icons/react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atom/loadingAtom";
import LoadingModal from "./LoadingModal";
import { AnimatePresence, motion } from "framer-motion";
import { modalState } from "../../atom/modalAtom";

export default function AddCourseModal() {
  const [isLoading] = useRecoilState(loadingState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <AnimatePresence>
      {showModal && (
        <div
          id="wrapper"
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white w-[370px] sm:w-[720px] h-4/5 p-2 rounded-lg flex flex-col relative overflow-y-auto overflow-x-hidden"
          >
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
