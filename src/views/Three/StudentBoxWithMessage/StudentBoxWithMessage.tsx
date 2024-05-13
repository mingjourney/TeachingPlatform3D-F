import { Box, Text } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import { useEffect, useState } from 'react'

const AnimatedText = animated(Text)

const StudentBoxWithMessage = ({ student }) => {
  const [showMessage, setShowMessage] = useState(false)
  const [rotationAngle, setRotationAngle] = useState([0, 0, 0])

  useEffect(() => {
    if (student && student.message) {
      console.log('发消息了')
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000)
    }
  }, [student.message])

  useEffect(() => {
    if (student && student.turnHead) {
      console.log('rotationAngle', rotationAngle)
      setRotationAngle([0, (Math.PI * student.turnHead) / 3, 0])
    }
  }, [student.turnHead])

  const { positionY } = useSpring({
    from: { positionY: 0.5 },
    to: {
      positionY: showMessage ? 0.7 : 0.5
    },
    config: config.gentle
  })

  console.log('rotationA', rotationAngle)

  return (
    <group>
      <Box args={[0.25, 0.5, 0.07]} rotation={rotationAngle}>
        <meshStandardMaterial color="royalblue" />
      </Box>
      <group position={[0, 0.4, 0]}>
        <Text
          key={student.id}
          fontSize={0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {student.nickname}
        </Text>
      </group>
      {showMessage && (
        <AnimatedText
          fontSize={0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          position-y={positionY}
        >
          {student.message}
        </AnimatedText>
      )}
    </group>
  )
}

export default StudentBoxWithMessage
