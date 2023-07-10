import { Button } from "@components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

export default function Faq() {
  return (
    <div className="space-y-10 border-none p-0 outline-none">
      {/* 헤더 */}
      <div className="row-between border-b pb-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            자주 묻는 질문
          </h2>
          <p className="text-sm text-muted-foreground">
            Dancify에 자주 묻는 질문들을 모았습니다.
          </p>
        </div>

        <Button onClick={() => console.log("라라라")}>
          <span>안무 연습 방법</span>
        </Button>
      </div>
      {/* 내용 */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · Dancify는 어떤 서비스인가요?
            </AccordionTrigger>
            <AccordionContent className="overflow-hidden rounded-md">
              <p>
                Dancify는 비대면으로 춤을 배울 수 있도록 돕는 AI 안무 연습
                서비스입니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 어떤 사람이 이용하면 좋을까요?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>
                Dancify는 춤을 배우고 싶은 누구나 사용할 수 있습니다. 특히
                경제적, 시간적, 공간적 부담이나 외모, 성격, 실력 부족 등의
                문제로 대면 수업이 어려운 사람들이 비대면 수업으로도 충분히 춤을
                배울 수 있도록 하는 것이 목표입니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 어떻게 연습을 할 수 있나요?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <ol>
                <li>댄스 게시판에서 원하는 게시글을 골라 클릭합니다.</li>
                <li>안무 연습 시작을 누르면 가능합니다.</li>
                <li>연습 모드와 실전 모드 중 하나를 선택해주세요.</li>
                <li>원하는 구간을 선택할 수 있습니다.</li>
                <li>춤을 춘 뒤 점수를 확인할 수 있습니다.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 웹캠을 켰는데 모델이 불러와지지 않습니다.
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>웹캠을 켜고 얼굴이 인식되어야 합니다.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 점수 그래프를 신체 부위별로 하나씩만 볼 수 있나요?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>범례를 클릭하시면 점수 그래프를 끄고 켤 수 있습니다.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 가만히 있어도 점수가 잘 나옵니다.
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>
                얼굴을 기준으로 어깨는 점수가 잘나오는 경우가 있고, 댄서의
                동작에 따라서 가만히 있는 동작과 비슷할 경우(비슷한 시점)가
                점수가 잘 나올 수 있습니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 댄서블로 가입 후, 댄서로 가입하고자 하는데 어떻게 해야하나요?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>회원가입을 다시 하셔야 합니다.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 회원탈퇴는 불가한건가요?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <p>추후 추가될 기능입니다.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-[16px] md:text-lg font-normal">
              · 점수 산출 기준이 궁금합니다.
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl px-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="font-medium">1. 실기간 점수 산출</span>
                  <p>
                    댄서와 댄서블의 동작이 얼마나 유사한지 실시간으로 측정하여
                    Miss, Good, Great, Excellent으로 점수를 산출합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-medium">2. AI 피드백 점수 산출</span>
                  <div>
                    <p>
                      댄서-댄서블 동작의 관절 각도차이를 기반으로 점수를
                      산출합니다.
                    </p>
                    <p>
                      각도차이의 범위(0~180도)를 초 단위로 묶어서 평균 낸 값을
                      100~0점으로 변환(소수점 둘째자리까지)하여 점수를
                      산출합니다.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
