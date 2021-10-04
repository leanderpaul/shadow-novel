/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Box, HStack, VStack, Text, theme } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * Importing user defined components.
 */
import TabItem from './TabItem';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const ICON_MAPPING: Record<string, string> = { Library: 'book', Explore: 'compass', Updates: 'history', Settings: 'cog' };

function TabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;

  return (
    <HStack w='100%' h='65px' bgColor='dark.50'>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const icon = ICON_MAPPING[route.name];
        const handlePress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return <TabItem key={index} label={route.name} icon={icon} isActive={isActive} onPress={handlePress} />;
      })}
    </HStack>
  );
}

export default TabBar;
