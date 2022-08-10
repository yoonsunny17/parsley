import React, { useState } from "react";
import HerbItemAvatar from "../atoms/HerbItemAvatar";
import CollectionItem from "../molecules/CollectionItem";
// import CollectionItem from "../molecules/CollectionItem";
import FarmCollectionAvartar from "../atoms/FarmCollectionAvartar";

function FarmCollection() {
  const username = "유교보이";
  const herbname = "프로틴 중독 파슬리";
  const grade = "희귀";
  const description =
    "근육으로 똘똘 뭉친 파슬리이다... 먹으면 막강해질지도... ?";
  const isOpened = "6";

  const [myHerb, setMyHerb] = useState(0);
  const tabHerbHandler = (idx) => {
    setMyHerb(idx);
  };

  const [size, setSize] = useState(0);
  const resizeHandler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
  };

  return (
    // <div className="px-[30px] py-[35px] w-[30%] bg-white rounded-[30px] drop-shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"></div>
    <div className="w-full md:w-[32%] rounded-2xl bg-white drop-shadow px-8 py-5">
      <div className="font-basic text-lg font-bold mb-2">
        {username}님의 도감
      </div>
      <div className="flex my-6">
        {/* // TODO: 대표 프로필 AVATAR 크기는 좀 크게 할까 ? */}
        <HerbItemAvatar
          imgUrl={
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          }
        />
        <div className="font-semibold text-sm mt-3">
          {herbname} [{grade}] <br />
          <span className="font-semibold text-xs">{description}</span>
        </div>
      </div>
      {/* // TODO: 농장페이지 도감 컴포넌트 */}
      <div className="text-sm font-semibold my-8">
        파슬리 [ {isOpened} / 32 ]
      </div>
      <div className="">
        <div className="grid grid-cols-4 lg:grid-cols-5 justify-items-center gap-y-3">
          {tabHerbArr[myHerb].herbCollectionList.map((info, idx) => {
            // return <CollectionItem info={info} key={idx} />;
            return <FarmCollectionAvartar info={info} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}

const tabHerbArr = [
  {
    title: "농장 페이지 허브 도감",
    herbCollectionList: [
      {
        name: "멍멍!",
        imgUrl: "/herbs/rosemary.png",
        description: "오오",
      },
      {
        name: "멍멍!",
        imgUrl: "/herbs/arugula.png",
      },
      {
        name: "멍멍!",
        imgUrl: "/herbs/barberry.png",
      },
      {
        name: "멍멍!",
        imgUrl: "/herbs/cress.png",
      },
      {
        name: "멍멍!",
        imgUrl: "/herbs/anise.png",
      },
      {
        name: "멍멍!",
        imgUrl: "/herbs/clove.png",
      },
    ],
  },
];
export default FarmCollection;
