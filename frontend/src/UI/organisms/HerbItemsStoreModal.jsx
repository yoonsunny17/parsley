import React, { useState } from "react";
import HerbStoreItemCard from "../atoms/HerbStoreItemCard";
import SelectItemList from "./SelectItemList";

// TODO: 아이템 선택(카드 컴포넌트) 했을 때 선택한 것 보이도록 스타일링 해줘야함 (border styling)
// FIXME: 아래 심으러 가기 (닫기 버튼) 없애고 위에 X 로 버튼 대체하기, 모달 전체적인 크기 줄이기

function HerbItemsStoreModal() {
  // seed radio select btn
  const [seed, setSeed] = useState("");
  const selectSeedItem = (e) => {
    console.log(e.target.value);
    setSeed(e.target.value);
  };

  // fertilizer radio select btn
  const [fertilizer, setFertilizer] = useState("");
  const selectFertilizerItem = (e) => {
    console.log(e.target.value);
    setFertilizer(e.target.value);
  };

  // water radio select btn
  const [water, setWater] = useState("");
  const selectWaterItem = (e) => {
    console.log(e.target.value);
    setWater(e.target.value);
  };

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
        <div className="modal-box w-11/12 max-w-5xl p-8">
          <label
            htmlFor="my-modal-3"
            className="btn btn-ghost absolute right-2 top-2"
          >
            <i class="bx bx-x bx-sm"></i>
          </label>

          <h3 className="font-bold text-xl py-2">허브 심기</h3>
          {/* <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p> */}
          {/* <div className="grid grid-cols-2"> */}
          <div className="flex">
            <div>
              {/* 씨앗 */}
              <div className="py-4">
                <p className="font-semibold">STEP 1. 씨앗을 구매해요!</p>
                {/* flex-wrap을 할지 아니면 화면 크기 작아졌을 때 버튼 크기도 작아지게 할지 고민중 */}
                <div className="flex flex-wrap">
                  {/* <input type="radio" value="1" checked={seed === "1"} onChange={selectSeedItem}/> */}
                  {seedOptions.map((option) => (
                    <label key={option.name}>
                      <input
                        className="hidden"
                        type="radio"
                        value={option.name}
                        checked={seed === `${option.name}`}
                        onChange={selectSeedItem}
                      />
                      <HerbStoreItemCard
                        title={option.name}
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
                    <label key={option.name}>
                      <input
                        className="hidden"
                        type="radio"
                        value={option.name}
                        checked={fertilizer === `${option.name}`}
                        onChange={selectFertilizerItem}
                      />
                      <HerbStoreItemCard
                        title={option.name}
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
                    <label key={option.name}>
                      <input
                        className="hidden"
                        type="radio"
                        value={option.name}
                        checked={water === `${option.name}`}
                        onChange={selectWaterItem}
                      />
                      <HerbStoreItemCard
                        title={option.name}
                        price={option.price}
                        imgUrl={option.imgUrl}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <SelectItemList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const seedOptions = [
  {
    name: "일반 씨앗",
    price: "0",
    grade: "normal",
    imgUrl:
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "희귀 씨앗",
    price: "100",
    grade: "rare",
    imgUrl:
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "영웅 씨앗",
    price: "200",
    grade: "hero",
    imgUrl:
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "전설 씨앗",
    price: "350",
    grade: "legend",
    imgUrl:
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "미스테리 씨앗",
    price: "500",
    grade: "mystery",
    imgUrl:
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

const fertilizerOptions = [
  {
    name: "일반 비료",
    price: "150",
    imgUrl:
      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "고급 비료",
    price: "200",
    imgUrl:
      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "프로틴 비료",
    price: "300",
    imgUrl:
      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "최상급 비료",
    price: "500",
    imgUrl:
      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

const waterOptions = [
  {
    name: "일반 물뿌리개",
    price: "250",
    imgUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
  },
  {
    name: "고급 물뿌리개",
    price: "500",
    imgUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
  },
];
export default HerbItemsStoreModal;
