import './App.css';

// import { useState, useMemo } from 'react'
// import { FilesViewer } from './FilesViewer'

// const fs = window.require('fs')
// const pathModule = window.require('path')

// import logo from './logo.svg';
// import './App.css';
// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import docGen from './docGen';
import GeneralFace from './GeneralFace';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastName: 'ЛШТШФУМ',
      firstName: 'Ащьф',
      middleName: 'Иванович',
      birthday: '07.12.2022',
      gender: 'male'
      // docTemplate(s): ???
    }

    this.changeFormHandler = this.changeFormHandler.bind(this)
    this.docGenerator = this.docGenerator.bind(this)
  }

  changeFormHandler(e) {
    const value = e.target.value
    this.setState({
        // ...state, required when using React.useState
        [e.target.id]: value
    })
}

  docGenerator() {
    docGen(this.state)
  }

  render() {
    return (
      <div className="App container">
        <GeneralFace 
            changeHandler={this.changeFormHandler}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            middleName={this.state.middleName}
            gender={this.state.gender}
          />
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.docGenerator} >OK</button>
      </div>
    )
  }
}

export default App;
