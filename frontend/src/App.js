import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyRoom from "./components/pages/StudyRoom";

function App() {
  return (
    <div className="App container mx-auto px-5">
      <BrowserRouter>
        <Routes>
          <Route path="room" element={<StudyRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
