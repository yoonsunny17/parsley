import React, { Suspense, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function HerbComponent1(props) {
  const { nodes, materials } = useGLTF("nature_forest/scene.gltf");
  return (
    <div className="h-[200px] w-[180px]">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight color={0xfff8dd} intensity={0.6} />
          <directionalLight
            color={0xff0000}
            intensity={0.8}
            position={[0, 2, 0]}
          />
          <spotLight
            color={0x00ff00}
            intensity={1}
            distance={8}
            angle={Math.PI / 8}
            penumbra={0}
          />
          <pointLight color={0xffffff} intensity={1} distance={8} decay={2} />
          <hemisphereLight
            color={0xffeeb1}
            groundColor={0x080820}
            intensity={0.1}
          />
          <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                {/* // TODO : 여기부터 넣으면 됨 */}
                <group
                  position={[0, -1.5, -4.5]}
                  rotation={[-Math.PI / 3, 0, 3.5]}
                  scale={1}
                >
                  <mesh
                    geometry={nodes.Herb_C_01_LOD1_Mat_Nature_0.geometry}
                    material={materials.Mat_Nature}
                  />
                </group>

                {/* <group rotation={[-Math.PI / 2, 0, 0]} scale={1}>
                  <mesh
                    geometry={nodes.Flora_A_01_LOD1_Mat_Nature_0.geometry}
                    material={materials.Mat_Nature}
                  />
                </group> */}
              </group>
            </group>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HerbComponent1;
