/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import Icon from 'react-native-vector-icons/FontAwesome5';
import { VStack, Text, Pressable } from 'native-base';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { theme } from '../../utils/config';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
export interface TabItemProps {
  label: string;
  icon: string;
  isActive?: boolean;
  onPress?: () => void;
}

function TabItem(props: TabItemProps) {
  const color = props.isActive ? (theme.colors.primary as Record<number, string>)[500] : theme.colors.dark[500];

  return (
    <Pressable onPress={props.onPress} w='25%'>
      <VStack h='100%' display='flex' justifyContent='center' alignItems='center'>
        <Icon name={props.icon} color={color} size={17} />
        <Text color={color} fontSize='14px' mt='4px'>
          {props.label}
        </Text>
      </VStack>
    </Pressable>
  );
}

export default TabItem;
