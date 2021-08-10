import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { FiCircle, FiTarget } from 'react-icons/fi'
import { handleQuestionAnswer } from '../actions/questions'
import { Link, Redirect, withRouter } from 'react-router-dom'
class Question extends Component {
    handleVote = (answer) => {
        const { dispatch, question, authedUser } = this.props
        dispatch(handleQuestionAnswer({
            qid: question.id,
            answer: answer,
            authedUser: authedUser
        }))
    }
    render() {
        const { question, authedUser,users } = this.props
        if (question === null) {
            return <Redirect to='/notfound'/>
        }

        const {
            name, id, timestamp, text, avatar, optionOne, optionTwo
        } = question
        const {hasVoted} = this.props.question
        return (
            <Link to={`/question/${id}`} className='question'>
            <div>
                <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
                <div className='question-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        <p>{text}</p>
                    </div>
                    <span>Would you rather</span>
                    <div className='question-icons question'>
                            {
                                hasVoted === true
                                    ?
                                    optionOne.votes.includes(authedUser) ?
                                        <div>
                                            <div>{optionOne.text}</div><FiTarget color='#e0245e' className='question-icon' />
                                            <div ><b style={{color:'red'}}>{`${optionOne.votes.length} of the users have picked the ${optionOne.text} choice at a percentage of ${optionOne.votes?Math.round(((optionOne.votes.length)/(Object.keys(users).length))*100):0} %`}</b></div>
                                            <div>{optionTwo.text}</div><FiCircle color='#e0245e' className='question-icon' />
                                            <div ><b style={{color:'red'}}>{`${optionTwo.votes.length} of the users have picked the ${optionTwo.text} choice at a percentage of ${optionTwo.votes?Math.round(((optionTwo.votes.length)/(Object.keys(users).length))*100):0} %`}</b></div>
                                        </div>
                                        :
                                        optionTwo.votes.includes(authedUser) &&
                                            <div>
                                                <div>{optionOne.text}</div><FiCircle color='#e0245e' className='question-icon' />
                                                <div ><b style={{color:'red'}}>{`${optionOne.votes.length} of the users have picked the ${optionOne.text} choice at a percentage of ${optionOne.votes?Math.round(((optionOne.votes.length)/(Object.keys(users).length))*100):0} %`}</b></div>
                                                <div>{optionTwo.text}</div><FiTarget color='#e0245e' className='question-icon' />
                                                <div ><b style={{color:'red'}}>{`${optionTwo.votes.length} of the users have picked the ${optionTwo.text} choice at a percentage of ${optionTwo.votes?Math.round(((optionTwo.votes.length)/(Object.keys(users).length))*100):0} %`}</b></div>
                                            </div>
                                            
                                    :
                                    <div>
                                        <div>{optionOne.text}</div><button  onClick={()=>this.handleVote("optionOne")}><FiCircle color='#e0245e' className='question-icon' /></button>
                                        <div>{optionTwo.text}</div><button  onClick={()=>this.handleVote("optionTwo")}><FiCircle color='#e0245e' className='question-icon' /></button>
                                    </div>
                            }
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser) : null,
        users
    }
}
export default withRouter(connect(mapStateToProps)(Question))