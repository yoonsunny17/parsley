import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../services/room";
import StudyRoomItem from "../molecules/StudyRoomItem";

function StudyRooms() {
    const { data: getAllRooms } = useGetAllRoomsQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    // myRoomList
    // interestRoomList

    const [activeIndex, setActiveIndex] = useState(0);

    const tabClickHandler = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-white rounded-3xl border-4 border-main w-full relative">
            {/* Tab */}
            <div className="absolute top-[-44px] left-4 sm:left-[40px]">
                <div className="flex list-none text-lg gap-2 md:gap-[10px]">
                    {tabContArr.map(({ title }, idx) => (
                        <button
                            key={`tab-` + idx}
                            onClick={() => tabClickHandler(idx)}
                            className={
                                (activeIndex === idx
                                    ? "bg-main "
                                    : "bg-sub2 hover:bg-main ") +
                                "color-delay cursor-pointer text-font3 font-medium text-base rounded-t-2xl h-[44px] px-3 truncate w-[28%] sm:min-w-max"
                            }
                        >
                            {title}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content */}
            <div className="px-6 pt-8 md:px-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
                {activeIndex === 0 &&
                    (getAllRooms?.roomsInfo.length === 0 ? (
                        <div>스터디가 없어요</div>
                    ) : (
                        getAllRooms?.roomsInfo.slice(0, 8).map((room, idx) => {
                            return (
                                <Link
                                    to={`/room/${room.id}`}
                                    key={`room-${idx}`}
                                >
                                    <StudyRoomItem info={room} key={idx} />
                                </Link>
                            );
                        })
                    ))}
                {/* {activeIndex === 1 && getMyRooms?.roomsInfo.length === 0 ? (
                    <div>참가하고 있는 스터디가 없어요</div>
                ) : (
                    getMyRooms?.roomsInfo.slice(0, 8).map((room, idx) => {})
                )} */}
                {/* {activeIndex === 2 && getInterestRooms?.roomsInfo.length === 0 ? (<div>관심 있는 스터디가 없어요</div> : (interestRooms?.roomsInfo.slice(0, 8).map((room, idx) => { })))} */}
            </div>
            <div className="px-6 mt-4 mb-8 md:px-10 w-full flex justify-end text-font1 hover:text-main font-semibold color-delay">
                <Link to="/room">더보기</Link>
            </div>
        </div>
    );
}

const tabContArr = [
    { title: "전체 공부방" },
    { title: "나의 공부방" },
    { title: "관심 공부방" },
];

export default StudyRooms;
