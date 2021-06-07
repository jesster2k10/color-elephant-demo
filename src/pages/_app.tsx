import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/query-client';
import { Meta } from '@/components/Meta';
import { css, Global } from '@emotion/react';
import { StarredMoviesProvider } from '@/context/StarredMovies';
import { theme } from '@/lib/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StarredMoviesProvider>
        <QueryClientProvider client={queryClient}>
          <Meta />
          <Component {...pageProps} />
          <Global
            styles={css`
              html {
                max-width: 100vw;
                overflow-x: hidden;
              }

              html,
              body,
              #__next {
                height: 100%;
                overflow-x: hidden;
              }

              .blur-up-container {
                overflow: hidden;
              }

              .blur-up {
                box-sizing: border-box;
                filter: blur(10px);
                transform: translate3d(0, 0, 0) scale(1.05);
                transition: all ease-out 200ms;
              }

              .blur-up.lazyloaded {
                filter: blur(0);
                transform: scale(1);
              }
            `}
          />
          <noscript>
            <style>{`
          .js-only {
            display: none;
          }
        `}</style>
          </noscript>
        </QueryClientProvider>
      </StarredMoviesProvider>
    </ChakraProvider>
  );
}
