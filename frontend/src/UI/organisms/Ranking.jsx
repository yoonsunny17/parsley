function Ranking() {

  return (
    <div className="bg-white rounded-3xl drop-shadow px-8 py-5 w-full md:w-[32%]">
      <h3 className="text-xl font-bold text-center mb-4">
        오늘의 농부왕
      </h3>
      <ul className="list-none">
        <li className="mb-8">1등</li>
        <li className="mb-8">2등</li>
        <li className="mb-8">3등</li>
        <li className="my-4">내 등수</li>
      </ul>
    </div>
  );
}

export default Ranking;