
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function HoloPuck(props) {
  const { nodes, materials } = useGLTF("/holo-puck-transformed.glb");

  materials.Material.envMapIntensity = 0.8;
  materials.Material.emissiveIntensity = 0.3;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder_Material_0.geometry}
        material={materials.Material}
        rotation={[-Math.PI / 2.4, 0, 0]}
        scale={[2.972*0.15, 2.972*0.15, 0.396*0.15]}
      />
    </group>
  );
}

useGLTF.preload("/holo-puck-transformed.glb");