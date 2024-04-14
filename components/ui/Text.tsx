import { cn } from '@/utils';
import clsx from 'clsx';
import React from 'react';

interface Props {
  [key: string]: any;
  className?: string;
  children?: React.ReactNode;
}

export function Text({ className, children, ...props }: Props) {
  let level: number = 0;
  Object.keys(props).forEach((prop) => {
    if (prop.match(/^h[1-6]$/i)) {
      level = parseInt(prop.charAt(1), 10);
    }
  });

  const Tag = (
    level < 1 || level > 6 ? 'p' : `h${level}`
  ) as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(
        clsx(
          'antialised',
          level > 0 ? 'font-semibold' : 'text-base',
          level === 1 && 'text-4xl',
          level === 2 && 'text-3xl',
          level === 3 && 'text-2xl',
          level === 4 && 'text-xl',
          level >= 5 && 'text-lg',
        ),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
