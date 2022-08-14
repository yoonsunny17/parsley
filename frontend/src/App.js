import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import StudySession from "./OpenVidu/StudySession";
import MyPage from "./UI/pages/MyPage";
import NotFound from "./UI/pages/NotFound";
import KakaoLogin from "./UI/pages/KakaoLogin";
import EnterStudyRoom from "./UI/pages/EnterStudyRoom";
import SearchStudyRooms from "./UI/pages/SearchStudyRooms";

function App() {
  return (
    <BrowserRouter>
      <Drawer>
        <div className="App container mx-auto px-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/create" element={<CreateStudyRoom />} />
            <Route path="/login" element={<KakaoLogin />} />
            {/* <Route path="/studyroom" element={<StudyRoom />} /> */}
            {/* <Route
                            path="/studyroom"
                            element={<FingerStudyRoom />}
                        /> */}
            <Route path="/room/detail" element={<StudySession />} />
            {/* <Route path="/room" element={<EnterStudyRoom />} /> */}
            <Route path="/me" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/room" element={<SearchStudyRooms />} />
          </Routes>
        </div>
      </Drawer>
    </BrowserRouter>
  );
}

export default App;
