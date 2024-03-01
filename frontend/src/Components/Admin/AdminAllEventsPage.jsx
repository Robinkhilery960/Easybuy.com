import React from 'react' 
import  AdminAllEvents from "../Admin/AdminAllEvents.jsx"
import AdminDashboardHeader from './Layout/AdminDashboardHeader.jsx'
import AdminDashboardSideBar from './Layout/AdminDashboardSideBar.jsx'

const AdminAllEventsPage = () => {
  return (
    <div>
    <AdminDashboardHeader />
    <div className="flex  justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
            <AdminDashboardSideBar active={5} />
        </div>
        <div className="w-full flex justify-center">
            <AdminAllEvents/>
        </div>
    </div>
</div>
  )
}

export default AdminAllEventsPage