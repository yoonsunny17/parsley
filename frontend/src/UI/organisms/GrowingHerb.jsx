import { useEffect, useState } from "react";
import HerbComponent1 from "../atoms/HerbComponent1";
import HerbComponent2 from "../atoms/HerbComponent2";
import HerbComponent3 from "../atoms/HerbComponent3";

function GrowingHerb() {
  const [middle, setMiddle] = useState(true);
  const [final, setFinal] = useState(true);

  useEffect(() => {
    let stage2 = setTimeout(() => {
      setMiddle(false);
    }, 10000);
    return () => {
      clearTimeout(stage2);
      // clearTimeout(stage3);
    };
  });

  // useEffect(() => {
  //   let stage3 = setTimeout(() => {
  //     setFinal(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(stage3);
  //   };
  // });

  return (
    <div>
      {middle === true ? (
        <div>
          <HerbComponent1 />
        </div>
      ) : final === true ? (
        <div>
          <HerbComponent2 />
        </div>
      ) : (
        <div>
          <HerbComponent3 />
        </div>
      )}
    </div>
  );
}

export default GrowingHerb;
