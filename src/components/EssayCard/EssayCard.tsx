import React from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

const EssayCard: React.FC = ({ essay }) => {
  const navigate = useNavigate()
  const { id, vacancyCount, onlineCount, description, name } = course
  const isSeatZero = vacancyCount === 0
  const isSeatLessThanFive = vacancyCount < 5
  const textStyles = {
    color: isSeatZero ? 'gray' : isSeatLessThanFive ? 'red' : 'black'
  }
  const handleCardClick = () => {
    navigate('/onlineClassroom3D/' + id)
  }
  return (
    <Card
      className={
        isSeatZero
          ? ''
          : 'shadow-md hover:shadow-md transform hover:-translate-y-1'
      }
      onClick={handleCardClick}
    >
      <Card.Meta
        title={<h3>标题: {name}</h3>}
        description={
          <div>
            <p>
              <span className="mr-4">
                剩余座位: <span style={textStyles}>{vacancyCount}</span>
              </span>
              <span>
                在线人数: <span>{onlineCount}</span>
              </span>
            </p>
            <p>介绍: {description}</p>
          </div>
        }
      />
    </Card>
  )
}

export default EssayCard
