import React, { Component } from 'react'
import './App.css'
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

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1 style={{textAlign: 'center'}}>Battleship</h1>
        <div style={{maxWidth: '300px', margin: '0 auto'}}><label for='code'>Input Table Code: </label><input type='text'/></div>
        <button style={{margin: '15px auto', display: 'block'}} type="button">New Table</button>
      </div>
    );
  }
}

export default App;
