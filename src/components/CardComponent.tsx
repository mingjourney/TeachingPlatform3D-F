// CardComponent.tsx
import React from 'react'
import { Card, Space } from 'antd'

interface CardComponentProps {
  title: string
  data: any
}

const CardComponent: React.FC<CardComponentProps> = ({ title, data }) => {
  return (
    <Space>
      <Card size="small" title={title} style={{ margin: '0px' }}>
        <div> 结果：{data.toString()}</div>
      </Card>
    </Space>
  )
}

export default CardComponent
