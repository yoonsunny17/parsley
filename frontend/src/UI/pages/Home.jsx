import React from "react";
import Collections from "../organisms/Collections";
import Ranking from "../organisms/Ranking";
import Studyrooms from "../organisms/StudyRooms";
import Navbar from "../organisms/Navbar";

function Home() {
    return (
        <div className="text-font1 h-100">
            <Navbar />
            <div className="h-[calc(100%-88px)]">
                <div className="flex flex-wrap justify-between mb-16">
                    <Collections />
                    <Ranking />
                </div>
                <Studyrooms />
            </div>
        </div>
    );
}

export default Home;
