import PropTypes from 'prop-types'
import React from 'react'

const Message = ({type, text}) => {
	const styles = {
		'maxWidth': '80%',
		'padding': '10px',
		'borderRadius': '3px',
		'margin': '15px',
		'backgroundColor': '#D4EFFD',
		'alignSelf': 'start'
	}

	switch (type) {
		case 'opponent':
			styles.backgroundColor = '#ffb7b7'
			styles.marginLeft = 'auto'
			break
		default:
			styles.backgroundColor = '#D4EFFD'
			styles.marginRight = 'auto'
	}

	return (<p style={styles}>{text}</p>)
}

Message.propTypes = {
	text: PropTypes.string,
	type: PropTypes.oneOf(['self', 'opponent'])
}

export default Message