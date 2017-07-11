import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Lobby.css'

// dynamic styling
// const webcamDiv = {
//   float: 'left',
//   width: '450px',
//   height: "1000px",
//   // height: '100vh'-'100px',
//   backgroundColor: 'gray',
// };


class Lobby extends Component {
  render() {
    return (
      <div className='Lobby'>
        <div className='header'>Lobby</div>
        <section className='webcams'>
        </section>
        <section className='chat'></section>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Lobby)
