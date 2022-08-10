import React, { Suspense, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function BabyHerb(props) {
  const { nodes, materials } = useGLTF("shiba/scene.gltf");
  return (
    <div className="h-full">
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
          <group {...props} dispose={null} scale={3}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    geometry={nodes.Group18985_default_0.geometry}
                    material={materials["default"]}
                  />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    geometry={nodes.Box002_default_0.geometry}
                    material={materials["default"]}
                  />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    geometry={nodes.Object001_default_0.geometry}
                    material={materials["default"]}
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

export default BabyHerb;
