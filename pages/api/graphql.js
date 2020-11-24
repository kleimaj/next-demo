// pages/api/graphql.
import dbConnect from '../../src/db/mongoose'
import Note from '../../src/models/Note'
import Grass from '../../src/models/Grass'
import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './typedefs'

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!'
    },
    async getNotes(parent, args, context) {
      await dbConnect()
      const notes = await(Note.find({}))
      console.log('***********************')
      await console.log(notes)
      return notes
    },
    async getSpecificGrass(_, {input}, __) {
      await dbConnect()
      const grass = await Grass.findOne({ ...input }).exec()
      return grass
    },
    async getGrasses(_, {input}, __) {
      await dbConnect()
      const grasses = await Grass.find({ ...input }).exec()
      return grasses
    }
  },
  Mutation: {
    async makeGrass(parent, {input}, context) {
      await dbConnect()
      const grass = await Grass.create({ ...input})
      return grass
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

