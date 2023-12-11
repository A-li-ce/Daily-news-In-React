import { useState } from 'react'
import React from 'react'
import Navbar from './components/Navbar.jsx'
import NewsItem from './components/NewsItem'
import News from './components/News'
// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from './components/Spinner'


const App = ()=>{ 

    let pageSize = 20
    const apiKey = '1b0c0f70c3914cc594b00380a34382b9';

    return (
      <div >
        <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/"element = {<News key = "general" apiKey ={apiKey} pageSize={pageSize} country='in' category = "general"/>} />
              <Route exact path="/business"element = {<News key = "business" apiKey ={apiKey} pageSize={pageSize} country='in' category = "business"/>} />
              <Route exact path="/entertainment"element = {<News key = "entertainment" apiKey ={apiKey} pageSize={pageSize} country='in' category = "entertainment"/>}/>
              <Route exact path="/health"element = {<News key = "health" apiKey ={apiKey} pageSize={pageSize} country='in' category = "health"/>}/>
              <Route exact path="/science"element = {<News key = "science" apiKey ={apiKey} pageSize={pageSize} country='in' category = "science"/>}/>
              <Route exact path="/sports"element = {<News key = "sports" apiKey ={apiKey} pageSize={pageSize} country='in' category = "sports"/>} />
              <Route exact path="/technology"element = {<News key = "technology" apiKey ={apiKey} pageSize={pageSize} country='in' category = "technology"/>}/>
            </Routes>

        </Router>
     </div> 
    )
  }

export default App;