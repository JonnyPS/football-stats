import React, { Component } from 'react';


function List (props) {
  return (
    <ul>
    	{props.items.map( (value) => (
    		<li key={value}>
    			{value}
			</li>
    	))}
    </ul>
  )
}

class Chart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
	  list: ['something', 'someone', 'somewhere'],
	}
  }

  componentDidMount() {
  	
  }

  render() {
  	console.log( 'this first component' )
  	console.log( this )
  	// return null
    return (
      <List items={this.state.list} />
    )
  }
}

export default Chart;
