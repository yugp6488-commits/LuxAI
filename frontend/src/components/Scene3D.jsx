import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Box, Sphere, Cylinder, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';

const CameraManager = () => {
  const cameraRef = useRef();

  useLayoutEffect(() => {
    // We animate a proxy object and apply to camera in useFrame
    const cameraProxy = {
      x: 0, y: 5, z: 20,
      rx: -0.2, ry: 0, rz: 0
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });

    // 0-30%: Exterior to Interior
    tl.to(cameraProxy, {
      x: 0, y: 2, z: 5,
      rx: 0, ry: 0.5, rz: 0,
      ease: "power2.inOut",
      duration: 1
    }, "0")
    
    // 30-65%: Interior to Rooftop
    .to(cameraProxy, {
      x: 0, y: 15, z: 2,
      rx: -1.5, ry: 0, rz: 0,
      ease: "power2.inOut",
      duration: 1
    }, "1")
    
    // 65-85%: Rooftop to Dashboard (Abstract)
    .to(cameraProxy, {
      x: 0, y: 30, z: 0,
      rx: -Math.PI / 2, ry: 0, rz: 0,
      ease: "power2.inOut",
      duration: 1
    }, "2");

    cameraRef.current = cameraProxy;

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  useFrame((state) => {
    if (cameraRef.current) {
      state.camera.position.set(cameraRef.current.x, cameraRef.current.y, cameraRef.current.z);
      state.camera.rotation.set(cameraRef.current.rx, cameraRef.current.ry, cameraRef.current.rz);
    }
  });

  return null;
};

const AbstractHouse = () => {
  return (
    <group>
      {/* Base / Floor */}
      <Box args={[30, 0.5, 30]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#111" />
      </Box>
      
      {/* Pool */}
      <Box args={[10, 0.6, 6]} position={[5, -0.2, 8]}>
        <meshStandardMaterial color="#0050FF" transparent opacity={0.6} roughness={0.1} />
      </Box>

      {/* Main Structure (Glassy) */}
      <Box args={[15, 6, 12]} position={[0, 3, -2]}>
        <meshPhysicalMaterial 
          color="#222" 
          transmission={0.9} 
          opacity={1} 
          roughness={0.1} 
          thickness={0.5} 
        />
      </Box>

      {/* Architectural Accents */}
      <Cylinder args={[0.2, 0.2, 6]} position={[-7.3, 3, 3.8]}>
        <meshStandardMaterial color="#00D6FF" emissive="#00D6FF" emissiveIntensity={2} />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 6]} position={[7.3, 3, 3.8]}>
        <meshStandardMaterial color="#00D6FF" emissive="#00D6FF" emissiveIntensity={2} />
      </Cylinder>

      {/* Floating sphere for AI abstract feel */}
      <Sphere args={[2, 64, 64]} position={[0, 10, -2]}>
        <MeshDistortMaterial color="#0A0F1D" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
    </group>
  );
};

const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 5, 20], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00D6FF" />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#0050FF" />
      
      <AbstractHouse />
      <CameraManager />
      
      {/* Fallback environment since preset 'night' might need internet/assets, using a simple standard setup */}
      <Environment preset="city" background={false} blur={1} />
    </Canvas>
  );
};

export default Scene3D;
