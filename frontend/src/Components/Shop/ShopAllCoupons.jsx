import React from 'react'
import DashboardSideBar from './Layout/DashboardSideBar'
import DashboardHeader from './Layout/DashboardHeader'
import AllCoupons from "./AllCoupons.jsx"

const ShopAllCoupons = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex  justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
            <DashboardSideBar active={9} />
        </div>
        <div className="w-full flex justify-center">
            <AllCoupons/>
        </div>
    </div>
</div>
  )
}

export default ShopAllCoupons