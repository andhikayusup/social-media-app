import { commentsResolvers } from './comments.js'
import { postsResolvers } from './posts.js'
import { usersResolvers } from './users.js'

export const resolvers = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}
