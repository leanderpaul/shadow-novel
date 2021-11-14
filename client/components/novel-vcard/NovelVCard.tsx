/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { VStack, Text } from 'native-base';
import NovelCover, { COVER_SIZES } from '../novel-cover/NovelCover';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
export interface NovelVCardProps {
  cover?: string;
  title: string;
}

function NovelVCard(props: NovelVCardProps) {
  return (
    <VStack>
      <NovelCover src={props.cover} alt={props.title} />
      <Text w={COVER_SIZES.md.w} mt='10px' isTruncated noOfLines={2}>
        {props.title}
      </Text>
    </VStack>
  );
}

export default NovelVCard;
