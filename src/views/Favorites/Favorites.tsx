import { getUserFavorites } from '@/api/user/user'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, formatRelative } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const Favorites: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState([])
  const navigate = useNavigate()

  const handleFavoriteClick = (favoriteId) => {
    navigate(`/resourceboard/course/${favoriteId}`)
  }

  const fetchUserFavorites = async () => {
    const { data } = await getUserFavorites({})
    setFavoriteList(data)
  }

  useEffect(() => {
    fetchUserFavorites()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="font-bold text-xl mb-5">收藏夹</div>
      <div className="flex flex-col gap-4">
        {favoriteList.map((favorite) => (
          <div
            key={favorite.id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow space-y-2"
          >
            <h3 className="text-lg font-semibold">{favorite.title}</h3>
            <p className="text-sm text-gray-500">
              收藏时间: {format(new Date(favorite.timeAt), 'yyyy-MM-dd HH:mm')}
              {' - '} (在
              {formatRelative(new Date(favorite.timeAt), new Date(), {
                locale: zhCN
              })}
              )
            </p>
            <a
              onClick={() => handleFavoriteClick(favorite.essayId)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              查看详情
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
