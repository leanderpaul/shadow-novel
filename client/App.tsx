/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { NativeBaseProvider, Box, Button } from 'native-base';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { theme } from './utils/config';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box safeArea w='100%' h='100%' bgColor='trueGray.800'>
        <Button>Hello World</Button>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;
