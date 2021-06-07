import { MovieFilterBar } from '@/components/MovieFilterBar';
import { MovieList } from '@/components/MovieList';
import { ApiResponseArray, Movie, Sort } from '@/interfaces';
import { TMDB } from '@/lib/api';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Link from 'next/link';
import { sortMovies } from '@/lib/sort-movies';

export interface HomeProps {
  data: ApiResponseArray<Movie>;
}

export default function Home({ data: initialData }: HomeProps) {
  // prettier-ignore
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    '/movie/top_rated',
    async ({ pageParam = 1 }) => {
      const results = await TMDB.getArray<Movie>('/movie/top_rated', {
        page: pageParam,
      });
      return results;
    },
    {
      initialData: { pages: [initialData], pageParams: [] },
      getNextPageParam: (lastPage) => lastPage.page + 1,
      getPreviousPageParam: (lastPage) => lastPage.page - 1,
    },
  );

  const [sort, setSort] = useState<Sort>('DESC');
  const movies = data?.pages.reduce<Movie[]>(
    (initial, current) => [...initial, ...current.results],
    [],
  );

  const sortedMovies = sortMovies(movies, sort);

  return (
    <Box p={4}>
      <HStack mb={2} alignItems="center" justify="space-between">
        <Heading lineHeight={0} as="h1">
          Top 500 Movies
        </Heading>
        <MovieFilterBar sort={sort} onSort={setSort} />
      </HStack>
      <Link href="/no-infinite-scroll" passHref>
        <Box as="a" textDecor="underline" mb={4} d="block">
          View without infinite scroll
        </Box>
      </Link>
      <MovieList
        movies={sortedMovies}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </Box>
  );
}

export const getStaticProps = async () => {
  const data = await TMDB.getArray<Movie>('/movie/top_rated');

  return {
    props: {
      data,
    },
  };
};
