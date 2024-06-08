export const searchCharacters = async (query: string) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.results;
};
