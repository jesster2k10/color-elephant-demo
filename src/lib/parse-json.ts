export function parseJSONObject<T = Record<string, any>>(text?: string): T {
  try {
    return JSON.parse(text ?? '{}');
  } catch (error) {
    return {} as T;
  }
}
