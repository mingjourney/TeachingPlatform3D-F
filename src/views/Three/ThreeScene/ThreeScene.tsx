import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AxesHelper } from 'three'
import { Environment, OrbitControls } from '@react-three/drei'
import DeskModel from '../DeskModel/DeskModel'
import ClassroomModel from '../ClassroomModel/ClassroomModel'
import StuModel from '../StuModel/StuModel'
interface ThreeSceneProps {
  row: number
  column: number
}
const ThreeScene: React.FC<ThreeSceneProps> = ({ row = 6, column = 8 }) => {
  const offsetRow = (row - 1) / 2
  const offsetColumn = (column - 1) / 2
  const [positionArr, setPositionArr] = useState([])

  useEffect(() => {
    const positionArr = []
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        positionArr.push([offsetColumn - j, 0, offsetRow - i])
      } 
    }
    setPositionArr(positionArr)
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas>
        <SceneElements />
        <group position={[-0.45,0,2.3]}>
          {positionArr.map((position, index) => (
            <DeskModel key={index} position={position} />
          ))}
        </group>
        <StuModel position={[0, 1, 0]} />
        <Environment preset="forest" background />
        <ClassroomModel position={[0, -0.22, 0]} scale={1.8} />
      </Canvas>
    </div>
  )
}

const SceneElements = () => (
  <>
    <primitive object={new AxesHelper(10)} />
    <ambientLight intensity={0.5} />
    <spotLight
      position={[10, 10, 10]}
      angle={0.15}
      penumbra={1}
      decay={0}
      intensity={Math.PI}
    />
    <OrbitControls />
  </>
)

export default ThreeScene
