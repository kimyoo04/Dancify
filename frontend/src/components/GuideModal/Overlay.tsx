import { motion } from "framer-motion";

export default function Overlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-50 w-screen h-screen bg-black/70"
    >와우</motion.div>
  );
}
