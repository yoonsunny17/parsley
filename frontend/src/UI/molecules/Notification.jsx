import React from "react";

function Notification({ notiArr, uncheckedCnt, onClick }) {
  const calcTimePassed = (date) => {
    const minutePassed = parseInt(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60)
    );
    let timePassed;
    if (minutePassed >= 1440) {
      timePassed = parseInt(minutePassed / 1440) + "일 전";
    } else if (minutePassed >= 60) {
      timePassed = parseInt(minutePassed / 60) + "시간 전";
    } else {
      timePassed = parseInt(minutePassed) + "분 전";
    }
    return timePassed;
  };

  return (
    <div className="dropdown">
      <label tabIndex="0" className="cursor-pointer" onClick={onClick}>
        <i className="bx bx-bell text-3xl indicator">
          {uncheckedCnt > 0 && (
            <span className="indicator-item text-xs bg-yellow-400 rounded-full w-4 h-4 text-center right-1 top-[6px]">
              {uncheckedCnt}
            </span>
          )}
        </i>
      </label>
      <div className="dropdown-content menu mt-[10px] shadow-lg bg-white overflow-auto rounded-box w-[350px] min-h-max max-h-80 absolute top-[35px] right-[-118px] pb-1 scrollbar-hide">
        <div className="font-semibold mb-2 px-5 pt-4">알림</div>
        {notiArr.length === 0 && (
          <>
            <hr />
            <div className="flex px-5 py-3 w-full justify-between text-sm">
              알림 내역이 없습니다.
            </div>
          </>
        )}
        {notiArr.length > 0 &&
          notiArr.map((noti, idx) => {
            const timePassed = calcTimePassed(noti.date);
            return (
              <div key={`noti-${idx}`}>
                <hr />
                <div className="flex px-5 py-3 w-full justify-between text-sm">
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full ring-2 ring-sub1">
                      {noti.type === 0 ? (
                        <img src="/herbs/sley.png" alt="sley" />
                      ) : (
                        <img src="/herbs/point.png" alt="bookPoint" />
                      )}
                    </div>
                  </div>
                  <div className="w-7/18 text-start self-center">
                    {noti.content.includes("심기")
                      ? "-" + noti.value
                      : "+" + noti.value}
                  </div>
                  <div className="w-7/12 text-start self-center">
                    {noti.content}
                  </div>
                  <div className="text-end self-center">
                    {/* TODO: 시간 계산 */}
                    {timePassed}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// const notiArr = [
//     {
//         content: "+50 포인트",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 1,
//         value: 50,
//     },
//     {
//         content: "+100 슬리",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 0,
//         value: 100,
//     },
//     {
//         content: "+100 포인트",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 1,
//         value: 100,
//     },
//     {
//         content: "+200 슬리",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 0,
//         value: 200,
//     },
//     {
//         content: "+100 포인트",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 1,
//         value: 100,
//     },
//     {
//         content: "+50 슬리",
//         date: "2022-08-14T12:11:44.567Z",
//         type: 0,
//         value: 50,
//     },
// ];

export default Notification;
