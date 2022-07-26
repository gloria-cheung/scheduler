import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  
  const onSave = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(result => {
        transition(SHOW);
      })
      .catch(e => {
        transition(ERROR_SAVE, true);
      });
  };

  const onDelete = function() {
    transition(DELETING);

    cancelInterview(id)
      .then(result => {
        transition(EMPTY);
      })
      .catch(e => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && <
        Show 
          {...interview} 
          onConfirm={() => transition(CONFIRM)} 
          onEdit={() => transition(EDIT)}
        />
      }

      {mode === CREATE && <
        Form 
          interviewers={interviewers} 
          onCancel={() => back()} 
          onSave={onSave}
        />
      }

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message ="Deleting" />}

      {mode === CONFIRM && <
        Confirm 
          message="Delete the appointment?"
          onCancel={() => back()}
          onConfirm={onDelete}
        />
      }

      {mode === EDIT && <
        Form
          interviewers={interviewers} 
          onCancel={() => back()} 
          onSave={onSave}
          student={interview.student}
          interviewer={interview.interviewer}

        />
      }

      {mode === ERROR_SAVE && <
        Error 
          message="Could not save appointment" 
          onClose={() => back()} 
        />
      }

      {mode === ERROR_DELETE && <
        Error 
          message="Could not delete appointment" 
          onClose={() => back()} 
        />
      }
    </article>
  );
}
