import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts ...</h1>
        ) : (
          !error &&
          data.getPosts.map((post) => (
            <Grid.Column
              key={post.id}
              style={{ marginBottom: '20px' }}
            >
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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

export default Home
