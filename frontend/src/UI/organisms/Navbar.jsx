import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import Notification from "../molecules/Notification";
import SearchBar from "../molecules/SearchBar";

function Navbar() {
    return (
        <header className="h-[72px] flex justify-between items-center mt-0 mb-4">
            <Link to="/">
                <span className="logo font-logo text-3xl cursor-pointer">
                    PARSLEY
                </span>
            </Link>
            <div className="flex items-center gap-[25px] relative">
                <Link to="/room/create">
                    <Button text={"스터디룸 생성"} color="primary" />
                </Link>
                {/* Notification */}
                <Notification />
                {/* Search Bar */}
                <SearchBar />
                {/* Menu Button */}
                <label
                    htmlFor="my-drawer-4"
                    className="drawer-button cursor-pointer"
                >
                    <i className="bx bx-menu text-4xl"></i>
                </label>
            </div>
        </header>
    );
}

export default Navbar;
