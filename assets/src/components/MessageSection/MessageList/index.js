import PropTypes from 'prop-types'
import React from 'react'
import Message from './Message'

// Message: [{{type, text}}]
const MessageList = ({messages}) => {
	const styles = {
		backgroundColor: 'white',
		borderRadius: '3px',
		margin: '20px'
	}

	var index = 0
	const msgs = messages.map((msg) => {
		index++
		return (
			<div key={index} style={{'display': 'flex'}}>
			<Message key={index} text={msg.text} type={msg.type}/>
			</div>
		)
	})
	return (<div style={styles}>{msgs}</div>)
}

MessageList.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(['self', 'opponent'])
  }))
}

export default MessageList