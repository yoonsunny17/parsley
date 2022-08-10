import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLogin from "./UI/pages/AuthLogin";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import StudySession from "./OpenVidu/StudySession";

function App() {
    return (
        <BrowserRouter>
            <Drawer>
                <div className="App container mx-auto px-5 drawer drawer-end">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/room/create"
                            element={<CreateStudyRoom />}
                        />
                        <Route path="/user/login" element={<AuthLogin />} />
                        {/* <Route path="/studyroom" element={<StudyRoom />} /> */}
                        {/* <Route
                            path="/studyroom"
                            element={<FingerStudyRoom />}
                        /> */}
                        <Route path="/room" element={<StudySession />} />
                    </Routes>
                </div>
            </Drawer>
        </BrowserRouter>
    );
}

export default App;
