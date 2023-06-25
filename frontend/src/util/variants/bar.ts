export const barVariants = (currentStep: number, totalSteps: number) => {
  return {
    initial: { width: "0%" },
    animate: {
      width: `${(currentStep / totalSteps) * 100}%`,
      transition: { duration: 0.5 },
    },
  };
};
