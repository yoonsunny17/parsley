import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRoomQuery } from "../../services/room";
import Button from "../atoms/Button";

function StudyInfo() {
  const params = useParams();
  const { data } = useGetRoomQuery(params.id, {
    refetchOnMountOrArgChange: true,
  });

  const [like, setLike] = useState(false);
  const user = useSelector((state) => state.user.user);

  // member일 경우 -> 입장하기 Button + 탈퇴하기 Button

  // hostUser일 경우 -> 설정 Button 추가해서 편집 모달 띄우기 ( 모달에서 삭제 가능하도록 ?)

  //   console.log(data?.roomInfo.hostUser.name);
  //   console.log(user?.name);

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
            <div className="text-2xl font-semibold">{data?.roomInfo.name}</div>
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
              <div className="mr-4 min-w-max text-extra3">인원</div>
              <span className="font-light text-extra5">
                {data?.roomInfo.members.length} / {data?.roomInfo.maxPopulation}{" "}
                명
              </span>
            </div>
            <div className="text-sm flex">
              <div className="mr-4 min-w-max text-extra3">소개</div>
              <div className="text-sm font-light text-extra5">
                {data?.roomInfo.description}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: 참가 버튼 */}
        <div className="flex items-center gap-4">
          {user?.name && data?.roomInfo.hostUser.name ? (
            <div>
              <Link to={`/room/session/${params.id}`}>
                <Button text={"참가하기"} />
              </Link>
              {/* // FIXME: 설정 버튼 다른 디자인으로 바꿀것! */}
              <button className=" color-delay rounded-full text-sm font-semibold bg-main hover:bg-sub2 text-font3">
                <label
                  htmlFor="editSession"
                  className="cursor-pointer px-4 py-2"
                >
                  수정하기
                </label>
              </button>
              <input type="checkbox" id="editSession" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box">
                  <div className="flex justify-between">
                    <div className="text-lg font-bold mb-3">방 정보 수정</div>
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
                  <div>비공개/공개 여부: 비번도 바꿀수있나?</div>
                  <div class="modal-action">
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
            <div>
              <Link to={`/room/session/${params.id}`}>
                <Button text={"참가하기"} />
              </Link>
              {/* // FIXME: 탈퇴하기 버튼 다른 디자인으로 바꿀것! */}
              <Button text={"탈퇴하기"} />
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

export default StudyInfo;
