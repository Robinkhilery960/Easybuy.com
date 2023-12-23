import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import  AllEvents from "../Shop/AllEvents.jsx"

const AllEventsPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex  justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
            <DashboardSideBar active={5} />
        </div>
        <div className="w-full flex justify-center">
            <AllEvents/>
        </div>
    </div>
</div>
  )
}

export default AllEventsPage