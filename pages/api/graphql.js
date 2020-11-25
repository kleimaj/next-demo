// pages/api/graphql.
import dbConnect from '../../src/db/mongoose'
import Note from '../../src/models/Note'
import Grass from '../../src/models/Grass'
import User  from '../../src/models/User'
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
    },
    async getAllUsers(_, __, ___) {
      await dbConnect()
      const allUsers = await User.find({}).populate('Grass')
      console.log(allUsers)
      return allUsers
    },
  },
  Mutation: {
    async makeGrass(parent, {input}, context) {
      await dbConnect()
      const grass = await Grass.create({ ...input})
      return grass
    },
    async makeAssociation(parent, {input}, context) {
      await dbConnect()
      const foundUser= await User.findOne({ _id: input.userId})
      let popUser = await foundUser.populate('Grass')
      await popUser.grass.push(input.grassId)
      await popUser.save()
      return popUser
    },
  },
  User: {
    grass: async(parent, {input}, context)=> {
      await dbConnect()
      //find all grass with any of the id's of the parent User._id
      console.log(parent.grass)
      const grasses = await Grass.find({_id: {$in: parent.grass}})
      return grasses
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

