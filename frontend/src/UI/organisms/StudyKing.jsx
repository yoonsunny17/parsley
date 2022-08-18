import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    useGetGongbuRankingByRoomIdQuery,
    useGetNongbuRankingByRoomIdQuery,
} from "../../services/ranking";
import { BiMedal } from "react-icons/bi";

function StudyKing() {
    const user = useSelector((state) => state.user.user);

    const [activeIndex, setActiveIndex] = useState(0);
    const color = ["gold", "silver", "bronze"];
    const params = useParams();
    const { data: getGongbuRankingsByRoomId } =
        useGetGongbuRankingByRoomIdQuery(params.id, {
            refetchOnMountOrArgChange: true,
        });
    const { data: getNongbuRankingsByRoomId } =
        useGetNongbuRankingByRoomIdQuery(params.id, {
            refetchOnMountOrArgChange: true,
        });

    // console.log(getGongbuRankingsByRoomId?.topRank);

    const tabClickHandler = (index) => {
        setActiveIndex(index);
    };

    const calcTime = (seconds) => {
        var hour, min, sec;
        hour = parseInt(seconds / 3600);
        min = parseInt((seconds % 3600) / 60);
        sec = seconds % 60;

        if (hour.toString().length == 1) hour = "0" + hour;
        if (min.toString().length == 1) min = "0" + min;
        if (sec.toString().length == 1) sec = "0" + sec;

        return hour + ":" + min + ":" + sec;
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
                                {getGongbuRankingsByRoomId?.topRank.map(
                                    (rank, idx) => {
                                        return (
                                            <tr
                                                className={`text-sm ${
                                                    user.name === rank.name
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <td>
                                                    {idx < 3 ? (
                                                        <BiMedal
                                                            className={`bx bx-medal text-${color[idx]} text-3xl`}
                                                        />
                                                    ) : (
                                                        idx
                                                    )}
                                                </td>
                                                <td>{rank.name}</td>
                                                <td>{rank.description}</td>
                                                <td>{calcTime(rank.score)}</td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="text-bold">
                                <tr>
                                    <th>순위</th>
                                    <th>닉네임</th>
                                    <th>상태 메세지</th>
                                    <th>도감 점수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getNongbuRankingsByRoomId?.topRank.map(
                                    (rank, idx) => {
                                        return (
                                            <tr
                                                className={`text-sm ${
                                                    user.name === rank.name
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <td>
                                                    {idx < 3 ? (
                                                        <BiMedal
                                                            className={`bx bx-medal text-${color[idx]} text-3xl`}
                                                        />
                                                    ) : (
                                                        idx
                                                    )}
                                                </td>
                                                <td>{rank.name}</td>
                                                <td>{rank.description}</td>
                                                <td>{rank.score}</td>
                                            </tr>
                                        );
                                    }
                                )}
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
