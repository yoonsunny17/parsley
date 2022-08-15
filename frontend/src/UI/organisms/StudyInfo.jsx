import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "../../services/room";
import Button from "../atoms/Button";

function StudyInfo() {
    const params = useParams();
    const { data } = useGetRoomQuery(params.id, {
        refetchOnMountOrArgChange: true,
    });

    const [like, setLike] = useState(false);

    // member일 경우 -> 입장하기 Button + 탈퇴하기 Button

    // hostUser일 경우 -> 설정 Button 추가해서 편집 모달 띄우기

    return (
        <div className="container flex flex-wrap gap-10">
            {/* 스터디 이미지 */}
            <div className="w-full lg:w-[30%] flex justify-center">
                <div className="w-[20%] p-[20%] lg:w-full aspect-square overflow-hidden relative rounded-2xl shadow border-4 border-sub1">
                    <img
                        alt="스터디 이미지"
                        src={data?.roomInfo.imageUrl}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </div>
            </div>
            {/* 스터디 상세 정보 */}
            <div className="flex flex-col justify-between gap-4 min-h-min w-full px-2 lg:w-7/12 lg:px-0">
                {/* Header: 이름 + 태그 */}
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="text-2xl font-semibold">
                            {data?.roomInfo.name}
                        </div>
                        {data?.roomInfo.hashtags.length > 0 && (
                            <div className="flex gap-2 mt-2">
                                {data?.roomInfo.hashtags.map((hashtag, idx) => {
                                    return (
                                        <span
                                            key={`tag-${idx}`}
                                            className="text-sm font-semibold bg-sub1 text-font3 rounded-[10px] px-2 py-1"
                                        >
                                            {`# ${hashtag}`}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {/* Content: 상세 정보 */}
                    <div className="flex flex-col gap-2">
                        <div className="text-sm flex">
                            <div className="mr-4 text-extra3">방장</div>
                            <div className="font-light text-extra5">
                                {data?.roomInfo.hostUser.name}
                            </div>
                        </div>
                        <div className="text-sm flex">
                            <div className="mr-4 min-w-max text-extra3">
                                인원
                            </div>
                            <span className="font-light text-extra5">
                                {data?.roomInfo.members.length} /{" "}
                                {data?.roomInfo.maxPopulation} 명
                            </span>
                        </div>
                        <div className="text-sm flex">
                            <div className="mr-4 min-w-max text-extra3">
                                소개
                            </div>
                            <div className="text-sm font-light text-extra5">
                                {data?.roomInfo.description}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer: 참가 버튼 */}
                <div className="flex items-center gap-4">
                    <Button text={"참가하기"} />

                    <button className="text-font1 rounded-[50px]">
                        <i className="bx text-3xl bx-link"></i>
                    </button>

                    {!like && (
                        <button className="text-heart rounded-[50px]">
                            <i className="bx text-3xl bx-heart"></i>
                        </button>
                    )}
                    {like && (
                        <button className="text-heart rounded-[50px]">
                            <i className="bx text-3xl bxs-heart"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudyInfo;
