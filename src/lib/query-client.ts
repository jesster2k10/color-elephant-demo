import { QueryClient } from 'react-query';
import { TMDB } from './api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async <T>({ queryKey }: { queryKey: any }) => {
        const [url, params = {}, headers = {}] = queryKey;
        const data = await TMDB.get<T>(
          url as string,
          params as Record<string, any>,
        );

        return data;
      },
    },
  },
});
