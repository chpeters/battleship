import React, { Component } from 'react'
import './App.css'
import Grid from '../Grid'
import MessageSection from '../MessageSection'

const arr = [
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
const msgs = [
  {text: 'Hello there!', type: 'self'},
  {text: 'Yooo!', type: 'opponent'},
  {text: 'Do you want to play battleship! This is a really long message that should line wrap a few times', type: 'self'}
]

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='table'>
          <Grid size={300} elements={arr} />
        </div>
        <MessageSection messages={msgs}/>
      </div>
    );
  }
}

export default App;
