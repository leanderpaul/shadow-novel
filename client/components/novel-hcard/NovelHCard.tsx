/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HStack, VStack, Heading, Text, theme } from 'native-base';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import NovelCover from '../novel-cover/NovelCover';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { Novel } from '../../graphql.types';
import { capitalize } from '../../utils/helpers';

export interface NovelHCardProps {
  novel: Pick<Novel, 'nid' | 'chapterCount' | 'cover' | 'genre' | 'status' | 'tags' | 'title' | 'views'>;
}

function NovelHCard(props: NovelHCardProps) {
  const novel = props.novel;

  return (
    <HStack>
      <NovelCover src={novel.cover} alt={novel.title} size='sm' />
      <VStack ml='10px'>
        <Heading size='xs' isTruncated w='280px'>
          {novel.title}
        </Heading>
        <HStack>
          <HStack alignItems='center'>
            <Icon name='eye' color={theme.colors.gray[400]} />
            <Text ml='5px' color='gray.400'>
              {novel.views}
            </Text>
          </HStack>
          <HStack ml='15px' alignItems='center'>
            <Icon name='file-alt' color={theme.colors.gray[400]} />
            <Text ml='5px' color='gray.400'>
              {novel.chapterCount}
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text color='gray.400'>{capitalize(novel.genre)}</Text>
          <Text color='gray.400'>{capitalize(novel.status)}</Text>
        </HStack>
        <HStack>{/* <Text>{novel.tags}</Text> */}</HStack>
      </VStack>
    </HStack>
  );
}

export default NovelHCard;
