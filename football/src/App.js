import React, { Component } from 'react';
// import { Cookies } from 'react-cookie';
// Cookies.set(token, '9d006876cd4d43f08084a828529fc968', {path: '/'});

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      competitions: [],
    }
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://api.football-data.org/v2/competitions"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => console.log(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    // fetch("http://api.football-data.org/v2/competitions")
    // // fetch("https://randomuser.me/api/?results=500")
    // .then(results => {
    //   return results.json();
    // }).then(data => {
    //   console.log(data)
    // })
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
