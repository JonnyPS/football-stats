import React, { Component } from 'react';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      competitions: [],
    }
  }

  componentDidMount() {

    fetch("http://api.football-data.org/v2/competitions")
    // fetch("https://randomuser.me/api/?results=500")
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data)

    })
  }

  render() {
    return (
      <div className="App">
        <h2>hello everyone</h2>
      </div>
    );
  }
}

export default App;
