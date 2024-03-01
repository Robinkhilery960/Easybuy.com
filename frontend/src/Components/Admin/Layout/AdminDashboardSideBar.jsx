import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGif, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { VscNewFile } from 'react-icons/vsc'
import { CiMoneyBill, CiSettings } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'

const AdminDashboardSideBar = ({ active }) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10 '>
            {/* single item */}
            <div className="w-full flex items-center p-4]">
                <Link to="/admin-dashboard" className="w-full flex items-center m-3">
                    <RxDashboard size={30} color={`${active === 1 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"} `}>Dashboard</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4]"  >
                <Link to="/admin-orders" className="w-full flex items-center m-3">
                    <FiShoppingBag size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"}`}>All Orders</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4]"  >
                <Link to="/admin-products" className="w-full flex items-center m-3">
                    <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"}`}>All Products</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4]"  >
                <Link to="/admin-shops" className="w-full flex items-center m-3">
                    <FiPackage size={30} color={`${active === 4 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"}`}>All Shops</h5>
                </Link>
            </div>


            <div className="w-full flex items-center p-4]" >
                <Link to="/admin-events" className="w-full flex items-center m-3">
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block  pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"}`}>All Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4]" >
                <Link to="/admin-users" className="w-full flex items-center m-3">
                    <MdOutlineLocalOffer size={30} color={`${active === 6 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block  pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"}`}>All User</h5>
                </Link>
            </div>



            <div className="w-full flex items-center p-4]" >
                <Link to="/admin-withdraw-money" className="w-full flex items-center m-3">
                    <CiMoneyBill size={30} color={`${active === 7 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"}`}>Withdraw Money</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4]"  >
                <Link to="/profile" className="w-full flex items-center m-3">
                    <CiSettings size={30} color={`${active === 8 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"}`}> Settings</h5>
                </Link>
            </div>

        </div>
    )
}

export default AdminDashboardSideBar