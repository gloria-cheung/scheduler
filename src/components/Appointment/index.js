import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(result => {
        transition(SHOW);
      });
  };

  const onDelete = function() {
    transition(DELETE);

    cancelInterview(id)
      .then(result => {
        transition(EMPTY);
      });
  };

  return (
    <article className="appointment">

      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} onDelete={onDelete} />}
      {mode === CREATE && <
        Form 
          interviewers={interviewers} 
          onCancel={() => back(EMPTY)} 
          save={save}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message ="Deleting" />}
    </article>
  );
}
