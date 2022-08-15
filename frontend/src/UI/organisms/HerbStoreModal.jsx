import React, { useState, useCallback } from "react";
// import HerbStoreItemCard from "../atoms/HerbStoreItemCard";
import SelectItemList from "./SelectItemList";
import HerbItemAvatar from "../atoms/HerbItemAvatar";
// 허브 아이템 선택 아바타 라디오버튼
import HerbStoreItemAvatar from "../atoms/HerbStoreItemAvatar";
import { useEffect } from "react";

// TODO: 아이템 선택(카드 컴포넌트) 했을 때 선택한 것 보이도록 스타일링 해줘야함 (border styling)
// FIXME: 아래 심으러 가기 (닫기 버튼) 없애고 위에 X 로 버튼 대체하기, 모달 전체적인 크기 줄이기

function HerbStoreModal(props) {
  // initialization;
  const initialData = {
    seed: "",
    fertilizer: "",
    water: "",
  };
  const initialPrice = {
    seed: "",
    fertilizer: "",
    water: "",
  };

  const [items, setItems] = useState(initialData); // 아이템명
  const [price, setPrice] = useState(initialPrice); // 아이템 가격
  const handleChange = ({ target }) => {
    setItems((prev) => ({
      ...prev,
      [target.name]: target.id,
    }));
    setPrice((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    console.log(items);
    console.log(price);
  };

  const totalSley =
    parseInt(price.seed) + parseInt(price.fertilizer) + parseInt(price.water);
  // const [totalSley, setTotalSley] = useState(0);
  // const handleTotal = () => {
  //   setTotalSley(
  //     (current) =>
  //       (current +=
  //         parseInt(items.seed) +
  //         parseInt(items.fertilizer) +
  //         parseInt(items.water))
  //   );
  // };

  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="btn btn-ghost text-main modal-button tooltip"
        data-tip="자네..허브를 심어보지 않겠나?"
      >
        <i className="bx bx-leaf bx-lg"></i>
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-6">
          <label
            htmlFor="my-modal-3"
            className="btn btn-ghost absolute right-2 top-2"
          >
            <i class="bx bx-x bx-sm"></i>
          </label>

          <h3 className="font-bold text-xl py-2">허브 심기</h3>
          <div className="flex justify-evenly">
            <div>
              {/* 씨앗 */}
              <div className="py-4">
                <p className="font-semibold">STEP 1. 씨앗을 구매해요!</p>
                <div className="flex flex-wrap">
                  {seedOptions.map((option) => (
                    <label key={option.grade}>
                      <input
                        name={option.name}
                        className="hidden"
                        type="radio"
                        id={option.title}
                        value={option.price}
                        checked={items.seed === `${option.title}`}
                        onChange={handleChange}
                      />
                      <HerbStoreItemAvatar
                        title={option.title}
                        price={option.price}
                        imgUrl={option.imgUrl}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* 비료 */}
              <div className="py-4">
                <p className="font-semibold">STEP2. 비료를 구매해요!</p>
                <div className="flex flex-wrap">
                  {fertilizerOptions.map((option) => (
                    <label key={option.grade}>
                      <input
                        name={option.name}
                        className="hidden"
                        type="radio"
                        id={option.title}
                        value={option.price}
                        checked={items.fertilizer === `${option.title}`}
                        onChange={handleChange}
                      />
                      <HerbStoreItemAvatar
                        title={option.title}
                        price={option.price}
                        imgUrl={option.imgUrl}
                      />
                    </label>
                  ))}
                </div>
              </div>
              {/* 물뿌리개 */}
              <div className="py-4">
                <p className="font-semibold">STEP3. 물뿌리개를 구매해요!</p>
                <div className="flex flex-wrap">
                  {waterOptions.map((option) => (
                    <label key={option.grade}>
                      <input
                        name={option.name}
                        className="hidden"
                        type="radio"
                        id={option.title}
                        value={option.price}
                        checked={items.water === `${option.title}`}
                        onChange={handleChange}
                      />
                      <HerbStoreItemAvatar
                        title={option.title}
                        price={option.price}
                        imgUrl={option.imgUrl}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* 아이템 선택 목록 a.k.a. 구매목록! */}
            {/* // TODO: 화면 WIDTH 좁아졌을 때 구매목록 어떻게 처리할지 ?? */}
            <div className="shadow rounded-xl w-[300px] h-auto my-3 ml-10 py-3">
              <p className="text-lg mt-4 font-semibold text-center">
                구매 목록
              </p>
              <div className="mt-10 flex flex-col w-full">
                {/* 씨앗 선택 내역 */}
                <div className="flex w-full px-4 mb-4 items-center">
                  <div className="flex justify-center w-1/4 mr-6">
                    <HerbItemAvatar imgUrl="/herbs/seeds.png" />
                  </div>
                  <span className="w-1/3 text-start text-sm">{items.seed}</span>
                  <span className="w-1/3 text-end text-sm">
                    {price.seed}슬리
                  </span>
                </div>
                {/* 비료 선택 내역 */}
                <div className="flex w-full px-4 mb-4 items-center">
                  <div className="flex justify-center w-1/4 mr-6">
                    <HerbItemAvatar imgUrl="/herbs/fertilizer.png" />
                  </div>
                  <span className="w-1/3 text-start text-sm">
                    {items.fertilizer}
                  </span>
                  <span className="w-1/3 text-end text-sm">
                    {price.fertilizer}슬리
                  </span>
                </div>
                {/* 물뿌리개 선택 내역 */}
                <div className="flex w-full px-4 mb-4 items-center">
                  <div className="flex justify-center w-1/4 mr-6">
                    <HerbItemAvatar imgUrl="/herbs/watering-can.png" />
                  </div>
                  <span className="w-1/3 text-start text-sm">
                    {items.water}
                  </span>
                  <span className="w-1/3 text-end text-sm">
                    {price.water}슬리
                  </span>
                </div>
                {/* 총 슬리 합계 */}
                <div className="m-10 font-semibold text-center text-xl">
                  총 {totalSley} 슬리 입니다
                  {/* 슬리 이미지 아바타로 넣기 */}
                  <div className="avatar">
                    <div className="ml-2 w-6 rounded-full">
                      <img src="/herbs/sley.png" alt="sley" />
                    </div>
                  </div>
                  <p className="text-base font-normal py-3">
                    이제 심으러 가볼까요?
                  </p>
                </div>
                {/* 초기화, 심으러 가기 버튼 */}
                <div className="flex items-center justify-evenly">
                  <button className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3">
                    초기화 <i class="bx bx-revision"></i>
                  </button>
                  <button className=" color-delay rounded-full text-sm font-semibold bg-main hover:bg-sub2 text-font3">
                    <label
                      htmlFor="my-modal-3"
                      className="cursor-pointer px-4 py-2"
                    >
                      선택 완료
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const seedOptions = [
  {
    name: "seed",
    title: "일반 씨앗",
    price: 0,
    grade: "normal",
    imgUrl: "/herbs/seed.png",
  },
  {
    name: "seed",
    title: "희귀 씨앗",
    price: 100,
    grade: "rare",
    imgUrl: "/herbs/seeds.png",
  },
  {
    name: "seed",
    title: "영웅 씨앗",
    price: 200,
    grade: "hero",
    imgUrl: "/herbs/seed.png",
  },
  {
    name: "seed",
    title: "전설 씨앗",
    price: 350,
    grade: "legend",
    imgUrl: "/herbs/seeds.png",
  },
  {
    name: "seed",
    title: "미스테리 씨앗",
    price: 500,
    grade: "mystery",
    imgUrl: "/herbs/seed.png",
  },
];

const fertilizerOptions = [
  {
    name: "fertilizer",
    title: "일반 비료",
    price: 150,
    imgUrl: "/herbs/fertilizer.png",
  },
  {
    name: "fertilizer",
    title: "고급 비료",
    price: 200,
    imgUrl: "/herbs/liquid_fertilizer.png",
  },
  {
    name: "fertilizer",
    title: "프로틴 비료",
    price: 300,
    imgUrl: "herbs/fertilizer.png",
  },
  {
    name: "fertilizer",
    title: "최상급 비료",
    price: 500,
    imgUrl: "/herbs/liquid_fertilizer.png",
  },
];

const waterOptions = [
  {
    name: "water",
    title: "일반 물뿌리개",
    price: 250,
    imgUrl: "/herbs/watering-can.png",
  },
  {
    name: "water",
    title: "고급 물뿌리개",
    price: 500,
    imgUrl: "/herbs/watering-can.png",
  },
];
export default HerbStoreModal;
