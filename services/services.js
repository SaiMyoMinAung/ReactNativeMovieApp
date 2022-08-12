import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';

const apiKey = 'api_key=5ba66aab5b8a836479cafa1a95f988c1';

export const getPopularMovie = async () => {
  const res = await axios.get(
    `${apiUrl}/movie/popular?${apiKey}&language=en-US&page=1`,
  );
  return res.data.results;
};

export const getUpcomingMovie = async () => {
  const res = await axios.get(
    `${apiUrl}/movie/upcoming?${apiKey}&language=en-US&page=1`,
  );
  return res.data.results;
};

export const getPopularTV = async () => {
  const res = await axios.get(
    `${apiUrl}/tv/popular?${apiKey}&language=en-US&page=1`,
  );
  return res.data.results;
};

export const getFamilyMovie = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751&page=1`,
  );
  return res.data.results;
};

export const getMovie = async id => {
  const res = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return res.data;
};

export const searchMovieTv = async (query, type) => {
  const res = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return res.data.results;
};
