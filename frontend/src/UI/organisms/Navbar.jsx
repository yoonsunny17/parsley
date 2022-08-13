import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import MenuBtn from "../atoms/MenuBtn";
import SearchBar from "../molecules/SearchBar";

function Navbar() {
  return (
    <header className="h-[72px] flex justify-between items-center mt-0 mb-4">
      <Link to="/">
        <span className="logo font-logo text-3xl cursor-pointer">PARSLEY</span>
      </Link>
      <div className="flex items-center gap-[25px]">
        <Link to="/room/create">
          <Button text={"스터디룸 생성"} />
        </Link>
        <SearchBar />
        <MenuBtn />
      </div>
    </header>
  );
}

export default Navbar;
