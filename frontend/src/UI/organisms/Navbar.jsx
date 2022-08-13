import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";
import moment from "moment";
import "moment/locale/ko";

function Navbar() {
    return (
        <header className="h-[72px] flex justify-between items-center mt-0 mb-4">
            <Link to="/">
                <span className="logo font-logo text-3xl cursor-pointer">
                    PARSLEY
                </span>
            </Link>
            <div className="flex items-center gap-[25px] relative">
                <div className="dropdown">
                    <label tabIndex="0">
                        <i className="bx bx-bell mt-[10px] text-[25px] cursor-pointer"></i>
                    </label>
                    <div
                        tabIndex="0"
                        className="dropdown-content menu p-[20px] mt-[10px] shadow border-[1px] border-sub1 bg-white rounded-box w-[280px] h-[350px] absolute top-[35px] right-[-145px]"
                    >
                        <div className="flex justify-between mb-[20px]">
                            <div className="text-[18px] font-bold">
                                {moment().format("YYYY. M. D (ddd)")}
                            </div>
                            <button className="border-[2px] border-main rounded-[50px] p-[5px_10px] text-[10px] hover:bg-main hover:text-font3">
                                모두 지우기
                            </button>
                        </div>
                        <div className="font-basic border-b-[1px] border-main">
                            알림
                        </div>
                    </div>
                </div>
                <Link to="/room/create">
                    <Button text={"스터디룸 생성"} color="primary" />
                </Link>
                <SearchBar />
                {/* Menu Button */}
                <label
                    htmlFor="my-drawer-4"
                    className="drawer-button text-4xl cursor-pointer"
                >
                    <i className="bx bx-menu"></i>
                </label>
            </div>
        </header>
    );
}

export default Navbar;
