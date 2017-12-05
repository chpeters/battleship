import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import Home from '../Home'
import Table from '../Table'
// import Grid from '../Grid'
// import MessageSection from '../MessageSection'

// const arr = [
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
//   'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'
// ]
// const msgs = [
//   {text: 'Hello there!', type: 'self'},
//   {text: 'Yooo! Wuss up?', type: 'opponent'},
//   {text: 'Do you want to play battleship! This is a really long message that should line wrap a few times', type: 'self'}
// ]

// class App extends Component {
//   render() {
//     return (
//       <div className='container'>
//         <div className='table'>
//           <Grid size={300} elements={arr} />
//         </div>
//         <MessageSection messages={msgs}/>
//       </div>
//     );
//   }
// }
//<Ships sizes={[5, 4, 3, 3, 2]} placed={[false,false,false,false,false]} orientation={'vertical'}/>

class App extends React.Component {
  render() {
    switch (this.props.table.gameState) {
    	case 'home':
    		return (<Home />)
    	case 'table':
    		return (<Table tableCode={this.props.table.code}/>)
      case 'waiting':
        return (<Table tableCode={this.props.table.code}/>)
      case 'shooting':
        return (<Table tableCode={this.props.table.code}/>)
      case 'gameOver':
        return <Table tableCode={this.props.table.code}/>
    	default:
    		return (<Home />)
    }
  }
}

export default connect(
	(state) => state
)(App);
