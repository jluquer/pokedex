import { GetStaticProps } from 'next';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonsGrid } from '@/components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title='Listado de Pokémons'>
      <PokemonsGrid pokemons={pokemons} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    id: i + 1,
    name: poke.name,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
