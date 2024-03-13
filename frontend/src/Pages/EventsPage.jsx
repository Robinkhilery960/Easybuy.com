import React from 'react'
import Header from '../Components/layout/Header'
import EventCard from '../Components/Route/Events/EventCard'
import { useSelector } from 'react-redux'

const EventsPage = () => {
  const { allEvents } = useSelector(state => state.event)
  return (
    <div>
      <Header activeHeading={4} />
      {
        allEvents && allEvents.map((event) => (<EventCard active={true} key={event._id} data={event} />)
        )
      }

    </div>
  )
}

export default EventsPage