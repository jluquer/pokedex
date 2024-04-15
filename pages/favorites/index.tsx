import { useEffect, useState } from 'react';

import { Layout } from '@/components/layouts';
import { PokemonsGrid } from '@/components/pokemon';
import { NoFavorites } from '@/components/ui';
import { localFavorites } from '@/utils';
import { SmallPokemon } from '@/interfaces';

export default function FavoritesPage() {
  const [favoritePokemons, setFavoritePokemons] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Pokémons - Favoritos'>
      {!favoritePokemons.length ? (
        <NoFavorites />
      ) : (
        <PokemonsGrid pokemons={favoritePokemons} />
      )}
    </Layout>
  );
}
