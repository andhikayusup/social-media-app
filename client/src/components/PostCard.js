import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import moment from 'moment'

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
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  )
}

export default PostCard
