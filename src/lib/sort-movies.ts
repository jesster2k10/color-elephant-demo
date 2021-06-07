import { Movie, Sort } from '@/interfaces';

export function sortMovies(movies: Movie[] = [], sort: Sort = 'DESC') {
  // ASC = low to high
  // DESC = high to low

  return movies.sort((movieOne, movieTwo) => {
    if (sort === 'ASC') {
      return movieOne.popularity - movieTwo.popularity;
    }

    return movieTwo.popularity - movieOne.popularity;
  });
}
