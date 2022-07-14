import React from "react";
import classNames from "classnames";
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const {interviewers, setInterviewer, interviewer} = props;
  
  const interviewersData = interviewers.map(person => {
    return (
      <InterviewListItem 
        key={person.id} 
        {...person} 
        setInterviewer={setInterviewer} 
        selected={person.id === interviewer}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersData}
      </ul>
    </section>
  );
}
