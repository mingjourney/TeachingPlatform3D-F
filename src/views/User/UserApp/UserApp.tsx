import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, theme } from 'antd'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import userRoutes from '@/router/UserRoutes'
import { useRoutes } from 'react-router-dom'
const { Content } = Layout
// console.log([1, 2, 4, 5, 6].shift())
const items1: MenuProps['items'] = [
  { key: '/home', label: '首页' },
  { key: '/classroom', label: '教室面板' },
  { key: '/learnboard', label: '学习面板' },
  { key: '/teachboard', label: '教学面板' },
  { key: '/my', label: '我的' }
]

const UserApp: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const outLet = useRoutes(userRoutes)
  return (
    <Layout>
      <CustomHeader items={items1} />
      <Layout>
        {/* <UserSideMenu items={items2}></UserSideMenu> */}
        <Layout style={{ padding: '2rem' }}>
          <Content
            style={{
              padding: 34,
              margin: 0,
              minHeight: 900,
              borderRadius: '20px',
              background: colorBgContainer
            }}
          >
            {outLet}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default UserApp
