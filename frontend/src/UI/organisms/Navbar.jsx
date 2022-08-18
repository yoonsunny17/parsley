import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetNotificationCntQuery,
  useReadNotificationMutation,
} from "../../services/notification";
import Button from "../atoms/Button";
import Notification from "../molecules/Notification";
import SearchBarTest from "../molecules/SearchBarTest";
// import SearchBar from "../molecules/SearchBar";

function Navbar() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const { data } = useGetNotificationCntQuery(
    {},
    { skip: !isLogin, refetchOnMountOrArgChange: true }
  );
  const [readNotification] = useReadNotificationMutation();
  const [notiArr, setNotiArr] = useState([]);

  const clickAlarm = async () => {
    const result = await readNotification().unwrap();
    setNotiArr(result?.notifications);
  };

  return (
    <header className="h-[72px] flex justify-between items-center mt-0 mb-4">
      <Link to="/">
        <span className="logo font-logo text-3xl cursor-pointer">PARSLEY</span>
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
              uncheckedCnt={data?.uncheckCnt}
            />
          </div>
        )}

        {/* Search Bar */}
        <SearchBarTest />
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
