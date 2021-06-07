import { RenderResult } from '@testing-library/react';
import { customRender } from '../../lib/tests';
import { Movie } from '../../interfaces';
import { MovieCard } from '../MovieCard';

describe('Unit | MovieCard', () => {
  const movie: Movie = {
    id: 1234,
    popularity: 8.932,
    title: 'Pulp Fiction',
    poster_path: '/example.png',
    release_date: '1998-08-02',
    vote_average: 9.2,
    vote_count: 32232,
  };

  let screen: RenderResult;

  beforeEach(() => {
    screen = customRender(<MovieCard movie={movie} />);
  });

  describe('display', () => {
    it('should show the title', () => {
      expect(screen.getByText(/pulp fiction/i)).toBeVisible();
    });

    it('should show the rating', () => {
      expect(screen.getByText(/rating: 9.2/i)).toBeVisible();
    });

    it('should show the release year', () => {
      expect(screen.getByText(/released: 1998/i)).toBeVisible();
    });

    it('should show the popularity', () => {
      expect(screen.getByText(/popularity: 8.932/i)).toBeVisible();
    });

    it('should have a toggle button', () => {
      expect(screen.getByLabelText(/add to favourites/i)).toBeVisible();
    });
  });

  it('should allow favourite toggling', () => {
    screen.getByLabelText(/add to favourites/i).click();
    expect(screen.getByLabelText(/remove from favourites/i)).toBeVisible();
  });
});
