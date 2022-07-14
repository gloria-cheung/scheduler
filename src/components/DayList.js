import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, setDay} = props;
  const daysData = days.map(day => {
    return (
      <DayListItem 
      {...day} 
      key={day.id} 
      setDay={()=>setDay(day.name)} 
      selected={day.name === props.day} 
      />
    )})
  return(
    <ul>
      {daysData}     
    </ul>
  )
}
