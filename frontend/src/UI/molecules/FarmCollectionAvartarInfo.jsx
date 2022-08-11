// 농장 페이지 우측에 있는 도감 컴포넌트의 아바타 atomic components
import React from "react";
import Swal from "sweetalert2";

// FIXME: sweetalert로 description 보여주기
function FarmCollectionAvartarInfo({
  info: { name, imgUrl, grade, description, isOpened },
}) {
  return (
    <div>
      {isOpened ? (
        <img
          className="cursor-pointer inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-sub1"
          src={imgUrl}
          alt="avatar"
          onClick={() => {
            Swal.fire({
              width: 350,
              title: [name, grade],
              text: [description],
              imageUrl: [imgUrl], // 시간 되면 여기 사진 다른걸로 바꾸기
              imageWidth: 50,
              imageHeight: 50,
              imageAlt: "Herb Collection Image",
            });
          }}
        />
      ) : (
        <img
          className="cursor-pointer inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-extra1"
          src="/herbs/isNotOpened.png"
          alt="avatar"
          onClick={() => {
            Swal.fire({
              width: 350,
              icon: "error",
              title: "Oops...",
              text: "아직 획득하지 못했어요!",
              footer: "슬리를 획득하여 허브 도감을 채워보세요:)",
            });
          }}
        />
      )}
    </div>
    // <div className="tooltip" data-tip={description}>
    // </div>
  );
}

export default FarmCollectionAvartarInfo;
