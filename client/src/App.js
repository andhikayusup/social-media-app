import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import Navbar from './components/Navbar'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import { AuthProvider } from './context/auth'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
