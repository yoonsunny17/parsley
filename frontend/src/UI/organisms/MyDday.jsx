import React, { useState, useEffect } from "react";
import { useCreateDDayMutation } from "../../services/study";
import { useSelector } from "react-redux";
import { FaCog } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";

function MyDday() {
    const [showModal, setShowMdoal] = React.useState(false);
    const handleModal = () => {
        setShowMdoal((current) => !current);
    };

    const user = useSelector((state) => state.user.user);
    const pastDDay = user?.dDay;
    const [dDay, setDDay] = useState(null);
    const [text, setText] = useState("디데이를 설정해주세요");

    const [createDDay] = useCreateDDayMutation();

    const calcDiff = (curDDay) => {
        const today = new Date();
        const realToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const diff = parseInt(
            (new Date(curDDay).getTime() -
                realToday.getTime() -
                1000 * 60 * 60 * 9) /
                (1000 * 60 * 60 * 24)
        );
        let diffText;

        if (diff > 0) {
            diffText = diff * -1;
        } else if (diff === 0) {
            diffText = "-day";
        } else {
            diffText = "+" + diff * -1;
        }
        return diffText;
    };

    const dDaySave = async (e) => {
        const secondDate = moment(document.querySelector("#targetDate").value);
        const diffText = calcDiff(secondDate._i);

        await createDDay(secondDate._i).unwrap();
        setDDay(secondDate._i);
        setText(secondDate._i + " 까지 D" + diffText);
        handleModal();
    };

    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substring(0, 10);

    useEffect(() => {
        if (pastDDay) {
            const diffText = calcDiff(pastDDay);
            setDDay(pastDDay);
            setText(pastDDay + " 까지 D" + diffText);
        }
    });

    return (
        <div className="rounded-2xl w-full md:w-[32%] shadow p-8 flex flex-col justify-between">
            <div>
                <div>
                    <div className="my-2 font-bold text-lg">
                        {moment().format("YYYY. M. D (ddd)")}
                    </div>
                </div>

                <div>
                    <div className="my-6 text-2xl font-bold">
                        <h3 className="text-base">{text}</h3>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-[65px]">
                <button onClick={handleModal}>
                    <FaCog />
                </button>
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative mx-auto max-w-3xl w-[340px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 gap-6">
                                {/*header*/}
                                <div className="flex items-start justify-between w-full">
                                    <h3 className="text-lg font-semibold">
                                        D-Day 설정
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative flex w-full justify-center items-center">
                                    <label
                                        htmlFor=""
                                        className="text-base font-semibold mr-2"
                                    >
                                        날짜
                                    </label>
                                    <input
                                        type="date"
                                        id="targetDate"
                                        defaultValue={date}
                                        className="border border-main rounded-[5px] p-[2px_8px] focus:border-sub1"
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end gap-[10px]">
                                    <button
                                        className="color-delay bg-sub1 text-font3 rounded-full px-4 py-2 text-sm hover:bg-[#7DAA71]"
                                        onClick={handleModal}
                                    >
                                        취소
                                    </button>
                                    <button
                                        className="color-delay rounded-full px-4 py-2 text-sm bg-main hover:bg-sub2 text-font3"
                                        onClick={dDaySave}
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
}

export default MyDday;
