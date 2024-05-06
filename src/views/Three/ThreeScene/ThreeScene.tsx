import { useEffect, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { AxesHelper } from 'three'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Text
} from '@react-three/drei'
import DeskModel from '../DeskModel/DeskModel'
import ClassroomModel from '../ClassroomModel/ClassroomModel'
interface ThreeSceneProps {
  rows: number
  columns: number
  currentStudentList: number[]
}
const ThreeScene: React.FC<ThreeSceneProps> = ({
  rows = 6,
  columns = 8,
  currentStudentList = []
}) => {
  const offsetRow = (rows - 1) / 2
  const offsetColumn = (columns - 1) / 2
  const [positionArr, setPositionArr] = useState([])
  // const CameraLogger = () => {
  //   const { camera } = useThree()

  //   useFrame(() => {
  //     // console.log('摄像头位置:', camera.position)
  //     // console.log('摄像头旋转:', camera.rotation)
  //   })

  //   return null // 这个组件不需要渲染任何东西
  // }
  useEffect(() => {
    const positionArr = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        positionArr.push([offsetColumn - j, 0, offsetRow - i])
      }
    }
    console.log('wc', rows, columns)

    setPositionArr(positionArr)
  }, [rows, columns])
  useEffect(() => {
    currentStudentList.push('咕咕加密', '柯颖花')
  }, [])
  // 新增: 渲染文本Mesh的函数
  const renderTextMesh = (text: number, position: number[], key: number) => {
    return (
      <mesh position={position} key={key}>
        <Text fontSize={0.5} anchorX="center" anchorY="middle">
          {text}
        </Text>
      </mesh>
    )
  }
  const texts = ['aa', 'aa', 'ewa', 'eda']

  return (
    <div className="w-full h-screen">
      <Canvas>
        <SceneElements />
        <PerspectiveCamera makeDefault position={[0, 2.1, 8.5]} fov={65} />
        <group position={[-0.45, 0, 2.3]}>
          {positionArr.map((position, index) => (
            <DeskModel key={index} position={position} />
          ))}
        </group>
        <group position={[-0.45, 0.8, 2.3]}>
          {currentStudentList.map((text, index) => (
            // 假设我们将所有文本放置在同一位置以简化示例，实际应用中应根据需求调整位置
            <>{renderTextMesh(text, [0, 0, index * 1.5], index)}</>
          ))}
        </group>
        {/* <CameraLogger /> */}
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
