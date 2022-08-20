import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudyRoomItem from "../../UI/molecules/StudyRoomItem";
import Navbar from "../organisms/Navbar";
import { useGetAllRoomsQuery } from "../../services/room";

function ViewAllStudyRooms() {
  const { data: getAllRooms } = useGetAllRoomsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar />
      {/* <div className="text-font1 font-bold text-2xl my-5">전체 스터디룸</div> */}
      <div className="flex items-end">
        <div className="text-font1 font-bold text-2xl mt-5">전체 스터디룸</div>
        <div className="ml-4">
          <div className="flex">
            <input
              className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
              type="text"
              placeholder="스터디룸을 검색하세요"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            {/* <button type="button" className="py-1 px-2">
              search
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className="shadow rounded-2xl px-6 py-8 md:px-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5"> */}
      <div className="shadow rounded-2xl mt-4 mb-6 px-6 py-8 md:px-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
        {/* 전체 검색 결과 */}
        {getAllRooms?.roomsInfo.length === 0 ? (
          <div>스터디가 없어요</div>
        ) : (
          getAllRooms?.roomsInfo
            .filter((room) => {
              if (searchTerm === "") {
                return room;
              } else if (
                room.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return room;
              } else if (
                room.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return room;
              }
            })
            .map((room, idx) => {
              return (
                <Link to={`/room/${room.id}`} key={`room-${idx}`}>
                  <StudyRoomItem info={room} key={idx} />
                </Link>
              );
            })
        )}
      </div>
    </div>
  );
}

export default ViewAllStudyRooms;
