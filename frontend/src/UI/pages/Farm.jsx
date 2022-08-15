import FarmCollection from "../organisms/FarmCollection";
import FarmGame from "../organisms/FarmGame";
import Navbar from "../organisms/Navbar";

function Farm() {
  return (
    <div className="text-font1 h-100">
      <Navbar />
      <div className="flex flex-wrap justify-between mb-16">
        {/* 농장 컴포넌트 FarmGame.jsx */}
        <FarmGame />
        {/* 도감 컴포넌트 FarmCollection.jsx */}
        <FarmCollection />
      </div>
    </div>
    //
  );
}

export default Farm;
