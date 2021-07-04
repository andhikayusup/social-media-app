import { postsResolvers } from './posts.js'

export const resolvers = {
  Query: {
    ...postsResolvers.Query
  }
}
