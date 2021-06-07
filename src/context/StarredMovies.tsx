import { Movie } from '@/interfaces';
import { parseJSONObject } from '@/lib/parse-json';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface StarredMoviesContextValue {
  starredMovies: Record<number, boolean>;
  isStarred: (movie: Movie) => boolean;
  star: (movie: Movie, starred: boolean) => void;
  toggleStar: (movie: Movie) => void;
}

export interface StarredMoviesProviderProps {
  children: React.ReactNode;
}

export const StarredMoviesContext = createContext(
  {} as StarredMoviesContextValue,
);

export function useStarredMovies() {
  return useContext(StarredMoviesContext);
}

export function useStarredMovie(movie: Movie) {
  const { isStarred, star, toggleStar } = useStarredMovies();
  const starred = useMemo(() => isStarred(movie), [movie, isStarred]);

  return {
    toggleStar: () => toggleStar(movie),
    starred,
    star: (value: boolean) => star(movie, value),
  };
}

export const StarredMoviesProvider = ({
  children,
}: StarredMoviesProviderProps) => {
  const [starredMovies, setStarredMovies] = useState(() => {
    if (typeof window === 'undefined') return {};
    return parseJSONObject(localStorage.getItem('movies:starred') ?? '{}');
  });

  const isStarred = useCallback(
    (movie: Movie) => starredMovies?.[movie.id] === true,
    [starredMovies],
  );

  const star = useCallback(
    (movie: Movie, starred: boolean) =>
      setStarredMovies((old) => ({
        ...old,
        [movie.id]: starred,
      })),
    [setStarredMovies, starredMovies],
  );

  const toggleStar = (movie: Movie) => {
    const starred = isStarred(movie);
    star(movie, !starred);
  };

  useEffect(() => {
    localStorage.setItem('movies:starred', JSON.stringify(starredMovies));
  }, [starredMovies]);

  return (
    <StarredMoviesContext.Provider
      value={{
        starredMovies,
        isStarred,
        toggleStar,
        star,
      }}
    >
      {children}
    </StarredMoviesContext.Provider>
  );
};
