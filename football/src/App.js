import React, { Component } from 'react';
// import { Cookies } from 'react-cookie';
// Cookies.set(token, '9d006876cd4d43f08084a828529fc968', {path: '/'});

function TeamList (props) {
  // return null
  // console.log(footballData)
  return (
    <ul>
      {props.list.map((name) => (
        <li key={name}>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  )
  return props.list.length;
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      // teams: ['arsenalTeam', 'chelseaTeam', 'somethingTeam'],
      // getTeams: () => { jsonData.map((name) => {teams.push(name)} },
    }
    // this.component = this.component.bind(this)
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
        component.setState({
           data: json
        })
        console.log('parsed json', json)
     })
     .catch( (ex) => {
        console.log('parsing failed', ex)
     })
     console.log(this.state.data)
  }


  // setTeams(jsonData) {
  //   // console.log( typeof jsonData )
  //   console.log( jsonData.teams[0].className )
  //   jsonData.teams.map((name) => {
      
  //     // this.setState(() => {
  //     // return {  
  //     //   teams: name
  //     //   }
  //     // })
  //   })
  // }

  render() {
    return (
      <div>
        <div className="App">
        <TeamList list={this.state.data} />
      </div>

      // </div>
    );
  }
}

export default App;
