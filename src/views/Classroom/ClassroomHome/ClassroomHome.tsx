import { getAllClassroom } from '@/api/classroom/classroom'
import BoxScrolling from '@/views/Three/BoxScrolling/BoxScrolling'
import { Button, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface Classroom {
  id: number
  classroomName: string
  userId: number
  startTime: string
  endTime: string
}
const ClassroomHome: React.FC = () => {
  const navigate = useNavigate()
  const AddClassroom = () => {
    navigate('add')
  }
  const [classroomList, setClassroomList] = useState<Classroom[]>([])
  useEffect(() => {
    // fetchClassroomList()
  }, [])
  const fetchClassroomList = async () => {
    const { data } = await getAllClassroom({})
    setClassroomList(data)
  }
  const intoClassroom = (e: React.MouseEvent) => {
    console.log('e', e)
    // navigate('/learning/onlineClassroom' + e)
  }
  return (
    <div>
      <h2 className="flex text-lg pb-2">
        教室列表
        <BoxScrolling />
      </h2>
      <div className="flex">
        {classroomList.map(
          ({ id, classroomName, userId, startTime, endTime }) => (
            <Card
              key={id}
              title={classroomName}
              extra={
                <Button id={`button-${id}`} onClick={intoClassroom}>
                  进入学习
                </Button>
              }
            >
              <p>课程名: sss</p>
              <p>讲师：{userId}</p>
              <p>
                时间：{startTime} - {endTime}
              </p>
            </Card>
          )
        )}
      </div>
      <Button onClick={AddClassroom}>新建教室</Button>
    </div>
  )
}
export default ClassroomHome
