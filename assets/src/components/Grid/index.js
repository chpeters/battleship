import PropTypes from 'prop-types'
import React from 'react'
import Square from '../Square'

const Grid = ({size, elements}) => {
	const styles = {
		'width': size + 2,
		'height': size + 2,
		'display': 'inline-grid',
		'gridTemplateColumns': 'repeat(10, 1fr)',
		'gridAutoRows': 'auto',
		'border': '1px solid black',
	}
	var index = -1
	const cellSize = Math.floor(size / 10)
	const cells = elements.map((e) => {
		index++
		return <Square key={index} loc={index} size={cellSize} type={e} />
	})
	
	return (<div style={styles}>{cells}</div>)
}

Grid.propTypes = {
	size: PropTypes.number,
	elements: PropTypes.arrayOf(PropTypes.oneOf(['hit','miss','ship','hover','empty']))
}

export default Grid