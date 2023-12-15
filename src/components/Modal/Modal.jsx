import { StepperWithContent } from "../StepperWithContent";
import AddCourseForm from "../Forms/AddCourseForm";
import AddModuleForm from "../Forms/AddModulesForm";
import { XCircle } from "@phosphor-icons/react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atom/loadingAtom";
import LoadingModal from "./LoadingModal";
import { AnimatePresence, motion } from "framer-motion";
import { modalState } from "../../atom/modalAtom";
import Logout from "../ModalContent/Logout";
import AddCourse from "../ModalContent/AddCourse";

export default function Modal() {
  const [showModal] = useRecoilState(modalState);

  return (
    <AnimatePresence>
      {showModal.visible && (
        <div
          id="wrapper"
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center"
          >
            {showModal.content == "logout" && <Logout />}

            {showModal.content == "addCourse" && <AddCourse />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
