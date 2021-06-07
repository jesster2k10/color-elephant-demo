/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query-client';
import { theme } from './theme';
import { StarredMoviesProvider } from '../context/StarredMovies';

const Providers: React.FunctionComponent = ({ children }) => (
  <ChakraProvider theme={theme}>
    <StarredMoviesProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StarredMoviesProvider>
  </ChakraProvider>
);

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });
