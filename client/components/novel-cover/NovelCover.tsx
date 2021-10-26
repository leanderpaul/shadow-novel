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

/**
 * Importing types.
 */
export interface NovelCoverProps {
  src?: string;
  size?: 'sm';
  alt?: string;
}

const COVER_SIZES = { sm: { h: '90px', w: '60px' } };

function NovelCover(props: NovelCoverProps) {
  const size = props.size ? COVER_SIZES[props.size] : COVER_SIZES.sm;

  return <Image h={size.h} w={size.w} src={props.src} alt={props.alt} />;
}

export default NovelCover;
