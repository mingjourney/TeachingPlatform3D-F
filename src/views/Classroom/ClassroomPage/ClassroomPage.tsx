import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ClassroomPage: React.FC = () => {
  const navigate = useNavigate()
  const AddClassroom = () => {
    navigate('add')
  }
  return (
    <div>
      教室列表23232
      <Button onClick={AddClassroom}>新建教室</Button>
    </div>
  )
}
export default ClassroomPage
