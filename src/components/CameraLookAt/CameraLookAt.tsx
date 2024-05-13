import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

function CameraLookAt({ position, lookAt }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(...position)
    camera.lookAt(new THREE.Vector3(...lookAt))
    camera.updateProjectionMatrix()
  }, [camera, position, lookAt])

  return null
}
export default CameraLookAt
