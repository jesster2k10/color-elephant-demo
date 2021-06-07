import { ApiResponse } from '@/interfaces/api';

export type HTTPMethod = 'GET';

export class API {
  public constructor(
    public basePath: string,
    public params?: Record<string, any>,
    public headers?: Record<string, any>,
  ) {}

  public async request<T>(
    path: string,
    method: HTTPMethod,
    params?: Record<string, any>,
    headers?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    const body = {
      ...this.params,
      ...params,
    };

    const config: RequestInit = {
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
      method,
    };

    const urlPath = path.charAt(0) === '/' ? path.substr(1) : path;
    let url = `${this.basePath}/${urlPath}`;

    if (config.method === 'GET') {
      delete config.body;
      const queryString = Object.keys(body)
        .map((key) => `${key}=${body[key]}`)
        .join('&');

      if (queryString && queryString.length >= 1) {
        url = `${url}?${queryString}`;
      }
    }

    const response = await fetch(url, config);
    if (response.ok) {
      const json = await response.json();
      return json;
    }

    const message = await response.text();
    throw new Error(message);
  }

  public async get<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<ApiResponse<T>> {
    return this.request(url, 'GET', params);
  }

  public async getArray<T>(url: string): Promise<ApiResponse<T[]>> {
    return this.get<T[]>(url);
  }
}

export const TMDB = new API('https://api.themoviedb.org/3', {
  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
});
