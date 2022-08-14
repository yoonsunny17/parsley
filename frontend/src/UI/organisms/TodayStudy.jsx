import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/ko";

function TodayStudy(args) {
    const ResizedComponent = () => {
        const handleResize = () => {
            console.log(
                `browser window x-axis size: ${window.innerWidth}, y-axis size: ${window.innerHeight}`
            );
        };

        useEffect(() => {
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);
    };
    const [percent, setPercent] = useState(0);

    const [hour, setHour] = useState(0);

    const [min, SetMin] = useState(0);

    const changeHour = (e) => {
        setHour(e.target.value);
    };

    const changeMin = (e) => {
        SetMin(e.target.value);
    };

    const timePercent = Math.floor(
        ((parseInt(hour) * 60 + parseInt(min)) / 1440) * 100
    );
    const onSubmit = () => {
        setPercent(timePercent);
    };
    console.log(percent);

    const [showModal, setShowModal] = useState(false);

    const onChange = () => {
        setShowModal((current) => !current);
        console.log(showModal);
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("The button was clicked");
        onChange();
    };

    // const timePercent = Math.floor(((parseInt(hour) * 60 + parseInt(min)) / 1440) * 100);
    // console.log(timePercent);

    return (
        <div className="rounded-2xl mb-4 shadow px-8 py-5 w-full lg:w-[32%] md:w-[100%] md:mb-0">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-[24px] font-bold">오늘의 스터디</h3>
                    <p className="font-basic">
                        {moment().format("YYYY. M. D (ddd)")}
                    </p>
                </div>
                <button
                    onClick={onChange}
                    className=" bg-main text-[12px] text-font3 font-bold rounded-[50px] w-[104px] h-[32px]"
                >
                    목표 설정하기
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
                                    <h3 className="font-basic text-[14px] font-semibold">
                                        오늘의 목표를 설정해 주세요
                                    </h3>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleClick}>
                                    {/* prevent default! */}
                                    <div className="relative w-[480px] p-[20px_100px] flex gap-[30px] justify-center items-center">
                                        <input
                                            className="w-[60px] h-[60px] rounded-[15px] border-[2px] border-sub1 text-center"
                                            type="number"
                                            value={hour}
                                            min="0"
                                            max="12"
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
                                            onClick={onChange}
                                            className="bg-sub1 text-font3 rounded-[50px] p-[3px_17px]"
                                        >
                                            취소
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={onSubmit}
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
                {/* <div>
          브라우저 화면 사이즈 x: {window.innerWidth}, y:{window.innerHeight}
        </div> */}
                <div>
                    {hour === "" ? null : <span>{hour}시간</span>}
                    {min === "" ? null : <span>{min}분</span>}
                </div>
            </div>
        </div>
    );
}

export default TodayStudy;
