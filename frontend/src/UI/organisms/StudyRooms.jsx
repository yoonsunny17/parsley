import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../services/room";
import {
    useGetMyLikeRoomsQuery,
    useGetMyRoomsQuery,
} from "../../services/user";
import StudyRoomItem from "../molecules/StudyRoomItem";

function StudyRooms() {
    const isLogin = useSelector((state) => state.user.isLogin);
    const { data: getAllRooms } = useGetAllRoomsQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const { data: getMyRooms } = useGetMyRoomsQuery(
        {},
        { skip: !isLogin, refetchOnMountOrArgChange: true }
    );
    const { data: getMyLikeRooms } = useGetMyLikeRoomsQuery(
        {},
        { skip: !isLogin, refetchOnMountOrArgChange: true }
    );

    const [activeIndex, setActiveIndex] = useState(0);

    const tabClickHandler = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-white rounded-3xl border-4 border-main w-full relative">
            {/* Tab */}
            <div className="absolute top-[-40px] left-4 sm:left-[40px]">
                <div className="flex list-none text-lg gap-2 md:gap-[10px]">
                    {tabContArr.map(({ title }, idx) => (
                        <button
                            key={`tab-` + idx}
                            onClick={() => tabClickHandler(idx)}
                            className={
                                (activeIndex === idx
                                    ? "bg-main "
                                    : "bg-sub2 hover:bg-main ") +
                                "color-delay cursor-pointer text-font3 font-medium text-base rounded-t-2xl h-[36px] px-3 truncate w-[28%] sm:min-w-max pt-1"
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
                        <div>???????????? ?????????</div>
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

                {/* ?????? ????????? */}
                {activeIndex === 1 &&
                    (!isLogin ? (
                        <div>???????????? ???????????????</div>
                    ) : getMyRooms?.rooms.length === 0 ? (
                        <div>???????????? ?????? ???????????? ?????????</div>
                    ) : (
                        getMyRooms?.rooms.slice(0, 8).map((room, idx) => {
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

                {/* ?????? ????????? */}
                {activeIndex === 2 &&
                    (!isLogin ? (
                        <div>???????????? ???????????????</div>
                    ) : getMyLikeRooms?.rooms.length === 0 ? (
                        <div>?????? ?????? ???????????? ?????????</div>
                    ) : (
                        getMyLikeRooms?.rooms.slice(0, 8).map((room, idx) => {
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
            </div>
            <div className="px-6 mt-4 mb-8 md:px-10 w-full flex justify-end text-font1 hover:text-main font-semibold color-delay">
                <Link to="/room">?????????</Link>
            </div>
        </div>
    );
}

const tabContArr = [
    { title: "?????? ?????????" },
    { title: "?????? ?????????" },
    { title: "?????? ?????????" },
];

export default StudyRooms;
