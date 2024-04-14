import { Roboto } from 'next/font/google';

import Head from 'next/head';
import { Navbar } from '../ui';

const font = Roboto({ weight: '400', subsets: ['latin'], display: 'swap' });

interface Props {
  title?: string;
  children: React.ReactNode;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title ?? 'PokemonApp'}</title>
        <meta
          name='author'
          content='Javier Luque'
        />
        <meta
          name='description'
          content={`Información sobre el pokémon ${title}`}
        />
        <meta
          name='keywords'
          content={`${title}, pokemon, pokedex`}
        />

        <meta
          property='og:title'
          content={`Información sobre ${title}`}
        />
        <meta
          property='og:description'
          content={`Esta es la página sobre ${title}`}
        />
        <meta
          property='og:image'
          content={`${origin}/img/banner.png`}
        />
      </Head>

      <Navbar />

      <main className={font.className}>{children}</main>
    </>
  );
}
