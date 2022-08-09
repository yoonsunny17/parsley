import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudyRoom from "./UI/pages/CreateStudyRoom";
import EnterStudyRoom from "./UI/pages/EnterStudyRoom";
import Home from "./UI/pages/Home";
import Drawer from "./UI/organisms/Drawer";
import SearchStudyRooms from "./UI/pages/SearchStudyRooms";
import KakaoLogin from "./UI/pages/KakaoLogin";

function App() {
    return (
        <BrowserRouter>
            <Drawer>
                <div className="App container mx-auto px-5 mb-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/room/create"
                            element={<CreateStudyRoom />}
                        />
                        <Route path="/login" element={<KakaoLogin />} />
                        <Route path="/room" element={<EnterStudyRoom />} />
                        <Route path="/search" element={<SearchStudyRooms />} />
                    </Routes>
                </div>
            </Drawer>
        </BrowserRouter>
    );
}

export default App;
