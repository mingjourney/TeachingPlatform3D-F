import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const StuModel: React.FC<{ position: number[] }> = ({ position }) => {
  const { scene } = useGLTF('/assets/stu-sit.glb') as any
  const clonedScene = useMemo(() => scene.clone(), [scene])

  return (
    <primitive
      key={position}
      object={clonedScene}
      scale={[0.5, 0.5, 0.5]}
    />
  )
}

export default StuModel
