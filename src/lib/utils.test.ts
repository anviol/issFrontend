import { describe, it, expect } from 'vitest';
import { cn, ensureHttps } from './utils';

describe('cn', () => {
  it('junta classes simples', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignora valores falsy (clsx)', () => {
    expect(cn('a', false && 'b', undefined, null, 'c')).toBe('a c');
  });

  it('resolve conflitos de classes Tailwind mantendo a última (twMerge)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('aceita arrays e objetos condicionais', () => {
    expect(cn(['a', 'b'], { c: true, d: false })).toBe('a b c');
  });
});

describe('ensureHttps', () => {
  it('mantém URLs que já começam com https://', () => {
    expect(ensureHttps('https://exemplo.com')).toBe('https://exemplo.com');
  });

  it('adiciona https:// quando ausente', () => {
    expect(ensureHttps('exemplo.com')).toBe('https://exemplo.com');
  });

  it('adiciona https:// para URLs http:// (não trata o http como seguro)', () => {
    expect(ensureHttps('http://exemplo.com')).toBe('https://http://exemplo.com');
  });

  it('prefixa string vazia', () => {
    expect(ensureHttps('')).toBe('https://');
  });
});
