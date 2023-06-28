import { DotVariants, dotContainerVariants } from "@util/variants/dot";
import { motion } from "framer-motion";

export default function SpeechLoading() {
  return (
    <div
      className="pt5 row-center w-full"
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        className="flex h-10 w-32 justify-around"
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
    </div>
  );
}
