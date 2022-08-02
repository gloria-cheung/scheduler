import React from "react";
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const {interviewers, onChange, value} = props;
  
  const interviewersData = interviewers.map(person => {
    return (
      <InterviewListItem 
        key={person.id} 
        {...person} 
        setInterviewer={()=>onChange(person)} 
        selected={person.name === value}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;