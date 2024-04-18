// components/CustomHeader.tsx
import React from 'react'
import { Menu, Layout, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'

const { Header } = Layout

// const selectKeys1 = [
//   props.location.pathname.split('/')[1]
//     ? '/' + props.location.pathname.split('/')[1]
//     : '/'
// ]

const CustomHeader: React.FC<{
  items: MenuProps['items']
  dropItems: MenuProps['items']
}> = ({ items, dropItems }) => {
  const { pathname } = useLocation()
  const key = pathname.split('/')[1] ? '/' + pathname.split('/')[1] : '/'
  const navigate = useNavigate()
  const menuClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navigate(e.key)
  }
  // const dropClick = (e: any) => {
  //   console.log('click ', e)
  //   navigate(e.key)
  // }
  return (
    <Header className="flex justify-between items-center">
      <div className="w-8 h-7">
        <img
          src="https://m.hellobike.com/resource/helloyun/28898/GKFSY_badge-3d-2.png?x-oss-process=image/quality,q_80"
          alt=""
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="flex"
        inlineCollapsed={false}
        defaultSelectedKeys={[key]}
        items={items}
        onClick={menuClick}
      />
      <Dropdown className="text-zinc-300" menu={{ items: dropItems }}>
        <a>
          <Space>
            gugu
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  )
}
export default CustomHeader
