import React from 'react'
import styles from '../../Styles/style'
import ShopInfo from "../../Components/Shop/ShopInfo.jsx"
import ShopProfileData from "../../Components/Shop/ShopProfileData.jsx"
const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[rgb(245,245,245)]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage