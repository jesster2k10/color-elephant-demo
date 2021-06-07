export const tmdbImage = (url: string, width = 1080) =>
  `https://image.tmdb.org/t/p/w${
    width < 500 && width < 200 ? width : 500
  }${url}`;
