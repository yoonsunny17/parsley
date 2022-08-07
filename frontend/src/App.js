import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLogin from "./UI/pages/AuthLogin";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import EnterStudyRoom from "./UI/pages/EnterStudyRoom";
import Home from "./UI/pages/Home";
import StudyRoomOV from "./UI/pages/StudyRoomOV";
// import StudyRoom from "./components/pages/StudyRoom";
import Drawer from "./UI/organisms/Drawer";

function App() {
    return (
        <BrowserRouter>
            <Drawer>
                <div className="App container mx-auto px-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/room/create"
                            element={<CreateStudyRoom />}
                        />
                        <Route path="/user/login" element={<AuthLogin />} />
                        <Route path="/room" element={<EnterStudyRoom />} />
                        <Route path="/studyroom" element={<StudyRoomOV />} />
                    </Routes>
                </div>
            </Drawer>
        </BrowserRouter>
    );
}

export default App;
