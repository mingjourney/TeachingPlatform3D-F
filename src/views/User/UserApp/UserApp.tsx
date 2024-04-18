import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, theme } from 'antd'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import userRoutes from '@/router/UserRoutes'
import { useRoutes } from 'react-router-dom'
import { formatRoutesToMenu } from '@/utils/tool'
const { Content } = Layout
const dropItems: MenuProps['items'] = [
  {
    label: '个人主页',
    key: '/my'
  },
  {
    label: '退出登录',
    key: '/login',
    danger: true
  }
]

const UserApp: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const outLet = useRoutes(userRoutes)
  return (
    <Layout>
      <CustomHeader
        items={formatRoutesToMenu(userRoutes)}
        dropItems={dropItems}
      />
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
