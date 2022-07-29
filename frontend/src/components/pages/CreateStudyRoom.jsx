import React, { useState } from "react";
import Button from "../../UI/atoms/Button";
import HashTags from "../../UI/molecules/HashTags";

function CreateStudyRoom() {
  const [mode, setMode] = useState([]);
  const selectMode = (event) => {
    console.log(event.target.value);
    setMode(event.target.value);
  };

  const maxPopulation = [...Array(6).keys()].map((i) => i + 1);

  const preventDefault = (event) => {
    event.preventDefault();
  };

  console.log(maxPopulation);

  return (
    // <div className="font-basic flex justify-start flex-col rounded-3xl">
    <div className="font-basic flex justify-start flex-col rounded-3xl shadow-md px-8 py-9">
      <div className="text-2xl font-bold">스터디룸 생성하기</div>

      <form onSubmit={preventDefault} action="">
        <div className="my-12 flex flex-col gap-8">
          <div className="flex align-top">
            <label className="text-lg font-bold w-32 md:w-48" htmlFor="title">
              스터디룸 이름
            </label>
            <input
              className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
              type="text"
              placeholder="스터디룸 이름을 입력하세요"
            />
          </div>

          <div className="flex align-top">
            <label className="text-lg font-bold w-32 md:w-48" htmlFor="image">
              커버 이미지
            </label>
            <input type="file" className="w-2/3" />
          </div>

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
              value="only cam"
              checked={mode === "only cam"}
              onChange={selectMode}
            />
            <label for="cam" className="text-lg ml-2 mr-4">
              손꾸락 모드
            </label>

            <input
              type="radio"
              id="screen"
              value="both cam and screen"
              checked={mode === "both cam and screen"}
              onChange={selectMode}
            />
            <label for="screen" className="text-lg ml-2">
              얼구리 모드
            </label>
          </div>

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
              placeholder="스터디 목적, 내용, 규칙 등 스터디룸에 대한 정보를 설명해 주세요"
            />
          </div>

          <div className="flex align-top">
            <label className="text-lg font-bold w-32 md:w-48" htmlFor="maximum">
              최대 참가 인원
            </label>
            <select
              className="rounded-md bg-extra4 text-center px-3 py-1 input-border input-placeholder"
              name="members"
            >
              {maxPopulation.map((val, idx) => (
                <option key={idx} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="flex align-top">
            <label
              className="text-lg font-bold w-32 md:w-48"
              htmlFor="selectMode"
            >
              공개 여부
            </label>
            {/* mode */}
            <input
              type="radio"
              id="public"
              value="public"
              checked={mode === "public"}
              onChange={selectMode}
            />
            <label for="public" className="text-lg ml-2 mr-4">
              공개
            </label>
            <input
              type="radio"
              id="private"
              value="private"
              checked={mode === "private"}
              onChange={selectMode}
            />
            <label for="private" className="text-lg ml-2">
              비공개
            </label>
            <input
              disabled
              type="password"
              className="ml-4 w-28 rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
            />
          </div>
        </div>
        <div className="flex justify-end">
          {/* submit */}
          <Button text={"생성하기"} />
        </div>
      </form>
    </div>
  );
}

export default CreateStudyRoom;
