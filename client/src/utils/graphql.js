import gql from 'graphql-tag'

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

export { FETCH_POSTS_QUERY }
