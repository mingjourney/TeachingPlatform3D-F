import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Skeleton } from 'antd'

interface DataType {
  gender?: string
  name: {
    title?: string
    first?: string
    last?: string
  }
  email?: string
  picture: {
    large?: string
    medium?: string
    thumbnail?: string
  }
  nat?: string
  loading: boolean
}

const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const UserManageList: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [list, setList] = useState<DataType[]>([])

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false)
        setData(res.results)
        setList(res.results)
      })
  }, [])

  const onLoadMore = () => {
    setLoading(true)
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {}
        }))
      )
    )
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results)
        setData(newData)
        setList(newData)
        setLoading(false)
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'))
      })
  }
  const courseNameList = [
    '算法与数据结构进阶',
    '现代Web开发技术栈',
    '人工智能基础与应用',
    '云计算与服务器管理',
    'Python全栈开发实战',
    '数字信号处理原理',
    '金融数据分析入门',
    '艺术史与现代审美',
    '量子计算导论',
    '高级UI/UX设计工作坊',
    '跨文化沟通与管理',
    '生物信息学与基因组分析'
  ]
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">more</a>
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description={courseNameList[index]}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default UserManageList
