import React, { useState } from "react";
import Button from "../atoms/Button";

function TodayStudy() {
    const [percent, setPercent] = useState(0);

    const radialProgress = document.querySelector("#radialProgress");

    const [showModal, setShowModal] = useState(false);

    const handleGoalBtn = () => {
        setShowModal((current) => !current);
        console.log(showModal);
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("The button was clicked");
    };

    const [hour, setHour] = useState("");
    const [min, SetMin] = useState("");
    const [sec, setSec] = useState("");

    const changeHour = (e) => {
        setHour(e.target.value);
    };

    const changeMin = (e) => {
        SetMin(e.target.value);
    };

    const changeSec = (e) => {
        setSec(e.target.value);
    };

    return (
        <div className="rounded-2xl mb-4 shadow px-8 py-5 w-full md:w-[32%] md:mb-0">
            <div className="flex justify-between min-w-max">
                <h3 className="text-[24px] font-bold">오늘의 목표</h3>
                <Button onClick={handleGoalBtn} text={"목표 설정"} />
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto">
                            {/* content */}
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white px-6 py-6">
                                {/* header */}
                                <div className="w-full">
                                    <h2 className="text-lg font-semibold">
                                        오늘의 목표
                                    </h2>
                                    <h3 className="font-basic text-sm">
                                        오늘의 목표 시간을 설정해주세요
                                    </h3>
                                </div>
                                {/* body */}
                                <form onSubmit={handleClick}>
                                    <div className="flex justify-center items-center w-80 my-6">
                                        <input
                                            className="w-14 border-red-100 border-2 text-center"
                                            type="number"
                                            placeholder="0"
                                            value={hour}
                                            onChange={changeHour}
                                        />{" "}
                                        <span className="font-bold mr-4">
                                            &nbsp;시간
                                        </span>
                                        <input
                                            className="w-14 rounded-[15px] border-[2px] border-sub1 text-center"
                                            type="number"
                                            placeholder="0"
                                            value={min}
                                            onChange={changeMin}
                                        />{" "}
                                        <span className="font-bold">
                                            &nbsp;분
                                        </span>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end gap-4">
                                        <Button
                                            onClick={handleGoalBtn}
                                            text={"취소"}
                                        />
                                        <Button type="submit" text={"적용"} />
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
                            ? " mt-6 mb-5 text-[#CDDC39] radial-progress [--size:12rem]"
                            : " mt-6 mb-5 text-[#CDDC39] radial-progress [--size:6rem]"
                    }
                >
                    <p className="text-font1 text-[20px]">{percent}%</p>
                </div>
                {/* <div>
          브라우저 화면 사이즈 x: {window.innerWidth}, y:{window.innerHeight}
        </div> */}
                <div>
                    {hour}시간 {min}분 {sec}초
                </div>
            </div>
        </div>
    );
}

export default TodayStudy;
