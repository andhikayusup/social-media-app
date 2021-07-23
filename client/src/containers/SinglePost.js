import React, { useContext, useRef, useState } from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Grid, Card, Image, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import { useMutation } from '@apollo/react-hooks'

const SinglePost = (props) => {
  const postId = props.match.params.postId

  const { user } = useContext(AuthContext)

  const [comment, setComment] = useState('')
  const commentInputRef = useRef(null)
  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('')
      commentInputRef.current.blur()
    },
    onError() {},
    variables: {
      postId,
      body: comment
    }
  })

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: postId }
  })

  const post = error || loading ? null : data.getPost

  return (
    <Grid>
      {loading ? (
        <h1>Loading posts ...</h1>
      ) : (
        !error && (
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{post.username}</Card.Header>
                  <Card.Meta as={Link} to={`/posts/${post.id}`}>
                    {moment(post.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    user={user}
                    post={{
                      id: post.id,
                      likes: post.likes,
                      likeCount: post.likeCount
                    }}
                  />
                  <Button
                    basic
                    color="blue"
                    labelPosition="right"
                    icon="comments"
                    label={{
                      basic: true,
                      color: 'teal',
                      pointing: 'left',
                      content: `${post.commentCount}`
                    }}
                    as={Link}
                    to={`/posts/${post.id}`}
                  />
                  {user && user.username === post.username && (
                    <DeleteButton
                      postId={postId}
                      callback={() => props.history.push('/')}
                    />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a Comment!</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment .."
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ''}
                          onClick={submitComment}
                        >
                          submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {post.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton
                        postId={post.id}
                        commentId={comment.id}
                      />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>
                      {moment(comment.createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description>
                      {comment.body}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        )
      )}
    </Grid>
  )
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        username
      }
      likeCount
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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
export default SinglePost
