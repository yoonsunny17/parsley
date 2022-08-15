import Navbar from "../organisms/Navbar";
import StudyInfo from "../organisms/StudyInfo";
import StudyKing from "../organisms/StudyKing";

function StudyRoomInfo() {
    return (
        <div className="text-font1">
            <Navbar />
            <div className="flex flex-col gap-20 px-0 xl:px-36">
                <StudyInfo />
                <StudyKing />
            </div>
        </div>
    );
}

export default StudyRoomInfo;
