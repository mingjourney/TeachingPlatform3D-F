import { Button, Drawer, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import ThreeScene from '../Three/ThreeScene/ThreeScene'
import { getClassroomDetailById } from '@/api/classroom/classroom'
import { getUserInfo } from '@/utils/userHelper'
import NetworkStatusChart from '@/components/NetworkStatusChart/NetworkStatusChart'

const OnlineclassNameroom3D: React.FC = () => {
  const { roomId: roomIdStr } = useParams()
  const roomId = parseInt(roomIdStr!)
  const [rowColumn, setRowColumn] = useState({ rows: 0, columns: 0 })
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [currentStudentList, setCurrentStudentList] = useState([])
  const fetchClassroomDetail = async (id: number) => {
    const {
      data: { rows, columns }
    } = await getClassroomDetailById({ id })
    setRowColumn({ rows, columns })
  }
  useEffect(() => {
    fetchClassroomDetail(roomId)
  }, [])
  const { id: userId } = getUserInfo()
  // const roomId = ref('3333')
  let socket: Socket
  function initConnect() {
    socket = io('http://localhost:3456')
    // socket = io('https://signaling.fedtop.com')

    // 连接成功时触发
    socket.on('connect', () => {
      handleConnect()
    })
    socket.on('userChange', (data) => {
      const list = data[0].userList.map((item) => item.userId)
      setCurrentStudentList(list)
    })
    // 断开连接时触发
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // 断线是由服务器发起的，重新连接。
        socket.connect()
      }
      message.warning('您已断开连接')
    })
    // 服务端发送报错信息
    socket.on('error', (data) => {
      message.error(data)
    })
    // 当有用户加入房间时触发
    socket.on('welcome', (data) => {
      message.success(
        data.userId === userId ? '成功加入房间' : `${data.userId}加入房间`
      )
    })
    // 当有用户离开房间时触发
    socket.on('leave', (data) => {
      message.warning(
        data.userId === userId ? '成功离开房间' : `${data.userId}离开房间`
      )
    })
    // 当有用户发送消息时触发
    socket.on('message', (data) => {
      console.log('message', data)
    })
    // 创建offer,发送给远端
  }
  // 连接成功
  function handleConnect() {
    socket.emit('join', { userId, roomId: roomId })
  }

  useEffect(() => {
    console.log('gggg')
    const init = async () => {
      try {
        // 初始化连接
        console.log('调用initConnect')
        initConnect()
      } catch (error) {
        console.error('Error accessing media devices.', error)
      }
    }

    init()
    // cleanup
    return () => {
      console.log('leave')
      socket.emit('leave', { userId, roomId })
      socket.disconnect()
    }
  }, [])

  const showDrawer = () => {
    setLeftDrawerOpen(true)
  }

  const onClose = () => {
    setLeftDrawerOpen(false)
  }
  const initialNetworkData = [
    { time: '2024-04-26 17:00:00', status: 50 }
    // 更多数据...
  ]
  return (
    <div className="flex flex-col text-gray-300 text-xs">
      <Drawer
        title="数据情况"
        onClose={onClose}
        open={leftDrawerOpen}
        placement="left"
        destroyOnClose={false}
      >
        <div className="w-20">
          <div className="video-title">当前在线用户列表</div>
          {JSON.stringify(currentStudentList)}
        </div>
        <NetworkStatusChart initialData={initialNetworkData} />
      </Drawer>
      <div className="absolute m-2 w-full text-center z-30 ">
        教室编号：{roomId}
      </div>
      <div className="absolute w-full p-4 z-30 ">
        <Button
          onClick={showDrawer}
          type="text"
          size="small"
          className="text-gray-300"
        >
          信息面板
        </Button>
      </div>
      <ThreeScene
        rows={rowColumn.rows}
        columns={rowColumn.columns}
        currentStudentList={currentStudentList}
      />
    </div>
  )
}
export default OnlineclassNameroom3D
