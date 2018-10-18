import React, { Component } from 'react';

function TeamList (props) {
// return null

  return (
    <select>
      {props.list.map((name) => (
        <option key={name}>
          {name}
        </option>
      ))}
    </select>
  )
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const uri = 'http://api.football-data.org/v2/competitions/PL/teams'; 

    let h = new Headers()
    h.append('Accept', 'application/json')
    h.append('X-Auth-Token', '9d006876cd4d43f08084a828529fc968')
    let req = new Request(uri, {
      method: 'GET',
      headers: h,
      mode: 'cors' 
    })

    var component = this;

    fetch(req)
     .then( (response) => {
        return response.json()    
     })
     .then( (json) => {
        const teamNames = json.teams
        json.teams.map((id) => {
          const teamName = id.shortName
          this.setState((currentState) => {
          return {
            data: currentState.data.concat([teamName])
          }
        })  
        })
        

        // const teams = json.teams

        // this.setState({ data: teams})
        console.log( 'second log', this.state.data )
     })
     .catch( (ex) => {
        console.log('parsing failed', ex)
     })
     console.log( 'first log', this.state.data )
  }

  render() {
    if (this.state.data === null) {
      return false;
    } else {
      
      return (
        <div>
          <div className="App">
            <TeamList list={ this.state.data } />
        </div>

        </div>
      )
    }
  }
}

export default App;
