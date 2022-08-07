import { useState } from "react";
// import { useGetRoomQuery } from "../../services/room";
import Button from "../atoms/Button";

function StudyInfo({ roomId }) {
    // const { data, error, isLoading } = useGetRoomQuery(roomId);

    const [like, setLike] = useState(false);

    return (
        <div className="container max-auto flex flex-wrap justify-between mb-20">
            {/* 스터디 이미지 */}
            <div className="w-1/4 aspect-square overflow-hidden relative lg:w-1/3 rounded-2xl shadow border-4 border-sub1">
                <img
                    alt="스터디 이미지"
                    src="https://images.unsplash.com/photo-1643148636630-0b0fb138fc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* 스터디 상세 정보 */}
            <div className="study-contents flex flex-col gap-3 w-2/3 lg:w-7/12 min-h-min">
                <div className="text-2xl font-semibold mb-2">
                    모각코 스터디 모여라!
                </div>
                <div className="text-base font-normal">인원 : 4/6</div>
                <div className="mb-6 flex gap-2">
                    <span className="text-base font-semibold bg-sub1 text-font3 rounded-[10px] px-2 py-1">
                        #모각코
                    </span>
                    <span className="text-base font-semibold bg-sub1 text-font3 rounded-[10px] px-2 py-1">
                        #취뽀
                    </span>
                    <span className="text-base font-semibold bg-sub1 text-font3 rounded-[10px] px-2 py-1">
                        #개발자
                    </span>
                </div>

                <div className="mb-6">
                    <div className="text-xl font-bold mb-2">
                        스터디 규칙 안내
                    </div>
                    <div className="text-font1 text-base font-normal">
                        <li className="list-none">
                            1. 오전 9시부터 오후 6시까지 필참!
                        </li>
                        <li className="list-none">2. 방장 말이 곧 법이다.</li>
                        <li className="list-none">3. 지각 시 1분당 1000원</li>
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
