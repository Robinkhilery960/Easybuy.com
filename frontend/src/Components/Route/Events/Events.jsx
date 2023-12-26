import React from 'react'
import styles from '../../../Styles/style'
import EventCard from "./EventCard"
import { useSelector } from 'react-redux'

const Events = () => {
  const {allEvents}= useSelector(state=>state.event)
  console.log(allEvents)
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Popular Events</h1>
            </div>
            <div className='w-full grid'>
              {
              allEvents && [...allEvents].map((event)=><EventCard data={event}/>)
              }
                
            </div>
           
        </div>
    </div>
  )
}

export default Events