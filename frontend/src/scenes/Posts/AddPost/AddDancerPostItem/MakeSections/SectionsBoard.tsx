import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { postActions } from "@features/post/postSlice";
import { X } from "lucide-react";
import formatSeconds from "@util/formatSeconds";
import { Button } from "@components/ui/button";

export default function SectionsBoard() {
  const dispatch = useAppDispatch();
  const timeStamps = useAppSelector((state) => state.post.timeStamps);

  return (
    <div className="h-full w-full rounded-md border">
      <div className="col-center w-full border-b py-2">
        <h3 className="font-meidum text-xl">선택한 구간 목록</h3>
      </div>

      <div className="col-center w-full p-3">
        {/* timeStamps 리스트를 2개씩 묶어서 시간 표현 */}
        <ul className="col-center m-0 w-full gap-3 p-0">
          {timeStamps.map((timeStamp, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={timeStamp.time}
                  className="row-between w-full rounded-md border px-3"
                >
                  <div className="row-between w-full">
                    <div>{formatSeconds(timeStamp.time)}</div>
                    {timeStamps[index + 1]?.time && (
                      <>
                        <span className="text-lg font-bold">-</span>
                        <div>{formatSeconds(timeStamps[index + 1]?.time)}</div>
                      </>
                    )}
                  </div>

                  <Button
                    variant={"ghost"}
                    className="m-0 ml-4 h-10 w-10 p-0 transition-all hover:text-red-500"
                    onClick={() => {
                      dispatch(postActions.removeTimeStamp(timeStamp.time));
                      dispatch(
                        postActions.removeTimeStamp(timeStamps[index + 1]?.time)
                      );
                    }}
                  >
                    <X />
                  </Button>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
