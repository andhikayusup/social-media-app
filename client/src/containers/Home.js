import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)

  const { user } = useContext(AuthContext)

  return (
    <Grid doubling stackable columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts ...</h1>
        ) : (
          !error &&
          data.getPosts.map((post) => (
            <Transition.Group>
              <Grid.Column
                key={post.id}
                style={{ marginBottom: '20px' }}
              >
                <PostCard post={post} />
              </Grid.Column>
            </Transition.Group>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
