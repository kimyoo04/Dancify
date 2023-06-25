import { useAppSelector } from "@toolkit/hook";
import { barVariants } from "@util/variants/bar";
import { containerVariants } from "@util/variants/container";
import { motion } from "framer-motion";

export default function ProgressBar() {
  // 현재 단계와 전체 단계 수 가져오기
  const { playIndex, selectedSections } = useAppSelector(
    (state) => state.practice
  );
  const currentStep = playIndex + 1;
  const totalSteps = selectedSections.length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
      }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={barVariants(currentStep, totalSteps)}
        style={{
          height: "100%",
          backgroundColor: "#3f51b5",
          borderRadius: "10px",
        }}
      />
    </motion.div>
  );
}
