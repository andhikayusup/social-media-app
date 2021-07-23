import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import MyPopup from './MyPopup'

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
        <MyPopup content="Comment Post">
          <Button
            basic
            color="blue"
            labelPosition="right"
            icon="comments"
            label={{
              basic: true,
              color: 'teal',
              pointing: 'left',
              content: `${commentCount}`
            }}
            as={Link}
            to={`/posts/${id}`}
          />
        </MyPopup>
        {user && user.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
