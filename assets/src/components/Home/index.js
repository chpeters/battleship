import React from 'react'
import { connect } from 'react-redux'
import api from '../../utils/api'

class Home extends React.Component {

	handleKeyPress(e) {
		if (e.keyCode === 13) {
			this.props.joinTable(e.target.value)
			e.target.value = ""
		}
	}

	render() {
		return (
			<div className='container'>
		    <h1 style={{textAlign: 'center'}}>Battleship</h1>
		    <div style={{maxWidth: '300px', margin: '0 auto'}}>
		    	<label>Input Table Code: </label>
		    	<input placeholder='Press enter to submit' onKeyUp={this.handleKeyPress.bind(this)} type='text'/>
		    </div>
		    <button style={{margin: '15px auto', display: 'block'}} type="button" onClick={this.props.createTable}>New Table</button>
		  </div>
		)
	}
} 

const mapDispatchToProps = dispatch => {
  return {
    createTable : () => {return dispatch({type: 'JOIN_TABLE', code: api.newTableCode()})},
		joinTable : (code) => {return dispatch({type: 'JOIN_TABLE', code})}
  }
}

export default connect(
	(state) => state,
	mapDispatchToProps
)(Home)