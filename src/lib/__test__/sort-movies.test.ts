import { Movie } from '@/interfaces';
import { sortMovies } from '../sort-movies';

describe('Unit | Sort Movies', () => {
  const movies: Partial<Movie>[] = [
    {
      id: 1,
      popularity: 2,
    },
    {
      id: 2,
      popularity: 1,
    },
    {
      id: 3,
      popularity: 5,
    },
    {
      id: 10,
      popularity: 7,
    },
    {
      id: 11,
      popularity: 0,
    },
    {
      id: 11,
      popularity: 7.11,
    },
  ];

  it('should sort ascending', () => {
    const subject = sortMovies(movies as Movie[], 'ASC');
    expect(subject[0].id).toEqual(11);
    expect(subject[1].id).toEqual(2);
    expect(subject[2].id).toEqual(1);
  });

  it('should sort descending', () => {
    const subject = sortMovies(movies as Movie[], 'DESC');
    expect(subject[0].id).toEqual(11);
    expect(subject[1].id).toEqual(10);
    expect(subject[2].id).toEqual(3);
  });
});
