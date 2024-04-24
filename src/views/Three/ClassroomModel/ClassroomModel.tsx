import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
type xYZ = [x: number, y: number, z: number]
interface ClassroomModelProps {
  position: xYZ
  scale: number
}
const ClassroomModel: React.FC<ClassroomModelProps> = ({
  position,
  scale = 1
}) => {
  const { scene } = useGLTF('/assets/classroom.glb') as any
  // const ref = useRef<any>(null)
  // useFrame(() => {
  //   if (ref.current) {
  //     ref.current.rotation.y = Math.PI
  //   }
  // })

  return (
    <primitive
      object={scene}
      scale={[scale, scale, scale]}
      position={position}
      rotation={[0, Math.PI, 0]}
    />
  )
}

export default ClassroomModel
