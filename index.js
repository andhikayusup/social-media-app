import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';

const typeDefs = gql`
    type Query {
        sayHello: String!
    }
`

const resolvers = {
    Query: {
        sayHello: () => {
            return "Hello, World!"
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen({ port: 5000 })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })