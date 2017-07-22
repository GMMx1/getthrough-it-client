import React, { PureComponent } from 'react'


class Challenges extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('this.props.challenges in Challenges: ', this.props.challenges)
  }


  render() {
    return <table className="container table">
      <thead>
        <tr>
          <th>Challenges</th>
        </tr>
      </thead>
      <tbody className="text-centered">
        {this.props.challenges.map((item, idx) => (
          <tr key={idx} onClick={ () => { this.props.onChallengeClick(item) } }>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }
}

  export default Challenges
