import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem {...day} key={day.id} setDay={props.setDay} selected={day.name === props.day} />
    )})
  return(
    <ul>
      {days}     
    </ul>
  )
}
