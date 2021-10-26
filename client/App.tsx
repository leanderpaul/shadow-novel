/**
 * Importing npm packages.
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/**
 * Importing npm design components.
 */
// import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Importing user defined components.
 */
import Explore from './screens/explore/Explore';
import Library from './screens/library/Library';
import TabBar from './components/tabbar/TabBar';
import Settings from './screens/settings/Settings';
import Updates from './screens/updates/Updates';

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

/**
 * Constants.
 */
const Tab = createBottomTabNavigator();
const client = new ApolloClient({ uri: 'http://192.168.0.101:8080', cache: new InMemoryCache() });

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <ApolloProvider client={client}>
        <StatusBar barStyle='light-content' />
        <Box bgColor='black' safeArea w='100%' h='100%'>
          <NavigationContainer>
            <Tab.Navigator tabBar={TabBar} screenOptions={{ headerShown: false }}>
              <Tab.Screen name='Library' component={Library} />
              <Tab.Screen name='Explore' component={Explore} />
              <Tab.Screen name='Updates' component={Updates} />
              <Tab.Screen name='Settings' component={Settings} />
            </Tab.Navigator>
          </NavigationContainer>
        </Box>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}

export default App;
