import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Register = (props) => {
  const [errors, setErrors] = useState({})

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, __) {
      props.history.push('/')
    },
    onError(err) {
      console.log(`err`, err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault()

    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email ..."
          name="email"
          value={values.email}
          type="email"
          onChange={onChange}
          error={errors.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password ..."
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          onChange={onChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" content="Register" primary />
      </Form>
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Register
