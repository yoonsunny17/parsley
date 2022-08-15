import React from "react";

function Notification() {
    // const { data } = useLazyGetNotificationQuery;

    return (
        <div className="dropdown">
            <label tabIndex="0" className="cursor-pointer">
                <i className="bx bx-bell text-3xl"></i>
            </label>
            <div className="dropdown-content menu mt-[10px] shadow-lg bg-white rounded-box w-[260px] absolute top-[35px] right-[-118px]">
                <div>알림</div>
                {notiArr.map((noti, idx) => {
                    return (
                        <div className="" key={`noti-${idx}`}>
                            <span>{noti.content}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const notiData = {
    uncheckCnt: 3,
};

// public/herbs/sley.png, public/herbs/point.png
const notiArr = [
    {
        content: "Hello Nice to meet u",
        date: "2022-08-14T12:11:44.567Z",
        type: 1,
        value: 100,
    },
    {
        content: "100 슬리 획득",
        date: "2022-08-14T12:11:44.567Z",
        type: 0,
        value: 100,
    },
    {
        content: "100 포인트 획득",
        date: "2022-08-14T12:11:44.567Z",
        type: 1,
        value: 100,
    },
    {
        content: "200 슬리 획득",
        date: "2022-08-14T12:11:44.567Z",
        type: 0,
        value: 200,
    },
    {
        content: "100 포인트 획득",
        date: "2022-08-14T12:11:44.567Z",
        type: 1,
        value: 100,
    },
    {
        content: "50 슬리 획득",
        date: "2022-08-14T12:11:44.567Z",
        type: 0,
        value: 50,
    },
];

export default Notification;
