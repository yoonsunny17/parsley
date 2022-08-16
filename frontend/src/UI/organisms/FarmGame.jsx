// 농장 페이지 허브 기르기 컴포넌트 (최대 8개의 허브 기를 수 있음)
// TODO: window.innerwidth 좁아지면 접어야 할 것 같음 너무 길어짐 근데 3d model이 접어도 되는지 모르겠다
import React, { useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateHerbInfoQuery } from "../../services/farm";
import {
  setFertilizer,
  setPosition,
  setSeed,
  setWater,
} from "../../modules/farmReducer";

import HerbStoreModal from "./HerbStoreModal";
import HerbComponent1 from "../atoms/HerbComponent1";
import HerbComponent2 from "../atoms/HerbComponent2";
import HerbComponent3 from "../atoms/HerbComponent3";
import { useEffect } from "react";

function FarmGame(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  //     const params = useParams()
  //   const [updateHerbInfo, { isSuccess }] = useUpdateHerbInfoQuery();

  //   const handleUpdateHerbInfo = () => {
  //     updateHerbInfo();
  //   };

  const day = 32;

  const [isPending, startTransition] = useTransition();
  const [isEmpty, setIsEmpty] = useState(true);

  const clickToEmpty = () => {
    setIsEmpty((current) => !current);
  };

  const clickCancel = () => {
    dispatch(setSeed(1));
    dispatch(setFertilizer(1));
    dispatch(setWater(1));
  };

  return (
    // height는 고정으로 가는 것이 맞는것 같기도?
    <div className="rounded-2xl w-full h-auto mb-4 md:w-2/3 md:mb-0 shadow px-8 py-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold mb-2">
          허브의 주인이 되신지 {day}일 째!
        </div>
        <div className="text-base font-bold">{`${user?.currentSley} 슬리`}</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 m-5">
        {herbCardList.map(function (item, idx) {
          return (
            <div key={item.id}>
              <div className="shadow rounded-xl w-full h-[250px] mb-2 flex items-center justify-center">
                {/* {item.isEmpty ? (
                  <HerbItemsStoreModal />
                ) : (
                  startTransition(() => {
                    <HerbComponent1 />;
                  })
                )} */}
                {/* Modal Click Button */}
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-ghost text-main modal-button tooltip"
                  data-tip="자네..허브를 심어보지 않겠나?"
                  onClick={() => dispatch(setPosition(item.id))}
                >
                  <i className="bx bx-leaf bx-lg"></i>
                </label>
              </div>
            </div>
          );
        })}
        {/* Modal */}
        <div>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl p-6">
              {/* Exit Button */}
              <button onClick={clickCancel}>
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-ghost absolute right-2 top-2"
                >
                  <i className="bx bx-x bx-sm"></i>
                </label>
              </button>
              {/* Modal Content */}
              <HerbStoreModal clickCancel={clickCancel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const herbCardList = [
  {
    id: 1,
    xPosition: 1,
    yPosition: 1,
    isEmpty: true,
  },
  {
    id: 2,
    xPosition: 1,
    yPosition: 2,
    isEmpty: false,
  },
  {
    id: 3,
    xPosition: 1,
    yPosition: 3,
    isEmpty: true,
  },
  {
    id: 4,
    xPosition: 1,
    yPosition: 4,
    isEmpty: true,
  },
  {
    id: 5,
    xPosition: 2,
    yPosition: 1,
    isEmpty: true,
  },
  {
    id: 6,
    xPosition: 2,
    yPosition: 2,
    isEmpty: false,
  },
  {
    id: 7,
    xPosition: 2,
    yPosition: 3,
    isEmpty: false,
  },
  {
    id: 8,
    xPosition: 2,
    yPosition: 4,
    isEmpty: true,
  },
];

export default FarmGame;
