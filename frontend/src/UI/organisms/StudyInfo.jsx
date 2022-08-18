import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetRoomQuery, useUpdateRoomMutation } from "../../services/room";
import {
  useAddLikeRoomMutation,
  useDeleteLikeRoomMutation,
  useJoinRoomMutation,
  useWithdrawRoomMutation,
} from "../../services/userRoom";
import Button from "../atoms/Button";
import Swal from "sweetalert2";
import { Toast } from "../../util/common";
import { setRoom } from "../../modules/roomReducer";
import { useEffect } from "react";

import { BiEditAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";

function StudyInfo() {
  const dispatch = useDispatch();
  const params = useParams();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.room);
  const [like, setLike] = useState(false);
  const [edit, setEdit] = useState(false);

  const { data, isLoading: isGetRoomLoading } = useGetRoomQuery(params.id, {
    refetchOnMountOrArgChange: true,
  });
  const [joinRoom] = useJoinRoomMutation();
  const [withdrawRoom] = useWithdrawRoomMutation();
  const [addLikeRoom] = useAddLikeRoomMutation();
  const [deleteLikeRoom] = useDeleteLikeRoomMutation();

  const onCancel = () => {
    setEdit(false);
  }; // 취소 버튼 누르면 편집 취소

  const initialValue = {
    id: room?.id,
    name: room?.name,
    // maxPopulation: room?.maxPopulation,
    description: room?.description,
    // mode: room?.mode,
    isPublic: room?.public,
  };

  const [newRoomInfo, setNewRoomInfo] = useState(initialValue);
  const [updateInfo] = useUpdateRoomMutation();

  const handleChange = ({ target }) => {
    setNewRoomInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateInfo(newRoomInfo);
    setEdit(false);
  };

  const handleEnter = (e) => e.key === "Enter" && e.preventDefault();

  const onClickEdit = () => {
    console.log(newRoomInfo);
  };

  // TODO: 비밀번호 있는 방인 경우 처리
  const handleJoinRoom = async () => {
    if (isLogin && data?.roomInfo.isPublic) {
      if (data?.roomInfo.members.length === data?.roomInfo.maxPopulation) {
        Toast.fire({
          icon: "error",
          title: "인원이 가득 찼습니다.",
        });
        return;
      }
      await joinRoom(params.id);
      Toast.fire({
        icon: "success",
        title: "나의 스터디에 추가되었습니다.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      Toast.fire({
        icon: "info",
        title: "로그인이 필요합니다.",
      });
    }
  };

  //   // 로그인은 되어있는 사용자인데, 아직 한번도 참가한 적이 없다면?
  //   // 1. 비밀번호를 눌러주세요
  //   // 2-1. 비밀번호를 옳게 눌렀다면? 나의 스터디에 추가되었습니다
  //   // 2-2. 비밀번호를 틀렸다면? 다시 입력해 주세요

  //   const handlePassword = async () => {
  //     const { value: password } = await Swal.fire({
  //       title: "비밀번호를 입력해 주세요",
  //       input: "password",
  //       inputLabel: "Password",
  //       inputPlaceholder: "password",
  //     });
  //     if (password === data?.roomInfo.password) {
  //       await joinRoom(params.id);
  //       Toast.fire({
  //         icon: "success",
  //         title: "나의 스터디에 추가되었습니다.",
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1500);
  //     } else {
  //       Toast.fire({
  //         icon: "info",
  //         title: "로그인이 필요합니다.",
  //       });
  //     }
  //   };

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
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    });
  };

  const handleAddLikeRoom = async () => {
    if (isLogin) {
      await addLikeRoom(params.id);
      setLike(true);
      Toast.fire({
        icon: "success",
        title: "관심 스터디에 추가되었습니다.",
      });
    } else {
      Toast.fire({
        icon: "info",
        title: "로그인이 필요합니다.",
      });
    }
  };

  const handleDeleteLikeRoom = async () => {
    if (isLogin) {
      await deleteLikeRoom(params.id);
      setLike(false);
      Toast.fire({
        icon: "success",
        title: "관심 스터디에서 제거되었습니다.",
      });
    } else {
      Toast.fire({
        icon: "info",
        title: "로그인이 필요합니다.",
      });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_APP_URL}/room/${params.id}`
    );
    Toast.fire({
      icon: "success",
      title: "링크가 복사되었습니다!",
    });
  };

  useEffect(() => {
    setLike(user?.interestRooms.find((item) => item.id === room?.id));
    if (!isGetRoomLoading) {
      dispatch(setRoom(data?.roomInfo));
    }
  }, [
    user?.interestRooms,
    isGetRoomLoading,
    room?.id,
    dispatch,
    data?.roomInfo,
  ]);

  return (
    <div className="container flex flex-wrap gap-10">
      {/* 스터디 이미지 */}
      <div className="w-full lg:w-[30%] flex justify-center">
        <div className="w-[20%] p-[20%] lg:w-full aspect-square overflow-hidden relative rounded-2xl shadow border-4 border-sub1">
          <img
            alt="스터디 이미지"
            src={room?.imageUrl}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
      {/* 스터디 상세 정보 */}
      <div className="flex flex-col justify-between gap-4 min-h-min w-full px-2 lg:w-7/12 lg:px-0">
        {/* Header: 이름 + 태그 */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-2xl font-semibold">{room?.name}</div>
            {room?.hashtags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {room?.hashtags.map((hashtag, idx) => {
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
                {room?.hostUser.name}
              </div>
            </div>
            <div className="text-sm flex">
              <div className="mr-4 text-extra3 min-w-max">모드</div>
              <span className="font-light text-extra5">
                {room?.mode === 0 ? "손꾸락" : "얼구리"}
              </span>
            </div>
            <div className="text-sm flex">
              <div className="mr-4 min-w-max text-extra3">인원</div>
              <span className="font-light text-extra5">
                {room?.members.length} / {room?.maxPopulation} 명
              </span>
            </div>
            <div className="text-sm flex">
              <div className="mr-4 min-w-max text-extra3">소개</div>
              <div className="text-sm font-light text-extra5">
                {room?.description}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: 참가 버튼 */}
        <div className="flex items-center gap-4">
          {/* 호스트인 경우 */}
          {isLogin && user?.id === room?.hostUser.id ? (
            <div className="flex gap-2">
              {/* 지금 바로 공부하러 가는거 */}
              <Link to={`/room/session/${params.id}`}>
                <Button text={"입장하기"} />
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              {/* 한번도 참여한 적 없는 경우 "추가하기" 버튼 활성화   */}
              {room?.members.filter((member) => member.id === user?.id)
                .length === 0 && (
                <Button text={"추가하기"} onClick={handleJoinRoom} />
              )}

              {/* 한번이라도 참여한 적 있는 경우 "참가하기" 버튼 활성화 */}
              {room?.members.filter((member) => member.id === user?.id).length >
                0 && (
                <>
                  <Link to={`/room/session/${params.id}`}>
                    <Button text={"입장하기"} />
                  </Link>
                  {/* // FIXME: 탈퇴하기 버튼 다른 디자인으로 바꿀것! */}
                  <Button text={"탈퇴하기"} onClick={handleWithdrawRoom} />
                </>
              )}
            </div>
          )}

          {/* 클립보드 */}
          <button onClick={copyLink} className="text-font1 rounded-[50px]">
            <i className="bx text-3xl bx-link"></i>
          </button>

          {/* 좋아요 */}
          {!like && (
            <button
              className="text-heart rounded-[50px]"
              onClick={handleAddLikeRoom}
            >
              <i className="bx text-3xl bx-heart"></i>
            </button>
          )}
          {like && (
            <button
              className="text-heart rounded-[50px]"
              onClick={handleDeleteLikeRoom}
            >
              <i className="bx text-3xl bxs-heart"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyInfo;
