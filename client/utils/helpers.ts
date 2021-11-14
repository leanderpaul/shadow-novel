/**
 * Importing npm packages.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const SERVER_URL_KEY = 'graphql-server-domain';

export const capitalize = (str: string) =>
  str
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

export async function getServerURL() {
  const domain = (await AsyncStorage.getItem(SERVER_URL_KEY)) || 'http://192.168.47.250:8080';
  return domain[domain.length - 1] === '/' ? domain + 'graphql' : domain + '/graphql';
}

export function setServerURL(url: string) {
  return AsyncStorage.setItem(SERVER_URL_KEY, url);
}
