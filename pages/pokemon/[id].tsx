import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import confetti from 'canvas-confetti';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
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
      <div className='mt-7 grid w-full grid-cols-1 gap-4 px-8 md:grid-cols-12'>
        <div className='md:col-span-4'>
          <Card>
            <CardBody className='flex items-center justify-center'>
              <Image
                className='h-auto max-w-full p-7'
                src={
                  pokemon.sprites.other?.dream_world.front_default ??
                  '/no-image.png'
                }
                alt={pokemon.name}
              />
            </CardBody>
          </Card>
        </div>

        <div className='md:col-span-8 '>
          <Card>
            <CardHeader className='flex justify-between'>
              <h1 className='capitalize'>{pokemon.name}</h1>

              {isLoaded && (
                <Button
                  variant={!isInFavorites ? 'bordered' : 'solid'}
                  color='secondary'
                  className={
                    isInFavorites
                      ? 'bg-gradient-to-tr from-secondary to-primary text-white'
                      : 'text-white'
                  }
                  onClick={onToggleFav}
                >
                  {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                </Button>
              )}
            </CardHeader>

            <CardBody>
              <span>Sprites:</span>

              <div className='flex'>
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
