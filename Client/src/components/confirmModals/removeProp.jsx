import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modal = {
  hidden: { opacity: 0, scale: 0.85, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.2 } }
};

const RemovePropertyModal = ({ open, onClose, onConfirm, property }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl w-80 p-6 shadow-lg space-y-4"
          >
            <h2 className="text-lg font-semibold">Remove Property</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-medium text-red-600">{property.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-1 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm(property.id);
                  onClose();
                }}
                className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RemovePropertyModal;
