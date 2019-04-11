import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
// var cloneDeep = require('clone-deep');

function DisplayStats (props) {
  return (
    <ul>
      <li>Number of games played: <span className="bold-copy">{props.gamesPlayed}</span></li>
      <li>Games won: <span className="bold-copy">{props.gamesWon}</span></li>
      <li>Games lost: <span className="bold-copy">{props.gamesLost}</span></li>
      <li>Games drawn: <span className="bold-copy">{props.gamesDrawn}</span></li>
    </ul>
  )
}

function DisplayDetails (props) {
  return (
    <ul className="inline-list">
      {props.teams.map( (key, i) => (
        <li key={i}><img src={key.logo} alt={key.name} onClick={() => props.activateClickResponse(key.name)} /></li>
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

      profile: [
        {
          logo: 'img/arsenal.png',
          name: 'Arsenal',
          colour: '#f00005',
        },
        {
          logo: 'img/bournemouth.png',
          name: 'Bournemouth',
          colour: '#8d0104',
        },
        {
          logo: 'img/brighton-hove.png',
          name: 'Brighton Hove',
          colour: '#005daa',
        },
        {
          logo: 'img/burnley.png',
          name: 'Burnley',
          colour: '#fff515',
        },
        {
          logo: 'img/cardiff.png',
          name: 'Cardiff',
          colour: '#035da9',
        },
        {
          logo: 'img/chelsea.png',
          name: 'Chelsea',
          colour: '#024595',
        },
        {
          logo: 'img/crystal-palace.png',
          name: 'Crystal Palace',
          colour: '#b80007',
        },
        {
          logo: 'img/everton.png',
          name: 'Everton',
          colour: '#133e6c',
        },
        {
          logo: 'img/Fulham.png',
          name: 'Fulham',
          colour: '#000000',
        },
        {
          logo: 'img/huddersfield.png',
          name: 'Huddersfield',
          colour: '#003d93',
        },
        {
          logo: 'img/leicester-city.png',
          name: 'Leicester City',
          colour: '#003d93',
        },
        {
          logo: 'img/liverpool.png',
          name: 'Liverpool',
          colour: '#d00623',
        },
        {
          logo: 'img/man-city.png',
          name: 'Man City',
          colour: '#5ba0da',
        },
        {
          logo: 'img/man-united.png',
          name: 'Man United',
          colour: '#da030e',
        },
        {
          logo: 'img/newcastle.png',
          name: 'Newcastle',
          colour: '#000',
        },
        {
          logo: 'img/southampton.png',
          name: 'Southampton',
          colour: '#ed1a3b',
        },
        {
          logo: 'img/tottenham.png',
          name: 'Tottenham',
          colour: '#aeaeae',
        },
        {
          logo: 'img/watford.png',
          name: 'Watford',
          colour: '#fef823',
        },
        {
          logo: 'img/west-ham.png',
          name: 'West Ham',
          colour: '#7b2c3a',
        },
        {
          logo: 'img/wolverhampton.png',
          name: 'Wolverhampton',
          colour: '#faa61a',
        },        
      ],

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
        labels: '',
        datasets: [{
            // label: null,
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(255, 99, 132)',
            // data: null,
        }]
      },

    }

    // because of where these functions are called... (?)
    // we need to define that 'this', refers to our component App
    this.updateInput = this.updateInput.bind( this )
    // this.findMatches = this.findMatches.bind( this )
    this.selectTeam = this.selectTeam.bind( this )
    this.resetState = this.resetState.bind( this )
    this.removeDataset = this.removeDataset.bind( this )
    this.showAllDatasets = this.showAllDatasets.bind( this )
  }

  saveInitialState() {
    console.log( 'save initialState' )
    this.initialState = [this.state]
  }

  resetState() {
    console.log('resetState')
    this.setState( this.initialState[0] )
  }

  removeDataset() {
    console.log('removeDataset')
    this.setState( this.state.data.datasets.splice(-1, 1) )
  }

  showAllDatasets() {
    console.log('showAllDatasets')
    this.state.profile.map( (key) => {
      this.setState({
        input: key.name
      })
      // this.findMatches()
    })
    
  }

  selectTeam(name) {
    this.setState({
      input: name.replace(/^\w/, c => c.toUpperCase())
    }, () => {
      // this.findMatches()
    })
  }

  componentDidMount() {
    console.log( 'componentDidMount' )
    this.saveInitialState()

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
        console.log( 'json', json )

        
        // console.log( 'set json to state properties' )
        // console.log( json )
        // hacky if / else statement - should probably be replaced by a for in loop
        // it will surfice temporarily
        // if ( this.state.allTeams == null ) { 
        //   // console.log( 'json teams', json )
        //   // extract only the id and team short name from the returned data
        //   // loop over every team, get the data and assign it in to an array of objects
        //   json.teams.map((counter) => {
        //     // console.log( 'json teams', json.teams)
        //     const teamId = counter.id
        //     const teamName = counter.shortName
        //     // this.setState((currentState) => {
        //     //   return {
        //     //     allTeams: json,
        //     //     teamDetails: currentState.teamDetails.concat([{
        //     //       teamName: teamName,
        //     //       teamId: teamId
        //     //     }]),
        //     //   }
        //     // })
        //   })
        //   // console.log( 'this.state - ', this.state.allTeams )
        // } else {
        //   // when looping over urls[1], assign value to this.state.allMatches property
        //   this.setState(( currentState ) => {
        //     console.log( this.state.teamDetails )
        //     // console.log( 'allMatches', json )
        //     // console.log( 'json matches', json )
        //     // return {
        //     //   allMatches: json,
        //     // }
        //   })
        // }
        // once the data has loaded, 
        if ( this.state.allTeams !== null && this.state.allMatches !== null ) {       
        }
              })
      .catch( (ex) => {
        console.log('parsing failed:', ex)
      })
      .then ( () => {
        // this.saveInitialState()
      })
    })
  }

  // will only run after component has updated 
  // - good for catching errors where the code is run but the state has not yet updated
  componentDidUpdate() {
  }

  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value.replace(/^\w/, c => c.toUpperCase())
    })
  }

  // findMatches() {
  //   console.log( 'this', this )
  //   // look through all teams in our list
  //   for (let item of this.state.teamDetails) {
  //     // check that selected team 
  //     if ( this.state.input === item.teamName ) {
  //       console.log( 'item.teamName', item.teamName )
  //       var teamColour = this.state.profile.filter( (key) => { return key.name === item.teamName } )
  //       var colour = teamColour[0].colour

  //       console.log( 'teamColour', teamColour) 
  //       console.log( 'colour', colour) 
  //       console.log('teamDetails', this.state.teamDetails)
  //       let selectedTeamId = item.teamId
  //       let selectedTeamName = item.teamId
  //       let TeamName = item.teamName
  //       let resultsOfMatches = []
  //       let fixtures = []
  //       // let teamColor = 
  //       let filteredMatches = this.state.allMatches.matches.filter( (match) => { return match.awayTeam.id === selectedTeamId || match.homeTeam.id === selectedTeamId })
  //       // console.log( 'filteredMatches', filteredMatches )

  //       filteredMatches.map( (match) => {
  //         return (
  //           fixtures.push({
  //             home: match.homeTeam.name,
  //             away: match.awayTeam.name,
  //             score: match.score.fullTime.homeTeam + ' : ' + match.score.fullTime.awayTeam
  //           })
  //         )
  //       })
  //       console.log( 'fixtures ', fixtures )


  //       let matchesSoFar = filteredMatches.map( (game) => { return game.matchday } )

  //       function getMatchResultOccurence(array, result) {
  //         return array.filter((v) => (v === result)).length;
  //       }

  //       function getMatchResults( game, ourTeam ) {
  //         let result = game.score.winner
  //         let home = game.homeTeam.id
  //         if ( result === "HOME_TEAM" && home === selectedTeamId ) { resultsOfMatches.push( 3 ) }
  //         if ( result === "HOME_TEAM" && home !== selectedTeamId ) { resultsOfMatches.push( 0 ) }
  //         if ( result === "AWAY_TEAM" && home === selectedTeamId ) { resultsOfMatches.push( 0 ) }
  //         if ( result === "AWAY_TEAM" && home !== selectedTeamId ) { resultsOfMatches.push( 3 ) }
  //         if ( result === "DRAW" ) { resultsOfMatches.push( 1 ) }
  //       }

  //       filteredMatches.map( getMatchResults )
  //       // addUpMatches
  //       var pointsSoFar = resultsOfMatches.reduce((acc, current) => {
  //         acc.push((acc[acc.length - 1] || 0) + current);
  //         return acc;
  //       }, [])

  //       // map over our matches and set component state accordingly
  //       // filteredMatches.map( (games) => {
  //         this.setState( (currentState) => {
  //           return {
  //             gamesPlayed: resultsOfMatches.length,
  //             gamesWon: getMatchResultOccurence(resultsOfMatches, 3),
  //             gamesLost: getMatchResultOccurence(resultsOfMatches, 0),
  //             gamesDrawn: getMatchResultOccurence(resultsOfMatches, 1),
  //             matchday: filteredMatches,
  //             data: {
  //               labels: matchesSoFar,
  //               datasets: currentState.data.datasets.concat({ 
  //                 label: TeamName,
  //                 backgroundColor: colour,
  //                 // borderColor: 'rgb(255, 99, 132)',
  //                 data: pointsSoFar,
  //                 fixtures: fixtures,
  //                 borderColor: colour,
  //                 backgroundColor: 'transparent',
  //               })
  //             },
  //           }
  //         })
  //       // })
  //       // setTimeout( function() {
  //       //   console.log( 'this.state.data ', this.state.data.datasets )
  //       // }, 3000)
  //     }
  //   }
  // }
  
  render(json, item) {
    return (
      <div>
        <input
          type='text'
          placeholder='Find your team...'
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.findMatches}>Submit</button>

        <DisplayDetails
          teams={this.state.profile}
          activateClickResponse={this.selectTeam}
        /> 

        <DisplayStats
          gamesPlayed={this.state.gamesPlayed}
          gamesWon={this.state.gamesWon}
          gamesLost={this.state.gamesLost}
          gamesDrawn={this.state.gamesDrawn}
        />        

        <Line 
          data={this.state.data}
          height={200}
          width={400}
          options={{
            tooltips: {
              callbacks: {
                title: function( tooltipItem, data ) {
                  return  data.datasets[1].fixtures[tooltipItem[0]['index']].home + ' v ' + data.datasets[1].fixtures[tooltipItem[0]['index']].away
                },
                afterTitle: function( tooltipItem, data ) {
                  return  data.datasets[1].fixtures[tooltipItem[0]['index']].score
                }
              }
            },
            legend: {
              display: true,
            },
            scales: {
              yAxes: [{
                ticks: {
                  max: this.state.matchday.length * 3,
                  min: 0,
                  stepSize: 3,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Points available'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Matchday'
                }
              }]
            },
            title: {
              display: 'hello',
              text: 'Premier League Teams',
            }
          }}
        />

        <button onClick={this.resetState}>Reset</button>
        <button onClick={this.removeDataset}>Remove</button>
        <button onClick={this.showAllDatasets}>Show all</button>
      </div>
    )
  }
}

export default App;
