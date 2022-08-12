import React, { useState } from "react";
import { useCreateRoomMutation } from "../../services/room";
import Button from "../atoms/Button";
import HashTags from "../molecules/HashTags";
import Navbar from "../organisms/Navbar";

function CreateStudyRoom() {
  const initialValue = {
    name: "",
    mode: "cam",
    imgFile: "",
    hashTags: [],
    description: "",
    maxPopulation: 1,
    isPublic: "public",
    password: "",
  };

  const [room, setRoom] = useState(initialValue);

  const maxPopulation = [...Array(6).keys()].map((i) => i + 1);

  const [createRoom] = useCreateRoomMutation();

  const handleChange = ({ target }) => {
    setRoom((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    if (target.name === "isPublic" && target.value === "public") {
      setRoom((prev) => ({
        ...prev,
        password: "",
      }));
    }
    console.log(`${target.name}: ${target.value}`);
  };

  const handleSubmit = async (event) => {
    await createRoom(room);
    // roomId값 받아와서 room/roomId로 이동
  };

  const handleEnter = (event) =>
    event.key === "Enter" && event.preventDefault();

  return (
    <div className="text-font1">
      <Navbar />
      <div className="font-basic flex justify-start flex-col rounded-3xl shadow-md px-8 py-9">
        <div className="text-2xl font-bold">스터디룸 생성하기</div>

        <form onSubmit={handleSubmit} onKeyPress={handleEnter}>
          <div className="my-12 flex flex-col gap-8">
            {/* 스터디룸 이름 */}
            <div className="flex align-top">
              <label className="text-lg font-bold w-32 md:w-48" htmlFor="title">
                스터디룸 이름
              </label>
              <input
                className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
                type="text"
                name="title"
                placeholder="스터디룸 이름을 입력하세요"
                onChange={handleChange}
              />
            </div>

            {/* 커버 이미지 */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="fileUpload"
              >
                커버 이미지
              </label>
              <React.Fragment>
                {/* <label htmlFor="fileUpload"></label> */}
                <input
                  type="file"
                  id="fileUpload"
                  name="imgFile"
                  accept="image/*"
                  className="w-2/3"
                  value={room.imgFile}
                  onChange={handleChange}
                />
              </React.Fragment>
            </div>

            {/* 모드 선택 (손꾸락 얼구리) */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="selectMode"
              >
                모드 선택
              </label>
              {/* mode */}
              <input
                type="radio"
                id="cam"
                name="mode"
                value="cam"
                checked={room.mode === "cam"}
                onChange={handleChange}
              />
              <label htmlFor="cam" className="text-lg ml-2 mr-4">
                손꾸락 모드
              </label>

              <input
                type="radio"
                id="screen"
                name="mode"
                value="screen"
                checked={room.mode === "screen"}
                onChange={handleChange}
              />
              <label htmlFor="screen" className="text-lg ml-2">
                얼구리 모드
              </label>
            </div>

            {/* 해시태그  */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="hashTags"
              >
                해시 태그
              </label>
              <div className="w-7/12">
                <HashTags setRoom={setRoom} />
              </div>
            </div>

            {/* 스터디룸 설명 */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="introduce"
              >
                스터디룸 설명
              </label>
              <textarea
                className="rounded-md bg-extra4 w-7/12 px-3 py-1 input-border input-placeholder"
                type="text"
                name="description"
                placeholder="스터디 목적, 내용, 규칙 등 스터디룸에 대한 정보를 설명해 주세요"
                value={room.description}
                onChange={handleChange}
              />
            </div>

            {/* 최대 참가 인원 */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="maxPopulation"
              >
                최대 참가 인원
              </label>
              <select
                className="rounded-md bg-extra4 text-center px-3 py-1 input-border input-placeholder"
                name="maxPopulation"
                onChange={handleChange}
              >
                {maxPopulation.map((val, idx) => (
                  <option key={idx} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            {/* 공개 여부 */}
            <div className="flex align-top">
              <label
                className="text-lg font-bold w-32 md:w-48"
                htmlFor="selectMode"
              >
                공개 여부
              </label>
              {/* mode */}
              <input
                name="isPublic"
                type="radio"
                id="isPublic"
                value="public"
                checked={room.isPublic === "public"}
                onChange={handleChange}
              />
              <label htmlFor="public" className="text-lg ml-2 mr-4">
                공개
              </label>
              <input
                name="isPublic"
                type="radio"
                id="private"
                value="private"
                checked={room.isPublic === "private"}
                onChange={handleChange}
              />
              <label htmlFor="private" className="text-lg ml-2">
                비공개
              </label>
              <input
                disabled={room.isPublic === "public"}
                name="password"
                type="current-password"
                value={room.password}
                onChange={handleChange}
                className="ml-4 w-28 rounded-md bg-extra4 px-3 py-1 border-2 focus:outline-none input-placeholder"
              />
            </div>
          </div>

          {/* submit */}
          <div className="flex justify-end">
            <Button text={"생성하기"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudyRoom;
