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

import Events from './page';
import { api } from '@/company-api/api';

const apiMock = vi.mocked(api);

const ok = (data: unknown) => ({ data, meta: { pagination: {} } }) as never;

const fmt = (url: string) => ({ url, width: 100, height: 100 });
const evento = (nome: string, imgUrl: string) => ({
  id: 1,
  attributes: {
    nome_evento: nome,
    fotos: {
      data: [
        {
          id: 1,
          attributes: {
            name: 'foto',
            alternativeText: 'legenda',
            formats: { small: fmt(imgUrl), medium: fmt(imgUrl) },
          },
        },
      ],
    },
  },
});

describe('Events page (server component)', () => {
  beforeEach(() => {
    apiMock.mockReset();
    process.env.NEXT_PUBLIC_API_URL = 'http://api.test';
  });

  it('renderiza a seção e a galeria a partir dos dados transformados', async () => {
    apiMock.mockResolvedValue(ok([evento('Feira X', '/uploads/foto.jpg')]));

    render(await Events());

    // react-grid-gallery só pinta as imagens quando há largura medida (não há no
    // jsdom); validamos que o pipeline fetch -> transformação -> galeria montou.
    expect(screen.getByRole('heading', { name: 'Mídias' })).toBeInTheDocument();
    expect(document.getElementById('ReactGridGallery')).toBeInTheDocument();
  });

  it('renderiza a seção mesmo sem fotos', async () => {
    apiMock.mockResolvedValue(ok([]));

    render(await Events());

    expect(screen.getByRole('heading', { name: 'Mídias' })).toBeInTheDocument();
    expect(document.getElementById('ReactGridGallery')).toBeInTheDocument();
  });
});
