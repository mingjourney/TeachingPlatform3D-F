// components/CustomHeader.tsx
import React from 'react'
import { Menu, Layout } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const { Header } = Layout

// const selectKeys1 = [
//   props.location.pathname.split('/')[1]
//     ? '/' + props.location.pathname.split('/')[1]
//     : '/'
// ]
const CustomHeader: React.FC<{ items: MenuProps['items'] }> = ({ items }) => {
  const { pathname } = useLocation()
  const key = pathname.split('/')[1] ? '/' + pathname.split('/')[1] : '/'
  const navigateTo = useNavigate()
  const menuClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navigateTo(e.key)
  }
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[key]}
        items={items}
        inlineCollapsed={false}
        onClick={menuClick}
      />
    </Header>
  )
}

export default CustomHeader
