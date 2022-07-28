import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./components/pages/CreateStudyRoom";

function App() {
  return (
    <div className="App container mx-auto px-5">
      <BrowserRouter>
        <Routes>
          <Route path="room/create" element={<CreateStudyRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
