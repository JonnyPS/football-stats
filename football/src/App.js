import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


function List (props) {
  return (
    <ul>
      {props.items.map( (value, i) => (
        <li key={i}>
          {value}
      </li>
      ))}
    </ul>
  )
}

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
      {props.games.map( (result, i) => (
        <li key={i}>
          {result}
        </li>
      ))}
    </ul>
  )
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allTeams: null,
      allMatches: null,
      teamDetails: [
        {
          teamId: 'Team Id',
          teamName: 'Team Name',
        },
      ],
      input: '',
      selectedMatches: [
        {
          selectedTeam: null,
          homeTeam: null,
          awayTeam: null,
          winner: null,
          score: null,
          result: [null],
        },
      ],
      outcomes: [],
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
          console.log( 'json teams', json )
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

            console.log( 'json matches', json )
            return {
              allMatches: json,
            }
          })
        }
        // once the data has loaded, 
        if ( this.state.allTeams !== null && this.state.allMatches !== null ) {       
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
    console.log( 'componentDidUpdate' )
    console.log( 'selected Team matches: ', this.state.selectedMatches )
    console.log( 'outcomes: ', this.state.outcomes )
  }

  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value
    })
  }
  findMatches() {
    let numsssss = 0;
    console.log( 'find matches...' )
    // look through all teams in our list
    for (let item of this.state.teamDetails) {
      // console.log( item )
      if ( this.state.input === item.teamName ) {
        console.log( item.teamName )
        let selectedTeam = item.teamId
        let selectedTeamName = item.teamName
        // loop through all the matches...
        for (let item of this.state.allMatches.matches ) {
          // ...and if any involve the team selected....
          console.log( this.state.selectedMatches )
          if ( selectedTeam === item.awayTeam.id || selectedTeam === item.homeTeam.id ) {
            console.log( 'our teams matches....' )
            console.log( item )

            console.log( item.score.winner )
            // get our teams results - win loose or draw
            let ourTeamsResults = []
            if ( item.score.winner === 'AWAY_TEAM'  ) {
              console.log( 'boom' )
              if ( selectedTeam === item.awayTeam.id ) {
                ourTeamsResults.push( 'Win' )
              }
              if ( selectedTeam === item.homeTeam.id ) {
                ourTeamsResults.push( 'Loose' )
              } 
            }
            if ( item.score.winner === 'HOME_TEAM'  ) {
              console.log( 'boom' )
              if ( selectedTeam === item.awayTeam.id ) {
                ourTeamsResults.push( 'Loose' )
              }
              if ( selectedTeam === item.homeTeam.id ) {
                ourTeamsResults.push( 'Win' )
              } 
            }
            if ( item.score.winner === "DRAW" ) {
              ourTeamsResults.push( 'Draw' )  
            }
            
            // if ( item.score.winner === "DRAW" ) {
            //   ourTeamsResults.push( 'Draw' )
            // } else {
            //   ourTeamsResults.push( 'Loose' )
            // }

            this.setState((currentState, f) => {
              return {
                selectedMatches: currentState.selectedMatches.concat([{
                  selectedTeamId: selectedTeam,
                  selectedTeamName: selectedTeamName,
                  homeTeam: item.homeTeam,
                  awayTeam: item.awayTeam,
                  winner: item.score.winner,
                  score: item.score.fullTime,
                }]),
                outcomes: currentState.outcomes.concat( ourTeamsResults ),
              }
            })
          }
        }
      }
    }
  }

  render(json, item) {
    console.log( 'render', item )
    return (
      <div>
        <input
          type='text'
          placeholder='Find your team...'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.findMatches}>Submit</button>
        <OurMatches games={this.state.outcomes} />
        <Line data={this.state.outcomes} />

      </div>
    )
  }
}

export default App;
