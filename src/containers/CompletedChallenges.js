import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CompletedChallenges extends PureComponent {
  render() {
    return (
      <table className="completed-challenges-table">
        <thead className="completed-challenges-table-header">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Get Prime</b></td>
            <td>21 July 2017</td>
            <td><Link to="/" className="completed-challenges-table-link">View</Link></td>
          </tr>
          <tr>
            <td><b>Give me the Square!</b></td>
            <td>22 July 2017</td>
            <td><Link to="/" className="completed-challenges-table-link">View</Link></td>
          </tr>
          <tr>
            <td><b>Robot Paths</b></td>
            <td>23 July 2017</td>
            <td><Link to="/" className="completed-challenges-table-link">View</Link></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default CompletedChallenges