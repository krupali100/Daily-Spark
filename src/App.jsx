import React, { Component } from 'react'
import Navbar from './components/navbar'
import News from './components/news'

import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={6}/>
        
      </div>
    )
  }
}
