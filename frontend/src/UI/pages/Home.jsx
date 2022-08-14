import React from "react";
import Collections from "../organisms/MainPageHerbCollections";
import Ranking from "../organisms/Ranking";
import StudyRooms from "../organisms/StudyRooms";
import Navbar from "../organisms/Navbar";

function Home() {
    return (
        <div className="text-font1 h-100 mb-6">
            <Navbar />
            <div className="h-[calc(100%-88px)]">
                <div className="flex flex-wrap justify-between mb-16">
                    <Collections />
                    <Ranking />
                </div>
                <StudyRooms />
            </div>
        </div>
    );
}

export default Home;
