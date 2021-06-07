import { MovieFilterBar } from '@/components/MovieFilterBar';
import { MovieList } from '@/components/MovieList';
import { Movie, Sort } from '@/interfaces';
import { API } from '@/lib/api';
import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { sortMovies } from '@/lib/sort-movies';
import { getTopMovies } from './api/top-movies';

interface NoInfiniteScrollProps {
  data: { results: Movie[] };
}

export default function NoInfiniteScroll({
  data: initialData,
}: NoInfiniteScrollProps) {
  const { data } = useQuery(
    'top-movies',
    () => new API().getArray<Movie>('/api/top-movies'),
    { initialData },
  );
  const [sort, setSort] = useState<Sort>('DESC');
  const movies = data?.results ?? [];
  const sortedMovies = sortMovies(movies, sort);

  return (
    <Box p={4}>
      <Box
        d="flex"
        flexDir={['column', 'row']}
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Heading mb={[2, 0]} as="h1">
          Top 500 Movies
        </Heading>
        <MovieFilterBar sort={sort} onSort={setSort} />
      </Box>

      <Link href="/" passHref>
        <Box as="a" textDecor="underline" mb={4} d="block">
          View with infinite scroll
        </Box>
      </Link>

      <MovieList movies={sortedMovies} />
    </Box>
  );
}

export const getStaticProps = async () => {
  const movies = await getTopMovies();
  return {
    props: {
      data: { results: movies },
    },
  };
};
