import UserManageList from '@/components/UserManageList/UserManageList'
import React from 'react'
const BrowsingHistory: React.FC = () => {
  return (
    <div>
      <div className="font-bold text-base	mb-3">浏览记录 </div>
      <UserManageList />
    </div>
  )
}
export default BrowsingHistory
