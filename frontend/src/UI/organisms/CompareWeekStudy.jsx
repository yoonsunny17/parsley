import React, { useEffect, useState } from "react";

function CompareWeekStudy() {
    // const[value, setValue] = useState(0);
    // const onChange = () => {
    //   setValue(value + 1);
    // }

    const [thisAvgTime, setThisAvgTime] = useState(10);
    const [lastAvgTime, setLastAvgTime] = useState(16);
    // 데이터가 어떻게 들어오는지에 따라서 로직 추가
    const thisHourPerMinute = (thisAvgTime / 24) * 100;
    const lastHourPerMinute = (lastAvgTime / 24) * 100;

    const [text, setText] = useState("늘었습니다.");

    useEffect(() => {
        if (thisAvgTime < lastAvgTime) {
            setText("줄었습니다.");
        }
    }, []);

    return (
        <div className="mx-0 shadow-sm rounded-[10px] p-[12px_16px] w-full lg:w-[32%] border-[2px] border-sub1 ">
            <div className="text-base font-semibold mb-[10px]">
                {/* <i className='bx bxs-hot text-[#FF5B23] text-[21px]'></i> */}
                <span className="text-[20px] font-basic">주간 공부량 비교</span>
                <p className="text-[16px] mt-[20px]">
                    이번주 평균 공부량이 지난주보다{" "}
                    <span className="font-bold font-basic">{text}</span>
                </p>{" "}
                {/*데이터 비교해서 넣기 (줄었습니다, 늘었습니다 부분) */}
            </div>
            <hr />
            <div className="mt-[20px]">
                {/* <button onClick={onChange} className="bg-gray-300">test btn</button> */}
                <div className="flex justify-between items-center">
                    <div className="flex font-bold text-[24px] mt-[30px] items-center gap-[5px]">
                        {thisAvgTime}{" "}
                        <span className="text-[12px] mt-[2px] text-[#979797]">
                            시간/일
                        </span>
                    </div>
                    <div className="flex font-bold text-[12px] mt-[35px] items-center gap-[5px] text-[#979797]">
                        이번 주
                    </div>
                </div>
                <progress
                    className="progress progress-success w-full h-[16px]"
                    value={thisHourPerMinute}
                    max="100"
                ></progress>
                <div className="flex justify-between items-center">
                    <div className="flex font-bold text-[24px] mt-[10px] items-center gap-[5px]">
                        {lastAvgTime}{" "}
                        <span className="text-[12px] mt-[5px] text-[#979797]">
                            시간/일
                        </span>
                    </div>
                    <div className="flex font-bold text-[12px] mt-[10px] items-center gap-[5px] text-[#979797]">
                        지난 주
                    </div>
                </div>
                <progress
                    className="progress progress-success w-full h-[16px]"
                    value={lastHourPerMinute}
                    max="100"
                ></progress>
            </div>
        </div>
    );
}

export default CompareWeekStudy;
