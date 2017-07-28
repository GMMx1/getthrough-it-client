import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'

import { lobby as lobbyUrl } from '../routes'

class JoinedLobbies extends PureComponent {
  render() {
    return this.props.isLoading ? (
      <div className="profile-header">
        <h3 className="profile-header-title">Loading...</h3>
      </div>
    ) : (this.props.lobbies.length ? (
      <div>
        <div className="profile-header">
          <h3 className="profile-header-title">Lobbies Joined</h3>
        </div>
        <table className="completed-challenges-table">
          <thead className="completed-challenges-table-header">
            <tr>
              <th>Id</th>
              <th>Last Updated At</th>
              <th>Online</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lobbies.map(lobby => {
              let count = (lobby.peerId1 ? 1 : 0) + (lobby.peerId2 ? 1 : 0)
              return (
                <tr key={lobby.id}>
                  <td><Link to={lobbyUrl(lobby.url)} className="completed-challenges-table-link">{lobby.url}</Link></td>
                  <td><TimeAgo date={lobby.updatedAt} /></td>
                  <td>{count}/2</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="profile-header">
        <h3 className="profile-header-title">You currently have not joined any lobby :(</h3>
      </div>
    ))
  }
}

JoinedLobbies.defaultProps = {
  lobbies: []
}

export default JoinedLobbies