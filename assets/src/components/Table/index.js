import React from 'react'
import { connect } from 'react-redux'
import MessageSection from '../MessageSection'
import Grid from '../Grid'
import Ships from '../Ships'

const Table = (props) => {
	switch (props.table.gameState) {
		case 'table':
    	return (
				<div className='container'>
					<h1 style={{textAlign: 'center'}}>Table code: {props.tableCode}</h1>
					<h3 style={{textAlign: 'center'}}>Place your ships to start a game.</h3>
					<div style={{display: 'flex', maxWidth: '275px', margin: '0 auto'}}>
						<Ships sizes={props.table.sizes} selected={props.table.selected} orientation={props.table.orientation}/>
						<button onClick={props.changeOrientation} style={{height: '25px'}}>Change orientation</button>
					</div>
					<div style={{display: 'flex', maxWidth: '305px', margin: '10px auto'}}>
						<Grid size={300} elements={props.table.boardSelf} />
					</div>
					<div style={{display: 'flex', maxWidth: '160px', margin: '0 auto'}}>
						<button disabled={props.table.selected != 5} onClick={props.startGame} style={{height: '25px'}}>Start game</button>
						<button onClick={props.resetShips} style={{height: '25px'}}>Reset ships</button>
					</div>
					<MessageSection messages={props.messages}/>
				</div>
			)
    case 'waiting':
       return (
       	<div className='container'>
					<h1 style={{textAlign: 'center'}}>Table code: {props.tableCode}</h1>
					<h3 style={{textAlign: 'center'}}>Waiting for opponent to place ships...</h3>
					<MessageSection messages={props.messages}/>
				</div>
       )
	}
	
}

const mapDispatchToProps = dispatch => {
  return {
    changeOrientation : () => dispatch({type: 'CHANGE_ORIENTATION'}),
    resetShips : () => dispatch({type: 'RESET_SHIPS'}),
    startGame : () => dispatch({type: 'START_GAME'})
  }
}

export default connect(
	(state) => state,
	mapDispatchToProps
)(Table)