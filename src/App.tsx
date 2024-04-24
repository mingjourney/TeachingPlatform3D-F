import { useRoutes } from 'react-router-dom'
import router from './router'

import './app.css'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// import '@/utils/useAxios'
// import { showMessage } from '@/store/features/messageSlice'
import { useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'

const App: React.FC = () => {
  // const dispatch = useDispatch()
  const hasMounted = useRef(false)
  const [messageApi, contextHolder] = message.useMessage()
  const messageObj = useSelector((state: RootState) => state.message)
  useEffect(() => {
    console.log('hasMounted', hasMounted)
    // messageApi[messageObj.type](messageObj.content)
    if (hasMounted.current) {
      messageApi.info(messageObj.content)
    } else {
      hasMounted.current = true
    }
  }, [messageObj])
  // const info = () => {
  //   messageApi.info('Hello, Ant Design!')
  // }
  const outLet = useRoutes(router)
  return (
    <div className="h-full">
      {' '}
      {contextHolder}
      {outLet}
    </div>
  )
}

export default App
