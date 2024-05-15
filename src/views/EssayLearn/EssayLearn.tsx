import { useEffect, useState } from 'react'
import { Card, Pagination } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import {
  fetchAllEssayCategory,
  fetchEssayByCategory
} from '@/api/learnResource/learnResource'

const EssayLearn = () => {
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [allCategory, setAllCategory] = useState([])
  const [courses, setCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
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

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await fetchEssayByCategory({ type: selectedCategory })
      setCourses(data)
    }
    fetchCourses()
  }, [selectedCategory])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-5">
      <div className="flex flex-col w-full lg:w-1/4 space-y-4">
        {allCategory.map((category) => (
          <div
            key={category.key}
            onClick={() => handleCategoryClick(category.id)}
            className="w-34 h-8 my-1.5  bg-text-xs rounded-lg text-center flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {category.title}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full lg:w-3/4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((course) => (
              <div
                key={course.id}
                className="border rounded p-4 shadow hover:shadow-lg transition-shadow"
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
          pageSize={itemsPerPage}
          total={courses.length}
          className="mt-4 flex justify-center"
        />
      </div>
    </div>
  )
}

export default EssayLearn
