import { MovieList } from '@/components/MovieList';
import { Movie, Sort } from '@/interfaces';
import { API } from '@/lib/api';
import { Box } from '@chakra-ui/react';
import { MovieListHeader } from '@/components/MovieListHeader';
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
    <>
      <MovieListHeader sort={sort} onSort={setSort} />

      <Link href="/" passHref>
        <Box as="a" textDecor="underline" mb={4} d="block">
          View with infinite scroll
        </Box>
      </Link>

      <MovieList movies={sortedMovies} />
    </>
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
