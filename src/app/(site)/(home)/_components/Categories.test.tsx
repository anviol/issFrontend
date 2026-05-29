import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/company-api/api', () => ({ api: vi.fn() }));
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { Categories } from './Categories';
import { api } from '@/company-api/api';
import { notFound } from 'next/navigation';

const apiMock = vi.mocked(api);

const ok = (data: unknown) => ({ data, meta: { pagination: {} } }) as never;
const fail = (status: number, message = 'erro') =>
  ({ error: { status, name: 'E', message, details: {} } }) as never;

const category = (id: number, titulo: string) => ({
  id,
  attributes: {
    titulo,
    imagem: {
      data: { id, attributes: { url: '/uploads/x.jpg', alternativeText: 'alt' } },
    },
  },
});

describe('Categories (server component)', () => {
  beforeEach(() => {
    apiMock.mockReset();
    process.env.NEXT_PUBLIC_API_URL = 'http://api.test';
  });

  it('renderiza um card por categoria de destaque', async () => {
    apiMock.mockResolvedValue(ok([category(1, 'Mimaki'), category(2, 'Linha 4P')]));

    render(await Categories());

    expect(screen.getByText('Mimaki')).toBeInTheDocument();
    expect(screen.getByText('Linha 4P')).toBeInTheDocument();
  });

  it('direciona "4P" para /produtos/4P e o restante para /produtos/Mimaki', async () => {
    apiMock.mockResolvedValue(ok([category(1, 'Mimaki'), category(2, 'Linha 4P')]));

    render(await Categories());

    const hrefs = screen
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/produtos/4P');
    expect(hrefs).toContain('/produtos/Mimaki');
  });

  it('chama notFound quando a API retorna 404', async () => {
    apiMock.mockResolvedValue(fail(404));

    await expect(Categories()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('lança erro para falhas que não sejam 404', async () => {
    apiMock.mockResolvedValue(fail(500, 'boom'));

    await expect(Categories()).rejects.toThrow('boom');
  });
});
