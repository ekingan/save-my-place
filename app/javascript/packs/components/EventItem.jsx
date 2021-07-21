import React from 'react';

const EventItem = (props) => {
  console.log(props)
  const { event } = props;
  return (
    <tr className='table-light'>
      <td>
        {event.id}
      </td>
      <td>
        {event.title}
      </td>
      <td className="text-right">
        {event.start_time}
      </td>
    </tr>
  )
}

export default EventItem;