import React, { Suspense, lazy } from "react";

const HerbComponent1 = React.lazy(() => import("./HerbComponent1"));

function HerbComponentLoad1() {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <HerbComponent1 />
      </Suspense>
    </div>
  );
}

export default HerbComponentLoad1;
