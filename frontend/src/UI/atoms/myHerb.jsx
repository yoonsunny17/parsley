import React, { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Herb(props) {
  const { nodes, materials } = useGLTF("fantasy_plants/scene.gltf");
  return (
    <div className="container border-4 border-main w-auto h-auto">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <spotLight
            intensity={0.9}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <PerspectiveCamera />
          <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={1.69}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group
                  position={[-3.03, -0.06, -7.8]}
                  rotation={[-Math.PI, -0.59, -Math.PI]}
                  scale={0.86}
                >
                  <mesh
                    geometry={nodes.Plants5_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[2.96, -0.08, -8.87]}
                  rotation={[-Math.PI, 0.49, -Math.PI]}
                >
                  <mesh
                    geometry={nodes.Plants4_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group position={[5.98, -0.08, -1.19]} rotation={[0, 1.23, 0]}>
                  <mesh
                    geometry={nodes.Plants3_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[-5.93, -0.08, -1.03]}
                  rotation={[0, -1.21, 0]}
                >
                  <mesh
                    geometry={nodes.Plants2_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[-0.01, 0.56, -3.52]}
                  rotation={[1.26, 0, 0]}
                  scale={[0.29, 1.15, 1.15]}
                >
                  <mesh
                    geometry={nodes.Plants1_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[-4.92, -0.06, -3.86]}
                  rotation={[-Math.PI, -1.11, -Math.PI]}
                  scale={0.86}
                >
                  <mesh
                    geometry={nodes.Plants6_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[2.96, -0.08, -7.03]}
                  rotation={[-Math.PI, 0.49, -Math.PI]}
                >
                  <mesh
                    geometry={nodes.Plants7_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group position={[5.98, -0.08, 0.66]} rotation={[0, 1.23, 0]}>
                  <mesh
                    geometry={nodes.Plants8_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group position={[-4.21, -0.08, 3.36]} rotation={[0, -0.72, 0]}>
                  <mesh
                    geometry={nodes.Plants10_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[-1.88, -0.06, -5.03]}
                  rotation={[-Math.PI, -0.34, -Math.PI]}
                  scale={0.86}
                >
                  <mesh
                    geometry={nodes.Plants11_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group position={[5.98, -0.08, 2.24]} rotation={[0, 1.23, 0]}>
                  <mesh
                    geometry={nodes.Plants13_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group position={[-4.54, -0.08, 4.62]} rotation={[0, -0.79, 0]}>
                  <mesh
                    geometry={nodes.Plants15_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[4.03, 0.62, -3.17]}
                  rotation={[-3, 0.66, 3.04]}
                >
                  <mesh
                    geometry={nodes.Plants17_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[6.51, -0.08, 1.51]}
                  rotation={[-Math.PI, 1.53, -Math.PI]}
                >
                  <mesh
                    geometry={nodes.Plants18_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[0.13, 0.55, 1.55]}
                  rotation={[1.26, 0, -0.35]}
                  scale={[0.29, 1.15, 1.15]}
                >
                  <mesh
                    geometry={nodes.Plants19_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[1.14, -0.08, -2.57]}
                  rotation={[-Math.PI, 0.18, -Math.PI]}
                >
                  <mesh
                    geometry={nodes.Plants21_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
                <group
                  position={[-0.01, 0.56, 3.56]}
                  rotation={[1.26, 0, 0]}
                  scale={[0.29, 1.15, 1.15]}
                >
                  <mesh
                    geometry={nodes.Plants23_Plant_Mat_0.geometry}
                    material={materials.Plant_Mat}
                  />
                </group>
              </group>
            </group>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Herb;
