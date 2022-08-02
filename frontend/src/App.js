import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterStudyRoom from "./components/pages/EnterStudyRoom";
import StudyRoom from "./components/pages/StudyRoom";

function App() {
  return (
    <div className="App container mx-auto px-5">
      <BrowserRouter>
        <Routes>
          <Route path="room" element={<StudyRoom />} />
          <Route path="enterstudy" element={<EnterStudyRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
