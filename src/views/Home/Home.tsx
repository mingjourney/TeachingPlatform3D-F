import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd'
import { Calendar, theme } from 'antd'
import type { CalendarProps } from 'antd'
import type { Dayjs } from 'dayjs'

import CourseCard from '@/components/CourseCard/CourseCard'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import { getAllClassroom } from '@/api/classroom/classroom'
import { Classroom } from '@/interface/classroom'

const Home: React.FC = () => {
  const [popularClassList, setPopularClassList] = useState<Classroom[]>([])
  const { token } = theme.useToken()
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG
  }
  useEffect(() => {
    fetchClassroomList()
  }, [])
  const fetchClassroomList = async () => {
    const { data } = await getAllClassroom({})
    setPopularClassList(data)
  }
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <p>
          本平台集成了3D教学面板、
          AI机器人，为学生/老师提供全面、专业的线上教学环境。
        </p>
        <div className="flex justify-between items-center h-14">
          <h2 className="flex text-lg items-center">
            热门课堂 <SvgIcon name="popular" />
          </h2>
          <Button className="flex items-center">
            <SvgIcon name="refresh" />
            换一批
          </Button>
        </div>
        <Row gutter={[16, 16]} className="card-list">
          {popularClassList.map((course) => (
            <Col className="gutter-row" span={6} key={course.id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
        <div className="flex justify-between items-center h-14">
          <h2 className="flex text-lg items-center">
            课程表 <SvgIcon name="popular" />
          </h2>
        </div>
        <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </Col>
    </Row>
  )
}
export default Home
