import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Logout extends Component {
    componentDidMount(){
        const { authedUser } = this.props
        if (authedUser !== null && authedUser !== "") {
            const { dispatch } = this.props
            dispatch(handleSetAuthedUser(null))
            return <Redirect to={{pathname:"/login",state:{refererr:this.props.history.location.pathname}}}/>
        }
    }
    render() {
        return (
            <div>
               
            </div>
        )
    }
}
function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}
export default withRouter(connect(mapStateToProps)(Logout))