import { DotVariants, dotContainerVariants } from "@util/variants/dot";
import { motion } from "framer-motion";

export default function SpeechLoading() {
  return (
    <motion.div
      className="flex h-4 w-32 justify-around"
      variants={dotContainerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.span
        className="block h-3 w-3 rounded-full bg-black dark:bg-black"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.span
        className="block h-3 w-3 rounded-full bg-black dark:bg-black"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.span
        className="block h-3 w-3 rounded-full bg-black dark:bg-black"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.span
        className="block h-3 w-3 rounded-full bg-black dark:bg-black"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.span
        className="block h-3 w-3 rounded-full bg-black dark:bg-black"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}
