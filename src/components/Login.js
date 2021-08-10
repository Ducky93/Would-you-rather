import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {
    handleUserSelection = (id) => {
        const { dispatch } = this.props
        dispatch(handleSetAuthedUser(id))
    }
    render() {
        const { users, authedUser } = this.props
        if (authedUser !== null && authedUser !== "" && this.props.location.state) {
            return <Redirect to={
                this.props.location.state.referrer !== '/logout'?
                        this.props.location.state.referrer:'/'
            } />
        }else if (authedUser !== null && authedUser !== ""){
            return <Redirect to='/' />
        }
        return (
            <div>
                <ul>
                    {Object.keys(users).length > 0 ? (

                        Object.values(users).map((user) => (

                            <li key={user.id}><button onClick={() => this.handleUserSelection(user.id)}>{user.name}</button></li>

                        ))) : null}
                </ul>
            </div>
        )
    }
}
function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}
export default withRouter(connect(mapStateToProps)(Login))