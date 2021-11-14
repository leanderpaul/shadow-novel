/**
 * Importing npm packages.
 */
import React from 'react';
import { useRoute } from '@react-navigation/native';

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
import { useSearchNovels } from './utils';
import NovelVList from '../../components/novel-vlist/NovelVList';

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
  const { params } = useRoute();
  const { data, loading } = useSearchNovels(params || {});

  return (
    <Box bgColor='black' w='100%' h='100%' px='10px'>
      <Heading size='lg' my='15px'>
        Explore
      </Heading>
      <NovelVList novels={data?.novels.items} loading={loading} />
    </Box>
  );
}

export default Explore;
