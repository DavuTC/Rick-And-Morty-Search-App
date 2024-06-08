import axios from 'axios';

export const searchCharacters = async (query: string) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`);
  return response.data.results;
};
