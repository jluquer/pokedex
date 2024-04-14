import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Props {
  favoritePokemons: number[];
}

export function FavoritePokemons({ favoritePokemons }: Props) {
  return (
    <div className='grid grid-cols-2 gap-6 px-8 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
      {favoritePokemons.map((id) => (
        <FavoriteCardPokemon
          key={id}
          pokemonId={id}
        />
      ))}
    </div>
  );
}
