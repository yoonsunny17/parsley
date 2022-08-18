import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";

function CompareWeekStudy() {
    const lastWeek = useSelector((state) => state.study.lastWeek);
    const thisWeek = useSelector((state) => state.study.weekly);

    const [thisAvgTime, setThisAvgTime] = useState(0);
    const [lastAvgTime, setLastAvgTime] = useState(0);
    const [text, setText] = useState("늘었습니다.");

    const thisHourPerMinute = (thisAvgTime / 24) * 100;
    const lastHourPerMinute = (lastAvgTime / 24) * 100;

    useEffect(() => {
        if (lastWeek) {
            setLastAvgTime((lastWeek / 7).toFixed(2));
        }
        if (thisWeek) {
            let time = 0;
            for (var i = 0; i < thisWeek.length; i++) {
                time += thisWeek[i].hour;
            }
            setThisAvgTime((time / 7).toFixed(2));
        }
        if (thisAvgTime < lastAvgTime) {
            setText("줄었습니다.");
        }
    });

    return (
        <div className="rounded-2xl w-full lg:w-[32%] shadow px-8 py-5 mb-5">
            <div className="text-base">
                <i className="text-xl"></i>
                <span className="font-semibold">주간 공부량 비교</span>
                <p className="text-sm mt-3">
                    이번주 평균 공부량이 지난주보다{" "}
                    <span className="font-bold">{text}</span>
                </p>{" "}
            </div>
            <div className="flex items-center w-full">
                <div className="w-full py-12">
                    <div className="flex justify-between items-center">
                        <div className="flex font-bold text-lg items-center gap-[5px]">
                            {lastAvgTime}{" "}
                            <span className="text-[12px] mt-[2px] text-[#979797]">
                                시간/일
                            </span>
                        </div>
                        <div className="flex font-bold text-[12px] items-center gap-[5px] text-[#979797]">
                            지난 주
                        </div>
                    </div>
                    <progress
                        className="progress progress-success w-full h-[16px]"
                        value={lastHourPerMinute}
                        max="100"
                    ></progress>
                    <div className="flex justify-between items-center">
                        <div className="flex font-bold text-lg mt-[10px] items-center gap-[5px]">
                            {thisAvgTime}{" "}
                            <span className="text-[12px] mt-[5px] text-[#979797]">
                                시간/일
                            </span>
                        </div>
                        <div className="flex font-bold text-[12px] mt-[10px] items-center gap-[5px] text-[#979797]">
                            이번 주
                        </div>
                    </div>
                    <progress
                        className="progress progress-success w-full h-[16px]"
                        value={thisHourPerMinute}
                        max="100"
                    ></progress>
                </div>
            </div>
        </div>
    );
}

export default CompareWeekStudy;
