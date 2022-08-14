import { useState } from "react";
import { Link } from "react-router-dom";
import StudyRoomItem from "../molecules/StudyRoomItem";

function StudyRooms() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-main w-full relative">
      {/* Tab */}
      <div className="absolute top-[-44px] left-[40px]">
        <div className="flex list-none text-lg gap-[10px]">
          {tabContArr.map(({ title }, idx) => (
            <button
              key={`tab-` + idx}
              onClick={() => tabClickHandler(idx)}
              className={
                (activeIndex === idx ? "bg-main " : "bg-sub2 hover:bg-main ") +
                "color-delay cursor-pointer text-font3 font-semibold text-base rounded-t-2xl h-[40px] px-3"
              }
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="px-6 pt-8 md:px-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
        {tabContArr[activeIndex].studyRoomList.length === 0 && (
          <div>
            {activeIndex === 1 && "참가한 스터디가 없어요"}
            {activeIndex === 2 && "관심 있는 스터디가 없어요"}
          </div>
        )}
        {tabContArr[activeIndex].studyRoomList.length > 0 &&
          tabContArr[activeIndex].studyRoomList.map((info, idx) => {
            return (
              <Link to="/room" key={`room-${idx}`}>
                <StudyRoomItem info={info} key={idx} />
              </Link>
            );
          })}
      </div>
      <div className="px-6 mt-4 mb-8 md:px-10 w-full flex justify-end text-font1 hover:text-main font-semibold color-delay">
        <Link to="/room">더보기</Link>
      </div>
    </div>
  );
}

const tabContArr = [
  {
    title: "전체 공부방",
    studyRoomList: [
      {
        name: "파슬리 꾸공방 (꾸준히 공부하는 방)",
        imageUrl:
          "https://images.unsplash.com/photo-1637225701929-37d84328b1c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "파슬리 도감 채우기 위해 꾸준히 공부하는 방",
        maxPopulation: 3,
        isPublic: true,
      },

      {
        name: "SKY 방",
        imageUrl:
          "https://images.unsplash.com/photo-1599768793949-2da217e9f093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "SKY 가즈아!!",
        maxPopulation: 10,
        isPublic: false,
      },

      {
        name: "SSAFY 카페",
        imageUrl:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2122&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "커피 쿠폰 받고 싶어요",
        maxPopulation: 3,
        isPublic: false,
      },
      {
        name: "Let's Study",
        imageUrl:
          "https://images.unsplash.com/photo-1643148636630-0b0fb138fc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "주 40시간 채우는 자율 스터디",
        maxPopulation: 3,
        isPublic: true,
      },
      {
        name: "Harry Potter",
        imageUrl:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "호그와트 입학",
        maxPopulation: 3,
        isPublic: true,
      },
      {
        name: "슬로우 푸드 클래스",
        imageUrl:
          "https://images.unsplash.com/photo-1543364195-077a16c30ff3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        mode: 1,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description: "몸에 건강한 슬로우 푸드에 대해 알아보아요",
        maxPopulation: 6,
        isPublic: true,
      },
      {
        name: "근육 파슬리방",
        imageUrl:
          "https://images.unsplash.com/photo-1532054241088-402b4150db33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        mode: 0,
        hashTags: ["자격증", "근육 파슬리", "CPA"],
        description:
          "생활스포츠지도사 자격증 따면서, 근육 파슬리가 나오기를 기다리는 방",
        maxPopulation: 4,
        isPublic: true,
      },
      {
        name: "알고리즘 모각코",
        imageUrl:
          "https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        mode: 1,
        hashTags: [],
        description: "백준 플래티넘 달성",
        maxPopulation: 4,
        isPublic: true,
      },
    ],
  },
  { title: "나의 공부방", studyRoomList: [] },
  { title: "관심 공부방", studyRoomList: [] },
];

export default StudyRooms;
