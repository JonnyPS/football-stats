import React, { Component } from 'react';

function TeamIdList (props) {
return null
  // return (
  //   <select>
  //     {props.list.map((id) => (
  //       <option key={id.a}>
  //         {id.a}
  //       </option>
  //     ))}
  //   </select>
  // )
}

function TeamNameList (props) {
return null
  // return (
  //   <select>
  //     {props.list.map((name) => (
  //       <option key={name.b}>
  //         {name.b}
  //       </option>
  //     ))}
  //   </select>
  // )
}

function TeamInputField (props) {
  console.log( props )
  return (
    <form>
      <input type="text" />
      <input type="submit" value="submit" />
    </form>
  )
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [
      {
        a: 'Team Id',
        b: 'Team Name',
      },
      ],
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

    // var component = this;

    fetch(req)
     .then( (response) => {
        return response.json()    
     })
     .then( (json) => {
        json.teams.map((counter) => {
          const teamId = counter.id
          const teamName = counter.shortName

          this.setState((currentState) => {
            return {
              data: currentState.data.concat([{
                a: teamId,
                b: teamName
              }]),
              input: null
            }
          })  
        })
     })
     .catch( (ex) => {
        console.log('parsing failed', ex)
     })
  }

  render() {
    if (this.state.data.a === null || this.state.data.b === null) {
      return false;
    } else {

      return (
        <div>
          <div className="App">
            <TeamIdList list={ this.state.data } />
            <TeamNameList list={ this.state.data } />
            <TeamInputField props={this.state.data}/>
          </div>
        </div>
      )
    }
  }
}

export default App;
