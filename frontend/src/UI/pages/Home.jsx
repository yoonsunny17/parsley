import React from "react";
import Collections from "../organisms/MainPageHerbCollections";
import Ranking from "../organisms/Ranking";
import StudyRooms from "../organisms/StudyRooms";
import Navbar from "../organisms/Navbar";
import NonLoginComponent from "../organisms/NonLoginComponent";
import { useSelector } from "react-redux";

function Home() {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <div className="text-font1 h-100 mb-6">
      <Navbar />
      <div className="h-[calc(100%-88px)]">
        <div className="flex flex-wrap justify-between mb-16">
          {isLogin && <Collections />}
          {!isLogin && <NonLoginComponent />}

          <Ranking />
        </div>
        <StudyRooms />
      </div>
    </div>
  );
}

export default Home;
