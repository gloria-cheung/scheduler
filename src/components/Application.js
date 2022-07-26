import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const bookInterview = async function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    await axios.put(`/api/appointments/${id}`, {interview})
    .then(result => {
      setState({...state, appointments});
    })
    .catch(e => {
      console.log(e);
      throw e;
    });
  };

  const cancelInterview = async function(id) {
    const appointments = {
      ...state.appointments, 
      [id]: {
        ...state.appointments[id], 
        interview: null
      }
    }

    await axios.delete(`/api/appointments/${id}`)
      .then(result => {
        setState({...state, appointments});
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

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
