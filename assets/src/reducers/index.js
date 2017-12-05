import { combineReducers } from 'redux';
import * as actions from '../actions';

const defaultBoard = [
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'
  ]

const tableInitialState = {
  gameState: 'home',
  code: null,
  boardSelf: defaultBoard,
  boardOpp: null,
  shotSelf: null,
  shotOpp: null,
  message: '',
  orientation: 'horizontal',
  sizes: [5, 4, 3, 3, 2],
  selected: 0
}

function placeShipIfValid([y, x], board, orientation, sizes, selected) {
  const size = sizes[selected]
  const start = parseInt("" + y + x)
  board = board.slice()
  if (orientation === 'horizontal' && x + size <= 10) { 
    for (let i = 0; i < size; i++) {
      if (board[start + i] === 'ship') {
        return {}
      }
      board[start + i] = 'ship'
    }
    return {boardSelf: board, selected: selected + 1}
  }
  else if (orientation === 'vertical' && y + size <= 10) {
    for (let i = 0; i < size; i++) {
      if (board[start + 10*i] === 'ship') {
        return {}
      }
      board[start + 10*i] = 'ship'
    }
    return {boardSelf: board, selected: selected + 1}
  }
  else {
    return {}
  }
}

function table(state = tableInitialState, action) {
  switch (action.type) {
    case 'JOIN_TABLE':
      return {...state, gameState: 'table', code: action.code}
    case 'CHANGE_ORIENTATION':
      let orientation = 'horizontal'
      if (state.orientation === 'horizontal') {
        orientation = 'vertical'
      }
      return {...state, orientation}
    case 'SQUARE_CLICKED':
      let coord = [0, action.loc]
      if (action.loc >= 10) {
        coord = [parseInt(action.loc.toString().substring(0,1)), action.loc%10]
      }
      return { ...state, ...placeShipIfValid(coord, state.boardSelf, state.orientation, state.sizes, state.selected)}
    case 'RESET_SHIPS':
      return {...state, boardSelf: defaultBoard, selected: 0, orientation: 'horizontal'}
    case 'START_GAME':
      if (state.boardOpp) {
        return {...state, gameState: 'shooting'}
      }
      return {...state, gameState: 'waiting'}
    case 'RECEIVE_BOARD':
      if (state.gameState === 'waiting') {
        return {...state, boardOpp: action.board, gameState: 'shooting'}
      }
      else return {...state, boardOpp: action.board}



    case 'FIRED_SHOT':
      if(state.shotOpp !== null) {

        const theirSquareType = state.boardOpp[action.loc]
        const yourSquareType = state.boardSelf[state.shotOpp]

        let messageSelf = ""
        if (theirSquareType === 'ship') {
          messageSelf = "Hit! Fire Again! "
          state.boardOpp[action.loc] = 'hit'
        }
        else {
          messageSelf = "Missed! Fire Again! "
          state.boardOpp[action.loc] = 'miss'
        }

        let messageTheir = ""
        if (yourSquareType === 'ship') {
          messageTheir = "You were hit last turn, be careful!"
          state.boardSelf[state.shotOpp] = 'hit'
        }
        else {
          messageTheir = "They missed last turn, take advantage!"
          state.boardSelf[state.shotOpp] = 'miss'
        }

        let message = messageSelf + messageTheir

        if (gameOver(state.boardOpp) && gameOver(state.boardSelf)) {
          message = "Wow, thats rare; You tied!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else if (gameOver(state.boardSelf)) {
          message = "Oooh so close, you lost!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else if (gameOver(state.boardOpp)) {
          message = "Congratulations, you won!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else {
          console.log("got to right fire")
          return {...state, gameState: 'shooting', boardSelf: state.boardSelf,
                  boardOpp: state.boardOpp, message: message, shotOpp: null, shotSelf: null}
        }

      }
      return {...state, gameState: 'waiting', shotSelf: action.loc}

    case 'RECEIVE_SHOT':
      if (state.shotSelf !==  null) {
        
        const theirSquareType = state.boardOpp[state.shotSelf]
        const yourSquareType = state.boardSelf[action.loc]

        let messageSelf = ""
        if (theirSquareType === 'ship') {
          messageSelf = "Hit! Fire Again! "
          state.boardOpp[state.shotSelf] = 'hit'
        }
        else {
          messageSelf = "Missed! Fire Again! "
          state.boardOpp[state.shotSelf] = 'miss'
        }

        let messageTheir = ""
        if (yourSquareType === 'ship') {
          messageTheir = "You were hit last turn, be careful!"
          state.boardSelf[action.loc] = 'hit'
        }
        else {
          messageTheir = "They missed last turn, take advantage!"
          state.boardSelf[action.loc] = 'miss'
        }

        let message = messageSelf + messageTheir

        if (gameOver(state.boardOpp) && gameOver(state.boardSelf)) {
          message = "Wow, thats rare; You tied!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else if (gameOver(state.boardSelf)) {
          message = "Oooh so close, you lost!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else if (gameOver(state.boardOpp)) {
          message = "Congratulations, you won!"
          return {...tableInitialState, gameState: 'gameOver', message: message}
        }
        else {
          console.log("got to right receive")
          return {...state, gameState: 'shooting', boardSelf: state.boardSelf,
                  boardOpp: state.boardOpp, message: message, shotOpp: null, shotSelf: null}
        }

      }
      return  {...state, shotOpp: action.loc}

    default:
      return state
  }
}

function gameOver(board) {
  return board.filter((e) => e==='ship').length==0
}

function gameState(state = 'home', action) {
  return state
}

function isLoading(state = false, action) {
  switch (action.type) {
    case actions.JOIN_TABLE_ATTEMPT:
    case actions.CREATE_TABLE_ATTEMPT:
      return true;

    case actions.JOIN_TABLE_SUCCESS:
    case actions.CREATE_TABLE_SUCCESS:
    case actions.JOIN_TABLE_FAILURE:
    case actions.CREATE_TABLE_FAILURE:
      return false;

    default:
      return state;
  }
}

const initialChannelState = {
  loading: false,
  messages: [],
  channel: {},
  error: null,
}

function channel(state = initialChannelState, action) {
  switch (action.type) {
    case "JOIN_ATTEMPT":
      return {...state, loading: true}
    case "JOIN_FAIL":
      return {...state, loading: false}
    case "JOIN_SUCCESS":
      return {...state, loading: false, channel: action.channel}
    case "NEW_MESSAGE":
      return {...state, messages: state.messages.concat({text: action.message, type: 'opponent'})}
    case "SEND_MESSAGE":
      return {...state, messages: state.messages.concat({text: action.message, type: 'self'})}
    case 'START_GAME':
      return {...state}
    default:
      return state
  }
}

const reducers = combineReducers({
  table: table,
  channel: channel,
  gameState: gameState,
  isLoading: isLoading
});

export default reducers;