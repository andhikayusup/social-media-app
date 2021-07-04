import { postsResolvers } from './posts.js'
import { usersResolvers } from './users.js'

export const resolvers = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
}
