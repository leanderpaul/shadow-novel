/**
 * Importing npm packages.
 */
import { extendTheme } from 'native-base';

/**
 * Importing user defined packages.
 */

/**
 * Importing and defining types.
 */

/**
 * Declaring the constants.
 */

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e9fee0',
      100: '#caf7b7',
      200: '#a9f18c',
      300: '#88eb60',
      400: '#68e534',
      500: '#4ecb1a',
      600: '#3c9e11',
      700: '#28710a',
      800: '#164504',
      900: '#021900',
    },
    secondary: {
      50: '#f1e4ff',
      100: '#d1b3ff',
      200: '#b081fe',
      300: '#9150fc',
      400: '#711efa',
      500: '#5805e1',
      600: '#4403b0',
      700: '#31017f',
      800: '#1c004e',
      900: '#0c001f',
    },
  },
  space: {
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});
