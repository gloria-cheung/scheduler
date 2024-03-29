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
  let result = {};
  if (interview) {
    let interviewerId = interview.interviewer;
    result.interviewer = state.interviewers[interviewerId];
    result.student = interview.student;
    return result;
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  // return array of interviewers for that day
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      return eachDay.interviewers.map(id => state.interviewers[id]);
    }
  }
  return [];
};