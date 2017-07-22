import React, { Component } from 'react'

class CreateLobby extends Component {
  makeLobby() {
    fetch("http://127.0.0.1:8000/v1/lobbies",
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
      })
    .then(res => res.json())
    .then(res => window.open(`http://localhost:3000/lobbies/${res.url}`,"_self"))
  }

  render() {
    return (
      <button id="create-lobby" className="btn centered" onClick={(e) => this.makeLobby()}>CREATE NEW LOBBY</button>
    )
  }
}

export default CreateLobby
