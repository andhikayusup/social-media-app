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
import AuthRoute from './components/AuthRoute'
import SinglePost from './containers/SinglePost'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
