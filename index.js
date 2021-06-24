import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import resolvers from './graphql/resolvers/index.js'
import typeDefs from './graphql/typeDefs.js'
import { MONGODB } from './config.js'

const server = new ApolloServer({
  typeDefs,
  resolvers
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
