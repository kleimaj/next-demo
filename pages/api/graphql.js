// pages/api/graphql.
import dbConnect from '../../src/db/mongoose'
import Note from '../../src/models/Note'
import Grass from '../../src/models/Grass'
import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = gql`
  type Grass {
    id: ID!
    name: String!
    images: [String]
    color: String
    season: String
    vernation: String
    tipShape: String
    bladeWidth: String
    growthHabit: String
  }
  input GrassInput {
    name:String
    color:String
    season:String
    vernation:String
    tipShape:String
    bladeWidth:String
    growthHabit:String
  }
     
  type Query {
    sayHello: String
    getNotes:String
  }
  type Mutation {
    makeGrass(input:GrassInput): Grass
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
      return 'hey there'
    },
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

