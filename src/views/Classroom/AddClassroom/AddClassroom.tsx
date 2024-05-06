import RowColumnGenerator from '@/components/RowColumnGenerator/RowColumnGenerator'
import React, { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import {
  Button,
  Card,
  TimePicker,
  Popover,
  Radio,
  Space,
  Form,
  Input,
  Switch
} from 'antd'
import { formatTime, goByHours } from '@/utils/time'
import { addClassroom } from '@/api/classroom/classroom'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '@/store/features/counterSlice'

import { RootState } from '@/store/store'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}
const AddClassroom: React.FC = () => {
  const [tableArrange, setTableArrange] = useState([0, 0])
  const [selectedSizeType, setSelectedSizeType] = useState('6_4')
  const [selectedTimeType, setSelectedTimeType] = useState(1)
  const [customTimeRange, setCustomTimeRange] = useState('')
  const [addCustomClassroomSizeOpen, setAddCustomClassroomSizeOpen] =
    useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const selectedSizeTypeChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setSelectedSizeType(e.target.value)
  }
  const selectedTimeTypeChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setSelectedTimeType(e.target.value)
  }
  const tableArrangeSelect = (row: number, column: number) => {
    setTableArrange([row, column])
    setAddCustomClassroomSizeOpen(!addCustomClassroomSizeOpen)
  }
  const handleCustomTimeChange = (time: any, timeString: any) => {
    // Update custom time range state
    console.log('timestr', timeString)
    setCustomTimeRange(time)
  }
  const handleAddCustomClassroomSize = () => {
    setAddCustomClassroomSizeOpen(!addCustomClassroomSizeOpen)
  }
  const content = (
    <RowColumnGenerator row={8} column={12} emitResult={tableArrangeSelect} />
  )
  const onIsAuthChange = () => {
    setIsAuth(!isAuth)
  }
  const formatParams = (values: any) => {
    const { name, isAuth, password, description, size, selectedTime } = values
    // 处理教室规格
    let rows = 0
    let columns = 0
    if (size === 'custom') {
      // 自定义大小
      ;[rows, columns] = tableArrange
    } else {
      const [rowsStr, columnsStr] = size.split('_')
      rows = parseInt(rowsStr, 10)
      columns = parseInt(columnsStr, 10)
    }
    const capacity = rows * columns
    // 处理时间
    const timeRange =
      selectedTime === 4
        ? {
            startTime: formatTime(customTimeRange[0]),
            endTime: formatTime(customTimeRange[1])
          }
        : goByHours(selectedTime)

    const data = {
      name,
      isAuth,
      password: isAuth ? password : '', // 只有在 isAuth 为 true 时才包含密码
      description,
      capacity,
      rows,
      columns,
      ...timeRange,
      teacherId: 12
    }
    return data
  }
  const onFinish = (values: any) => {
    const data = formatParams(values)
    addClassroom(data)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex h-66 gap-2">
          <Card title="教室" className="flex-1">
            <Form.Item
              label="教室名"
              name="name"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="教室密码" style={{ marginBottom: 0 }}>
              <Form.Item
                name="isAuth"
                style={{ display: 'inline-block', width: 'calc(20%)' }}
              >
                <Switch onChange={onIsAuthChange} />
              </Form.Item>
              {isAuth && (
                <Form.Item
                  label="请输入"
                  name="password"
                  style={{ display: 'inline-block', width: 'calc(80%)' }}
                >
                  <Input.Password />
                </Form.Item>
              )}
            </Form.Item>

            <Form.Item label="教室简介" name="description">
              <Input.TextArea />
            </Form.Item>
          </Card>
          <Card title="选择教室规格" className="w-60">
            <Form.Item
              name="size"
              rules={[{ required: true, message: '请选择教室规格!' }]}
            >
              <Radio.Group
                onChange={selectedSizeTypeChange}
                value={selectedSizeType}
              >
                <Space direction="vertical">
                  <Radio value="6_4">6 * 4</Radio>
                  <Radio value="8_7">8 * 7</Radio>
                  <Radio value="12_10">12 * 10</Radio>
                  <Radio value="custom">
                    {selectedSizeType !== 'custom' ? (
                      '自定义'
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="w-14">
                          {tableArrange[0]}行 {tableArrange[1]}列
                        </h3>
                        <Popover
                          placement="leftBottom"
                          content={content}
                          fresh={true}
                          open={addCustomClassroomSizeOpen}
                          onOpenChange={handleAddCustomClassroomSize}
                        >
                          <Button>手动选择</Button>
                        </Popover>
                      </div>
                    )}
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card title="选择时间" className="w-80">
            <Form.Item
              name="selectedTime"
              rules={[{ required: true, message: '请选择上课时间!' }]}
            >
              <Radio.Group
                onChange={selectedTimeTypeChange}
                value={selectedTimeType}
              >
                <Space direction="vertical">
                  <Radio value={999}>无限时</Radio>
                  <Radio value={1}>1小时</Radio>
                  <Radio value={2}>2小时</Radio>
                  <Radio value={4}>
                    {selectedTimeType !== 4 && '自定义'}
                    {selectedTimeType === 4 ? (
                      <TimePicker.RangePicker
                        onChange={handleCustomTimeChange}
                      />
                    ) : null}
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
        </div>
        <Form.Item className="float-end mt-3">
          <Button type="primary" htmlType="submit">
            新建
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-64">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  )
}
export default AddClassroom
