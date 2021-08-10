export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'
export const USER_ANSWER = 'USER_ANSWER'
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}
export function answerQuestionUser (info) {
  return {
    type: USER_ANSWER,
    authedUser:info.authedUser,
    qid:info.qid,
    answer:info.answer
  }
}
export function addQuestionUser (authedUser,question) {
  return {
    type: USER_ADD_QUESTION,
    authedUser,
    question
  }
}

