import React, { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((post) => post.id !== postId)
        }
      })

      if (callback) callback()
    },
    onError(err) {
      console.log(`err`, err)
    },
    variables: {
      postId
    }
  })

  return (
    <>
      <Button
        color="red"
        floated="right"
        icon="trash"
        onClick={() => setConfirmOpen(true)}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default DeleteButton
