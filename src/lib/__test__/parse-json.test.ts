import { parseJSONObject } from '../parse-json';

describe('Unit | Parse JSON', () => {
  it('should parse an empty string', () => {
    expect(parseJSONObject()).toMatchObject({});
    expect(parseJSONObject(undefined)).toMatchObject({});
    expect(parseJSONObject(null as never)).toMatchObject({});
  });

  it('should parse an object', () => {
    expect(
      parseJSONObject(
        JSON.stringify({
          hello: 'world',
        }),
      ),
    ).toMatchObject({
      hello: 'world',
    });
  });

  it('should handle invalid objects', () => {
    expect(parseJSONObject(new Error() as never)).toMatchObject({});
  });
});
