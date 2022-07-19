import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, onChange, value} = props;
  const daysData = days.map(d => {
    return (
      <DayListItem 
      {...d} 
      key={d.id} 
      onChange={onChange} 
      selected={d.name === value} 
      />
    )})
  return(
    <ul>
      {daysData}     
    </ul>
  )
}
