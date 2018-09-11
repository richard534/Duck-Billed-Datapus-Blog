import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

const App = () => (
  <Router>
    <div className="grid-container">
      <div className="navbar-background">
        <div className="navbar">
          <Link to="/"><img src="https://s3-eu-west-1.amazonaws.com/duck-billed-datapus/public/duck-billed-dev.png" /></Link>
        </div>
      </div>
      <Routes />
    </div>
  </Router>
)

export default hot(module)(App)
