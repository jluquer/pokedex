import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import confetti from 'canvas-confetti';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { HeartIcon, Text } from '@/components/ui';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';

interface Props {
  pokemon: Pokemon;
}

export default function PokemonPage({ pokemon }: Props) {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorite(pokemon.id),
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const onToggleFav = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <div className='mt-7 grid w-full grid-cols-1 grid-rows-1 gap-4 px-8 lg:grid-cols-12'>
        <Card className='lg:col-span-4'>
          <CardBody className='flex items-center justify-center p-11'>
            <Image
              className='h-[200px] w-full'
              src={
                pokemon.sprites.other?.dream_world.front_default ??
                '/no-image.png'
              }
              alt={pokemon.name}
            />
          </CardBody>
        </Card>

        <Card className='px-4 pb-2 pt-4 lg:col-span-8'>
          <CardHeader className='mb-4 flex justify-between'>
            <Text
              h1
              className='text-5xl capitalize'
            >
              {pokemon.name}
            </Text>

            <Button
              isIconOnly
              className='bg-gradient-to-tr from-warning to-danger text-white shadow-lg'
              aria-label={
                isInFavorites ? 'Quitar de favoritos' : 'Añadir a favoritos'
              }
              isLoading={!isLoaded}
              onClick={onToggleFav}
            >
              <HeartIcon filled={isInFavorites} />
            </Button>
          </CardHeader>

          <CardBody>
            <Text className='text-2xl'>Sprites:</Text>

            <div className='flex justify-around'>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonIds = [...Array(151)].map((_, index) => ({
    params: { id: `${index + 1}` },
  }));

  const { data } = await pokeApi.get<PokemonListResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=151',
  );
  const pokemonNames = data.results.map((pokemon) => ({
    params: { id: pokemon.name },
  }));

  return {
    paths: [...pokemonIds, ...pokemonNames],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon)
    return {
      notFound: true,
    };

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 60 * 60 * 24
  };
};
