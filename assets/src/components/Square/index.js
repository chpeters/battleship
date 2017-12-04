import React from 'react'
import { connect } from 'react-redux'

const Square = (props) => {
	const styles = {
		'width': props.size,
		'height': props.size,
		'border': '1px solid black',
		'backgroundColor': 'grey',
		display: props.inline ? 'inline-block' : 'block'
	}

	switch (props.type) {
		case 'hit':
			styles.backgroundColor = 'red'
			break
		case 'miss':
			styles.backgroundColor = 'white'
			break
		case 'ship':
			styles.backgroundColor = 'black'
			break
		case 'hover':
			styles.backgroundColor = 'blue'
			break
		default:
			styles.backgroundColor = 'grey'
	}

	return (<div onClick={() => props.clickedSquare(props.loc)} style={styles}></div>)
}

const mapDispatchToProps = dispatch => {
  return {
    clickedSquare : (key) => dispatch({type: 'SQUARE_CLICKED', loc: key})
  }
}

export default connect(
	(state) => state,
	mapDispatchToProps
)(Square)