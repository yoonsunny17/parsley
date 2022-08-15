import { useState } from "react";

function Ranking() {
    const [rank, setRank] = useState(999);
    const [point, setPoint] = useState(10000);

    return (
        <div className="bg-white rounded-3xl drop-shadow px-8 py-5 w-full lg:w-[32%]">
            <h3 className="text-xl font-bold text-center mb-4">
                오늘의 농부왕
            </h3>
            <ul className="list-none">
                <li className="flex items-center justify-between mb-2">
                    <span className="w-12 inline-block text-center">
                        <i className="bx bx-medal text-[#D5A11E] text-3xl"></i>
                    </span>
                    <span className="w-2/5 text-start truncate">유교보이</span>
                    <span className="w-1/3 text-end">{point} 점</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <span className="w-12 inline-block text-center">
                        <i className="bx bx-medal text-[#A3A3A3] text-3xl"></i>
                    </span>
                    <span className="w-2/5 text-start truncate">
                        슬리파슬리
                    </span>
                    <span className="w-1/3 text-end">{point} 점</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <span className="w-12 inline-block text-center">
                        <i className="bx bx-medal text-[#CD7F32] text-3xl"></i>
                    </span>
                    <span className="w-2/5 text-start truncate">
                        유교보이 가보자고라고
                    </span>
                    <span className="w-1/3 text-end">{point} 점</span>
                </li>
                <li className="flex items-center justify-between mt-4">
                    <span className="w-12 text-center">{rank}등</span>
                    <span className="w-2/5 text-start">나</span>
                    <span className="w-1/3 text-end">{point} 점</span>
                </li>
            </ul>
        </div>
    );
}

export default Ranking;
