import { useState } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { MeshDistortMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

const MyScene = () => {
  const [clicked, setClicked] = useState(false)

  const springs = useSpring({
    color: clicked ? '#569AFF' : '#ff6d6d'
  })

  const handleClick = () => setClicked((s) => !s)

  return (
    <mesh onClick={handleClick}>
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial
        speed={5}
        distort={0.5}
        color={springs.color}
      />
    </mesh>
  )
}

export default function ReactSpringTest() {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 6, 0]} />
      <MyScene />
    </Canvas>
  )
}
