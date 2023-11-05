import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schemas';
import { resolvers } from "./resolvers/index"
import { startServerAndCreateNextHandler } from '@as-integrations/next';


const server = new ApolloServer({ resolvers, typeDefs });

export default startServerAndCreateNextHandler(server);