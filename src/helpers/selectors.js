export function getAppointmentsForDay(state, day) {
  // return array of appointments for that day
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
       return eachDay.appointments.map(id => state.appointments[id]);
    }
  }
  return [];
};
