import { Sort } from '@/interfaces';
import { Box, Heading } from '@chakra-ui/react';
import { MovieFilterBar } from './MovieFilterBar';

export interface MovieListHeaderProps {
  sort: Sort;
  onSort: (sort: Sort) => void;
}

export const MovieListHeader = ({ sort, onSort }: MovieListHeaderProps) => (
  <Box
    d="flex"
    flexDir={{ base: 'column', md: 'row' }}
    mb={2}
    alignItems={{ base: 'flex-start', md: 'center' }}
    justify="space-between"
    w="100%"
  >
    <Heading w="100%" mb={{ base: 2, md: 0 }} as="h1">
      Top 500 Movies
    </Heading>
    <MovieFilterBar sort={sort} onSort={onSort} />
  </Box>
);
