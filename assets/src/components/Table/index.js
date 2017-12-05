import React from 'react'
import { connect } from 'react-redux'
import MessageSection from '../MessageSection'
import Grid from '../Grid'
import Ships from '../Ships'
import * as actions from '../../actions/channel'

class Table extends React.Component {

	onSend(msg) {
		this.props.sendMessage(this.props.channel.channel, msg)
	}

	componentDidMount() {
		this.props.joinChannel(this.props.tableCode)
	}

	render() {
		switch (this.props.table.gameState) {
			case 'table':
	    	return (
					<div className='container'>
						<h1 style={{textAlign: 'center'}}>Table code: {this.props.tableCode}</h1>
						<h3 style={{textAlign: 'center'}}>Place your ships to start a game.</h3>
						<div style={{display: 'flex', maxWidth: '275px', margin: '0 auto'}}>
							<Ships sizes={this.props.table.sizes} selected={this.props.table.selected} orientation={this.props.table.orientation}/>
							<button onClick={this.props.changeOrientation} style={{height: '25px'}}>Change orientation</button>
						</div>
						<div style={{display: 'flex', maxWidth: '305px', margin: '10px auto'}}>
							<Grid size={300} elements={this.props.table.boardSelf} />
						</div>
						<div style={{display: 'flex', maxWidth: '160px', margin: '0 auto'}}>
							<button disabled={this.props.table.selected != 5} onClick={() => this.props.startGame(this.props.channel.channel, this.props.table.boardSelf)} style={{height: '25px'}}>Start game</button>
							<button onClick={this.props.resetShips} style={{height: '25px'}}>Reset ships</button>
						</div>
						<MessageSection messages={this.props.channel.messages} onSend={this.onSend.bind(this)}/>
					</div>
				)
	    case 'waiting':
	       return (
	       	<div className='container'>
						<h1 style={{textAlign: 'center'}}>Table code: {this.props.tableCode}</h1>
						<h3 style={{textAlign: 'center'}}>Waiting for opponent...</h3>
						<MessageSection messages={this.props.channel.messages} onSend={this.onSend.bind(this)}/>
					</div>
	       )
	    case 'shooting':
	    	return (
	    		<div className='container'>
						<h1 style={{textAlign: 'center'}}>Table code: {this.props.tableCode}</h1>
						<h3 style={{textAlign: 'center'}}>Select a square on left to fire a shot.</h3>
						<h4 style={{textAlign: 'center'}}>{this.props.table.message}</h4>
						<div style={{display: 'flex', maxWidth: '725px', margin: '10px auto'}}>
						<Grid size={300} elements={this.props.table.boardOpp.map((e) => {
								if (e === 'ship') {
									return 'empty'
								}
								else {
									return e
								}
							})} />
							<Grid size={300} elements={this.props.table.boardSelf} />
						</div>
						<MessageSection messages={this.props.channel.messages} onSend={this.onSend.bind(this)}/>
					</div>
	    	)
	    default:
	    	return (
					<div className='container'>
						<h1 style={{textAlign: 'center'}}>Table code: {this.props.tableCode}</h1>
						<h3 style={{textAlign: 'center'}}>Place your ships to start a game.</h3>
						<h4 style={{textAlign: 'center'}}>{this.props.table.message}</h4>
						<div style={{display: 'flex', maxWidth: '275px', margin: '0 auto'}}>
							<Ships sizes={this.props.table.sizes} selected={this.props.table.selected} orientation={this.props.table.orientation}/>
							<button onClick={this.props.changeOrientation} style={{height: '25px'}}>Change orientation</button>
						</div>
						<div style={{display: 'flex', maxWidth: '305px', margin: '10px auto'}}>
							<Grid size={300} elements={this.props.table.boardSelf} />
						</div>
						<div style={{display: 'flex', maxWidth: '160px', margin: '0 auto'}}>
							<button disabled={this.props.table.selected != 5} onClick={() => this.props.startGame(this.props.channel.channel, this.props.table.boardSelf)} style={{height: '25px'}}>Start game</button>
							<button onClick={this.props.resetShips} style={{height: '25px'}}>Reset ships</button>
						</div>
						<MessageSection messages={this.props.channel.messages} onSend={this.onSend.bind(this)}/>
					</div>
				)
		}
	}
}

const mapDispatchToProps = dispatch => {
  return {
    changeOrientation : () => dispatch({type: 'CHANGE_ORIENTATION'}),
    resetShips : () => dispatch({type: 'RESET_SHIPS'}),
    startGame : (channel, board) => dispatch(actions.startGame(channel, board)),
    sendMessage : (channel, msg) => dispatch(actions.addMessage(channel, msg)),
    joinChannel : (tableId) => dispatch(actions.joinChannel(tableId))
  }
}

export default connect(
	(state) => state,
	mapDispatchToProps
)(Table)