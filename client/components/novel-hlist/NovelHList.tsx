/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Pressable, FlatList } from 'native-base';
import ContentLoader, { Rect } from 'react-content-loader/native';

/**
 * Importing user defined components.
 */
import NovelVCard from '../novel-vcard/NovelVCard';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { Novel } from '../../graphql.types';

interface NovelListProps {
  novels: Pick<Novel, 'title' | 'nid' | 'cover'>[];
  loading: boolean;
}

function NovelHList(props: NovelListProps) {
  const lastIndex = props.novels.length - 1;

  return props.loading ? (
    <ContentLoader viewBox='0 0 540 180' width={540} height={200} backgroundColor='#444' foregroundColor='#222'>
      <Rect x='0' y='0' rx='4' ry='4' width='100' height='150' />
      <Rect x='0' y='160' rx='4' ry='4' width='100' height='10' />
      <Rect x='0' y='180' rx='4' ry='4' width='100' height='10' />
      <Rect x='110' y='0' rx='4' ry='4' width='100' height='150' />
      <Rect x='110' y='160' rx='4' ry='4' width='100' height='10' />
      <Rect x='110' y='180' rx='4' ry='4' width='100' height='10' />
      <Rect x='220' y='0' rx='4' ry='4' width='100' height='150' />
      <Rect x='220' y='160' rx='4' ry='4' width='100' height='10' />
      <Rect x='220' y='180' rx='4' ry='4' width='100' height='10' />
      <Rect x='330' y='0' rx='4' ry='4' width='100' height='150' />
      <Rect x='330' y='160' rx='4' ry='4' width='100' height='10' />
      <Rect x='330' y='180' rx='4' ry='4' width='100' height='10' />
    </ContentLoader>
  ) : (
    <FlatList
      horizontal
      data={props.novels}
      keyExtractor={item => item.nid}
      showsHorizontalScrollIndicator={false}
      renderItem={({ index, item }) => (
        <Pressable mr={index != lastIndex ? '15px' : '0px'}>
          <NovelVCard title={item.title} cover={item.cover} />
        </Pressable>
      )}
    />
  );
}

NovelHList.defaultProps = {
  novels: [],
  loading: false
};

export default NovelHList;
