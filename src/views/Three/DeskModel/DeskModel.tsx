import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'

const DeskModel: React.FC<{ position: number[] }> = ({ position }) => {
  const { scene } = useGLTF('/assets/andesk.glb') as any
  const clonedScene = useMemo(() => scene.clone(), [scene])
  console.log('position', position)
  // const ref = useRef<any>(null)
  // useFrame(() => {
  //   if (ref.current) {
  //     ref.current.rotation.y = Math.PI
  //   }
  // })

  return (
    <primitive
      key={position}
      object={clonedScene}
      scale={[1, 1, 1]}
      position={position}
      rotation={[0, Math.PI, 0]}
    />
  )
}

export default DeskModel
