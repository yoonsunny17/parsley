import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import StudyRoomItem from "../../UI/molecules/StudyRoomItem";
import Navbar from "../organisms/Navbar";
import { useSelector, useDispatch } from "react-redux";

function SearchStudyRooms(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const room_list = useSelector((state) => state.room.room_list);
  const [searchWord, setSearchWord] = useState(props.match.params.word);
  const [search, setSearch] = useState(searchWord);

  function searchRooms(room_list, searchWord) {
    let search_list = [];
    room_list.forEach((i) => {
      if (i.roomInfo.indexOf(searchWord) === -1) {
        return;
      }
      search_list.push(i); // 검색 일치하므로 배열에 추가
    });

    return search_list;
  }

  const search_list = useMemo(
    () => searchRooms(room_list, searchWord),
    [searchWord]
  );

  return (
    <div>
      <Navbar />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchWord(e.target.value);
          }}
          action=""
          method="GET"
        >
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </form>
      </div>

      <div className="text-font1 font-bold text-2xl mt-5">
        검색결과
        <span>총 {search_list.length}개의 검색 결과</span>
      </div>

      {/* 손꾸락 스터디룸 검색결과 */}
      <div className="text-font1 font-semibold text-xl mt-12">
        손꾸락 스터디룸
      </div>

      <div className="pt-4 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
        {tabContArr[activeIndex].studyRoomList.map((info, idx) => {
          return (
            <Link to="/room">
              <StudyRoomItem info={info} key={idx} />
            </Link>
          );
        })}
      </div>

      {/* 얼구리 컴퓨터 검색결과 */}
      <div className="text-font1 font-semibold text-xl mt-14">
        얼구리 컴퓨터 스터디룸
      </div>

      <div className="pt-4 pb-8 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
        {tabContArr[activeIndex].studyRoomList.map((info, idx) => {
          return (
            <Link to="/room">
              <StudyRoomItem info={info} key={idx} />
            </Link>
          );
        })}
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
        description: "주40시간 채우는 자율 스터디",
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

export default SearchStudyRooms;
