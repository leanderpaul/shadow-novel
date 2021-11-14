/**
 * Importing npm packages.
 */
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';

/**
 * Importing npm design components.
 */
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Box, HStack, Heading, ScrollView } from 'native-base';

/**
 * Importing user defined components.
 */
import NovelHList from '../../components/novel-hlist/NovelHList';

/**
 *  Importing user defined modules.
 */
import { useListNovelsByGenre, genres } from './utils';
import { capitalize } from '../../utils/helpers';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

function Discover() {
  const { data, loading, refetch } = useListNovelsByGenre();
  const [refetching, setRefetching] = useState(false);

  function handleRefect() {
    setRefetching(true);
    refetch().then(() => setRefetching(false));
  }

  return (
    <Box bgColor='black' w='100%' h='100%'>
      <HStack h='50px' borderBottomWidth='1' borderBottomColor='dark.100' px='10px' alignItems='center' justifyContent='space-between'>
        <Heading>Discover</Heading>
        <Icon name='search' size={20} color='white' />
      </HStack>
      <ScrollView
        pt='15px'
        px='10px'
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={handleRefect} />}
      >
        {genres.map(genre => (
          <Box key={genre} pb='30px'>
            <Heading size='md' mb='15px'>
              {capitalize(genre)}
            </Heading>
            <NovelHList novels={data?.[genre].items} loading={loading} />
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}

export default Discover;
