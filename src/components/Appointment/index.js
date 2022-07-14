import React from "react";
import classNames from "classnames";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const {time, id, interview} = props
  return (
    <article className="appointment">
      <Header time={time}/>
      {props.interview ? 
        <Show {...interview} /> : <Empty />}
    </article>
  );
}
