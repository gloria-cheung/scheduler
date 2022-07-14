import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, onChange, day} = props;
  const daysData = days.map(d => {
    return (
      <DayListItem 
      {...d} 
      key={d.id} 
      onChange={onChange} 
      selected={d.name === day} 
      />
    )})
  return(
    <ul>
      {daysData}     
    </ul>
  )
}
