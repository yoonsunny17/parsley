import React, { Suspense, lazy } from "react";

const HerbComponent2 = React.lazy(() => import("./HerbComponent2"));

function HerbComponentLoad2() {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <HerbComponent2 />
      </Suspense>
    </div>
  );
}

export default HerbComponentLoad2;
