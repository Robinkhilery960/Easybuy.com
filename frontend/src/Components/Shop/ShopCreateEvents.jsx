import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import CreateEvent from '../Shop/CreateEvent.jsx'

const ShopCreateEvents = () => {
  return (
    <div>
            <DashboardHeader />
            <div className="flex items-center justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={6} />
                </div>
                <div className="w-full flex justify-center">
                    <CreateEvent />
                </div>
            </div>
        </div>
  )
}

export default ShopCreateEvents