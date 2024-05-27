import { useEffect, useState } from 'react'
import { Input, Pagination, PaginationProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

import {
  fetchAllEssayCategory,
  fetchEssaysByInfo
} from '@/api/learnResource/learnResource'
const EssayLearn = () => {
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [allCategory, setAllCategory] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [selectedSortType, setSelectedSortType] = useState(1)
  const [sortTypeList, setSortTypeList] = useState([
    { id: 1, title: '最热优先' },
    { id: 2, title: '最新发布' }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const [courses, setCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // const itemsPerPage = 10
  const navigate = useNavigate()
  const handleCourseClick = (courseId) => {
    navigate(`/resourceboard/course/${courseId}`)
  }
  useEffect(() => {
    setSelectedCategory(1)
    const fetchData = async () => {
      const { data } = await fetchAllEssayCategory({})
      setAllCategory([{ id: 0, title: '所有类别', key: 'allType' }, ...data])
    }
    fetchData()
  }, [])
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await fetchEssayByCategory({ type: selectedCategory })
  //     setCourses(data)
  //   }
  //   fetchCourses()
  // }, [selectedCategory])
  const fetchCourses = async () => {
    const {
      data: { total, essayList }
    } = await fetchEssaysByInfo({
      type: selectedCategory,
      sortType: selectedSortType,
      searchTerm: searchTerm,
      pageSize: pageSize,
      pageIndex: currentPage
    })
    setTotal(total)
    setCourses(essayList)
  }
  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, selectedSortType, searchTerm, currentPage, pageSize])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }
  const handleSortTypeClick = (category) => {
    setSelectedSortType(category)
    setCurrentPage(1)
  }
  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }, 300)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    _,
    pageSize
  ) => {
    setPageSize(pageSize)
    // fetchCourses()
  }
  return (
    <div className="flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-4 py-2 ">
        <div className="flex flex-wrap gap-2">
          <span className="h-8 flex items-center justify-center font-bold text-base mb-3">
            学科类型：
          </span>
          {allCategory.map((category) => (
            <div
              key={category.key}
              onClick={() => handleCategoryClick(category.id)}
              className={`h-8 p-2 bg-sky-100 rounded-lg text-center flex items-center justify-center cursor-pointer ${
                category.id === selectedCategory ? 'bg-sky-200' : 'bg-sky-100'
              }`}
            >
              {category.title}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center justify-center font-bold text-base">
              排序方式：
            </span>
            {sortTypeList.map((sortType) => (
              <div
                key={sortType.id}
                onClick={() => handleSortTypeClick(sortType.id)}
                className={`h-8 p-2 bg-sky-100 rounded-lg text-center flex items-center justify-center cursor-pointer ${
                  sortType.id === selectedSortType ? 'bg-sky-200' : 'bg-sky-100'
                }`}
              >
                {sortType.title}
              </div>
            ))}
          </div>
          <div className="flex w-64">
            <span className="flex items-center justify-center font-bold text-base w-24">
              搜索
            </span>
            <Input
              aria-label="搜索"
              placeholder="输入教师名、课程名、教室ID"
              onChange={handleSearchChange}
            ></Input>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600">
                {course.description.length > 76
                  ? `${course.description.slice(0, 76)}...`
                  : course.description}
              </p>
              <a
                onClick={() => handleCourseClick(course.id)}
                className="text-blue-500 hover:underline"
              >
                查看详情
              </a>
            </div>
          ))}
        </div>
        <Pagination
          onChange={handlePageChange}
          current={currentPage}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSize={pageSize}
          total={total}
          className="mt-4 flex justify-center"
        />
      </div>
    </div>
  )
}

export default EssayLearn
