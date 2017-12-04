import React from 'react'
import Square from '../Square'

// sizes: [int]
// placed: [bool] && placed.length == size.length
// orientation: One of [horizontal, vertical]
const Ship = ({size, orientation, type}) => {
	const styles = {
		marginRight: orientation === 'vertical' ? '10px' : '0px',
		marginBottom: orientation === 'horizontal' ? '10px' : '0px',
	}
	const cells = []
	for (let i = 0; i < size; i++) {
		cells.push(<Square key={i} size={20} type={type} inline={orientation === 'horizontal'} />)
	}

	return (
		<div style={styles}>{cells}</div>
	)
}

export default Ship