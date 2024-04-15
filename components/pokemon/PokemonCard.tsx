import { useRouter } from 'next/router';

import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

import { SmallPokemon } from '../../interfaces';

interface Props {
  pokemon: SmallPokemon;
}

export function PokemonCard({ pokemon }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <Card
      isPressable
      isHoverable
      onPress={onClick}
    >
      <CardBody>
        <Image
          src={pokemon.img}
          alt={pokemon.name}
          width='100%'
          className='h-[140px] w-full'
        />
      </CardBody>
      <CardFooter className='justify-between'>
        <span className='capitalize'>{pokemon.name}</span>
        <span>#{pokemon.id}</span>
      </CardFooter>
    </Card>
  );
}
