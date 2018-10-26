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
  return null;

  // return (
  //   <ul>
  //     {props.games.map( (game, i) => (
  //         <li key={i}>
  //           {game.record}
  //         </li>
  //     ))}
  //   </ul>
  // )
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
          teamId: 'Team Id',
          teamName: 'Team Name',
        },
      ],
      input: '',
      selectedMatches: [
        {
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
    // console.log( 'selected Team matches: ', this.state.selectedMatches )
    // console.log( 'selected Team result: ', this.state.result )
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
      // if id == teamName in my allTeams array (ie - if team exists in my records)....
      if ( this.state.input === item.teamName ) {
        console.log( item.teamName )
        let selectedTeamId = item.teamId 
        // loop through all the matches...
        for (let item of this.state.allMatches.matches ) {
          // ...and if any involve the team selected....


          if ( selectedTeamId === item.awayTeam.id || selectedTeamId === item.homeTeam.id ) {

            // console.log( 'ITEM ITEM ITEM', item )
            // if ( selectedTeamId === item.awayTeam.id && item.score.winner === "AWAY_TEAM" ) {
            //   console.log('/////OUR TEAM PLAYED AWAY AND WON')
            //   this.setState( (currentState) => {
            //     return {
            //       result: currentState.result.concat(['Win']),
            //     }
            //   })
            // }
            // else if ( selectedTeamId === item.homeTeam.id && item.score.winner === "HOME_TEAM" ) {
            //   console.log('/////OUR TEAM PLAYED HOME AND WON')
            //   this.setState( (currentState) => {
            //     return {
            //       result: 'Win',
            //     }
            //   })
            // } else if ( item.score.winner === "DRAW" ) {
            //   console.log('/////OUR TEAM PLAYED AND DREW')
            //   this.setState( (currentState) => {
            //     return {
            //       result: 'Draw',
            //     }
            //   })
            // } else {
            //   console.log('/////OUR TEAM PLAYED AND LOST*******')
            //   this.setState( (currentState) => {
            //     return {
            //       result: 'Loose',
            //     }
            //   })
            // }

            console.log( 'matches....' )
            // console.log( selectedTeamId )
            console.log( item )
            this.setState((currentState) => {
              return {
                selectedMatches: currentState.selectedMatches.concat([{
                  homeTeam: item.homeTeam,
                  awayTeam: item.awayTeam,
                  winner: item.score.winner,
                  score: item.score.fullTime,
                  result: currentState.selectedMatches.map( (obj ) => {  
                    // console.log( 'selectedMatches length' + currentState.selectedMatches.length )
                    // console.log( 'item.currentMatchday' + item.season.currentMatchday )
                    // if ( currentState.selectedMatches.length == (item.season.currentMatchday -1) ) {
                      console.log( 'array length and current matchday match')
                      console.log( 'testing ------- ' + item.homeTeam.name + ' ' + item.awayTeam.name )
                      // console.log( obj.winner )
                  // }
                    // if ( obj.winner )
                    // if ( selectedTeamId === item.awayTeam.id && item.score.winner === "AWAY_TEAM" ) {
                    //   console.log('/////OUR TEAM PLAYED AWAY AND WON')
                    //   return 'Win'
                    // } else if ( selectedTeamId === item.homeTeam.id && item.score.winner === "HOME_TEAM" ) {
                    //   console.log('/////OUR TEAM PLAYED HOME AND WON')
                    //   return 'Win'
                    // } else if ( item.score.winner === "DRAW" ) {
                    //   console.log('/////OUR TEAM PLAYED AND DREW')
                    //   return 'Draw'
                    // } else {
                    //     return 'Loose'
                    // }
                  })
                }]),
              }
            })

            if ( selectedTeamId === item.homeTeam.id ) {
              console.log( selectedTeamId )
              console.log( item.homeTeam.id )
              if ( item.score.winner === "HOME_TEAM" ) {
                console.log('///// HOME WIN ///// ')
                this.setState( (currentState) => {
                  return {
                    outcomes: currentState.outcomes.concat(['Win'])
                  }
                })
              } 
            } 

            if ( selectedTeamId === item.homeTeam.id ) {
              console.log('///// LOOSE /////')
              if ( item.score.winner === "AWAY_TEAM" ) {
                console.log('///// AWAY WIN ///// ')
                this.setState( (currentState) => {
                  return {
                    outcomes: currentState.outcomes.concat(['Loose'])
                  }
                })
              } 
            }

            if ( item.score.winner === "DRAW" ) {
              console.log('///// DRAW ///// ')
              this.setState( (currentState) => {
                return {
                  outcomes: currentState.outcomes.concat(['Draw'])
                }
              })
            } 
          }
        }

      }
    }
  }

  render(json) {
    return (
      <div>
        <input
          type='text'
          placeholder='Find your team...'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.findMatches}>Submit</button>
        <OurMatches games={this.state.record} />
        
      </div>
    )
  }
}

export default App;
