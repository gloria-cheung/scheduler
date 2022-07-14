import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, setDay, day} = props;
  const daysData = days.map(day => {
    return (
      <DayListItem {...day} key={day.id} setDay={setDay} selected={day.name === props.day} />
    )})
  return(
    <ul>
      {daysData}     
    </ul>
  )
}
