import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Input } from 'antd'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import remarkGfm from 'remark-gfm'
import {
  addComment,
  addUserFavorite,
  deleteUserFavorite,
  fetchEssayDetailById,
  getComments
} from '@/api/learnResource/learnResource'
import { StarOutlined, StarTwoTone } from '@ant-design/icons'
const CourseDetail: React.FC = () => {
  const { courseId } = useParams()
  // const { courseId } = match.params
  const [courseDetail, setCourseDetail] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const Image = styled.img`
    max-width: 50%; // 设置图像最大宽度为原始宽度的50%
    height: auto; // 高度自动，保持宽高比
  `
  const handleFavorite = async () => {
    const formData = new FormData()
    formData.append('essayId', parseInt(courseId))

    const { data } = isFavorite
      ? await deleteUserFavorite(formData)
      : await addUserFavorite(formData)
    setIsFavorite(!isFavorite)
  }
  const components = {
    img: ({ node, ...props }) => (
      <Image
        css={css`
          // 添加任何其他样式，例如圆角、边框等。
        `}
        {...props}
      />
    )
  }
  const handlePostComment = async () => {
    const formData = new FormData()
    formData.append('essayId', courseId)
    formData.append('comment', newComment)
    if (newComment.trim()) {
      await addComment(formData)
      // setComments([...comments, { content: newComment }])
      fetchComment(courseId)

      setNewComment('')
    }
  }
  const fetchCourseDetailById = async (courseId) => {
    const {
      data: { essay, favorite }
    } = await fetchEssayDetailById({ courseId: parseInt(courseId) })
    setCourseDetail(essay)
    setIsFavorite(favorite)
  }
  const fetchComment = async (courseId) => {
    const { data: commentsData } = await getComments({
      essayId: parseInt(courseId)
    })
    setComments(commentsData)
  }
  useEffect(() => {
    fetchCourseDetailById(courseId)
    fetchComment(courseId)
  }, [courseId])
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/course">课程</Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>
          <Link to={`/course/${category}`}>{category}</Link>
        </Breadcrumb.Item> */}
        <Breadcrumb.Item>{courseId}</Breadcrumb.Item>
      </Breadcrumb>
      {courseDetail ? (
        <Card style={{ marginTop: 16 }}>
          <h2 className="text-lg font-bold text-base mb-1">
            {courseDetail.title}
          </h2>
          <span onClick={handleFavorite}>
            {isFavorite ? (
              <StarTwoTone twoToneColor="#eb2f96" />
            ) : (
              <StarOutlined />
            )}
          </span>

          <p className=" text-gray-500 mb-3">{courseDetail.description}</p>
          <ReactMarkdown
            className="markdown-body"
            children={courseDetail.content}
            remarkPlugins={[remarkGfm]}
            components={components}
          />
          <Input.TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="添加评论..."
          />
          <Button
            type="primary"
            onClick={handlePostComment}
            style={{ marginTop: 8 }}
          >
            提交评论
          </Button>
          <div></div>
          <div className="space-y-4 mt-5">
            {comments.map((comment, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <span className="text-white text-sm">
                      {comment.nickname.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {comment.nickname}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.timeAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  )
}

export default CourseDetail
