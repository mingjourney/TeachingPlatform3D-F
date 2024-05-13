import { loginUser } from '@/api/user/login'
import {
  Button,
  Form,
  type FormProps,
  Input,
  Radio,
  RadioChangeEvent
} from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { userInfo } from '@/api/user/user'
import { useDispatch } from 'react-redux'
import { saveUser } from '@/store/features/userSlice'

interface Props {
  loginMethod: number
}
enum LoginMethod {
  PHONE = 1,
  EMAIL = 2
}
const LoginForm: React.FC<Props> = ({ loginMethod }) => {
  const navigate = useNavigate()
  type FieldType = {
    username?: string
    email?: string
    password?: string
    role: number
  }
  const dispatch = useDispatch()
  const [role, setRole] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setRole(e.target.value)
  }
  // 登录成功跳转‘/’路径
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData()
    formData.append('password', values.password)
    formData.append('login', values[loginKey as string])
    formData.append('type', loginMethod)
    const { code, data } = await loginUser(formData)
    console.log('code', code, 'data', data)
    if (code === '20000') {
      sessionStorage.setItem('token', data.token)
      const { data: userDetail } = await userInfo({})
      dispatch(saveUser(userDetail))
      sessionStorage.setItem('userInfo', JSON.stringify(userDetail))
      navigate('/')
      return true
    }
    console.log('Success:', values)
  }
  const loginMethodMap: any = {
    [LoginMethod.PHONE]: { name: 'phone', label: '手机号' },
    [LoginMethod.EMAIL]: { name: 'email', label: '邮箱' }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  const { name: loginKey, label: loginLabel } = loginMethodMap[loginMethod]
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label={loginKey}
        name={loginKey}
        rules={[
          {
            required: true,
            message: `请输入您的${loginLabel}！`
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: '请输入您的密码！' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item<FieldType> label="Role" name="role">
        <Radio.Group onChange={onChange} value={role}>
          <Radio value={1}>教师</Radio>
          <Radio value={2}>学生</Radio>
          <Radio value={3}>管理员</Radio>
        </Radio.Group>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
