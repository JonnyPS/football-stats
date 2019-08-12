import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
var cloneDeep = require('clone-deep');

function DisplayHeader () {
  return (
    <h1>Premier League Table 2019/20 displayed in linear graph form</h1>
  )
}

function DisplayStats (props) {
  console.log('props', props)
  return (
    <ul className="stats-list">
      <li class="body-copy"><span className="bold-copy">{props.teamName}</span></li>
      <br />
      <li class="body-copy--small">Number of games played: <span className="bold-copy">{props.gamesPlayed}</span></li>
      <li class="body-copy--small">Games won: <span className="bold-copy">{props.gamesWon}</span></li>
      <li class="body-copy--small">Games lost: <span className="bold-copy">{props.gamesLost}</span></li>
      <li class="body-copy--small">Games drawn: <span className="bold-copy">{props.gamesDrawn}</span></li>
      <br />
      <li class="body-copy--small">Longest winning streak: <span className="bold-copy">{props.longestWinningStreak}</span></li>
      <li class="body-copy--small">Longest losing streak: <span className="bold-copy">{props.longestLosingStreak}</span></li>
    </ul>
  )
}

function DisplayDetails (props) {
  return (
    <div className="logo-section">
    <ul className="inline-list">
      {props.teams.map( (key, i) => (
        <li key={i}>
          <img src={key.logo} alt={key.name} className="team-logo" onClick={(event) => {props.activateClickResponse(key.name);props.styleImg(event.target)}} />
        </li>
      ))}  
    </ul>
    <h5>Click on the logos above to display them on the graph.</h5>
    <br />
    <h5>Hover over the data on the chart to display the match.</h5> 
    </div>
  )
}

function ControlButtons (props) {
  return (
    <div className="button-container">
      <button onClick={props.resetState}>Reset</button>
      <button onClick={props.removeDataset}>Remove</button>
      <button onClick={props.showAllDatasets}>Show All</button>
    </div>
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
          logo: 'img/fulham.png',
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
      teamName: null,
      gamesPlayed: null,
      gamesWon: null,
      gamesLost: null,
      gamesDrawn: null,
      longestWinningStreak: null,
      longestLosingStreak: null,

      matchday: [],
      outcomes: [],
      data: {
        labels: '',
        datasets: [{
        }]
      },

    }

    // because of where these functions are called... (?)
    // we need to define that 'this', refers to our component App
    this.updateInput = this.updateInput.bind( this )
    this.findMatches = this.findMatches.bind( this )
    this.selectTeam = this.selectTeam.bind( this )
    this.resetState = this.resetState.bind( this )
    this.removeDataset = this.removeDataset.bind( this )
    this.showAllDatasets = this.showAllDatasets.bind( this )
    this.toggleImg = this.toggleImg.bind( this )
    this.setOpacity = this.setOpacity.bind( this )
    this.checkDatasetsForDuplicates = this.checkDatasetsForDuplicates.bind( this )
  }

  saveInitialState() {
    console.log( 'save initialState' )
    console.log( 'initialState =', this.state )

    this.initialState = [this.state]
  }

  resetState() {
    console.log('resetState')
    this.setState( this.initialState[0] )
    this.setOpacity()
  }

  removeDataset() {
    console.log('removeDataset')
    // get last element in datasets array and send the name of that objects label to setOpacity()
    this.setOpacity( this.state.data.datasets[this.state.data.datasets.length-1].label )
    this.setState( this.state.data.datasets.splice(-1, 1) )
  }

  showAllDatasets() {
    console.log('showAllDatasets')
    this.state.profile.map( (item, index) => {
      this.findMatches( item.name )
      this.setOpacity(undefined, true)
    })
  }

  selectTeam(name) {
    console.log('selectTeam name', name )
    this.setState({
      input: name.replace(/^\w/, c => c.toUpperCase())
    }, () => {
      this.findMatches()
    })
  }

  toggleImg(img) {
    // check to see if class exists on element
    // if not - add class
    // if true - remove class
    if( img.classList.contains('toggle-opacity')) {
      img.classList.remove('toggle-opacity')
    } else {
      img.classList.add('toggle-opacity');
    }
  }

  setOpacity(label, showAll) {
    let logos = document.getElementsByClassName('team-logo');
    // if label is not undefined - ie: operation should be perfomed on a single team, not all of them
    // then remove class on image whose alt tag matches the label parameter
    // else remove class on all images
    if ( label !== undefined ) {
      for (var i = 0; i < logos.length; i++ ) {
        let logoAlt = logos[i].getAttribute('alt')
        if (logoAlt === label ) {
          logos[i].classList.remove('toggle-opacity')          
        }
      }
    } else if ( showAll === true ) {
     for (var i = 0; i < logos.length; i++ ) {
        logos[i].classList.add('toggle-opacity')
      } 
    } else {
      for (var i = 0; i < logos.length; i++ ) {
        logos[i].classList.remove('toggle-opacity')
      }
    }
    
  }

  checkDatasetsForDuplicates(name) {
    // this.toggleImg(img)
    // return an array of boolean values whilst checking
    // if the datasets array has an item whose label value
    // equals our clicked on team name

    // check if our clicked on team already exists in our compenents state
    var test = this.state.data.datasets.map((item) => {
      // console.log('item.label', item.label)
      return item.label === name;
    })

    // get position of true value item in array if it exists
    var dupTeamNum = test.indexOf(true);
    // if item true doesn't exist, run findMatches()
    // else remove clicked on team from datasets array
    if ( dupTeamNum === -1 ) {    
      this.findMatches(name)
    } else {
      // let currentDatasets = this.state.data.datasets;
      // currentDatasets.splice(dupTeamNum, 1);
      this.setState((currentState) => {
        return {
          data: {
            datasets: currentState.data.datasets.filter((item, index) => {
              
              console.log('return item: ', item)
              console.log('return index: ', index)
              console.log('item[index]', item[index])
              console.log('dupTeamNum', dupTeamNum)
              return index !== dupTeamNum  
            })
          }
        }
      })
    }
  }

  componentDidMount() {
    console.log( 'componentDidMount - get json data' )
    // Use first urls array when new season starts, whilst in summer recess use second urls array
    // const urls = ['https://api.football-data.org/v2/competitions/PL/teams', 'https://api.football-data.org/v2/competitions/PL/matches?status=FINISHED']
    const urls = ['https://api.football-data.org/v2/competitions/PL/teams?season=2018', 'https://api.football-data.org/v2/competitions/PL/matches?season=2018']
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
        console.log('json', json)
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
        }
              })
      .catch( (ex) => {
        console.log('parsing failed:', ex)
      })
      .then ( () => {
        this.saveInitialState()
      })
    })
  }

  // will only run after component has updated 
  // - good for catching errors where the code is run but the state has not yet updated
  componentDidUpdate() {
    // console.log('state on update', this.state )
    // console.log('this.state.data.datasets', this.state.data.datasets)
  }

  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value.replace(/^\w/, c => c.toUpperCase())
    })
  }

  // get number of games won, lost or drawn
  getGameStats(array, value) {
    return array.filter((v) => (v === value)).length;
  }

  getLongestStreak(array, num) {
    console.log('getLongestStreak')
    // setup arrays to hold our results
    let tempStreaks = []; // tracks each streak
    let streakResults = []; // holds value of all streaks
    // iterate over array
    array.map((item, index) => {
      // store each item in streak in array, if item doesn't match our value then
      // empty temp array and push it's value, into results array
      if ( item === num ) {
        tempStreaks.push(item);
        if ( item === num && index === array.length-1 ) {
          streakResults.push(tempStreaks.length)
        }
      } else {
        streakResults.push(tempStreaks.length);
        tempStreaks =  [];
      }
    })
    // get highest value in results array - this is the length of our longest streak
    return Math.max.apply(Math, streakResults)
  }

  findMatches( name ) {
    console.log('this.state', this.state)
    // look through all teams in our list of teams
    for (let item of this.state.teamDetails) {
      // check our list to see if our input matches any team names 
      if ( this.state.input === item.teamName || name === item.teamName ) {
        var teamColour = this.state.profile.filter( (key) => { return key.name === item.teamName } )
        var colour = teamColour[0].colour
        let selectedTeamId = item.teamId
        let TeamName = item.teamName
        let resultsOfMatches = []
        let fixtures = []

        // return only matches that involve our team
        let filteredMatches = this.state.allMatches.matches.filter( (match) => { return match.awayTeam.id === selectedTeamId || match.homeTeam.id === selectedTeamId })

        filteredMatches.map( (match) => {
          return (
            fixtures.push({
              home: match.homeTeam.name,
              away: match.awayTeam.name,
              score: match.score.fullTime.homeTeam + ' : ' + match.score.fullTime.awayTeam,
              winner: match.score.winner
            })
          )
        })

        let matchesSoFar = filteredMatches.map( (game) => { return game.matchday } )

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
        
        console.log('filteredMatches', filteredMatches)

        // addUpMatches
        var pointsSoFar = resultsOfMatches.reduce((acc, current) => {
          acc.push((acc[acc.length - 1] || 0) + current);
          return acc;
        }, [])


        console.log('resultsOfMatches', resultsOfMatches)

        // get game stats
        let gamesWon = this.getGameStats(resultsOfMatches, 3);
        let gamesDrawn = this.getGameStats(resultsOfMatches, 1);
        let gamesLost = this.getGameStats(resultsOfMatches, 0);
        let winningStreak = this.getLongestStreak(resultsOfMatches, 3);
        let losingStreak = this.getLongestStreak(resultsOfMatches, 0);
        console.log('winningStreak', winningStreak)
        console.log('losingStreak', losingStreak)
        // map over our matches and set component state accordingly
        this.setState( (currentState) => {
          return {
            teamName: name,
            gamesPlayed: resultsOfMatches.length,
            gamesWon: gamesWon,
            gamesDrawn: gamesDrawn,
            gamesLost: gamesLost,
            longestWinningStreak: winningStreak,
            longestLosingStreak: losingStreak,
            matchday: filteredMatches,
            data: {
              labels: matchesSoFar,
              datasets: currentState.data.datasets.concat({ 
                label: TeamName,
                backgroundColor: colour,
                // borderColor: 'rgb(255, 99, 132)',
                data: pointsSoFar,
                fixtures: fixtures,
                borderColor: colour,
                backgroundColor: 'transparent',
              })
            },
          }
        })
      }
    }
  }
  
  render(json, item) {
    return (
      <div>
        <DisplayHeader 
        />
        <DisplayDetails
          teams={this.state.profile}
          activateClickResponse={this.checkDatasetsForDuplicates}
          styleImg={this.toggleImg}
        /> 
        <DisplayStats
          teamName={this.state.teamName}
          gamesPlayed={this.state.gamesPlayed}
          gamesWon={this.state.gamesWon}
          gamesLost={this.state.gamesLost}
          gamesDrawn={this.state.gamesDrawn}
          longestWinningStreak={this.state.longestWinningStreak}
          longestLosingStreak={this.state.longestLosingStreak}
        />        
        <Line 
          data={this.state.data}
          height={200}
          width={400}
          options={{
            animation: {
              duration: 0
            },
            tooltips: {
              callbacks: {
                title: function( tooltipItem, data ) {
                  var teamInDataSet = tooltipItem[0].datasetIndex;
                  var highlightedGameNumber = tooltipItem[0].index;
                  var highlightedTeamName = data.datasets[teamInDataSet].label;
                  var highlightedGameDetails = data.datasets[teamInDataSet].fixtures[highlightedGameNumber];
                  return highlightedGameDetails.home + ' v ' + highlightedGameDetails.away; 
                },
                afterTitle: function( tooltipItem, data ) {
                  var teamInDataSet = tooltipItem[0].datasetIndex;
                  var highlightedGameNumber = tooltipItem[0].index;
                  var highlightedTeamName = data.datasets[teamInDataSet].label;
                  var highlightedGameDetails = data.datasets[teamInDataSet].fixtures[highlightedGameNumber];
                  return highlightedGameDetails.score;
                }
              },
              label: null,
            },
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                ticks: {
                  max: this.state.matchday.length * 3,
                  min: 0,
                  stepSize: 6,
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
              text: '',
            }
          }}
        />
        <ControlButtons 
          resetState={this.resetState}
          removeDataset={this.removeDataset}
          showAllDatasets={this.showAllDatasets}
        />
      </div>
    )
  }
}

export default App;
