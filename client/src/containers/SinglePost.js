import React, { useContext } from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Grid, Card, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'

const SinglePost = (props) => {
  const postId = props.match.params.postId

  const { user } = useContext(AuthContext)

  const commentPost = () => {
    console.log(`as`)
  }

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
                    onClick={commentPost}
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
                      {moment(post.createdAt).fromNow()}
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
export default SinglePost
