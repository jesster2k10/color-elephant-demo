import { Movie } from '@/interfaces';
import { Box, Grid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { MovieCard } from './MovieCard';

export interface MovieListProps {
  movies?: Movie[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  infiniteScroll?: boolean;
}

export const MovieList = ({
  movies = [],
  infiniteScroll = true,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: MovieListProps) => {
  const { ref: loaderRef, inView } = useInView({
    threshold: 0,
    skip:
      !infiniteScroll || typeof fetchNextPage === 'undefined' || !hasNextPage,
  });

  useEffect(() => {
    if (inView) fetchNextPage?.();
  }, [inView]);

  return (
    <>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
        ]}
        gap={6}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Box
        data-testid="loader"
        ref={loaderRef}
        w="full"
        d="flex"
        justifyContent="center"
        mt={isFetchingNextPage ? 10 : 0}
        mb={isFetchingNextPage ? 6 : 0}
        visibility={isFetchingNextPage ? 'visible' : 'hidden'}
        aria-label={isFetchingNextPage ? 'Loading results' : 'Fetch next page'}
      >
        <Spinner aria-label="Loading spinner" />
      </Box>
    </>
  );
};
