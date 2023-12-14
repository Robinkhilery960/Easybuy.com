import React, { useEffect, useState } from 'react'
import Header from '../Components/layout/Header'
import styles from '../Styles/style'
import ProfileSideBar from "../Components/Profile/ProfileSideBar.jsx"
import ProfileContent from "../Components/Profile/ProfileContent.jsx"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  console.log(isAuthenticated)
  const [active, setActive] = useState(1)
  const navigate = useNavigate()

  
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className=" w-[50px] 800px:w-[335px] 800px:mt-0 mt-[30%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>

  )
}

export default ProfilePage