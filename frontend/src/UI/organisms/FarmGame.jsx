// 농장 페이지 허브 기르기 컴포넌트 (최대 8개의 허브 기를 수 있음)
// TODO: window.innerwidth 좁아지면 접어야 할 것 같음 너무 길어짐 근데 3d model이 접어도 되는지 모르겠다
import React, { useState, useTransition } from "react";

import HerbItemsStoreModal from "./HerbItemsStoreModal";
import HerbComponent1 from "../atoms/HerbComponent1";
import HerbComponent2 from "../atoms/HerbComponent2";
import HerbComponent3 from "../atoms/HerbComponent3";

function FarmGame(props) {
    const day = 32;
    const sley = 1000;

    const [isEmpty, setIsEmpty] = useState(true);
    const clickToEmpty = () => {
        setIsEmpty((current) => !current);
    };

    let [data, setData] = useState(HerbCardList);
    const [isPending, startTransition] = useTransition();

    return (
        // height는 고정으로 가는 것이 맞는것 같기도?
        <div className="rounded-2xl w-full h-auto mb-4 md:w-2/3 md:mb-0 shadow px-8 py-5">
            <div className="flex justify-between">
                <div className="text-lg font-bold mb-2">
                    허브의 주인이 되신지 {day}일 째!
                </div>
                <div className="text-base font-bold">{sley} 슬리</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 m-5">
                {data.map(function (item, idx) {
                    return (
                        <div key={idx}>
                            <div className="shadow rounded-xl w-full h-[250px] mb-2 flex items-center justify-center">
                                {/* {item.isEmpty ? (
                  <HerbItemsStoreModal />
                ) : (
                  startTransition(() => {
                    <HerbComponent1 />;
                  })
                )} */}
                                <HerbItemsStoreModal />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const HerbCardList = [
    {
        numb: 1,
        xPosition: 1,
        yPosition: 1,
        isEmpty: true,
    },
    {
        numb: 2,
        xPosition: 1,
        yPosition: 2,
        isEmpty: false,
    },
    {
        numb: 3,
        xPosition: 1,
        yPosition: 3,
        isEmpty: true,
    },
    {
        numb: 4,
        xPosition: 1,
        yPosition: 4,
        isEmpty: true,
    },
    {
        numb: 5,
        xPosition: 2,
        yPosition: 1,
        isEmpty: true,
    },
    {
        numb: 6,
        xPosition: 2,
        yPosition: 2,
        isEmpty: false,
    },
    {
        numb: 7,
        xPosition: 2,
        yPosition: 3,
        isEmpty: false,
    },
    {
        numb: 8,
        xPosition: 2,
        yPosition: 4,
        isEmpty: true,
    },
];

export default FarmGame;
