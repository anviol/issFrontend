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

import BrandCatalog from './page';
import { api } from '@/company-api/api';

const apiMock = vi.mocked(api);

const ok = (data: unknown) => ({ data, meta: { pagination: {} } }) as never;
const fail = (status: number) =>
  ({ error: { status, name: 'E', message: 'erro', details: {} } }) as never;

const product = (id: number, nome: string) => ({
  id,
  attributes: {
    nome,
    serie: 'Serie X',
    breveDecricao: 'Descrição breve',
    principal: {
      data: {
        id,
        attributes: {
          url: '/uploads/p.jpg',
          alternativeText: 'alt',
          width: 100,
          height: 100,
        },
      },
    },
  },
});

const category = (nome: string, produtos: unknown[]) => ({
  id: 1,
  attributes: { nome, produtos: { data: produtos } },
});

describe('BrandCatalog page (server component)', () => {
  beforeEach(() => {
    apiMock.mockReset();
    process.env.NEXT_PUBLIC_API_URL = 'http://api.test';
  });

  it('renderiza categorias e produtos da marca', async () => {
    apiMock.mockResolvedValue(
      ok([category('Impressoras', [product(1, 'JV330'), product(2, 'UJV100')])]),
    );

    render(await BrandCatalog({ params: { brand: 'Mimaki' } }));

    expect(screen.getByText('Impressoras')).toBeInTheDocument();
    expect(screen.getByText('JV330')).toBeInTheDocument();
    expect(screen.getByText('UJV100')).toBeInTheDocument();
  });

  it('mostra mensagem de vazio quando não há produtos da marca', async () => {
    apiMock.mockResolvedValue(ok([]));

    render(await BrandCatalog({ params: { brand: '4P' } }));

    expect(
      screen.getByText('Nenhum produto encontrado da marca selecionada.'),
    ).toBeInTheDocument();
  });

  it('chama notFound quando a API retorna 404', async () => {
    apiMock.mockResolvedValue(fail(404));

    await expect(
      BrandCatalog({ params: { brand: 'Mimaki' } }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
