import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
class Dashboard extends Component {
  state = {
    selectedOption: 'notAnswer'
  }
  handleRadioChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }
  render() {
    let { authedUser } = this.props
    
    return (
      <div>
        <h3 className='center'>Questions</h3>
        <div>
          <input type="radio" value="answered" name="questionType" checked={this.state.selectedOption === 'answered'} onChange={this.handleRadioChange} /> Answered Questions
          <input type="radio" value="notAnswer" name="questionType" checked={this.state.selectedOption === 'notAnswer'} onChange={this.handleRadioChange} /> UnAnswered Questions
          <input type="radio" value="both" name="questionType" checked={this.state.selectedOption === 'both'} onChange={this.handleRadioChange} /> Both
        </div>
        {(this.state.selectedOption === 'notAnswer' || this.state.selectedOption === 'both') &&
          <ul className='dashboard-list'>
            Unanswered questions
            {this.props.questionsIds.filter((id) => (
              this.props.questions[id].optionOne.votes.indexOf(authedUser) === -1
              & this.props.questions[id].optionTwo.votes.indexOf(authedUser) === -1

            )).map((id) =>
              <li key={id}>
                <Question id={id} />
              </li>
            )}
          </ul>
        }
        {(this.state.selectedOption === 'answered' || this.state.selectedOption === 'both') &&
          <ul className='dashboard-list'>
            Answered questions
            {this.props.questionsIds.filter((id) => (

              this.props.questions[id].optionOne.votes.indexOf(authedUser) > -1
              || this.props.questions[id].optionTwo.votes.indexOf(authedUser) > -1

            )).map((id) =>
              <li key={id}>
                <Question id={id} />
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)