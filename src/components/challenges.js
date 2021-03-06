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
              <td className="challenge-name" onClick={ () => { this.props.onChallengeClick(item) } }>{item.name}  {item.complete === 1 && <i id="CompleteIcon" className="icon icon-check float-right"></i>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

  export default Challenges
