import NetworkStatusChart from '@/components/NetworkStatusChart/NetworkStatusChart'
import { UsergroupAddOutlined } from '@ant-design/icons'
import moment from 'moment'

interface Props {
  userList: any
}
const OnlineVisualPanel: React.FC<Props> = ({ userList }) => {
  const initialNetworkData = [
    { time: moment().format('HH:mm:ss'), status: 50 }
    // 更多数据...
  ]
  const nickNameList = userList.map((stu, index) => (
    <span key={index} className="rounded-full bg-gray-200 px-4 py-2 w-30">
      {stu.nickname}
    </span>
  ))
  return (
    <div>
      <NetworkStatusChart initialData={initialNetworkData} />
      <div className="font-bold text-base	mb-5 flex gap-1">
        {' '}
        <UsergroupAddOutlined />
        在线学生列表
      </div>
      <div className="flex gap-3 flex-wrap">
        {nickNameList}
      </div>
    </div>
  )
}
export default OnlineVisualPanel
