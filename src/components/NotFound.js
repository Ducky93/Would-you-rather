import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NotFound extends Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/')
        },4000)
    }
    render() {
        return (
            <div>
               404
               Sorry the page you are looking for doesn't exist, you are being redirected now to home page
            </div>
        )
    }
}

export default withRouter(NotFound)