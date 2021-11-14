/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Image } from 'native-base';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */
// import defaultNovelCover from '../../assets/default-novel-cover.jpg';

/**
 * Importing types.
 */
export interface NovelCoverProps {
  src?: string;
  size?: 'sm';
  alt?: string;
}

export const COVER_SIZES = { sm: { h: '90px', w: '60px' }, md: { h: '150px', w: '100px' } };
const DEFAULT_NOVEL_COVER = require('../../assets/default-novel-cover.jpg');

function NovelCover(props: NovelCoverProps) {
  const size = props.size ? COVER_SIZES[props.size] : COVER_SIZES.md;

  return (
    <Image h={size.h} w={size.w} src={props.src} source={props.src ? undefined : DEFAULT_NOVEL_COVER} alt={props.alt} borderRadius='3px' />
  );
}

export default NovelCover;
