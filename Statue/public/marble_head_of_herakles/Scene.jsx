import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Scene(props) {
  const { nodes, materials } = useGLTF("/marble_head_of_herakles/scene.gltf");

  const shinyMarbleMaterial = materials.hercules_LOD0_u0_v0.clone();

  shinyMarbleMaterial.map = materials.hercules_LOD0_u0_v0.map;

  shinyMarbleMaterial.roughness = .01;
  shinyMarbleMaterial.metalness = 0.2;
  shinyMarbleMaterial.clearcoat = 0.1;
  shinyMarbleMaterial.clearcoatRoughness = 0.05;
  shinyMarbleMaterial.envMapIntensity = 2.5;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-3.044, -0.022, 0]}>
        {Object.values(nodes).map((node, index) =>
          node.geometry ? (
            <mesh
              key={index}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={shinyMarbleMaterial}
            />
          ) : null
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/marble_head_of_herakles/scene.gltf");
