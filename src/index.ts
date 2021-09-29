/**
 * Importing npm packages.
 */
require('dotenv').config();

/**
 * Importing user defined packages.
 */
import { server } from './server';

/**
 * Importing and defining types.
 */

/**
 * Declaring the constants.
 */
const PORT = Number(process.env['PORT']) || undefined;

server.listen({ port: PORT }).then(() => console.log(`Server running in port ${PORT}`));
