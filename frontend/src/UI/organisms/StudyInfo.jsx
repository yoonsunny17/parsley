import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "../../services/room";
import Button from "../atoms/Button";

function StudyInfo() {
    const params = useParams();
    const { data } = useGetRoomQuery(params.id);

    const [like, setLike] = useState(false);

    return (
        <div className="container max-auto flex flex-wrap justify-between mb-20">
            {/* 스터디 이미지 */}
            <div className="w-1/4 aspect-square overflow-hidden relative lg:w-1/3 rounded-2xl shadow border-4 border-sub1">
                <img
                    alt="스터디 이미지"
                    src={data?.roomInfo.imageUrl}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* 스터디 상세 정보 */}
            <div className="study-contents flex flex-col gap-3 w-2/3 lg:w-7/12 min-h-min">
                <div className="text-2xl font-semibold mb-2">
                    {data?.roomInfo.name}
                </div>
                <div className="text-base font-normal">인원 : 4/6</div>
                <div className="mb-6 flex gap-2">
                    {data?.roomInfo.hashtags.map((hashtag, idx) => {
                        return (
                            <span
                                key={`tag-${idx}`}
                                className="text-base font-semibold bg-sub1 text-font3 rounded-[10px] px-2 py-1"
                            >
                                {`# ${hashtag}`}
                            </span>
                        );
                    })}
                </div>

                <div className="mb-6">
                    <div className="text-font1 text-base font-normal">
                        {data?.roomInfo.description}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button text={"참가하기"} />

                    <button className="text-3xl text-font1 rounded-[50px]">
                        <i className="bx bx-link"></i>
                    </button>

                    {!like && (
                        <button className="text-3xl text-heart rounded-[50px]">
                            <i className="bx bx-heart"></i>
                        </button>
                    )}
                    {like && (
                        <button className="text-3xl text-heart rounded-[50px]">
                            <i className="bx bxs-heart"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudyInfo;
