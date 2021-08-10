import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }
  handleOneChange = (e) => {
    const optionOneText = e.target.value
    this.setState({
      optionOneText
    })
  }
  handleTwoChange = (e) => {
    const optionTwoText = e.target.value
    this.setState({
      optionTwoText
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { id, dispatch } = this.props
    let {optionOneText, optionTwoText} = this.state
    let firstOption = optionOneText
    let secondOption = optionTwoText
    dispatch(handleAddQuestion(firstOption, secondOption))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true
    }))
    this.props.history.push('/')
  }
  render() {
    const { optionOneText, optionTwoText } = this.state
    const optionOneLeft = 100 - optionOneText.length
    const optionTwoLeft = 100 - optionTwoText.length
    return (
      <div>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="First option"
            value={optionOneText}
            onChange={this.handleOneChange}
            className='textarea'
            maxLength={100}
          />
          {optionOneLeft <= 50 && (
            <div className='question-length'>
              {optionOneLeft}
            </div>
          )}
          <textarea
            placeholder="Second option"
            value={optionTwoText}
            onChange={this.handleTwoChange}
            className='textarea'
            maxLength={100}
          />
          {optionTwoLeft <= 50 && (
            <div className='question-length'>
              {optionTwoLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect()(NewQuestion))