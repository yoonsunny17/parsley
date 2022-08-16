import { useState } from "react";

function StudyKing() {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabClickHandler = (index) => {
        setActiveIndex(index);
    };

    // 나인 경우 active 속성 주기

    return (
        <div className="bg-white rounded-3xl border-4 border-main w-full relative">
            {/* Tab */}
            <div className="absolute top-[-40px] left-[40px]">
                <div className="flex list-none text-lg gap-[10px]">
                    {tabContArr.map(({ title }, idx) => (
                        <button
                            key={`tab-` + idx}
                            onClick={() => tabClickHandler(idx)}
                            className={
                                (activeIndex === idx
                                    ? "bg-main "
                                    : "bg-sub2 hover:bg-main ") +
                                "color-delay cursor-pointer text-font3 font-medium text-sm rounded-t-2xl h-[36px] px-3 pt-1"
                            }
                        >
                            {title}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content */}
            <div className="px-6 md:px-10 py-6 w-full gap-x-3 gap-y-5 md:gap-x-5">
                {activeIndex === 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="font-bold">
                                <tr>
                                    <th>순위</th>
                                    <th>닉네임</th>
                                    <th>상태 메세지</th>
                                    <th>참여 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#D5A11E] text-3xl"></i>
                                    </td>
                                    <td>슬리파슬리</td>
                                    <td>
                                        슬리파는파슬리가아니지만파슬리는슬리파가아니다
                                    </td>
                                    <td>28시간 12분</td>
                                </tr>
                                {/* row 2 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#A3A3A3] text-3xl"></i>
                                    </td>
                                    <td>꿈꾸는멸치</td>
                                    <td>
                                        멸치는프로틴을먹고몸짱이되고싶었지만그래도멸치
                                    </td>
                                    <td>25시간 26분</td>
                                </tr>
                                {/* row 3 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#CD7F32] text-3xl"></i>
                                    </td>
                                    <td>고수는멋있어</td>
                                    <td>고수는맛있고고수는멋있어</td>
                                    <td>25시간 19분</td>
                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <td className="pl-[28px]">4</td>
                                    <td className="text-sm">유교보이</td>
                                    <td className="text-sm">
                                        유교보이는다리가3.5개라네
                                    </td>
                                    <td className="text-sm">23시간 19분</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="text-sm">
                                <tr>
                                    <th>순위</th>
                                    <th>닉네임</th>
                                    <th>상태 메세지</th>
                                    <th>도감 점수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#D5A11E] text-3xl"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {/* row 2 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#A3A3A3] text-3xl"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {/* row 3 */}
                                <tr className="text-sm">
                                    <td>
                                        <i className="bx bx-medal text-[#CD7F32] text-3xl"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <td className="pl-[28px]">4</td>
                                    <td className="text-sm"></td>
                                    <td className="text-sm"></td>
                                    <td className="text-sm"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

const tabContArr = [{ title: "공부왕" }, { title: "농부왕" }];

export default StudyKing;
