import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home'
import Drawer from "./UI/molecules/Drawer";

function App() {
  return (
    <Drawer>
      <div className="App container mx-auto px-5 drawer drawer-end">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </Drawer>
  );
}

export default App;
