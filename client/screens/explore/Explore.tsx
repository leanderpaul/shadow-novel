/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Box, Text, VStack, HStack, Heading, Input } from 'native-base';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { useListNovelsByGenre, genres } from './utils';
import { getGenreTitle } from '../../utils/helpers';
import NovelCover from '../../components/novel-cover/NovelCover';
import NovelVCard from '../../components/novel-vcard/NovelVCard';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

/**
 * Constants
 */

function Explore() {
  const { data, loading, error } = useListNovelsByGenre();

  return (
    <Box bgColor='black' w='100%' h='100%'>
      <Box h='70px' borderBottomWidth='1' borderBottomColor='dark.100' px='10px' py='10px'>
        <Input variant='rounded' size='sm' />
      </Box>
      <Box pt='15px' px='10px'>
        <Heading size='lg'>Contemporary Romance</Heading>
      </Box>
    </Box>
  );
}

export default Explore;
