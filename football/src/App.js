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
// return null
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
  return null;
  // console.log( props )
  // return (
  //   <form>
  //     <input type="text" />
  //     <input type="submit" value="submit" />
  //   </form>
  // )
}
function OurMatches (props) {
  // alert( props.games.length )
  // return null;

  return (
    <ul>
      {props.games.map( (game, i) => (
          <li key={i}>
            {game.selectedTeamResult}
          </li>
      ))}
    </ul>
  )
  // num++;
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allTeams: null,
      allMatches: null,
      teamDetails: [
        {
          a: 'Team Id',
          b: 'Team Name',
        },
      ],
      input: '',
      getMatches: [],
      selectedMatches: [
        {
          homeTeam: null,
          awayTeam: null,
          winner: null,
          score: null,
          selectedTeamResult: null,
        },
      ],
      booboo: [],
    }

    // because of where these functions are called... (?)
    // we need to define that 'this', refers to our component App
    this.updateInput = this.updateInput.bind( this )
    this.findMatches = this.findMatches.bind( this )
  }

  componentDidMount() {

    var resourceCounter = 0;
    const urls = ['https://api.football-data.org/v2/competitions/PL/teams', 'https://api.football-data.org/v2/competitions/PL/matches?status=FINISHED']

    // map over array to use the url addresses
    urls.map( ( addy ) => {
      // set up headers
      let h = new Headers()
      h.append('Accept', 'application/json')
      h.append('X-Auth-Token', '9d006876cd4d43f08084a828529fc968')
      let req = new Request(addy, {
        method: 'GET',
        headers: h,
        mode: 'cors' 
      })

      // for each url in the array, use fetch to get the resource
      fetch(req) 
      .then( (response) => {
        return response.json()    
      })
      .then( (json) => {
        console.log( 'set json to state properties' )
        // hacky if / else statement - should probably be replaced by a for in loop
        // it will surfice temporarily
        if ( this.state.allTeams == null ) { 
          // extract only the id and team short name from the returned data
          // loop over every team, get the data and assign it in to an array of objects
          json.teams.map((counter) => {
            const teamId = counter.id
            const teamName = counter.shortName
            this.setState((currentState) => {
              return {
                allTeams: json,
                teamDetails: currentState.teamDetails.concat([{
                  teamName: teamName,
                  teamId: teamId
                }]),
              }
            })
          })
        } else {
          // when looping over urls[1], assign value to this.state.allMatches property
          this.setState(( currentState ) => {
            return {
              allMatches: json,
            }
          })
        }
        // once the data has loaded, 
        if ( this.state.allTeams !== null && this.state.allMatches !== null ) {
          // console.log( 'teams:', this.state.allTeams )
          // console.log( 'matches:', this.state.allMatches )        
          // console.log( 'teamDetails:', this.state.teamDetails )        
        }
        resourceCounter++
      })
      .catch( (ex) => {
        console.log('parsing failed:', ex)
      })
    })
  }

  // will only run after component has updated 
  // - good for catching errors where the code is run but the state has not yet updated
  componentDidUpdate() {
    // console.log( 'selected Team matches: ', this.state.selectedMatches )
  }

  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value
    })
    // console.log( this.state.input )
  }

  findMatches() {
    console.log( 'find matches...' )
    // get id of team from value of input
    for (let item of this.state.teamDetails) {
      // if id == teamName in my allTeams array (ie - if team exists in my records)....
      if ( this.state.input === item.teamName ) {
        let selectedTeamId = item.teamId 
        // loop through all the matches...
        for (let item of this.state.allMatches.matches ) {
          // ...and if any involve the team selected....
          if ( selectedTeamId === item.awayTeam.id || selectedTeamId === item.homeTeam.id ) {
            console.log( 'matches....' )
            // push each match as an object in to our selectedMatches array
            // console.log( item )
            console.log( item )
            if ( selectedTeamId === item.homeTeam.id && item.score.winner === "HOME_TEAM" ) {
              console.log( 'selected team played at HOME and WON!!!' )
            } if ( selectedTeamId === item.awayTeam.id && item.score.winner === "AWAY_TEAM" ) {
              console.log( 'selected team played AWAY and WON!!!' )
            } if ( item.score.winner === "DRAW" ) {
              console.log( 'selected team played and DREW')
            }
            this.setState((currentState) => {
              return {
                selectedMatches: currentState.selectedMatches.concat([{
                  homeTeam: item.homeTeam.name,
                  awayTeam: item.awayTeam,
                  winner: item.score.winner,
                  score: item.score.fullTime,
                }]),
              }
            })

          }
        }

      }
    }




    // this.state.teamDetails[0].a.map(( id ) => { console.log( id ) } )
    // use that id to look at matches object and pull out any matches where the home/away team has that id
    // push those matches in to their own array
  }

  

  render(json) {
    // return null
    return (
      <div>
        <input
          type='text'
          placeholder='Find your team...'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.findMatches}>Submit</button>
        <OurMatches games={this.state.selectedMatches} />
        
      </div>
    )
    // const teamNum = 20
    // if (this.state.data.length <= teamNum ) {
  //     return false;
  //   } else {

  //     return (
  //       <div>
  //         <div className="App">
  //           <TeamIdList list={ this.state.data } />
  //           <TeamNameList list={ this.state.data } />
  //           <TeamInputField props={this.state.data} />
  //         </div>
  //       </div>
  //     )
  //   }
  }
}

export default App;
