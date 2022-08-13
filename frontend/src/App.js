import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import StudySession from "./OpenVidu/StudySession";
import MyPage from "./UI/pages/MyPage";
import NotFound from "./UI/pages/NotFound";
import KakaoLogin from "./UI/pages/KakaoLogin";

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
                        <Route path="/login" element={<KakaoLogin />} />
                        {/* <Route path="/studyroom" element={<StudyRoom />} /> */}
                        {/* <Route
                            path="/studyroom"
                            element={<FingerStudyRoom />}
                        /> */}
                        <Route path="/room" element={<StudySession />} />
                        <Route path="/me" element={<MyPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Drawer>
        </BrowserRouter>
    );
}

export default App;
