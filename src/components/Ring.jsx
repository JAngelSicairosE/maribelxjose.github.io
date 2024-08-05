// Ring.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

const SpinningRing = ({ scrollPosition }) => {
  const ringRef = useRef();
  const diamondRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      // Ajusta la rotación del anillo para dar la sensación de giro continuo
      ringRef.current.rotation.y += 0.01;
      // Mueve el anillo hacia la pantalla al hacer scroll hacia abajo
      ringRef.current.position.z = 5 - scrollPosition * 15; // Ajusta para mover el anillo a través de la pantalla

      // Ajusta la posición del diamante para que se mantenga en la parte superior del anillo
      if (diamondRef.current) {
        diamondRef.current.position.set(0, 1.5, 0);
        diamondRef.current.rotation.y += 0.01; // Opcional: rotar el diamante
      }
    }
  });

  return (
    <motion.group ref={ringRef} whileHover={{ scale: 1.2 }}>
      <mesh>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      <mesh ref={diamondRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </motion.group>
  );
};

const RingCanvas = ({ scrollPosition }) => {
  return (
    <Canvas style={{ height: '100vh', width: '100%' }} camera={{ position: [0, 0, 15], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SpinningRing scrollPosition={scrollPosition} />
    </Canvas>
  );
};

export default RingCanvas;