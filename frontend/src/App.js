import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./components/pages/CreateStudyRoom";
import Home from "./components/pages/Home";
import MyPage from "./components/pages/MyPage";
import Drawer from "./UI/molecules/Drawer";

function App() {
  return (
  <BrowserRouter>
    <Drawer>
      <div className="App container mx-auto px-5 drawer drawer-end">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/create" element={<CreateStudyRoom />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
      </div>
    </Drawer>
  </BrowserRouter>
  );
}

export default App;
