// 농장 페이지 허브 기르기 컴포넌트 (최대 8개의 허브 기를 수 있음)
// TODO: window.innerwidth 좁아지면 접어야 할 것 같음 너무 길어짐 근데 3d model이 접어도 되는지 모르겠다
import React, { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useAddHerbBookMutation,
    useGetAllHerbsQuery,
} from "../../services/farm";
import {
    setFertilizer,
    setPosition,
    setSeed,
    setWater,
} from "../../modules/farmReducer";
import HerbStoreModal from "./HerbStoreModal";
import { useEffect } from "react";
import Swal from "sweetalert2";

function FarmGame(props) {
    const dispatch = useDispatch();
    const [currentSley, setCurrentSley] = useState(0);

    const user = useSelector((state) => state.user.user);
    const isLogin = useSelector((state) => state.user.isLogin);

    const { data: getAllHerbs } = useGetAllHerbsQuery(
        {},
        { skip: !isLogin, refetchOnMountOrArgChange: true }
    );
    const [addHerbBook] = useAddHerbBookMutation();

    const today = new Date();
    const regDate = new Date(user?.regDate);
    const togetherDays = parseInt(
        (today.getDate() - regDate.getDate() + 1000 * 60 * 60 * 9) /
            (1000 * 60 * 60 * 24) +
            1
    );

    console.log(getAllHerbs);

    const clickCancel = () => {
        dispatch(setSeed(1));
        dispatch(setFertilizer(1));
        dispatch(setWater(1));
    };

    const onSubmit = async (e, id) => {
        e.preventDefault();
        const alertInfo = await addHerbBook({ herbId: id }).unwrap();
        // console.log("알림창 :");
        // console.log(alertInfo);
        Swal.fire({
            width: 350,
            title: "[" + alertInfo.herbName + "]",
            text:
                " + " +
                [alertInfo.addSley] +
                "슬리 " +
                " + " +
                [alertInfo.addPoint] +
                "포인트 ",
            imageUrl: [alertInfo.herbImageUrl], // 시간 되면 여기 사진 다른걸로 바꾸기
            imageWidth: 50,
            imageHeight: 50,
            imageAlt: "Herb Collection Image",
        });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const calcTime = (seconds) => {
        var temp = seconds;
        seconds = Math.abs(seconds);
        var hour, min, sec;
        hour = parseInt(seconds / 3600);
        min = parseInt((seconds % 3600) / 60);
        sec = seconds % 60;

        if (hour.toString().length === 1) hour = "0" + hour;
        if (min.toString().length === 1) min = "0" + min;
        if (sec.toString().length === 1) sec = "0" + sec;

        if (temp < 0) {
            return "- " + hour + ":" + min + ":" + sec;
        } else {
            return "+ " + hour + ":" + min + ":" + sec;
        }
    };

    useEffect(() => {
        setCurrentSley(user?.currentSley);
    }, [user?.currentSley]);

    return (
        // height는 고정으로 가는 것이 맞는것 같기도?
        <div className="rounded-2xl w-full h-auto mb-4 md:w-2/3 md:mb-0 shadow px-8 py-5">
            <div className="flex justify-between">
                <div className="text-lg font-bold mb-2">
                    허브의 주인이 되신지 {togetherDays}일 째!
                </div>
                <div className="text-base font-bold">{`${currentSley} 슬리`}</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 m-5">
                {herbCardList.map(function (item, idx) {
                    return (
                        <div key={item.id}>
                            <div className="shadow rounded-xl w-full h-[250px] mb-2 flex items-center justify-center">
                                {/* Modal Click Button */}
                                {getAllHerbs &&
                                getAllHerbs?.herbs.find(
                                    (herb) => herb.position === idx + 1
                                ) ? (
                                    <div>
                                        {() => {
                                            const herb =
                                                getAllHerbs?.herbs.find(
                                                    (herb) =>
                                                        herb.position ===
                                                        idx + 1
                                                );
                                            const isGrowth =
                                                herb.leftTime /
                                                    herb.growthTime <
                                                0;
                                            console.log(
                                                herb.leftTime / herb.growthTime
                                            );
                                            if (isGrowth) {
                                            } else {
                                                // return <HerbComponent3 />
                                            }
                                        }}
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="my-modal-3"
                                        className="btn btn-ghost text-main modal-button tooltip"
                                        data-tip="자네..허브를 심어보지 않겠나?"
                                        onClick={() =>
                                            dispatch(setPosition(item.id))
                                        }
                                    >
                                        <i className="bx bx-leaf bx-lg"></i>
                                    </label>
                                )}
                            </div>
                            <div>
                                {getAllHerbs?.herbs.find(
                                    (herb) => herb.position === idx + 1
                                ) ? (
                                    <div>
                                        {calcTime(
                                            getAllHerbs?.herbs.find(
                                                (herb) =>
                                                    herb.position === idx + 1
                                            ).leftTime
                                        )}
                                        {getAllHerbs?.herbs.find(
                                            (herb) => herb.position === idx + 1
                                        ).leftTime >= 0 ? (
                                            <div>
                                                <button
                                                    type="submit"
                                                    onClick={(e) =>
                                                        onSubmit(
                                                            e,
                                                            getAllHerbs?.herbs.find(
                                                                (herb) =>
                                                                    herb.position ===
                                                                    idx + 1
                                                            ).herbId
                                                        )
                                                    }
                                                    className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    );
                })}
                {/* Modal */}
                <div>
                    <input
                        type="checkbox"
                        id="my-modal-3"
                        className="modal-toggle"
                    />
                    <div className="modal">
                        <div className="modal-box w-11/12 max-w-5xl p-6">
                            <div className="flex w-full justify-between">
                                <h3 className="font-bold text-xl py-2">
                                    허브 심기
                                </h3>
                                {/* Exit Button */}
                                <button onClick={clickCancel}>
                                    <label
                                        htmlFor="my-modal-3"
                                        className="btn btn-ghost right-2 top-2"
                                    >
                                        <i className="bx bx-x bx-sm"></i>
                                    </label>
                                </button>
                            </div>
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
