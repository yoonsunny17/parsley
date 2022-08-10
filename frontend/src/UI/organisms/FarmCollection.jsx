import React, { useState } from "react";
import HerbItemAvatar from "../atoms/HerbItemAvatar";
import CollectionItem from "../molecules/CollectionItem";
// import CollectionItem from "../molecules/CollectionItem";
import FarmCollectionAvartar from "../atoms/FarmCollectionAvartar";
import FarmCollectionAvartarInfo from "../molecules/FarmCollectionAvartarInfo";

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
            return <FarmCollectionAvartarInfo info={info} key={idx} />;
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
        name: "파슬리",
        imgUrl: "/herbs/normal_parsley.png",
        grade: "일반",
        description: "모두함께 PARSLEY!",
        isOpened: true,
      },
      {
        name: "바질",
        imgUrl: "/herbs/normal_basil.png",
        grade: "일반",
        description: "음식 위에 바질 올리면 200% 더 맛있어 보여요",
        isOpened: true,
      },
      {
        name: "자스민",
        imgUrl: "/herbs/normal_jasmine.png",
        grade: "일반",
        description: "자스민 티 마시면 잠이 잘와요",
        isOpened: false,
      },
      {
        name: "캣잎",
        imgUrl: "/herbs/normal_spinach.png",
        grade: "일반",
        description: "나는 깻잎이 아니애오옹",
        isOpened: true,
      },
      {
        name: "오레가노",
        imgUrl: "/herbs/normal_oregano.png",
        grade: "일반",
        description: "이거 먹으면 집중력이 오레가노? 킥킥 ..",
        isOpened: false,
      },
      {
        name: "민트",
        imgUrl: "/herbs/normal_mint.png",
        grade: "일반",
        description: "민트가 치약맛이 아니라 치약이 민트맛인거라구욧!",
        isOpened: true,
      },
      {
        name: "제라늄",
        imgUrl: "/herbs/normal_geranium.png",
        grade: "일반",
        description: "제라늄 처음 들어본다늄?",
        isOpened: true,
      },
      {
        name: "히비스커스",
        imgUrl: "/herbs/normal_hibiscus.png",
        grade: "일반",
        description:
          "알쓸신잡) PARSLEY 프론트엔드 전OO은 별다방의 히비스커스 티를 좋아함",
        isOpened: true,
      },
      {
        name: "라벤더",
        imgUrl: "/herbs/normal_lavender.png",
        grade: "일반",
        description: "라벤더는 향도 좋지만 색도 이뻐요",
        isOpened: true,
      },
      {
        name: "레몬밤",
        imgUrl: "/herbs/normal_lemonbalm.png",
        grade: "일반",
        description:
          "설마 진짜로 레몬밤이랑 레몬이랑 같다고 생각하지는 않겠죠오오오?",
        isOpened: true,
      },
      {
        name: "로즈마리",
        imgUrl: "/herbs/normal_rosemary.png",
        grade: "일반",
        description: "킁킁... 어디서 좋은 냄새가 나는데요?",
        isOpened: true,
      },
      {
        name: "딜",
        imgUrl: "/herbs/normal_dill.png",
        grade: "일반",
        description: "오늘 레몬 딜 버터를 만들어 보는건 어때요?",
        isOpened: true,
      },
      {
        name: "캐모마일",
        imgUrl: "/herbs/normal_chamomile.png",
        grade: "일반",
        description:
          "잠 안올 때 캐모마일이 좋대요. 그래서 내가 잠이 오는건ㄱㅏ...",
        isOpened: true,
      },
      {
        name: "스테비아",
        imgUrl: "/herbs/normal_stevia.png",
        grade: "일반",
        description: "다이어터들의 사랑! 당은 포기모태~",
        isOpened: true,
      },
      {
        name: "씨슬",
        imgUrl: "/herbs/normal_thysil.png",
        grade: "일반",
        description:
          "알쓸신잡) 간에 좋은 밀크씨슬이라는 약초는 씨슬이라는 꽃의 줄기에서 나오는 우윳빛 진액이며, 한국식 이름은 엉겅퀴이다.",
        isOpened: true,
      },
      {
        name: "타임",
        imgUrl: "/herbs/normal_thyme.png",
        grade: "일반",
        description: "타임이 노화 방지에 좋대요.. 얼른 구하러 가야겠다!",
        isOpened: true,
      },
    ],
  },
];
export default FarmCollection;
