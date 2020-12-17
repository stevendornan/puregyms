import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/layout/Header'
import HomeScreen from './screens/HomeScreen'
import Routes from './components/routing/Routes'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route component={Routes} />
      </Switch>
    </Router>
  )
}

export default App
