import Navbar from "../organisms/Navbar";
import StudyInfo from "../organisms/StudyInfo";
import StudyKing from "../organisms/StudyKing";

function StudyRoomInfo() {
    return (
        <div className="text-font1">
            <Navbar />
            <div>
                <StudyInfo />
                <StudyKing />
            </div>
        </div>
    );
}

export default StudyRoomInfo;
