import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useGetGoalQuery, useCreateGoalMutation } from "../../services/study";
import { FaCog } from "react-icons/fa";
import "moment/locale/ko";

function TodayStudy(args) {
    const now = new Date();
    const dayOfWeek = now.getDay() - 1;

    const weekly = useSelector((state) => state.study.weekly);
    const studyTime = weekly[dayOfWeek].hour * 60;

    const [createGoal] = useCreateGoalMutation();
    const { data: goal } = useGetGoalQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    let timePercent = 0;

    const [percent, setPercent] = useState();
    const [hour, setHour] = useState(0);
    const [min, SetMin] = useState(0);
    const [targetHour, setTargetHour] = useState();
    const [targetMin, setTargetMin] = useState();
    const [targetTime, setTargetTime] = useState();

    useEffect(() => {
        if (!targetTime) {
            setTargetTime(goal.targetTime);
            setTargetHour((targetTime / 60).toFixed(0));
            setTargetMin(targetTime % 60);
        }
        timePercent = Math.floor((studyTime / targetTime) * 100);
        if (isNaN(timePercent)) {
            setPercent("0");
        } else {
            setPercent(timePercent);
        }
    }, [targetTime]);

    const changeHour = (e) => {
        setHour(e.target.value);
    };
    const changeMin = (e) => {
        SetMin(e.target.value);
    };

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal((current) => !current);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createGoal(parseInt(hour) * 60 + parseInt(min)).unwrap();

        setTargetHour(hour);
        setTargetMin(min);
        setTargetTime(parseInt(hour) * 60 + parseInt(min));
        timePercent = Math.floor((studyTime / targetTime) * 100);
        if (isNaN(timePercent)) {
            setPercent("0");
        } else {
            setPercent(timePercent);
        }
        console.log(percent);
        handleModal();
    };

    return (
        <div className="rounded-2xl mb-4 shadow px-8 py-5 w-full lg:w-[32%] md:w-[100%] md:mb-0">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-xl font-bold">오늘의 목표</h3>
                </div>
                <button onClick={handleModal}>
                    <FaCog />
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5">
                                    <h3 className="text-[14px] font-semibold">
                                        오늘의 목표를 설정해 주세요
                                    </h3>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleSubmit}>
                                    {/* prevent default! */}
                                    <div className="relative w-[480px] p-[20px_100px] flex gap-[30px] justify-center items-center">
                                        <input
                                            className="w-[60px] h-[60px] rounded-[15px] border-[2px] border-sub1 text-center"
                                            type="number"
                                            value={hour}
                                            min="0"
                                            max="23"
                                            onChange={changeHour}
                                        />{" "}
                                        <span className="font-bold">시간</span>
                                        <input
                                            className="w-[60px] h-[60px] rounded-[15px] border-[2px] border-sub1 text-center"
                                            type="number"
                                            value={min}
                                            min="0"
                                            max="59"
                                            onChange={changeMin}
                                        />{" "}
                                        <span className="font-bold">분</span>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6  gap-[20px]">
                                        <button
                                            onClick={handleModal}
                                            className="bg-sub1 text-font3 rounded-[50px] p-[3px_17px]"
                                        >
                                            취소
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-main text-font3 rounded-[50px] p-[3px_17px]"
                                        >
                                            적용
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* circle progress bar: daisyUI*/}
            <div className="flex flex-col items-center">
                <div
                    id="radialProgress"
                    style={{ "--value": percent }}
                    className={
                        window.innerWidth > 1035
                            ? " mt-6 mb-5 text-sub1 radial-progress [--size:12rem]"
                            : " mt-6 mb-5 text-[#CDDC39] radial-progress [--size:6rem]"
                    }
                >
                    <p className="text-font1 text-[20px]">{percent}%</p>
                </div>
                <div>
                    {hour === "" ? null : <span>{targetHour}시간</span>}
                    {min === "" ? null : <span>{targetMin}분</span>}
                </div>
            </div>
        </div>
    );
}

export default TodayStudy;
