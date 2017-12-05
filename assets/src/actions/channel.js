import { Socket } from 'phoenix'

export function joinChannel(tableId) {
	return (dispatch) => {
		const socket = new Socket('ws://127.0.0.1:4000/socket');
	  socket.connect();
	  const channel = socket.channel('table:'+tableId);
	  
	  dispatch({type: "JOIN_ATTEMPT"})

	  channel.join()
	    .receive('ok', payload => {
	      dispatch({type: "JOIN_SUCCESS", channel: channel})
	    })
	    .receive('error', reason => {
	    	dispatch({type: "JOIN_FAIL"})
	      console.log('failed join', reason)
	    })

	  channel.on('new:message', payload => {
	    dispatch({type: "NEW_MESSAGE", message: payload.message})
	  })

	  channel.on('new:board', payload => {
	    dispatch({type: "RECEIVE_BOARD", board: payload.board})
	  })

	  channel.on('new:shot', payload => {
	    dispatch({type: "RECEIVE_SHOT", loc: payload.loc})
	  })
	}
}

export function addMessage(channel, text) {
  return dispatch => {

    let payload = {
      message: text
    }
    dispatch({type: "SEND_MESSAGE", message: text})
    channel.push('new:board', payload)
  }
}

export function startGame(channel, board) {
  return dispatch => {

    let payload = {
      board: board
    }
    dispatch({type: 'START_GAME', board: board})
    channel.push('new:board', payload)
  }
}

export function squareClicked(channel, gameState, loc) {
  return dispatch => {
  	console.log(gameState)
  	if (gameState === 'table') {
  		dispatch({type: 'SQUARE_CLICKED', loc: loc})
  	}
  	else {
	    let payload = {
	      loc: loc
	    }
	    dispatch({type: 'FIRED_SHOT', loc: loc})
	    channel.push('new:shot', payload)
  	}
  }
}