import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import MyPopup from './MyPopup'

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (
      user &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError: (err) => {
      console.log(`err`, err)
    }
  })

  const likeButton = user ? (
    <Button
      basic={!liked}
      color="teal"
      labelPosition="right"
      icon="heart"
      onClick={likePost}
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: `${likeCount}`
      }}
    />
  ) : (
    <Button
      basic
      color="teal"
      labelPosition="right"
      icon="heart"
      as={Link}
      to="/login"
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: `${likeCount}`
      }}
    />
  )

  return (
    <MyPopup content={liked ? 'Unlike Post' : 'Like Post'}>
      {likeButton}
    </MyPopup>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export default LikeButton
