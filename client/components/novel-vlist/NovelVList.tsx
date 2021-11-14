/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { FlatList, Pressable } from 'native-base';

/**
 * Importing user defined components.
 */
import NovelHCard from '../novel-hcard/NovelHCard';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { NovelHCardProps } from '../novel-hcard/NovelHCard';

interface NovelVListProps {
  novels: NovelHCardProps['novel'][];
  loading: boolean;
}

function NovelVList(props: NovelVListProps) {
  console.log('length', props.novels.length);

  return (
    <FlatList
      data={props.novels}
      keyExtractor={item => item.nid}
      renderItem={({ item }) => (
        <Pressable mb='10px'>
          <NovelHCard novel={item} />
        </Pressable>
      )}
    />
  );
}

NovelVList.defaultProps = {
  novels: [],
  loading: false
};

export default NovelVList;
