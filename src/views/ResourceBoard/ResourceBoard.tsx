import EssayLearn from '@/views/EssayLearn/EssayLearn'
import { BookOutlined, FilePptOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ResourceList from '../ResourceList/ResourceList'
const tabItems = [
  {
    key: '1',
    label: '学习文章',
    children: <EssayLearn />,
    icon: <BookOutlined />
  },
  {
    key: '2',
    label: '学习资源下载',
    children: <ResourceList />,
    icon: <FilePptOutlined />
  }
]
const ResourceBoard: React.FC = () => {
  return <Tabs defaultActiveKey="1" items={tabItems} type="card" />
}
export default ResourceBoard
