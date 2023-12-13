import React from 'react'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useNavigate } from 'react-router-dom'
const UserSideMenu: React.FC<{ items: MenuProps['items'] }> = ({ items }) => {
  const navigateTo = useNavigate()
  const menuClick = (e: { key: string }) => {
    console.log('caidan', e)
    navigateTo(e.key)
  }
  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['personal-center/dashboard']}
        defaultOpenKeys={['personal-center']}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        onClick={menuClick}
      />
    </Sider>
  )
}
export default UserSideMenu
