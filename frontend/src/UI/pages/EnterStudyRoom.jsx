import Navbar from "../../UI/organisms/Navbar";
import StudyInfo from "../../UI/organisms/StudyInfo";
import StudyKing from "../../UI/organisms/StudyKing";

function EnterStudyRoom() {
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

export default EnterStudyRoom;
