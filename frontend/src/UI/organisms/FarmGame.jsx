// 농장 페이지 허브 기르기 컴포넌트 (최대 8개의 허브 기를 수 있음)
// TODO: window.innerwidth 좁아지면 접어야 할 것 같음 너무 길어짐 근데 3d model이 접어도 되는지 모르겠다

import HerbItemsStoreModal from "./HerbItemsStoreModal";
import BabyHerb from "../atoms/BabyHerb";
import FlowerPot from "../atoms/FlowerPot";
// import EmptyHerb from "../atoms/EmptyHerb";
// import HerbItemCard from "../molecules/HerbItemCard";
import { useState } from "react";

function FarmGame() {
  const day = 32;
  const sley = 1000;

  const [isEmpty, setIsEmpty] = useState(true);
  const clickToEmpty = () => {
    setIsEmpty((current) => !current);
  };

  return (
    // height는 고정으로 가는 것이 맞는것 같기도?
    // <div className="flex justify-between px-[30px] py-[35px] w-[70%] bg-white rounded-[30px] drop-shadow-[4px_4px_20px_rgba(0,0,0,0.1)]">
    <div className="rounded-2xl w-full h-auto mb-4 md:w-2/3 md:mb-0 shadow px-8 py-5">
      <div className="flex justify-between">
        <div className="font-basic text-lg font-bold mb-2">
          {/* {username} 님의 농장 */}
          허브의 주인이 되신지 {day}일 째!
        </div>
        <div className="font-basic text-base font-bold">{sley} 슬리</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 m-5">
        {/* xPosition = 1, yPosition = 1 */}
        <div>
          <span className="badge my-4 ">(1, 1)</span>
          <div className="shadow rounded-xl w-full h-[250px] mb-2">
            {isEmpty ? <HerbItemsStoreModal /> : null}
            {/* <HerbItemsStoreModal /> */}
          </div>
        </div>
        <div>
          <span className="badge my-4 ">(1, 2)</span>
          <div className="shadow rounded-xl w-full h-[250px] mb-2">
            <BabyHerb />
          </div>
        </div>
        <div>
          <span className="badge my-4 ">(1, 3)</span>
          <div className="shadow rounded-xl w-full h-[250px] mb-2">
            {/* <EmptyHerb /> */}
            {/* <SelectHerbItems /> */}
            <FlowerPot />
          </div>
        </div>
        <div>
          <span className="badge my-4">(1, 4)</span>

          <div className="shadow rounded-xl w-full h-[250px] mb-2"></div>
        </div>
        <div>
          <span className="badge my-4">(2, 1)</span>

          <div className="shadow rounded-xl w-full h-[250px] mb-2"></div>
        </div>
        <div>
          <span className="badge my-4">(2, 2)</span>

          <div className="shadow rounded-xl w-full h-[250px] mb-2"></div>
        </div>
        <div>
          <span className="badge my-4">(2, 3)</span>

          <div className="shadow rounded-xl w-full h-[250px] mb-2"></div>
        </div>
        <div>
          <span className="badge my-4">(2, 4)</span>
          <div className="shadow rounded-xl w-full h-[250px] mb-2"></div>
        </div>
      </div>
    </div>
  );
}

const HerbCardList = [
  {
    xPosition: 1,
    yPosition: 1,
    isEmpty: true,
  },
  {
    xPosition: 1,
    yPosition: 2,
    isEmpty: false,
  },
  {
    xPosition: 1,
    yPosition: 3,
    isEmpty: true,
  },
  {
    xPosition: 1,
    yPosition: 4,
    isEmpty: true,
  },
  {
    xPosition: 2,
    yPosition: 1,
    isEmpty: true,
  },
  {
    xPosition: 2,
    yPosition: 2,
    isEmpty: false,
  },
  {
    xPosition: 2,
    yPosition: 3,
    isEmpty: false,
  },
  {
    xPosition: 2,
    yPosition: 4,
    isEmpty: true,
  },
];

export default FarmGame;
