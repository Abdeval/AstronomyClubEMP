
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

function Planet({ texture, position, size }) {
  const colorMap = useLoader(TextureLoader, texture);
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      {/* <meshStandardMaterial map={colorMap} /> */}
    </Sphere>
  );
}

export default function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 5, 20] }}>
      {/* <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
       */}
      {/* Sun */}
      <Planet texture={'/images/sun.jpg'} position={[0, 0, 0]} size={4} />
      
      {/* Earth */}
      <Planet texture="/images/galaxy.jpg" position={[10, 0, 0]} size={1} />
      
      {/* Mars */}
      <Planet texture="/images/planet.png" position={[-15, 0, 0]} size={0.8} />
      
      <OrbitControls />
    </Canvas>
  );
}
