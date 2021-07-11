import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'

import { useForm } from '../utils/hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const cachedData = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...cachedData.getPosts]
        }
      })

      values.body = ''
    },
    onError(error) {
      console.log(`error`, error)
    }
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error}
        />
      </Form.Field>
      <Button content="Submit" type="submit" color="teal" />
    </Form>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        username
      }
      likeCount
      comments {
        username
      }
      commentCount
    }
  }
`

export default PostForm
