import React from 'react'
import Ship from './Ship'

// sizes: [int]
// selected: which ship is selected [0...n-1]
// orientations: One of [horizontal, vertical]
const Ships = ({sizes, selected, orientation}) => {
	const styles = {
		display: orientation === 'vertical' ? 'flex' : 'block'
	}
	const ships = []
	for (let i = 0; i < sizes.length; i++) {
		let type = 'empty'
		if (i < selected) {
			type = 'ship'
		}
		else if (i === selected) {
			type = 'hover'
		}
		ships.push(<Ship key={i} size={sizes[i]} orientation={orientation} type={type}/>)
	}

	return (
		<div style={styles}>{ships}</div>
	)
}

export default Ships