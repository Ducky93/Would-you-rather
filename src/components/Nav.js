import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect, withRouter } from 'react-router-dom'

class Nav extends Component {
  render() {

    const { authedUser } = this.props
    return (

      <nav className='nav'>
        <ul>
          {(authedUser !== null && authedUser !== "") ? (
            <Fragment>
              <li>
                <NavLink to='/' exact activeClassName='active'>
                  {authedUser}
                </NavLink>
              </li>
              <li>
                <NavLink to='/' exact activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/add' activeClassName='active'>
                  New Question
                </NavLink>
              </li>
              <li>
                <NavLink to='/leaderboard' activeClassName='active'>
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink to='/logout' activeClassName='active'>
                  Logout
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <li>
              <NavLink to='/login' exact activeClassName='active'>
                Login
              </NavLink>
              {(this.props.location.pathname !== '/login') && (
                <Redirect to={{
                  pathname: '/login',
                  state: { referrer: this.props.history.location.pathname }
                }} />
              )}

            </li>
          )}

        </ul>
      </nav>
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(Nav))