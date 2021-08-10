import { RECEIVE_USERS, USER_ANSWER, USER_ADD_QUESTION } from '../actions/users'
export default function users(state = {}, action) {

  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case USER_ANSWER:
      const { qid, answer } = action
      const currentUser = action.authedUser
      return {
        ...state,
        [currentUser]:{
          ...state[currentUser],
          answers:{
            ...state[currentUser].answers,
            [qid]:answer
          }
        }
      }
    case USER_ADD_QUESTION:
      const { question, authedUser } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions:
            [...state[authedUser].questions].concat(question.id)
        }

      }
    default:
      return state
  }
}