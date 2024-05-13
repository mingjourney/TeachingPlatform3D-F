import { useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AxesHelper } from 'three'
import * as THREE from 'three'
import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Text
} from '@react-three/drei'
import { suspend } from 'suspend-react'
const forest = import('@pmndrs/assets/hdri/forest.exr').then(
  (module) => module.default
)
import DeskModel from '../DeskModel/DeskModel'
import ClassroomModel from '../ClassroomModel/ClassroomModel'
import { useAppSelector } from '@/store/hooks'
import StudentBoxWithMessage from '../StudentBoxWithMessage/StudentBoxWithMessage'
type studentRealTimeInfo = {
  id: number
  nickname: number
  position: any
}
interface ThreeSceneProps {
  deskPositionArr: Array<Array<number>>
  currentStudentList: studentRealTimeInfo[]
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  deskPositionArr = [],
  currentStudentList = []
}) => {
  const user = useAppSelector((state) => state.user)
  const [target, setTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  )
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]) // 新增状态来保存摄像头的目标点
  useEffect(() => {
    const ownPosition = currentStudentList.find((stu) => stu.id === user.id)
      ?.position

    if (ownPosition && ownPosition.length === 3) {
      const newPosition = [...ownPosition]
      // 摄像头位置位于学生上方
      newPosition[0] += -0.5
      newPosition[1] += 1
      newPosition[2] += 2
      setCameraPosition(newPosition)
    }
  }, [currentStudentList])
  // 刚进房间根据角色调整摄像头
  useEffect(() => {
    if (user.role === '学生') {
      setTarget(new THREE.Vector3(0, 2.1, 8.5))
    }
  }, [])
  const CameraLogger = () => {
    const { camera } = useThree()
    useFrame(() => {
      camera.lookAt(target)
    })
    return null
  }

  return (
    <Canvas>
      <SceneElements />
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={65}
        rotation={[-Math.PI / 2, 3, 0]}
      />
      {/* <PerspectiveCamera makeDefault position={[0, 2.1, 8.5]} fov={65} /> */}
      <group position={[-0.45, 0, 2.3]}>
        {deskPositionArr.flat().map((position, index) => (
          <DeskModel key={index} position={position} />
        ))}
      </group>

      <group position={[0, 0.4, 3]}>
        {currentStudentList.map((student, index) => (
          <group key={index} position={student.position}>
            <StudentBoxWithMessage key={index} student={student} />
          </group>
        ))}
      </group>
      <Environment files={suspend(forest)} />
      {/* <Environment preset="forest" background /> */}
      <ClassroomModel position={[0, -0.22, 0]} scale={1.8} />
      <CameraLogger />
    </Canvas>
  )
}

const SceneElements = () => (
  <>
    <primitive object={new AxesHelper(10)} />
    <ambientLight intensity={2.5} />
    <spotLight
      position={[0, 2, 10]}
      angle={0.15}
      penumbra={1}
      decay={0.1}
      intensity={Math.PI}
    />
    <OrbitControls />
  </>
)

export default ThreeScene
