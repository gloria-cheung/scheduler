import React from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application() {
  // state loading and actions moved to custom hook
  const {state, setDay, bookInterview, cancelInterview, updateInterview} = useApplicationData();

  // using helper func to find appointments for single day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // create array of appointment components to later display in schedule section
  const appointmentsData = dailyAppointments.map((app) => {
    
    const interview = getInterview(state, app.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment 
        {...app} 
        key={app.id} 
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateInterview={updateInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsData}
      </section>
    </main>
  );
}
