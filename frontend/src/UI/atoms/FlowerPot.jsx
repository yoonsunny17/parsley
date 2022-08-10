import React, { Suspense, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function FlowerPot(props) {
  const { nodes, materials } = useGLTF("flowerpot/scene.gltf");
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
          <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group
                position={[0.6, -0.65, 5.81]}
                rotation={[0.3, 0.18, -0.87]}
                scale={[0.38, 0.38, 0.13]}
              >
                <mesh
                  geometry={nodes.Sphere_0.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                position={[0.6, -0.65, 5.81]}
                rotation={[0.3, 0.18, -0.87]}
                scale={[0.38, 0.38, 0.13]}
              >
                <mesh
                  geometry={nodes.Sphere001_0.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                position={[0.6, -0.65, 5.07]}
                rotation={[Math.PI, 0, 0.85]}
                scale={[-0.04, 0.04, 0.61]}
              >
                <mesh
                  geometry={nodes.Cylinder_0.geometry}
                  material={materials["Material.003"]}
                />
              </group>
              <group
                position={[0.6, -0.65, 4.04]}
                rotation={[0, 0, -0.85]}
                scale={0.59}
              >
                <mesh
                  geometry={nodes.Cylinder001_0.geometry}
                  material={materials["Material.004"]}
                />
                <mesh
                  geometry={nodes.Cylinder001_0_1.geometry}
                  material={materials["Material.004"]}
                />
              </group>
              <group
                position={[0.6, -0.65, 4.41]}
                rotation={[0, 0, -0.85]}
                scale={[0.91, 0.91, 0.03]}
              >
                <mesh
                  geometry={nodes.Cylinder002_0.geometry}
                  material={materials["Material.005"]}
                />
              </group>
              <group
                position={[0.59, -1.84, 8.61]}
                rotation={[0.26, 0, -0.01]}
                scale={0.38}
              />
              <group position={[0.6, -0.65, 3.34]} scale={[1, 1, 0.13]}>
                <mesh
                  geometry={nodes.Cylinder003_0.geometry}
                  material={materials["Material.006"]}
                />
              </group>
            </group>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FlowerPot;
