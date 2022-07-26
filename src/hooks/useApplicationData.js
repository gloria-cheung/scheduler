import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
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

  const updatedDays = function(action) {
    const selectedDay = state.days.find(d => d.name === state.day);
    const idx = state.days.indexOf(selectedDay);
    (action === "delete" ? selectedDay.spots = selectedDay.spots + 1 : selectedDay.spots = selectedDay.spots - 1)
    const days = [...state.days]
    days.splice(idx, 1, selectedDay)
    return days;
  };
    
  const bookInterview = async function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updatedDays();

    await axios.put(`/api/appointments/${id}`, {interview})
    .then(result => {
      setState({...state, appointments, days});
    })
    .catch(e => {
      console.log(e);
      throw e;
    });
  };

  const updateInterview = async function(id, interview) {
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

    const days = updatedDays("delete");

    await axios.delete(`/api/appointments/${id}`)
      .then(result => {
        setState({...state, appointments, days});
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };

  return {state, setDay, bookInterview, cancelInterview, updateInterview};
};