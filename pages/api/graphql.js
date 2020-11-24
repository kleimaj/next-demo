// pages/api/graphql.
import dbConnect from '../../src/db/mongoose'
import Note from '../../src/models/Note'
import Grass from '../../src/models/Grass'
import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = gql`
  type Query {
    sayHello: String
    getNotes:String
  }
`

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!'
    },
    async getNotes(parent, args, context) {
      await dbConnect()
      const Notes = await(Note.find({}))
      console.log(Notes)
      return 'hey there'
    },
  },
}

export const config = {
  api: {
    bodyParser: false,
  },
}


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


const apolloServer = new ApolloServer({
  schema,
})






export default apolloServer.createHandler({ path: '/api/graphql' })

