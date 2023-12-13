import React from 'react'
import { Card } from 'antd'
import './CourseCard.css'
interface CourseCardProps {
  title: string
  spareSeat: number
  onlineNumber: number
  ascribedCourseSeries: string
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  spareSeat,
  onlineNumber,
  ascribedCourseSeries
}) => {
  const isSeatZero = spareSeat === 0
  const isSeatLessThanFive = spareSeat < 5

  const textStyles = {
    color: isSeatZero ? 'gray' : isSeatLessThanFive ? 'red' : 'black'
  }

  return (
    <Card
      className={isSeatZero ? 'card' : 'card card-notFull'}
      hoverable={!isSeatZero && true}
    >
      <Card.Meta
        title={<h3>标题: {title}</h3>}
        description={
          <div>
            <p>
              <span className="card-info">
                剩余座位: <span style={textStyles}>{spareSeat}</span>
              </span>
              <span className="card-info">
                在线人数: <span>{onlineNumber}</span>
              </span>
            </p>
            <p>所属栏目: {ascribedCourseSeries}</p>
          </div>
        }
      />
    </Card>
  )
}

export default CourseCard
