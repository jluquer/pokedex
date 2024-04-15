import Image from 'next/image';
import { Link } from '@nextui-org/react';
import { Text } from '@/components/ui';

export const Navbar = () => {
  return (
    <div className='flex  w-full items-center justify-between bg-content1 px-5'>
      <div className='flex items-center'>
        <Link href='/'>
          <Image
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
            alt='icono de la app'
            width={70}
            height={70}
          />
          <div className='flex items-baseline tracking-tighter'>
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
          </div>
        </Link>
      </div>

      <Link
        href='/favorites'
        className='text-white'
      >
        Favoritos
      </Link>
    </div>
  );
};
