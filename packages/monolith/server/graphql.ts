import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

export const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
