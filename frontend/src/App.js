import { BrowserRouter, Routes, Route } from "react-router-dom";
import Farm from "./components/pages/Farm";
import Navbar from "./UI/organisms/Navbar";

function App() {
  return (
    <div className="App container mx-auto px-5">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/farm" element={<Farm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
