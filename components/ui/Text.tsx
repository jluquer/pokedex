import { cn } from '@/utils';
import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  span?: boolean;
  small?: boolean;
  i?: boolean;
  b?: boolean;
  em?: boolean;
  del?: boolean;
  blockquoute?: boolean;
}

export function Text({ className, children, ...tags }: Props) {
  let level: number = 0;
  const Tag = (Object.keys(tags)[0] ?? 'p') as keyof JSX.IntrinsicElements;
  const { h1, h2, h3, h4, h5, h6, p } = tags;

  return (
    <Tag
      className={cn(
        clsx(
          'antialised',
          (h1 || h2 || h3 || h4 || h5 || h6) && 'font-semibold',
          p && 'text-base',
          h1 && 'text-4xl',
          h2 && 'text-3xl',
          h3 && 'text-2xl',
          h4 && 'text-xl',
          (h5 || h6) && 'text-lg',
        ),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
