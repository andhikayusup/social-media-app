import React, { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import MyPopup from './MyPopup'

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter(
              (post) => post.id !== postId
            )
          }
        })
      }

      if (callback) callback()
    },
    onError(err) {
      console.log(`err`, err)
    },
    variables: {
      postId,
      commentId
    }
  })

  return (
    <>
      <MyPopup content={commentId ? 'Delete Comment' : 'Delete Post'}>
        <Button
          color="red"
          floated="right"
          icon="trash"
          onClick={() => setConfirmOpen(true)}
        />
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton
