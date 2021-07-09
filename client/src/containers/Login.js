import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'

const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username ..."
          name="username"
          value={values.username}
          type="text"
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password ..."
          name="password"
          value={values.password}
          type="password"
          onChange={onChange}
          error={errors.password}
        />
        <Button type="submit" content="Login" primary />
      </Form>
      {errors.general && (
        <div className="ui error message">
          <ul className="list">
            <li>{errors.general}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login
