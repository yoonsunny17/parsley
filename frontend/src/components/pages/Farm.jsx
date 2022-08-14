import FarmCollection from "../../UI/organisms/FarmCollection";
import FarmGame from "../../UI/organisms/FarmGame";

function Farm() {
  return (
    <div className="flex flex-wrap justify-between mb-16">
      {/* 농장 컴포넌트 FarmGame.jsx */}
      <FarmGame />
      {/* 도감 컴포넌트 FarmCollection.jsx */}
      <FarmCollection />
    </div>
  );
}

export default Farm;
