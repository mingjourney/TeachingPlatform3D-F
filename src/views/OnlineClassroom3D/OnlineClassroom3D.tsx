import {
  Button,
  Drawer,
  Input,
  Modal,
  Popover,
  Space,
  message,
  Form,
  TabsProps,
  Tabs
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import ThreeScene from '../Three/ThreeScene/ThreeScene'
import { getUserInfo } from '@/utils/userHelper'
import { useAppSelector } from '@/store/hooks'
import RowColumnSelector from '@/components/RowColumnSelector/RowColumnSelector'
import OnlineVisualPanel from '../OnlineVisualPanel/OnlineVisualPanel'
import VideoInfoArgs from '../VideoInfoArgs/VideoInfoArgs'
import moment from 'moment'
type studentRealTimeInfo = {
  id: number
  nickname: number
  position: any
}
const OnlineclassNameroom3D: React.FC = () => {
  const { roomId: roomIdStr } = useParams()
  const roomId = parseInt(roomIdStr!)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ownPosition, setOwnPosition] = useState([0, 0])
  const [roomLiveInfo, setRoomLiveInfo] = useState<any>({})
  const [currentStudentList, setCurrentStudentList] = useState<
    studentRealTimeInfo[]
  >([])
  const currentStudentListRef = useRef(currentStudentList)
  useEffect(() => {
    currentStudentListRef.current = currentStudentList
  }, [currentStudentList])
  const user = useAppSelector((state) => state.user)
  const [selectDeskOpen, setSelectDeskOpen] = useState(false)
  const [deskPositionArr, setDeskPositionArr] = useState<Array<Array<any>>>([])
  const deskPositionArrRef = useRef(deskPositionArr)
  useEffect(() => {
    deskPositionArrRef.current = deskPositionArr
  }, [deskPositionArr])
  const tableSelect = (row: number, column: number) => {
    setOwnPosition([row, column])
    setSelectDeskOpen(false)
  }
  const [emitedScore, setEmitedScore] = useState<number>(0)
  const { id: userId } = getUserInfo()
  // const roomId = ref('3333')
  const socket = io('http://localhost:3456')

  function initConnect() {
    // socket = io('https://signaling.fedtop.com')

    // 连接成功时触发
    socket.on('connect', () => {
      handleConnect()
    })
    socket.on('userChange', (data) => {
      console.log('finduserChange', data)
      // const list = data[0].userList.map((item) => item.userId)
      // const updatedStudentList = currentStudentListRef.current.map()
      setCurrentStudentList([data])
    })
    socket.on('roomUpdate', (data) => {
      console.log('roomUpdate', data)
      setRoomLiveInfo(data)
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

    socket.on('userChangePosition', (data) => {
      console.log('oldlist', currentStudentListRef.current) // 使用引用获取最新状态
      console.log('deskPositionArr', deskPositionArrRef.current) // 使用引用获取最新状态
      console.log('open', open)
      const [row, column] = data.ownPosition
      console.log('row,column', row, column)
      const updatedStudentList = currentStudentListRef.current.map(
        (student) => {
          if (student.id === data.userId) {
            return {
              ...student,
              position: deskPositionArrRef.current[row - 1][column - 1]
            }
          }
          return student
        }
      )
      console.log('Updatedlist:', updatedStudentList)
      setCurrentStudentList(updatedStudentList)
    })
    // 当有用户加入房间时触发
    socket.on('welcome', (data) => {
      message.success(
        data.id === userId ? '成功加入房间' : `${data.nickname}加入房间`
      )
    })
    // 当有用户离开房间时触发
    socket.on('leave', (data) => {
      message.warning(
        data.userId === userId ? '成功离开房间' : `${data.nickname}离开房间`
      )
    })
    // // 当有用户发送消息时触发
    // socket.on('message', (data) => {
    //   console.log('message', data)
    // })
    // 创建offer,发送给远端
  }
  // 连接成功
  function handleConnect() {
    socket.emit('join', { roomId: roomId, ...user })
  }
  function handleTurnHead(score: number) {
    console.log(moment().format('HH:mm:ss'), '转头了', score)
    if (Math.abs(score - emitedScore) > 0.3) {
      socket.emit('turnHead', { roomId, userId, score })
      setEmitedScore(score)
    }
  }

  useEffect(() => {
    console.log('gggg')
    const init = async () => {
      try {
        // const {
        //   data: { rows, columns }
        // } = await getClassroomDetailById({ roomId })
        // 初始化连接
        console.log('调用initConnect')
        initConnect()
        if (user.role === '学生') {
          setOpen(true)
        }
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

  const showLeftDrawer = () => {
    setLeftDrawerOpen(true)
  }
  const showRightDrawer = () => {
    setRightDrawerOpen(true)
  }

  const onClose = () => {
    setLeftDrawerOpen(false)
    setRightDrawerOpen(false)
  }

  const handleOk = () => {
    socket.emit('changePosition', { userId, roomId, ownPosition })
    setOpen(false)
  }
  const content = (
    <RowColumnSelector
      row={roomLiveInfo.rows}
      column={roomLiveInfo.columns}
      emitResult={tableSelect}
    />
  )
  const handleOpenChange = () => {
    setSelectDeskOpen(!selectDeskOpen)
  }
  const handleCancel = () => {
    setOpen(false)
    //
  }
  const onFinish = (values: any) => {
    socket.emit('message', { userId, roomId, message: values.message })
    // console.log('Success:', values)
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '在线可视面板',
      children: <OnlineVisualPanel userList={roomLiveInfo.userList} />
    },
    {
      key: '2',
      label: '视频信息参数',
      children: <VideoInfoArgs handleTurnHead={handleTurnHead} />
    }
    // {
    //   key: '3',
    //   label: '钉钉登录',
    //   children: 'Content of Tab Pane 3'
    // }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }
  return (
    <div className="flex flex-col text-gray-300 text-xs">
      <Drawer
        title="数据情况"
        onClose={onClose}
        open={leftDrawerOpen}
        placement="left"
        destroyOnClose={false}
      >
        <Tabs defaultActiveKey="1" items={items} centered onChange={onChange} />
      </Drawer>
      <Drawer
        title="操作栏"
        onClose={onClose}
        open={rightDrawerOpen}
        placement="right"
        destroyOnClose={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: '不能为空!' }]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        open={open}
        title="选择座位"
        width={210}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            退出教室
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            入座
          </Button>
        ]}
      >
        <div className="flex items-center gap-2">
          <h3 className="w-14">
            {ownPosition[0]}行 {ownPosition[1]}列
          </h3>
          <Popover
            placement="leftBottom"
            content={content}
            fresh={true}
            open={selectDeskOpen}
            onOpenChange={handleOpenChange}
          >
            <Button>手动选择</Button>
          </Popover>
        </div>
      </Modal>
      <div className="absolute m-2 w-full text-center z-30 ">
        教室编号：{roomId}
      </div>
      <div className="absolute p-4 z-30 ">
        <Button
          onClick={showLeftDrawer}
          type="text"
          size="small"
          className="text-gray-300"
        >
          信息面板
        </Button>
      </div>
      <div className="absolute right-0 p-4 z-30 ">
        <Button
          onClick={showRightDrawer}
          type="text"
          size="small"
          className="text-gray-300"
        >
          操作面板
        </Button>
      </div>
      <div className="w-full h-screen">
        <ThreeScene
          deskPositionArr={roomLiveInfo.deskPositionArr}
          currentStudentList={roomLiveInfo.userList}
        />
      </div>
    </div>
  )
}
export default OnlineclassNameroom3D
