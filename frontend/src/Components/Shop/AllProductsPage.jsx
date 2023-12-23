import React from 'react'
import AllProducts from '../../Components/Shop/AllProducts.jsx'
import DashboardHeader from './Layout/DashboardHeader.jsx'
import DashboardSideBar from './Layout/DashboardSideBar.jsx'


const AllProductsPage = () => {
  return (
    <div>
            <DashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={3} />
                </div>
                <div className="w-full flex justify-center">
                    <AllProducts/>
                </div>
            </div>
        </div>
  )
}

export default AllProductsPage