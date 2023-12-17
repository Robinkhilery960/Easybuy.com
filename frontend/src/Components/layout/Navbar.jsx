import React from 'react'
import styles from '../../Styles/style'
import { navItems } from '../../Static/data'
import { Link } from 'react-router-dom'
const Navbar = ({active}) => {
   return ( <div className={` block 800px:${styles.normalFlex}`}>
    {
        navItems && navItems.map((item, index) => (
            <div className="flex" key={item.title}>
                <Link to={item.url} className={`${active === index + 1 ? "text-[#17dd1f]" : " text-black 800px:text-[#fff]"} font-500 px-6 cursor-pointer 800px:py-0 py-2`}>
                    {item.title}
                </Link>
            </div>
        ))
    }
</div> )
}

export default Navbar