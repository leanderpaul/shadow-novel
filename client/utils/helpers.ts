/**
 * Importing npm packages.
 */

/**
 * Importing user defined packages.
 */

/**
 * Importing and defining types.
 */
import type { Genre } from '../graphql.types';

/**
 * Declaring the constants.
 */

export const getGenreTitle = (genre: Genre) =>
  genre
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
