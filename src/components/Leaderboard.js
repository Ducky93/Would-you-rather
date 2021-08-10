import React, { Component } from 'react'
import { connect } from 'react-redux'
class Leaderboard extends Component {
    render() {
        const { authedUser, usersSorted, users } = this.props
        return (
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>User name</th>
                        <th># of questions answered</th>
                        <th># of questions asked</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {usersSorted.map((user) => {
                        return (
                            <tr className={users[user].id === authedUser?'logged-user-leaderboard':''}key={users[user].id}>
                                <td><img src={users[user].avatarURL} width='50px' height='50px' alt={`Avatar of ${users[user].name}`} />{ }</td>
                                <td>{users[user].name}</td>
                                <td>{Object.keys(users[user].answers).length}</td>
                                <td>{users[user].questions.length}</td>
                                <td>{Object.keys(users[user].answers).length + users[user].questions.length}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        )
    }


}
function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        usersSorted: Object.keys(users)
            .sort((a, b) => {
                return ((Object.keys(users[b].answers).length + users[b].questions.length) -
                    (Object.keys(users[a].answers).length + users[a].questions.length))
            }),
        users,
        questions
    }
}
export default connect(mapStateToProps)(Leaderboard)