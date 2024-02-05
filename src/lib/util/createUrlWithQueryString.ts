export function createUrlWithQueryString(baseURL: string, qs?: Record<string, string>): string {
  if (!qs) {
    return baseURL;
  }

  const queryString = new URLSearchParams(
    Object.entries(qs).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  return `${baseURL}?${queryString}`;
}
