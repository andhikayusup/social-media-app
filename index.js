import { ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

import { resolvers } from './graphql/resolvers/index.js'
import typeDefs from './graphql/typeDefs.js'
import { MONGODB } from './config.js'

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
