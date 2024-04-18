import { Tabs, TabsProps } from 'antd'
import React from 'react'
import LoginForm from './LoginForm'
const Login: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '手机号登录',
      children: <LoginForm loginMethod={1} />
    },
    {
      key: '2',
      label: '邮箱登录',
      children: <LoginForm loginMethod={2} />
    },
    {
      key: '3',
      label: '钉钉登录',
      children: 'Content of Tab Pane 3'
    }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }
  return (
    <div className="flex flex-col justify-center items-center columns h-dvh ">
      <h1 className="text-3xl font-bold m-10">Login 3D Teaching Platform</h1>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
export default Login
