/**
 * Importing npm packages.
 */
import fs from 'fs';

/**
 * Importing user defined packages.
 */
import { resolvers } from './resolvers';

/**
 * Importing and defining types.
 */

/**
 * Declaring the constants.
 */

const typeDefs = fs.readFileSync(`${__dirname}/schema.gql`).toString();

export { typeDefs, resolvers };
