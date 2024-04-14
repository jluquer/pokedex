import { Image } from '@nextui-org/react';
import { Text } from '@/components/ui';

export const NoFavorites = () => {
  return (
    <div className='flex h-[calc(100vh-100px)] flex-col items-center justify-center gap-4'>
      <Text
        h1
        className='mb-7'
      >
        No hay favoritos
      </Text>
      <div className='opacity-30'>
        <Image
          src={
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
          }
          width={250}
          height={250}
          alt='ditto'
        />
      </div>
    </div>
  );
};
