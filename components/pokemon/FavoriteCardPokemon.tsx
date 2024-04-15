import { Card, Image } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();
  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };
  return (
    <Card
      isHoverable
      isPressable
      className='flex items-center justify-center p-7'
    >
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        onClick={onFavoriteClicked}
        alt={`Imagen para el pokemon ${pokemonId}`}
        width='100%'
        className='h-[150px] w-full'
      />
    </Card>
  );
};
