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
    const  uri = 'http://api.football-data.org/v2/competitions'; 

    let h = new Headers()
    h.append('Accept', 'application/json')
    h.append('X-Auth-Token', '9d006876cd4d43f08084a828529fc968')
    let req = new Request(uri, {
      method: 'GET',
      headers: h,
      mode: 'cors' 
    })

    fetch( req )  
      .then( (response) => {
        if ( response.ok ) {
          return response.json();
        } else {
          throw new Error( 'Bad http request or something similar' );
        }
       })
      .then( (jsonData) => {
        console.log( jsonData )
       })
      .catch( (err) => {
        console.log('ERROR:', err.message)
      }) 


    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "https://randomuser.me/api/?results=500"; // site that doesn’t send Access-Control-*
    // fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    // // console.log('fetching...')
    // .then(results => {
    //   return results.json();
    // }).then(data => {
    //   console.log(data)
    // })


    // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
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
        <h2>somthing new</h2>
      </div>
    );
  }
}

export default App;
