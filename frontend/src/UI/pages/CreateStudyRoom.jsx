import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRoomMutation } from "../../services/room";
import Button from "../atoms/Button";
import HashTags from "../molecules/HashTags";
import Navbar from "../organisms/Navbar";
import { useForm } from "react-hook-form";
import { useForm } from "react-hook-form";

const initialValue = {
    name: "",
    mode: "0",
    description: "",
    maxPopulation: 1,
    isPublic: "public",
    password: "",
};

function CreateStudyRoom() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [hashtags, setHashtags] = useState([]);
    const [createRoom] = useCreateRoomMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        watch,
    } = useForm({
        defaultValues: initialValue,
    });
    watch();

    const maxPopulation = [...Array(8).keys()].map((i) => i + 1);

  const handleFileChange = ({ target }) => {
    setFile(target.files[0]);
  };

    const convertFormData = (room) => {
        const formData = new FormData();
        formData.append("imgUrl", file);
        formData.append(
            "roomInfo",
            new Blob([JSON.stringify(room)], { type: "application/json" })
        );
        return formData;
    };

    const onSubmit = async (data) => {
        const room = {
            ...data,
            mode: data.mode === "0" ? 0 : 1,
            isPublic: data.isPublic === "public" ? true : false,
            hashtags,
        };
        const roomData = convertFormData(room);
        const { roomId } = await createRoom(roomData).unwrap();
        navigate(`/room/${roomId}`);
    };

  const handleEnter = (e) => e.key === "Enter" && e.preventDefault();

    return (
        <div className="text-extra5">
            <Navbar />
            <div className="flex flex-col rounded-3xl shadow-md px-8 py-9">
                <div className="text-xl font-bold">스터디룸 생성하기</div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyPress={handleEnter}
                >
                    <div className="my-12 flex flex-col gap-7">
                        {/* 스터디룸 이름 */}
                        <div className="flex align-top">
                            <label
                                className="text-base font-medium w-32 md:w-48"
                                htmlFor="name"
                            >
                                스터디룸 이름
                            </label>
                            <div>
                                <input
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message:
                                                "스터디룸 이름을 입력해주세요",
                                        },
                                        minLength: {
                                            value: 2,
                                            message:
                                                "최소 2글자, 최대 20글자 입력해주세요",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "최소 2글자, 최대 20글자 입력해주세요",
                                        },
                                    })}
                                    className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
                                    id="name"
                                    type="text"
                                    placeholder="스터디룸 이름을 입력하세요"
                                />
                                <div className="text-red-500 text-xs mt-2">
                                    {errors.name?.message}{" "}
                                </div>
                            </div>
                        </div>

                        {/* 커버 이미지 */}
                        <div className="flex align-top mb-2">
                            <label
                                className="text-base font-medium w-32 md:w-48"
                                htmlFor="fileUpload"
                            >
                                커버 이미지
                            </label>
                            <React.Fragment>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    name="imgFile"
                                    accept="image/*"
                                    className="w-2/3"
                                    onChange={handleFileChange}
                                />
                            </React.Fragment>
                        </div>

                        {/* 모드 선택 (손꾸락 얼구리) */}
                        <div className="flex align-top mb-2">
                            <label className="text-base font-medium w-32 md:w-48">
                                모드 선택
                            </label>
                            {/* mode */}
                            <input
                                {...register("mode")}
                                type="radio"
                                id="cam"
                                value="0"
                            />
                            <label htmlFor="cam" className="ml-2 mr-4">
                                손꾸락 모드
                            </label>

                            <input
                                {...register("mode")}
                                type="radio"
                                id="screen"
                                value="1"
                            />
                            <label htmlFor="screen" className="ml-2">
                                얼구리 모드
                            </label>
                        </div>

                        {/* 해시태그  */}
                        <div className="flex align-top mb-2">
                            <label
                                className="text-base font-medium w-32 md:w-48"
                                htmlFor="hashTags"
                            >
                                해시 태그
                            </label>
                            <div className="w-7/12">
                                <HashTags setHashtags={setHashtags} />
                            </div>
                        </div>

                        {/* 스터디룸 설명 */}
                        <div className="flex align-top">
                            <label
                                className="text-base font-medium w-32 md:w-48"
                                htmlFor="introduce"
                            >
                                스터디룸 설명
                            </label>
                            <div className="w-7/12">
                                <textarea
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message:
                                                "스터디룸 설명을 입력하세요",
                                        },
                                        minLength: {
                                            value: 3,
                                            message:
                                                "최소 3글자, 최대 255글자 입력해주세요",
                                        },
                                        maxLength: {
                                            value: 255,
                                            message:
                                                "최소 3글자, 최대 255글자 입력해주세요",
                                        },
                                    })}
                                    className="rounded-md bg-extra4 w-full px-3 py-2 input-border input-placeholder"
                                    type="text"
                                    name="description"
                                    placeholder="스터디 목적, 내용, 규칙 등 스터디룸에 대한 정보를 설명해 주세요"
                                />
                                <div className="text-red-500 text-xs">
                                    {errors.description?.message}{" "}
                                </div>
                            </div>
                        </div>

                        {/* 최대 참가 인원 */}
                        <div className="flex align-top mb-2">
                            <label
                                className="text-base font-medium w-32 md:w-48"
                                htmlFor="maxPopulation"
                            >
                                최대 참가 인원
                            </label>
                            <select
                                {...register("maxPopulation")}
                                id="maxPopulation"
                                className="rounded-md bg-extra4 text-center px-3 py-1 input-border input-placeholder"
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
                            <label className="text-base font-medium w-32 md:w-48">
                                공개 여부
                            </label>
                            {/* isPublic */}
                            <input
                                {...register("isPublic")}
                                type="radio"
                                id="public"
                                value="public"
                            />
                            <label htmlFor="public" className="ml-2 mr-4 pt-1">
                                공개
                            </label>
                            <input
                                {...register("isPublic")}
                                type="radio"
                                id="private"
                                value="private"
                            />
                            <label htmlFor="private" className="ml-2 pt-1">
                                비공개
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value:
                                            getValues("isPublic") === "private",
                                        message: "비밀번호를 입력해주세요",
                                    },
                                })}
                                disabled={
                                    !(getValues("isPublic") === "private")
                                }
                                name="password"
                                type="current-password"
                                className="ml-4 w-28 rounded-md bg-extra4 px-3 py-1 focus:outline-none input-placeholder"
                            />
                            <div>{errors.password?.message}</div>
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
