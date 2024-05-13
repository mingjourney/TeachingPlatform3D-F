import { getClassroomList } from '@/api/classroom/classroom'
import BoxScrolling from '@/views/Three/BoxScrolling/BoxScrolling'
import { Button, Card, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TableProps } from 'antd'
import moment from 'moment'

interface Classroom {
  id: number
  classroomName: string
  userId: number
  startTime: string
  endTime: string
}

const ClassroomHome: React.FC = () => {
  const navigate = useNavigate()

  const [classroomList, setClassroomList] = useState<Classroom[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    fetchClassroomList()
  }, [pagination.current, pagination.pageSize]) // 监听分页参数的变化

  const fetchClassroomList = async () => {
    try {
      const {
        data: { classroomList, total }
      } = await getClassroomList({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize
      })
      setClassroomList(classroomList)
      setPagination((prevPagination) => ({ ...prevPagination, total }))
    } catch (error) {
      console.error('Failed to fetch classroom list:', error)
    }
  }

  const AddClassroom = () => {
    navigate('add')
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => {
        const startTime = moment(record.startTime)
        const endTime = moment(record.endTime)
        const currentTime = moment()
        const isInInterval = currentTime.isBetween(startTime, endTime)
        return (
          <span style={{ color: isInInterval ? 'green' : 'inherit' }}>
            {startTime.format('YYYY-MM-DD HH:mm:ss')} -{' '}
            {endTime.format('YYYY-MM-DD HH:mm:ss')}
          </span>
        )
      }
    },
    {
      title: '在线人数',
      dataIndex: 'onlineCount',
      key: 'onlineCount'
    },
    {
      title: '剩余位置',
      dataIndex: 'vacancyCount',
      key: 'vacancyCount'
    }
  ]

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination) // 更新分页参数
  }

  return (
    <div>
      <h2 className="flex text-lg pb-2">
        教室列表
        <BoxScrolling />
      </h2>
      <Button className='mb-2' onClick={AddClassroom}>新建教室</Button>
      <Table
        columns={columns}
        dataSource={classroomList}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default ClassroomHome
