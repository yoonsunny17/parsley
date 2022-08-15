import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "../../services/room";
import {
    useJoinRoomMutation,
    useWithdrawRoomMutation,
} from "../../services/userRoom";
import Button from "../atoms/Button";
import Swal from "sweetalert2";

function StudyInfo() {
    const isLogin = useSelector((state) => state.user.isLogin);
    const user = useSelector((state) => state.user.user);
    const [like, setLike] = useState(false);

    const params = useParams();
    const { data, refetch } = useGetRoomQuery(params.id, {
        refetchOnMountOrArgChange: true,
        selectFromResult: ({ data }) => ({
            data,
        }),
    });
    const [joinRoom, { isSuccess: isJoinRoomSuccess }] = useJoinRoomMutation();
    const [withdrawRoom] = useWithdrawRoomMutation();

    const handleJoinRoom = () => {
        if (isLogin) {
            joinRoom(params.id);
            if (isJoinRoomSuccess) {
                refetch();
            }
        } else {
            Toast.fire({
                icon: "info",
                title: "로그인이 필요합니다.",
            });
        }
    };

    const handleWithdrawRoom = () => {
        Swal.fire({
            title: "정말로 탈퇴하실건가요?",
            width: 450,
            text: "한 번 나가면 돌이킬 수 없어요!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "나갈래",
            cancelButtonText: "잘못 눌렀어",
        }).then(async (res) => {
            const result = await withdrawRoom(params.id).unwrap();
            if (result && res.isConfirmed) {
                Swal.fire({
                    icon: "info",
                    title: "다른 스터디룸에서 만나요!",
                    text: "오늘도 화이팅 :)",
                });
            }
        });
    };

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
                                            className="text-sm bg-sub1 text-font3 rounded-[10px] px-2 py-1"
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
                    {/* 호스트인 경우 */}
                    {isLogin && user?.id === data?.roomInfo.hostUser.id ? (
                        <div className="flex gap-2">
                            {/* 지금 바로 공부하러 가는거 */}
                            <Link to={`/room/session/${params.id}`}>
                                <Button text={"입장하기"} />
                            </Link>
                            {/* // FIXME: 설정 버튼 다른 디자인으로 바꿀것! */}
                            <button className="color-delay rounded-full text-sm bg-main hover:bg-sub2 text-font3">
                                <label
                                    htmlFor="editSession"
                                    className="cursor-pointer px-4 py-2"
                                >
                                    수정하기
                                </label>
                            </button>
                            <input
                                type="checkbox"
                                id="editSession"
                                className="modal-toggle"
                            />
                            <div className="modal">
                                <div className="modal-box">
                                    <div className="flex justify-between">
                                        <div className="text-lg font-bold mb-3">
                                            방 정보 수정
                                        </div>
                                        <button>
                                            <label
                                                htmlFor="editSession"
                                                className="cursor-pointer px-2 py-2"
                                            >
                                                닫기
                                            </label>
                                        </button>
                                    </div>

                                    <div>방 제목</div>
                                    <div>최대 인원</div>
                                    <div>소개</div>
                                    <div>
                                        비공개/공개 여부: 비번도 바꿀수있나?
                                    </div>
                                    <div className="modal-action">
                                        {/* // TODO: 적용하기, 취소, 닫기 버튼 만들기 */}
                                        <button className="cursor-pointer px-2 py-2">
                                            수정하기
                                        </button>
                                        <button className="cursor-pointer px-2 py-2">
                                            방 삭제하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {/* 한번도 참여한 적 없는 경우 "추가하기" 버튼 활성화   */}
                            {data?.roomInfo.members.filter(
                                (member) => member.id === user?.id
                            ).length === 0 && (
                                <Button
                                    text={"추가하기"}
                                    onClick={handleJoinRoom}
                                />
                            )}

                            {/* 한번이라도 참여한 적 있는 경우 "참가하기" 버튼 활성화 */}
                            {data?.roomInfo.members.filter(
                                (member) => member.id === user?.id
                            ).length > 0 && (
                                <>
                                    <Link to={`/room/session/${params.id}`}>
                                        <Button text={"입장하기"} />
                                    </Link>
                                    {/* // FIXME: 탈퇴하기 버튼 다른 디자인으로 바꿀것! */}
                                    <Button
                                        text={"탈퇴하기"}
                                        onClick={handleWithdrawRoom}
                                    />
                                </>
                            )}
                        </div>
                    )}

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

const Toast = Swal.mixin({
    toast: true,
    width: 320,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

export default StudyInfo;
