import { useRecoilState } from "recoil";

import { AnimatePresence, motion } from "framer-motion";
import { modalState } from "../../atom/modalAtom";
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
            {showModal.content == "addCourse" && <AddCourse />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
