import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Logout from './Logout'
import NotFound from './NotFound'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <Route path='/login' exact component={Login} />
            
            {this.props.loading === true
              ? null
              : 
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' exact component={QuestionPage} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/leaderboard' exact component={Leaderboard} />  
                <Route path='/logout' exact component={Logout} /> 
                <Route path="/notfound" component={NotFound}/>   
              </div>}
              
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)