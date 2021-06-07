import { useStarredMovie } from '@/context/StarredMovies';
import { Movie } from '@/interfaces';
import { tmdbImage } from '@/lib/tmdb';
import { Box, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import AiOutlineStar from '@meronex/icons/ai/AiOutlineStar';
import AiFillStar from '@meronex/icons/ai/AiFillStar';
import { LazyImage } from './LazyImage';

export interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { starred, toggleStar } = useStarredMovie(movie);
  const highlightColor = useColorModeValue('yellow.50', 'rgba(0, 0, 0, 0.5)');

  return (
    <Box
      backgroundColor={starred ? highlightColor : 'transparent'}
      transition="all ease-in-out 100ms"
      as="article"
      borderWidth="1px"
      borderRadius="md"
      shadow="sm"
    >
      <Box
        as="a"
        href={`https://themoviedb.org/movie/${movie.id}`}
        target="_blank"
        role="group"
        rel="noreferrer noopener"
        _hover={{ opacity: '0.8' }}
        height={405}
      >
        <LazyImage
          placeholderSrc={tmdbImage(movie.poster_path, 200)}
          src={tmdbImage(movie.poster_path)}
          _groupHover={{ opacity: 0.8 }}
          lazyMinHeight={405}
          roundedTop="md"
        />
      </Box>
      <Box p={3}>
        <Heading as="h2" fontSize="md">
          {movie.title}
        </Heading>
        <Box
          d="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          w="full"
        >
          <Box d="flex" flexDir="column">
            <Box as="h3">Rating: {movie.vote_average}/10</Box>
            <Box as="h4">
              Released: {new Date(movie.release_date).getFullYear()}
            </Box>
            <Box as="h5" mt={2} fontSize="xs">
              Popularity: {movie.popularity}
            </Box>
          </Box>

          {typeof window !== 'undefined' ? (
            <IconButton
              icon={starred ? <AiFillStar /> : <AiOutlineStar />}
              onClick={toggleStar}
              size="sm"
              aria-label={
                starred ? 'Remove from Favourites' : 'Add to Favourites'
              }
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export { MovieCard };
