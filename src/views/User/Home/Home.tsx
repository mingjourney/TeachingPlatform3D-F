import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'

import './Home.css'
import CourseCard from '@/components/CourseCard/CourseCard'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
const Home: React.FC = () => {
  const [popularClassList] = useState([
    {
      id: 12342,
      title: '定上限积分',
      spareSeat: 3,
      onlineNumber: 145,
      ascribedCourseSeries: '《张老师的微积分》'
    },
    {
      id: 12344,
      title: '计算机网络',
      spareSeat: 0,
      onlineNumber: 15,
      ascribedCourseSeries: '杨超的《408》'
    },
    {
      id: 12346,
      title: '计算机网络',
      spareSeat: 0,
      onlineNumber: 15,
      ascribedCourseSeries: '杨超的《408》'
    },
    {
      id: 12345,
      title: '计算机网络',
      spareSeat: 0,
      onlineNumber: 15,
      ascribedCourseSeries: '杨超的《408》'
    }
  ])

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <h1>欢迎来到3D可视化学习平台</h1>
        <p>
          本平台集成了3D教学面板、
          AI机器人，为学生/老师提供全面、专业的线上教学环境。
        </p>
        <div className="sub-line">
          <h2>
            热门课堂 <SvgIcon name="popular" />
          </h2>
          <Button>
            <SvgIcon name="refresh" />
            换一批
          </Button>
        </div>
        <Row gutter={[16, 16]} className="card-list">
          {popularClassList.map((course) => (
            <Col className="gutter-row" span={6} key={course.id}>
              <CourseCard
                title={course.title}
                spareSeat={course.spareSeat}
                onlineNumber={course.onlineNumber}
                ascribedCourseSeries={course.ascribedCourseSeries}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
export default Home
