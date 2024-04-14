const pokemons = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  } catch (err) {
    return [];
  }
};

const toggleFavorite = (id: number) => {
  let favorites = pokemons();

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => id !== pokeId);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorite = (id: number): boolean => {
  return pokemons().includes(id);
};

const localFavorites = {
  toggleFavorite,
  existInFavorite,
  pokemons,
};

export default localFavorites;
