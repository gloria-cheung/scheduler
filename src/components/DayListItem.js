import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {setDay} = props;

  let dayClass = "day-list__item"
  dayClass += classNames({"--selected": props.selected});
  dayClass += classNames({"--full": props.spots === 0});

  const formatSpots = function() {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };
  
  return (
    <li onClick={()=>setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">Day Name</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
