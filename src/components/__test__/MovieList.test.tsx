import { Movie } from '@/interfaces';
import { customRender } from '@/lib/tests';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { MovieList } from '../MovieList';

describe('Unit | Movie List', () => {
  const movies: Movie[] = [
    {
      id: 1234,
      popularity: 8.932,
      title: 'Pulp Fiction',
      poster_path: '/example.png',
      release_date: '1998-08-02',
      vote_average: 9.2,
      vote_count: 32232,
    },
    {
      id: 432,
      popularity: 6.932,
      title: 'Titanic',
      poster_path: '/example.png',
      release_date: '1995-02-01',
      vote_average: 8.2,
      vote_count: 3223432,
    },
    {
      id: 4324,
      popularity: 7.43,
      title: 'Clueless',
      poster_path: '/example.png',
      release_date: '1995-02-01',
      vote_average: 7.4,
      vote_count: 321342,
    },
    {
      id: 4343224,
      popularity: 5.43,
      title: 'Django',
      poster_path: '/example.png',
      release_date: '2003-02-01',
      vote_average: 5.4,
      vote_count: 432432,
    },
  ];

  it('should render all the movies', () => {
    const { getAllByText } = customRender(<MovieList movies={movies} />);
    expect(getAllByText(/pulp fiction/i)).toHaveLength(1);
    expect(getAllByText(/clueless/i)).toHaveLength(1);
    expect(getAllByText(/django/i)).toHaveLength(1);
    expect(getAllByText(/titanic/i)).toHaveLength(1);
  });

  describe('infite scroll', () => {
    it('should handle loading', () => {
      let screen = customRender(<MovieList movies={movies} />);
      expect(screen.getAllByLabelText(/fetch next page/i)).toHaveLength(1);

      screen = customRender(<MovieList movies={movies} isFetchingNextPage />);
      expect(screen.getAllByLabelText(/loading results/i)).toHaveLength(1);
    });

    it('should display new results', (done) => {
      const Component = () => {
        const [results, setResults] = useState(movies);
        const [fetchingNextPage, setFetchingNextPage] = useState(false);
        const [hasNextPage, setHasNextPage] = useState(true);

        const fetchMore = () => {
          setFetchingNextPage(true);
          setTimeout(() => {
            setResults((oldResults) => [
              ...oldResults,
              {
                id: 4324,
                popularity: 10.43,
                title: 'Avatar',
                poster_path: '/example.png',
                release_date: '2001-02-01',
                vote_average: 9.4,
                vote_count: 321342,
              },
              {
                id: 432123,
                popularity: 4.43,
                title: 'Dreamgirls',
                poster_path: '/example.png',
                release_date: '2005-02-01',
                vote_average: 7.32,
                vote_count: 32131,
              },
            ]);
            setHasNextPage(false);
            setFetchingNextPage(false);
          }, 1000);
        };

        return (
          <MovieList
            movies={results}
            fetchNextPage={fetchMore}
            isFetchingNextPage={fetchingNextPage}
            hasNextPage={hasNextPage}
          />
        );
      };

      const { getByText, getAllByLabelText } = customRender(<Component />);
      act(() => {
        mockAllIsIntersecting(true);
      });

      expect(getAllByLabelText(/loading results/i)).toHaveLength(1);

      setTimeout(() => {
        expect(getByText(/dreamgirls/i)).toBeVisible();
        expect(getByText(/avatar/i)).toBeVisible();
        done();
      }, 1050);
    });
  });
});
