import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (
  nameOrId: string
): Promise<Pokemon | null> => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    return data;
  } catch (err) {
    return null;
  }
};
