import Image from 'next/image';
import { Link } from '@nextui-org/react';
import { Text } from '@/components/ui';

export const Navbar = () => {
  return (
    <div className='flex w-full items-center justify-start bg-content1 px-5'>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        alt='icono de la app'
        width={70}
        height={70}
      />

      <Link
        href='/'
        className='items-baseline tracking-tighter'
      >
        <Text
          h2
          className='text-4xl text-white'
        >
          P
        </Text>
        <Text
          h3
          className='text-2xl text-white'
        >
          okémon
        </Text>
      </Link>

      <div className='flex-1'></div>

      <Link href='/favorites'>
        <Text className='text-white'>Favoritos</Text>
      </Link>
    </div>
  );
};
