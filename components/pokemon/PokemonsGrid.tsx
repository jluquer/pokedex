import { SmallPokemon } from '@/interfaces';
import { PokemonCard } from '.';

interface Props {
  pokemons: SmallPokemon[];
}

export function PokemonsGrid({ pokemons }: Props) {
  return (
    <div className='grid grid-cols-2 gap-6 px-8 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
}
