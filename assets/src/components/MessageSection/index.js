import PropTypes from 'prop-types'
import React from 'react'
import MessageList from './MessageList'

const MessageSection = ({messages, onSend}) => {
	const styles = {
		'backgroundColor': '#eee',
		'paddingBottom': '15px'
	}
	const headerStyle = {
		'textAlign': 'center',
		'paddingTop': '15px',
	}
	const messageBoxStyle = {
		'margin': '0 auto',
		'display': 'block',
		'width': '80%',
		'height': '50px',
		'border': 'none',
		'padding': '10px',
		'fontSize': '16px',
		borderRadius: '3px'
	}

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			onSend(e.target.value)
			e.target.value = ""
		}
	}

	return (
		<div style={styles}>
			<h3 style={headerStyle}>Messages</h3>
			<MessageList messages={messages} />
			<textarea style={messageBoxStyle} onKeyUp={handleKeyPress} id="messageBox" placeholder="Write your message here..."></textarea>
		</div>
	)
}

export default MessageSection