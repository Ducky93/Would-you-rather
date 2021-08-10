import { _saveQuestionAnswer as saveQuestionAnswer
  , _saveQuestion as saveQuestion}
   from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import { answerQuestionUser , addQuestionUser } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText,optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser,users } = getState()
    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      optionOne:{
        votes:[],
        text:optionOneText
      },
      optionTwo:{
        votes:[],
        text:optionTwoText
      },
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addQuestionUser(authedUser,question,users))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion({qid,authedUser,answer}){
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}


export function handleQuestionAnswer(info){
  return (dispatch) => {
    dispatch(answerQuestion(info))
    dispatch(answerQuestionUser(info))
    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e)
        alert('The was an error answering the question. Try again.')
      })
  }
}