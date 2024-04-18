import React from 'react'
import UserSideMenu from '@/components/UserSideMenu/UserSideMenu'
import DifficultyRoutes from '@/router/DifficultyRoutes'
import { formatPageRoutesToMenu } from '@/utils/tool'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import { useRoutes } from 'react-router-dom'
const Difficulty: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const outLet = useRoutes(DifficultyRoutes)
  const menuItems = formatPageRoutesToMenu(DifficultyRoutes)
  // 待优化
  const openKeys = [menuItems![0]?.key] as string[]
  return (
    <Layout>
      <UserSideMenu items={menuItems} openKeys={openKeys} />
      <Layout style={{ padding: '2rem' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          {outLet}
        </Content>
      </Layout>
    </Layout>
  )
}
export default Difficulty
