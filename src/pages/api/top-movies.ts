import { Movie } from '@/interfaces';
import { TMDB } from '@/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export const getTopMovies = async () => {
  const totalMovies = 500;
  const pageSize = 20;
  const totalPages = totalMovies / pageSize;
  const pageArray = [...new Array(totalPages).keys()].map((key) => key + 1);
  const data = await Promise.all(
    pageArray.map(async (page) => {
      const { results } = await TMDB.getArray<Movie>('/movie/top_rated', {
        page,
      });
      return results ?? [];
    }),
  );
  const movies = data.reduce(
    (initial, current) => [...initial, ...current],
    [],
  );
  return movies;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const movies = await getTopMovies();
  res.status(200).json({
    results: movies,
  });
};
