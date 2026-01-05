import { Suspense, useEffect, useRef } from "react";

import { PerspectiveCamera, useEnvironment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import Scene from "../../public/marble_head_of_herakles/Scene";
import gsap from "gsap";

function EnvironmentMap() {
  const envMap = useEnvironment({ files: "/poolbeg_2k.hdr" });
  return <primitive object={envMap} background />;
}

export default function Model({ progress }) {
  const cameraRef = useRef();
  const lightRef = useRef();

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  });
  useEffect(() => {
    if (!cameraRef.current || !lightRef.current) {
      return;
    }
    const camPositions = [
      [-2.36, -11.52, -44.45],
      [45.82, 1.65, 3.42],
      [-26.49, -6.19, 38.91],
      [-23.93, -12, -20.63],
      [-6.35, -6.67, -51],
    ];

    const radius = 150; // distance from center
    const height = 100; // fixed Y
    const numLights = 5; // number of lights

    // Generate positions along a full circle (360°)
    const lightPositions = Array.from({ length: numLights }, (_, i) => {
      const angle = (2 * Math.PI * i) / numLights; // 0 → 2π
      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;
      return [x, y, z];
    });

    const segmentProgress = 1 / 4;
    const segmentIndex = Math.min(
      Math.floor(progress / segmentProgress),
      camPositions.length - 2
    );

    const percentage = (progress % segmentProgress) / segmentProgress;

    // Camera interpolation
    const [cx1, cy1, cz1] = camPositions[segmentIndex];
    const [cx2, cy2, cz2] = camPositions[segmentIndex + 1];

    const viewx = cx1 + (cx2 - cx1) * percentage;
    const viewy = cy1 + (cy2 - cy1) * percentage;
    const viewz = cz1 + (cz2 - cz1) * percentage;

    // Light interpolation
    const [lx1, ly1, lz1] = lightPositions[segmentIndex];
    const [lx2, ly2, lz2] = lightPositions[segmentIndex + 1];

    const lightX = lx1 + (lx2 - lx1) * percentage;
    const lightY = ly1 + (ly2 - ly1) * percentage;
    const lightZ = lz1 + (lz2 - lz1) * percentage;

    if (progress >= 1) {
      gsap.to(
        cameraRef.current.position,
        {
          x: -6.35,
          y: -6.67,
          z: -51,
          overwrite: true,
        },
        "animation"
      );

      gsap.to(
        lightRef.current.position,
        {
          x: 46.352549156242084,
          y: 100,
          z: -142.65847744427305,
          overwrite: true,
        },
        "animation"
      );
    } else {
      gsap.to(
        cameraRef.current.position,
        {
          x: viewx,
          y: viewy,
          z: viewz,
          overwrite: true,
        },
        "animation"
      );

      gsap.to(
        lightRef.current.position,
        {
          x: lightX,
          y: lightY,
          z: lightZ,
          overwrite: true,
        },
        "animation"
      );
    }
    // Animate with GSAP (kill old tweens so it’s smooth)
  }, [progress]);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        fov={55}
        near={0.1}
        far={100000}
        makeDefault
      />

      {/* Directional Light */}
      <directionalLight
        ref={lightRef}
        intensity={10}
        color={"#ffffff"}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00005}
        shadow-camera-near={1}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <ambientLight intensity={0.3} />

      {/* Model + Environment */}
      <Suspense fallback={null}>
        <EnvironmentMap />
        <Scene
          position={[0, -23.6, 0]}
          rotation={[0, Math.PI, 0]}
          scale={1}
          castShadow
          receiveShadow
        />
      </Suspense>

      {/* Orbit Controls */}
    </>
  );
}
