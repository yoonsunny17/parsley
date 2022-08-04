import React, { useState } from "react";
import Button from "../../UI/atoms/Button";
import HashTags from "../../UI/molecules/HashTags";
import axios from "axios";

function CreateStudyRoom() {
  const [mode, setMode] = useState([]);
  const selectMode = (event) => {
    setMode(event.target.value);
  };

  const [isOpen, setIsOpen] = useState([]);
  const selectOpenMode = (event) => {
    setIsOpen(event.target.value);
  };

  const maxPopulation = [...Array(6).keys()].map((i) => i + 1);

  const preventDefault = (event) => {
    event.preventDefault();
  };

  // console.log(maxPopulation);
  const fileInput = React.useRef(null);
  const handleBtnClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    console.log(e.target.files[0]);

    await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:3000/room/create",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="font-basic flex justify-start flex-col rounded-3xl shadow-md px-8 py-9">
      <div className="text-2xl font-bold">스터디룸 생성하기</div>

      <form
        action="localhost/8080/room"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="my-12 flex flex-col gap-8">
          {/* // TODO: 스터디룸 이름 */}
          <div className="flex align-top">
            <label className="text-lg font-bold w-32 md:w-48" htmlFor="title">
              스터디룸 이름
            </label>
            <input
              className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
              type="text"
              name="title"
              placeholder="스터디룸 이름을 입력하세요"
            />
          </div>

          {/* // TODO: 커버 이미지 */}
          {/* <div className="flex align-top">
            <label
              className="text-lg font-bold w-32 md:w-48"
              htmlFor="fileUpload"
            >
              커버 이미지
            </label>
            <React.Fragment>
              <Button onClick={handleBtnClick} text={"이미지 업로드"} />
              <input
                onChange={handleChange}
                ref={fileInput}
                type="file"
                id="fileUpload"
                accept="image/*"
                className="w-2/3 hidden"
              />
            </React.Fragment>
          </div> */}

          {/* // TODO: 모드 선택 (손꾸락 얼구리) */}
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
              value="only cam"
              checked={mode === "only cam"}
              onChange={selectMode}
            />
            <label htmlFor="cam" className="text-lg ml-2 mr-4">
              손꾸락 모드
            </label>

            <input
              type="radio"
              id="screen"
              name="mode"
              value="both cam and screen"
              checked={mode === "both cam and screen"}
              onChange={selectMode}
            />
            <label htmlFor="screen" className="text-lg ml-2">
              얼구리 모드
            </label>
          </div>

          {/* // TODO: 해시태그  */}
          <div className="flex align-top">
            <label
              className="text-lg font-bold w-32 md:w-48"
              htmlFor="hashTags"
            >
              해시 태그
            </label>
            <div>
              <HashTags />
            </div>
          </div>

          {/* // TODO: 스터디룸 설명 */}
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
            />
          </div>

          {/* // TODO: 최대 참가 인원 */}
          <div className="flex align-top">
            <label className="text-lg font-bold w-32 md:w-48" htmlFor="maximum">
              최대 참가 인원
            </label>
            <select
              className="rounded-md bg-extra4 text-center px-3 py-1 input-border input-placeholder"
              name="maximum"
            >
              {maxPopulation.map((val, idx) => (
                <option key={idx} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          {/* // TODO: 공개 여부 */}
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
              checked={isOpen === "public"}
              onChange={selectOpenMode}
            />
            <label htmlFor="public" className="text-lg ml-2 mr-4">
              공개
            </label>
            <input
              name="isPublic"
              type="radio"
              id="private"
              value="private"
              checked={isOpen === "private"}
              onChange={selectOpenMode}
            />
            <label htmlFor="private" className="text-lg ml-2">
              비공개
            </label>
            {isOpen === "private" ? (
              <input
                name="password"
                type="password"
                className="ml-4 w-28 rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
              />
            ) : (
              <input
                disabled
                name="password"
                type="password"
                className="ml-4 w-28 rounded-md bg-extra4 px-3 py-1 border-2 focus:outline-none input-placeholder"
              />
            )}
          </div>
        </div>
        {/* submit */}
        <div className="flex justify-end">
          <Button text={"생성하기"} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateStudyRoom;
