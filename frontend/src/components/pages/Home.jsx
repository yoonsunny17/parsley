import React from 'react';
import Collections from '../../UI/organisms/Collections';
import Ranking from '../../UI/organisms/Ranking';
import Studyrooms from '../../UI/organisms/StudyRooms';

function Home() {
  return (
    <div className="h-[calc(100%-88px)] pb-8">
      <div className="flex flex-wrap justify-between mb-16">
        <Collections />
        <Ranking />
      </div>
    <Studyrooms />
    </div>
    );
}

export default Home;