import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import MyPage from "./UI/pages/MyPage";
import NotFound from "./UI/pages/NotFound";
import KakaoLogin from "./UI/pages/KakaoLogin";
import StudyRoomInfo from "./UI/pages/StudyRoomInfo";
import SearchStudyRooms from "./UI/pages/SearchStudyRooms";
import Farm from "./UI/pages/Farm";
import StudySession from "./OpenVidu/StudySession";
import ViewAllStudyRooms from "./UI/pages/ViewAllStudyRooms";

function App() {
  return (
    <BrowserRouter>
      <Drawer>
        <div className="App container mx-auto px-5 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<MyPage />} />
            <Route path="/login" element={<KakaoLogin />} />

            <Route path="/room" element={<ViewAllStudyRooms />} />
            <Route path="/room/:id" element={<StudyRoomInfo />} />
            <Route path="/room/create" element={<CreateStudyRoom />} />
            <Route path="room/search/:word" element={<SearchStudyRooms />} />
            <Route path="/room/session/:roomId" element={<StudySession />} />

            <Route path="/farm" element={<Farm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Drawer>
    </BrowserRouter>
  );
}

export default App;
