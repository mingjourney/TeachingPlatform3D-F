import UserSideMenu from '@/components/UserSideMenu/UserSideMenu'
import UserRoutesPersonal from '@/router/UserRoutesPersonal'
import { formatPageRoutesToMenu } from '@/utils/tool'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { useRoutes } from 'react-router-dom'
const MyPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const menuItems = formatPageRoutesToMenu(UserRoutesPersonal)
  // 待优化
  const openKeys = [menuItems![0]?.key] as string[]
  const outLet = useRoutes(UserRoutesPersonal)
  // const items2: MenuProps['items'] = [
  //   {
  //     key: 'personal-center',
  //     icon: <UserOutlined />,
  //     label: '个人中心',
  //     children: [
  //       { key: 'personal-center/dashboard', label: '个人中心概览' },
  //       { key: 'personal-center/favorites', label: '收藏夹' },
  //       { key: 'personal-center/browsing-history', label: '浏览记录' }
  //     ]
  //   },
  //   {
  //     key: 'security-center',
  //     icon: <LaptopOutlined />,
  //     label: '安全中心',
  //     children: [
  //       { key: 'security-center/dashboard', label: '安全中心概览' },
  //       { key: 'security-center/change-password', label: '修改密码' },
  //       { key: 'security-center/two-factor-auth', label: '双因素认证' }
  //     ]
  //   }
  // ]
  return (
    <Layout>
      <UserSideMenu openKeys={openKeys} items={menuItems}></UserSideMenu>
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
export default MyPage
