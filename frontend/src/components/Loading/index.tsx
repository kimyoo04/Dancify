import { motion } from "framer-motion";

const loadingCircleVariants = {
  start: {
    rotate: 0,
  },
  end: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function Loading() {
  return (
    <motion.div
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center"
      variants={loadingCircleVariants}
      animate="end"
      initial="start"
    >
      <div className="h-6 w-6 rounded-full border-4 border-t-4 border-gray-200 border-t-primary"></div>
    </motion.div>
  );
}
