import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Overlay from "./Overlay";
import Step from "@components/Step";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import GuidePortal from "@components/GuideModal/GuidePortal";

const GuideModal = () => {
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      // 사용자가 첫 방문이므로 모달을 보여줌
      setShowModal(true);
      // localStorage에 첫 방문 여부를 저장
    }
  }, []);

  const closeModal = () => {
    isChecked && localStorage.setItem("hasVisitedBefore", "true"); // 이전 방문 여부를 저장
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <Overlay />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="col-center fixed left-0 top-0 z-50 h-screen w-screen p-4"
          >
            <div className="col-between w-full max-w-[400px] space-y-4 rounded-md bg-background p-6 shadow-md">
              <Step isActive={step === 1}>
                <div className="row-center gap-1">
                  <Logo />
                  <h1 className="text-xl font-medium">
                    에 오신 것을 환영합니다.
                  </h1>
                </div>

                <Image
                  src={"/images/character.png"}
                  alt="character"
                  width={500}
                  height={500}
                />

                <p>
                  Dancify는 춤을 배우고 싶은 사람을 위한 AI 안무 연습
                  서비스입니다. 댄서가 되어 춤을 가르치고, 댄서블이 되어 춤을
                  배워보세요!
                </p>
              </Step>

              <Step isActive={step === 2}>
                <Image
                  src={"/images/guide1.gif"}
                  alt="guide-1"
                  width={500}
                  height={500}
                />
                <p>댄서 게시판에서 마음에 드는 영상을 클릭합니다.</p>
              </Step>

              <Step isActive={step === 3}>
                <Image
                  src={"/images/guide2.gif"}
                  alt="guide-2"
                  width={500}
                  height={500}
                />
                <p>영상을 확인하고 안무 연습 시작 버튼을 클릭합니다.</p>
              </Step>

              <Step isActive={step === 4}>
                <Image
                  src={"/images/guide3.gif"}
                  alt="guide-3"
                  width={500}
                  height={500}
                />
                <p>연습하고 싶은 구간을 선택하고, 연습해보세요!</p>
              </Step>

              {step === 4 ? (
                <div className="w-full space-y-4">
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      id="skeleton"
                      onCheckedChange={() => setIsChecked((prev) => !prev)}
                      className="h-4 w-4 dark:text-white"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="skeleton"
                        className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          isChecked ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        다음 방문부터 이 창을 보지 않음
                      </label>
                    </div>
                  </div>

                  <Button className="w-full" onClick={closeModal}>
                    닫기
                  </Button>
                </div>
              ) : (
                <Button
                  variant={"outline"}
                  className=" w-full border-primary"
                  onClick={() => setStep(step + 1)}
                >
                  다음
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

// HOC 적용
export default GuidePortal(GuideModal);
