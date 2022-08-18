import React from "react";
import FarmCollectionAvartarInfo from "../molecules/FarmCollectionAvartarInfo";
import { useSelector } from "react-redux";

function FarmCollection() {
    const herbBook = useSelector((state) => state.farm.herbBook);
    const user = useSelector((state) => state.user.user);

    // const isOpened = "16";
    let isOpendNumb = 0; // 지금까지 모은 도감 캐릭터 개수 (중복 빼고)
    for (let i = 0; i < herbBook.length; i++) {
        if (herbBook[i].count > 0) {
            isOpendNumb += 1;
        }
    }

    return (
        // FIXME: device width sm이하로 갔을 때 도감 collapse 적용 할까말까 ??????
        // <div className="px-[30px] py-[35px] w-[30%] bg-white rounded-[30px] drop-shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"></div>
        <div className="w-full md:w-[32%] rounded-2xl bg-white drop-shadow px-4 py-5 lg:px-8 lg:py-5">
            <div className="text-lg font-bold mb-2">{user?.name} 님의 도감</div>
            {/* <button className="grid items-center text-sm h-full">edit</button> */}
            <div className="flex my-6">
                {/* // TODO: 대표 프로필 AVATAR 크기는 좀 크게 할까 ? */}
                <img
                    className="inline-block mt-3 mb-3 mr-4 h-16 w-16 rounded-full ring-2 ring-sub1"
                    // src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    src={user?.herbBookImageUrl}
                    alt="avatar"
                />
                <div className="font-semibold text-sm mt-3">
                    {user?.herbBookName} &nbsp; {user?.herbBookType} <br />
                    <span className="font-semibold text-xs">
                        {user?.herbBookDescription}
                    </span>
                </div>
            </div>
            {/* // TODO: 농장페이지 도감 컴포넌트 */}
            <div className="text-sm font-semibold my-8">
                파슬리 도감 [ {isOpendNumb} / {herbBook.length} ]
            </div>
            <div className="">
                <div className="grid grid-cols-4 md:grid-cols-3 px-[2px] lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-3">
                    {herbBook.map((info, idx) => {
                        return (
                            <FarmCollectionAvartarInfo
                                count={info.count}
                                herbBook={info.herbBook}
                                key={idx}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// // collection data
// const herbCollectionList = [
//   {
//     name: "파슬리",
//     imgUrl: "/herbs/normal_parsley.png",
//     grade: "일반",
//     description: "모두함께 PARSLEY!",
//     isOpened: true,
//   },
//   {
//     name: "바질",
//     imgUrl: "/herbs/normal_basil.png",
//     grade: "일반",
//     description: "음식 위에 바질 올리면 200% 더 맛있어 보여요",
//     isOpened: true,
//   },
//   {
//     name: "자스민",
//     imgUrl: "/herbs/normal_jasmine.png",
//     grade: "일반",
//     description: "자스민 티 마시면 잠이 잘와요",
//     isOpened: false,
//   },
//   {
//     name: "캣잎",
//     imgUrl: "/herbs/normal_spinach.png",
//     grade: "일반",
//     description: "나는 깻잎이 아니애오옹",
//     isOpened: true,
//   },
//   {
//     name: "오레가노",
//     imgUrl: "/herbs/normal_oregano.png",
//     grade: "일반",
//     description: "이거 먹으면 집중력이 오레가노? 킥킥 ..",
//     isOpened: false,
//   },
//   {
//     name: "민트",
//     imgUrl: "/herbs/normal_mint.png",
//     grade: "일반",
//     description: "민초파 모여라~",
//     isOpened: true,
//   },
//   {
//     name: "제라늄",
//     imgUrl: "/herbs/normal_geranium.png",
//     grade: "일반",
//     description: "제라늄 처음 들어본다늄?",
//     isOpened: true,
//   },
//   {
//     name: "히비스커스",
//     imgUrl: "/herbs/normal_hibiscus.png",
//     grade: "일반",
//     description:
//       "오늘의 알쓸신잡! PARSLEY 프론트엔드 전OO은 별다방의 히비스커스 티를 좋아함",
//     isOpened: true,
//   },
//   {
//     name: "라벤더",
//     imgUrl: "/herbs/normal_lavender.png",
//     grade: "일반",
//     description: "라벤더는 향도 좋지만 색도 이뻐요",
//     isOpened: true,
//   },
//   {
//     name: "레몬밤",
//     imgUrl: "/herbs/normal_lemonbalm.png",
//     grade: "일반",
//     description:
//       "설마 진짜로 레몬밤이랑 레몬이랑 같다고 생각하지는 않겠죠오오오?",
//     isOpened: true,
//   },
//   {
//     name: "로즈마리",
//     imgUrl: "/herbs/normal_rosemary.png",
//     grade: "일반",
//     description: "킁킁... 어디서 좋은 냄새가 나는데요?",
//     isOpened: true,
//   },
//   {
//     name: "딜",
//     imgUrl: "/herbs/normal_dill.png",
//     grade: "일반",
//     description: "오늘 레몬 딜 버터를 만들어 보는건 어때요?",
//     isOpened: true,
//   },
//   {
//     name: "캐모마일",
//     imgUrl: "/herbs/normal_chamomile.png",
//     grade: "일반",
//     description: "잠 안올 때 캐모마일이 좋대요. 그래서 내가 잠이 오는건ㄱㅏ...",
//     isOpened: true,
//   },
//   {
//     name: "스테비아",
//     imgUrl: "/herbs/normal_stevia.png",
//     grade: "일반",
//     description: "다이어터들의 사랑! 당은 포기모태~",
//     isOpened: true,
//   },
//   {
//     name: "씨슬",
//     imgUrl: "/herbs/normal_thysil.png",
//     grade: "일반",
//     description:
//       "그거 아세요? 간에 좋은 밀크씨슬이라는 약초는 씨슬이라는 꽃의 줄기에서 나오는 우윳빛 진액이며, 한국식 이름은 엉겅퀴래요.",
//     isOpened: true,
//   },
//   {
//     name: "타임",
//     imgUrl: "/herbs/normal_thyme.png",
//     grade: "일반",
//     description: "타임이 노화 방지에 좋대요.. 얼른 구하러 가야겠다!",
//     isOpened: true,
//   },
//   // 희귀 등급 허브 도감 8개
//   {
//     name: "프로틴 중독 파슬리",
//     imgUrl: "/herbs/rare_muscle.png",
//     grade: "희귀",
//     description: "근육으로 똘똘 뭉친 파슬리이다... 먹으면 막강해질지도... ?",
//     isOpened: true,
//   },
//   {
//     name: "바지 아니고 바질",
//     imgUrl: "/herbs/rare_basil.png",
//     grade: "희귀",
//     description: "발음을 조심해 주세요! 바지아니고 바 질 !",
//     isOpened: true,
//   },
//   {
//     name: "비둘기가 좋아하는 캣잎",
//     imgUrl: "/herbs/rare_dove.png",
//     grade: "희귀",
//     description:
//       "구구...구구구..999...9구...99...gugugu..이 캣잎은 이제 제껍니다...gugu",
//     isOpened: true,
//   },
//   {
//     name: "향기나는 자스민",
//     imgUrl: "/herbs/rare_jasmine.png",
//     grade: "희귀",
//     description: "그대 모습은~ 보라빛처럼~ 살며시 다가왔지~",
//     isOpened: true,
//   },
//   {
//     name: "더 오레오레가노",
//     imgUrl: "/herbs/rare_oregano.png",
//     grade: "희귀",
//     description:
//       "이 오레가노 오일이 더 오레오레가나 아니면 저 오레가노 오일이 더 오레오레가노??",
//     isOpened: true,
//   },
//   {
//     name: "쟤가 제라늄?",
//     imgUrl: "/herbs/rare_geranium.png",
//     grade: "희귀",
//     description: "쟤가 제라늄? 아니라늄? 그럼 말라늄~!",
//     isOpened: true,
//   },
//   {
//     name: "치약맛 민트",
//     imgUrl: "/herbs/rare_toothpaste.png",
//     grade: "희귀",
//     description: "민트가 치약맛이 아니라 치약이 민트맛인거라구욧!",
//     isOpened: true,
//   },
//   {
//     name: "살이 쭉쭉 빠지는 히비스커스",
//     imgUrl: "/herbs/rare_hibiscus.png",
//     grade: "희귀",
//     description:
//       "너무 많이 빠진다고 놀라지 마세요! 단, 요요는 보장할 수 없습니다.",
//     isOpened: true,
//   },
//   // 영웅 등급 허브 도감 4개
//   {
//     name: "근육돼지 파슬리",
//     imgUrl: "/herbs/hero_pig.png",
//     grade: "hero",
//     description: "3대 500 치는 파슬리이다. 약간 반할지도?",
//     isOpened: false,
//   },
//   {
//     name: "고양이가 좋아하는 깻잎",
//     imgUrl: "/herbs/hero_catleaf.png",
//     grade: "hero",
//     description: "고양이도 깻잎 좋아한다옹!",
//     isOpened: false,
//   },
//   {
//     name: "알라딘 여친 자스민",
//     imgUrl: "/herbs/hero_aladdin.png",
//     grade: "hero",
//     description: "비나이다..비나이다.. 저도 짝이 생기게 해주세요..",
//     isOpened: false,
//   },
//   {
//     name: "이야 진짜 겁나 오레오레오레오레가노",
//     imgUrl: "/herbs/hero_oregano.png",
//     grade: "hero",
//     description: "지금은 새벽 4시 13분 ...5레5 우유에 찍어서 먹고싶당..",
//     isOpened: false,
//   },
//   // 전설 등급 허브 도감 3개
//   {
//     name: "고수",
//     imgUrl: "/herbs/legend_gosu.png",
//     grade: "전설",
//     description: "너무 눈이 부셔서 이목구비가 보이질 않아 ...",
//     isOpened: false,
//   },
//   {
//     name: "유교보이",
//     imgUrl: "/herbs/legend_ugyoboy.png",
//     grade: "전설",
//     description: "아~ 파슬리~ 가보자고~",
//     isOpened: false,
//   },
//   {
//     name: "자스민마",
//     imgUrl: "/herbs/legend_jasminema.png",
//     grade: "전설",
//     description: "PARSLEY 여신 쟈스민ma!",
//     isOpened: false,
//   },
//   // 미스테리 등급 허브 도감 1개
//   {
//     name: "썩슬리",
//     imgUrl: "/herbs/mystery_rottensley.png",
//     grade: "미스테리",
//     description:
//       "킼...ㅋ키킼...킼... 용감한 녀석... 감히 이몸을 깨우다니...겁도없군 킼ㅋ...",
//     isOpened: false,
//   },
// ];
export default FarmCollection;
