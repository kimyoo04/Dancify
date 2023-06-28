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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-10 w-full rounded-md bg-gray-300"
    >
      {/* 현재 단계 막대 */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={barVariants(currentStep, totalSteps === 0 ? 1 : totalSteps)}
        className="relative h-full rounded-md bg-primary"
      >
        <div>
          {/* 툴팁 상자 */}
          <div className="absolute -top-2 right-0 -translate-y-full translate-x-1/2 transform">
            <div className="row-center gap-1 rounded-md bg-primary px-4 py-1 text-xs text-white">
              {currentStep === totalSteps || totalSteps === 0 ? (
                <span className="text-lg">완료</span>
              ) : (
                <>
                  <span className="text-lg">{currentStep}</span>
                  <span className="text-lg">/</span>
                  <span className="text-lg">{totalSteps}</span>
                </>
              )}
            </div>
          </div>

          {/* 툴팁 삼각형 */}
          <div className="absolute -top-2 right-0 h-0 w-0 translate-x-1/2 transform border-4 border-primary  border-b-transparent border-l-transparent border-r-transparent"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}
