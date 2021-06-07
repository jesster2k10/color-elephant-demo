import { Box, Img, ImgProps } from '@chakra-ui/react';
import React from 'react';

export type LazyImageAnimationType = 'blur' | 'fade';

interface LazyImageProps extends ImgProps {
  src: string;
  placeholderSrc: string;
  className?: string;
  lazyMaxWidth?: number;
  lazyMinHeight?: number | string;
}

const LazyImage = ({
  src,
  placeholderSrc,
  lazyMinHeight,
  ...props
}: LazyImageProps) => (
  <Box
    className="blur-up-container"
    css={{ width: '100%', minHeight: lazyMinHeight }}
  >
    <Img
      {...props}
      className="lazyload js-only blur-up"
      data-src={src}
      src={placeholderSrc}
      css={{
        '&.lazyload': {
          width: '100%',
          minHeight: lazyMinHeight,
        },
      }}
    />
    <noscript>
      <Img {...props} src={src} />
    </noscript>
  </Box>
);

export { LazyImage };
