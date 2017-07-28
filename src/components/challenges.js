import React, { PureComponent } from 'react'


class Challenges extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('this.props.challenges in Challenges: ', this.props.challenges)
  }


  render() {
    return (
      <table className="container">
        <tbody className="text-centered lobby-table">
          {this.props.challenges.map((item, idx) => (
            <tr key={idx} >
              <td className="challenge-name" onClick={ () => { this.props.onChallengeClick(item) } }>{item.name}</td>
              {item.complete === 1 && <td><i className="icon icon-check"></i></td>}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

  export default Challenges
