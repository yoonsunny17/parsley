import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setNotificationCnt } from "../../modules/notificationReducer";
import {
  useGetNotificationCntQuery,
  useReadNotificationMutation,
} from "../../services/notification";
import Button from "../atoms/Button";
import Notification from "../molecules/Notification";
// import SearchBarTest from "../molecules/SearchBarTest";
// import SearchBar from "../molecules/SearchBar";

function Navbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const { data } = useGetNotificationCntQuery(
    {},
    { skip: !isLogin, refetchOnMountOrArgChange: true }
  );
  const [readNotification] = useReadNotificationMutation();
  const [notiArr, setNotiArr] = useState([]);
  const notiCnt = useSelector((state) => state.notification.notificationCnt);
  console.log("알림 개수: " + notiCnt);
  const clickAlarm = async () => {
    const result = await readNotification().unwrap();
    setNotiArr(result?.notifications);
    dispatch(setNotificationCnt(0));
  };

  return (
    <header className="h-[72px] flex justify-between items-center mt-0 mb-4">
      <Link to="/">
        <span className="flex items-center">
          <img className="w-11" src="/parsley_logo.png" alt="logo" />
          <span className="logo font-logo text-3xl cursor-pointer">
            PARSLEY
          </span>
        </span>
      </Link>
      <div className="flex items-center gap-[25px] relative">
        {isLogin && (
          <div className="hidden sm:flex sm:items-center sm:gap-[25px] sm:relative">
            <Link to="/room/create">
              <Button text={"스터디룸 생성"} color="primary" />
            </Link>
            {/* Notification */}
            <Notification
              onClick={clickAlarm}
              notiArr={notiArr}
              uncheckedCnt={notiCnt}
            />
          </div>
        )}

        {/* Search Bar */}
        {/* <SearchBar /> */}
        {/* Menu Button */}
        <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
          <i className="bx bx-menu text-4xl"></i>
        </label>
      </div>
    </header>
  );
}

export default Navbar;
