// 메인 페이지에 있는 도감 컴포넌트의 아바타 atomic components
// 농장 페이지랑 레이아웃이 달라서 반응형때문에 따로 만듦. 정보는 똑같음!
import React from "react";
import Swal from "sweetalert2";

// FIXME: sweetalert로 description 보여주기
function MainHerbAvatarInfo({ count, herbBook }) {
  return (
    <div>
      {count > 0 ? (
        <img
          className="cursor-pointer mx-[6px] my-1 inline-block h-10 w-10 rounded-full ring-2 ring-sub1 hover:scale-105 duration-200 cursor-pointer"
          // className="cursor-pointer inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-sub1"
          src={herbBook.imageUrl}
          alt="avatar"
          onClick={() => {
            Swal.fire({
              width: 380,
              cancelButtonColor: "#686767",
              confirmButtonColor: "#628D54",
              title: [herbBook.name],
              text: "[" + [herbBook.herbType] + "] " + [herbBook.description],
              imageUrl: [herbBook.imageUrl], // 시간 되면 여기 사진 다른걸로 바꾸기
              imageWidth: 50,
              imageHeight: 50,
              imageAlt: "Herb Collection Image",
              footer: "벌써 " + [count] + "개를 수확하셨네요:)",
            });
          }}
        />
      ) : (
        <img
          className="cursor-pointer mx-[6px] my-1 inline-block h-10 w-10 rounded-full ring-2 ring-extra1"
          // className="cursor-pointer inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-extra1"
          src="/herbs/isNotOpened.png"
          alt="avatar"
          onClick={() => {
            Swal.fire({
              width: 380,
              cancelButtonColor: "#686767",
              confirmButtonColor: "#628D54",
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

export default MainHerbAvatarInfo;
