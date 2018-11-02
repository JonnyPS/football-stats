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

function DisplayStats (props) {
  // console.log( 'DisplayStats gamesPlayed', props.gamesPlayed )
  // return null
  return (
    <ul>
      <li>Number of games played: {props.gamesPlayed}</li>
      <li>Games won: {props.gamesWon}</li>
      <li>Games lost: {props.gamesLost}</li>
      <li>Games drawn: {props.gamesDrawn}</li>
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
      gamesPlayed: null,
      gamesWon: null,
      gamesLost: null,
      gamesDrawn: null,

      matchday: [],
      outcomes: [],
      data: {
        labels: [],
        datasets: [{
            label: null,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: null,
        }]
      },
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
    // console.log( 'componentDidUpdate' )
    // console.log( 'selected Team matches: ', this.state.selectedMatches )
    // console.log( 'outcomes: ', this.state.outcomes )
    console.log( 'matchday', this.state.matchday)
    console.log( 'gameStats', this.state.gamesPlayed)
  }

  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value.replace(/^\w/, c => c.toUpperCase())
    })
  }
  findMatches() {
    let numsssss = 0;
    console.log( 'find matches...' )


    // look through all teams in our list
    for (let item of this.state.teamDetails) {
      // console.log( item )
      // check that selected team 
      if ( this.state.input === item.teamName ) {
        let selectedTeamId = item.teamId
        let selectedTeamName = item.teamId
        let resultsOfMatches = []
        let numGamesWon = []
        let numGamesLost = []
        let numGamesDrawn =[]
        // let gameStats = [
        //   {
        //     gamesPlayed: null,
        //     gamesWon: null,
        //     gamesLost: null,
        //     gamesDrawn: null,
        //   }
        // ]

        function getMatchResultOccurence(array, result) {
          return array.filter((v) => (v === result)).length;
        }



        let filteredMatches = this.state.allMatches.matches.filter( (match) => { return match.awayTeam.id === selectedTeamId || match.homeTeam.id === selectedTeamId })
        console.log( 'filteredMatches', filteredMatches )

        function getMatchResults( game, ourTeam ) {
          let result = game.score.winner
          let home = game.homeTeam.id
          if ( result === "HOME_TEAM" && home === selectedTeamId ) { resultsOfMatches.push( 3 ) }
          if ( result === "HOME_TEAM" && home !== selectedTeamId ) { resultsOfMatches.push( 0 ) }
          if ( result === "AWAY_TEAM" && home === selectedTeamId ) { resultsOfMatches.push( 0 ) }
          if ( result === "AWAY_TEAM" && home !== selectedTeamId ) { resultsOfMatches.push( 3 ) }
          if ( result === "DRAW" ) { resultsOfMatches.push( 1 ) }
        }

        filteredMatches.map( getMatchResults )
        console.log( 'before', resultsOfMatches)

        // addMatches
        var pointsSoFar = resultsOfMatches.reduce((acc, current) => {
          acc.push((acc[acc.length - 1] || 0) + current);
          return acc;
        }, [])

        console.log( pointsSoFar )
        console.log( filteredMatches.matchday )

        filteredMatches.map( (games) => {
          console.log( games )
          this.setState( (currentState) => {
            return {
              gamesPlayed: resultsOfMatches.length,
              gamesWon: getMatchResultOccurence(resultsOfMatches, 3),
              gamesLost: getMatchResultOccurence(resultsOfMatches, 0),
              gamesDrawn: getMatchResultOccurence(resultsOfMatches, 1),

              matchday: currentState.matchday.concat( games.matchday ),
              data: {
                labels: currentState.data.labels.concat( games.matchday ),
                datasets: [{
                  label: selectedTeamName,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: pointsSoFar
                }]
              },
            }
          })
          console.log( 'state', this.state )
        })
      }
    }
  }

  render(json, item) {
    console.log( 'render' )

    return (
      <div>
        <input
          type='text'
          placeholder='Find your team...'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.findMatches}>Submit</button>
        <Line 
          data={this.state.data}
          // options={chartOptions}
          height={200}
          width={700}
          options={{
           legend: {
             display: true
           },
           scales: {
             yAxes: [{
               ticks: {
                  max: this.state.matchday.length * 3,
                  min: 0,
                  stepSize: 3
                }
              }]
             },
            title: {
             display: 'hello',
             text: this.state.input,
            }
         }}
        />
        <DisplayStats
          gamesPlayed={this.state.gamesPlayed}
          gamesWon={this.state.gamesWon}
          gamesLost={this.state.gamesLost}
          gamesDrawn={this.state.gamesDrawn}
        />
       

      </div>
    )
        // move this back in to render(...) <OurMatches games={this.state.outcomes} />
  }
}

export default App;
