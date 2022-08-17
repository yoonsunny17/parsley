import React, { Suspense, lazy } from "react";

const HerbComponent3 = React.lazy(() => import("./HerbComponent3"));

function HerbComponentLoad3() {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <HerbComponent3 />
      </Suspense>
    </div>
  );
}

export default HerbComponentLoad3;
