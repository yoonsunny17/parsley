import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateRoomMutation } from "../../services/room";
import Button from "../atoms/Button";
import HashTags from "../molecules/HashTags";
import Navbar from "../organisms/Navbar";

function CreateStudyRoom() {
    const initialValue = {
        name: "",
        mode: 0,
        hashTags: [],
        description: "",
        maxPopulation: 1,
        isPublic: "true",
        password: "",
    };

    const location = useLocation();
    const [room, setRoom] = useState(initialValue);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [createRoom, { data }] = useCreateRoomMutation();

    const maxPopulation = [...Array(6).keys()].map((i) => i + 1);

    const handleFileChange = ({ target }) => {
        setFile(target.files[0]);
        setFileName(target.value);
    };

    const handleValueChange = ({ target }) => {
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
    };

    const convertFormData = () => {
        const formData = new FormData();
        formData.append("imgUrl", file);
        formData.append(
            "roomInfo",
            new Blob([JSON.stringify(room)], { type: "application/json" })
        );
        return formData;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRoom((prev) => ({
            ...prev,
            isPublic: prev.isPublic === "true",
        }));

        const roomData = convertFormData();
        console.log(roomData);

        createRoom(roomData);
        console.log(data);
        // location(`/room/${data.roomId}`);
    };

    const handleEnter = (e) => e.key === "Enter" && e.preventDefault();

    return (
        <div className="text-font1">
            <Navbar />
            <div className="font-basic flex justify-start flex-col rounded-3xl shadow-md px-8 py-9">
                <div className="text-2xl font-bold">스터디룸 생성하기</div>

                <form onSubmit={handleSubmit} onKeyPress={handleEnter}>
                    <div className="my-12 flex flex-col gap-8">
                        {/* 스터디룸 이름 */}
                        <div className="flex align-top">
                            <label
                                className="text-lg font-bold w-32 md:w-48"
                                htmlFor="title"
                            >
                                스터디룸 이름
                            </label>
                            <input
                                className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
                                type="text"
                                name="title"
                                placeholder="스터디룸 이름을 입력하세요"
                                onChange={handleValueChange}
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
                                    onChange={handleFileChange}
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
                                value={0}
                                checked={room.mode == 0}
                                onChange={handleValueChange}
                            />
                            <label htmlFor="cam" className="text-lg ml-2 mr-4">
                                손꾸락 모드
                            </label>

                            <input
                                type="radio"
                                id="screen"
                                name="mode"
                                value={1}
                                checked={room.mode == 1}
                                onChange={handleValueChange}
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
                                onChange={handleValueChange}
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
                                onChange={handleValueChange}
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
                                type="radio"
                                id="public"
                                name="isPublic"
                                value="true"
                                checked={room.isPublic === "true"}
                                onChange={handleValueChange}
                            />
                            <label
                                htmlFor="public"
                                className="text-lg ml-2 mr-4"
                            >
                                공개
                            </label>
                            <input
                                type="radio"
                                id="private"
                                name="isPublic"
                                value="false"
                                checked={room.isPublic === "false"}
                                onChange={handleValueChange}
                            />
                            <label htmlFor="private" className="text-lg ml-2">
                                비공개
                            </label>
                            <input
                                disabled={room.isPublic === "false"}
                                name="password"
                                type="current-password"
                                value={room.password}
                                onChange={handleValueChange}
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
