import { SmallPokemon, Pokemon } from '@/interfaces';

const pokemons = (): SmallPokemon[] => {
  try {
    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  } catch (err) {
    return [];
  }
};

const toggleFavorite = (pokemon: Pokemon) => {
  let favorites = pokemons();
  const favorite = convertToSmall(pokemon);

  if (favorites.some((p) => p.id === favorite.id)) {
    favorites = favorites.filter((p) => p.id !== favorite.id);
  } else {
    favorites.push(favorite);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

function convertToSmall(pokemon: Pokemon) {
  const { id, name } = pokemon;
  return { id, name };
}

const existInFavorite = (pokemon: SmallPokemon | Pokemon): boolean => {
  return pokemons().some((p) => p.id === pokemon.id);
};

const localFavorites = {
  toggleFavorite,
  existInFavorite,
  pokemons,
};

export default localFavorites;
