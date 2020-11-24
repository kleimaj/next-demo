import {gql} from 'apollo-server-micro'

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
  type Note {
    id:ID!
    note:String
  }

  type User {
    id:ID!
    name:String
    email:String
    grass:[Grass]
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
  input GrassSearch {
    color:String
    season:String
    vernation:String
    tipShape:String
    bladeWidth:String
    growthHabit:String
  }
     
  type Query {
    sayHello: String
    getNotes: [Note]
    getSpecificGrass(input:GrassSearch): Grass
    getGrasses(input:GrassSearch): [Grass]
    getUsers: [User]
  }
  type Mutation {
    makeGrass(input:GrassInput): Grass
  }
`

export default typeDefs;
