import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import CreateProduct from '../../Components/Shop/CreateProduct.jsx'


const CreateProductPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-center justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={4} />
                </div>
                <div className="w-full flex justify-center">
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default CreateProductPage