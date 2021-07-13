import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

const PostCard = ({
  post: {
    id,
    username,
    createdAt,
    body,
    commentCount,
    likeCount,
    likes
  }
}) => {
  const { user } = useContext(AuthContext)

  const commentPost = () => {
    console.log('Post Commentted')
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
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
            content: `${commentCount}`
          }}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.username === username && (
          <Button
            color="red"
            floated="right"
            icon="trash"
            onClick={commentPost}
            as={Link}
            to={`/posts/${id}`}
          />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
