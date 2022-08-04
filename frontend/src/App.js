import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLogin from "./components/pages/AuthLogin";
import CreateStudyRoom from "./components/pages/CreateStudyRoom";
import Home from "./components/pages/Home";
import StudyRoomOV from "./components/pages/StudyRoomOV";
// import StudyRoom from "./components/pages/StudyRoom";
import Drawer from "./UI/organisms/Drawer";

function App() {
  return (
    <BrowserRouter>
      <Drawer>
        <div className="App container mx-auto px-5 drawer drawer-end">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/create" element={<CreateStudyRoom />} />
            <Route path="/user/login" element={<AuthLogin />} />
            {/* <Route path="/studyroom" element={<StudyRoom />} /> */}
            <Route path="/studyroom" element={<StudyRoomOV />} />
          </Routes>
        </div>
      </Drawer>
    </BrowserRouter>
  );
}

export default App;
