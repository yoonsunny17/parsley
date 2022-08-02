import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home'
function App() {
  return (
    <div className="App container mx-auto px-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
