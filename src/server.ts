/**
 * Importing npm packages.
 */
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

/**
 * Importing user defined packages.
 */
import { typeDefs, resolvers } from './graphql';

/**
 * Importing and defining types.
 */

/**
 * Declaring the constants.
 */
const DB_URI = process.env['DB'] || 'mongodb://localhost/shadow-novel';
const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(DB_URI);
mongoose.connection.on('connected', () => console.log(`connected to MongoDB`));
mongoose.connection.on('error', console.error);

export { server };
export default server;
