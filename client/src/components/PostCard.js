import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const likePost = () => {
  console.log('Post Liked')
}

const commentPost = () => {
  console.log('Post Commentted')
}

const PostCard = ({
  post: { id, username, createdAt, body, commentCount, likeCount }
}) => {
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
        <Button
          basic
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
      </Card.Content>
    </Card>
  )
}

export default PostCard
