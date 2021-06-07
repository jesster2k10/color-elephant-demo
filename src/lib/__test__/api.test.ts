import fetchMock from 'fetch-mock';
import { API } from '../api';

const api = new API('https://jsonplaceholder.typicode.com');

describe('Unit | API', () => {
  afterEach(() => fetchMock.restore());

  describe('valid GET requests', () => {
    it('should return the correct body', async () => {
      fetchMock.mock('https://jsonplaceholder.typicode.com/todos/1', {
        status: 200,
        body: {
          results: {
            id: 1,
          },
        },
      });

      await api
        .get<{ id: number }>('/todos/1')
        .then((data) => expect(data.results.id).toEqual(1));
    });

    it('should parse body params', async () => {
      fetchMock.mock(
        'https://jsonplaceholder.typicode.com/todos/1?query=hello&page=1',
        {
          status: 200,
          body: {
            results: {
              id: 1,
            },
          },
        },
      );

      await api
        .get<{ id: number }>('/todos/1', {
          query: 'hello',
          page: 1,
        })
        .then((data) => expect(data.results.id).toEqual(1));
    });
  });

  describe('invalid GET requests', () => {
    it('should return the error text', async () => {
      fetchMock.mock('https://jsonplaceholder.typicode.com/test', {
        status: 400,
        body: 'Invalid request',
      });

      try {
        await api.get('/test');
      } catch (error) {
        expect(error instanceof Error).toBeTruthy();
        expect(error.toString()).toMatch(/Invalid request/i);
      }
    });
  });
});
