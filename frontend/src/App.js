import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import StudySession from "./OpenVidu/StudySession";
import ShareSession from "./OpenVidu/ShareSession";
// import EnterStudyRoom from "./components/pages/EnterStudyRoom";
// import SearchStudyRooms from "./components/pages/SearchStudyRooms";
import MyPage from "./UI/pages/MyPage";
import NotFound from "./UI/pages/NotFound";
import KakaoLogin from "./UI/pages/KakaoLogin";
import StudyRoomInfo from "./UI/pages/StudyRoomInfo";
import SearchStudyRooms from "./UI/pages/SearchStudyRooms";
import Farm from "./UI/pages/Farm";
import TestCode from "./UI/organisms/TestCode";

function App() {
    return (
        <BrowserRouter>
            <Drawer>
                <div className="App container mx-auto px-5 font-sans">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/me" element={<MyPage />} />
                        <Route path="/login" element={<KakaoLogin />} />

                        <Route path="/room">
                            <Route path=":id" element={<StudyRoomInfo />} />
                        </Route>
                        <Route
                            path="/room/create"
                            element={<CreateStudyRoom />}
                        />
                        <Route path="/room/detail" element={<StudySession />} />

                        <Route path="/search" element={<SearchStudyRooms />} />
                        <Route path="/farm" element={<Farm />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Drawer>
        </BrowserRouter>
    );
}

export default App;
