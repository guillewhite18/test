// filters.ts

import axios from 'axios';

export const getFilteredResults = async (filter: string) => {
  try {
    const response = await axios.get(`https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${filter}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener resultados para "${filter}":`, error);
    throw error;
  }
};
