import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <img
          style={{
            width: '100%',
            margin: 'auto',
          }}
          src={`images/boy-${this.props.status}.gif`}/>
        <p
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: '3em',
            textAlign: 'center',
            width: '100%',
            background: 'lightcyan',
            margin: 0,
          }}
        >{ this.props.message }</p>
      </div>
    );
  }
}

App.defaultProps = {
  status: 'idle',
  message: '',
}

export default connect(
  state => {
    return {
      status: state.app.status,
      message: state.app.message,
    }
  },
  dispatch => ( {
  })
)(App);
