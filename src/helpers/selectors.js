export function getAppointmentsForDay(state, day) {
  // return array of appointments for that day
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
       return eachDay.appointments.map(id => state.appointments[id]);
    }
  }
  return [];
};

export function getInterview(state, interview) {
  // return obj continaing interview data
  if (interview) {
    let interviewerId = interview.interviewer;
    interview.interviewer = state.interviewers[interviewerId];
    return interview;
  }
  return null;
};