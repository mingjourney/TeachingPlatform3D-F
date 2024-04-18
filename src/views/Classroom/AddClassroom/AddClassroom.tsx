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
  Input
} from 'antd'
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
  const [selectedSizeType, setSelectedSizeType] = useState(1)
  const [selectedTimeType, setSelectedTimeType] = useState(1)
  const [addCustomClassroomSizeOpen, setAddCustomClassroomSizeOpen] =
    useState(false)

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
  const handleAddCustomClassroomSize = () => {
    setAddCustomClassroomSizeOpen(!addCustomClassroomSizeOpen)
  }
  const content = (
    <RowColumnGenerator row={8} column={12} emitResult={tableArrangeSelect} />
  )
  return (
    <div>
      <div className="flex h-66 gap-2">
        <Card title="教室" className="flex-1">
          <Form {...formItemLayout}>
            <Form.Item
              label="教室名"
              name="classroomName"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="教室密码" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="教室简介" name="classroomInfo">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Card>
        <Card title="选择教室规格" className="w-60">
          <Radio.Group
            onChange={selectedSizeTypeChange}
            value={selectedSizeType}
          >
            <Space direction="vertical">
              <Radio value={1}>6 * 4</Radio>
              <Radio value={2}>8 * 7</Radio>
              <Radio value={3}>12 * 10</Radio>
              <Radio value={4}>
                {selectedSizeType !== 4 && '自定义'}
                {selectedSizeType === 4 ? (
                  <div className="flex items-center gap-2">
                    <h3>
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
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
        <Card title="选择时间" className="w-80">
          <Radio.Group
            onChange={selectedTimeTypeChange}
            value={selectedTimeType}
          >
            <Space direction="vertical">
              <Radio value={1}>1小时</Radio>
              <Radio value={2}>2小时</Radio>
              <Radio value={3}>无限时</Radio>
              <Radio value={4}>
                {selectedTimeType !== 4 && '自定义'}
                {selectedTimeType === 4 ? <TimePicker.RangePicker /> : null}
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
      </div>
    </div>
  )
}
export default AddClassroom
