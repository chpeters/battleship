import PropTypes from 'prop-types'
import React from 'react'

const Square = ({size, type}) => {
	const styles = {
		'width': size,
		'height': size,
		'border': '1px solid black',
		'backgroundColor': 'grey'
	}

	switch (type) {
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

	return (<div style={styles}></div>)
}


Square.propTypes = {
	size: PropTypes.number,
	type: PropTypes.oneOf(['hit','miss','ship','hover','empty'])
}

export default Square