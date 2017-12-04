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
      console.log(coord)
      return { ...state, ...placeShipIfValid(coord, state.boardSelf, state.orientation, state.sizes, state.selected)}
    case 'RESET_SHIPS':
      return {...state, boardSelf: defaultBoard, selected: 0, orientation: 'horizontal'}
    case 'START_GAME':
      return {...state, gameState: 'waiting'}
    default:
      return state
  }
}

function gameState(state = 'home', action) {
  return state
}

function messages(state = [], action) {
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

const reducers = combineReducers({
  table: table,
  messages: messages,
  gameState: gameState,
  isLoading: isLoading
});

export default reducers;