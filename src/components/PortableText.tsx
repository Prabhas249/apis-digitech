'use client';

import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mb-6 mt-10">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-white mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 my-6 italic text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-300">{children}</li>,
    number: ({ children }) => <li className="text-gray-300">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-800 text-orange-400 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-orange-400 hover:text-orange-300 underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog image'}
            width={1200}
            height={675}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-gray-400 text-sm mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-900 rounded-xl p-4 overflow-x-auto my-6">
        <code className="text-sm font-mono text-gray-300">
          {value.code}
        </code>
      </pre>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
