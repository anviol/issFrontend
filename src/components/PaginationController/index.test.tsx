import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Estado mutável compartilhado para variar o pathname/searchParams por teste.
const nav = vi.hoisted(() => ({ params: 'pagina=2', push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: nav.push }),
  usePathname: () => '/produtos/Mimaki',
  useSearchParams: () => new URLSearchParams(nav.params),
}));

import { Pagination } from './index';

describe('Pagination', () => {
  beforeEach(() => {
    nav.push.mockClear();
    nav.params = 'pagina=2';
  });

  it('mostra a página atual lida do query param "pagina"', () => {
    render(<Pagination length={5} />);
    expect(screen.getByText('2 de 5')).toBeInTheDocument();
  });

  it('assume a página 1 quando não há query param', () => {
    nav.params = '';
    render(<Pagination length={5} />);
    expect(screen.getByText('1 de 5')).toBeInTheDocument();
  });

  it('navega para a próxima página e atualiza o indicador', async () => {
    render(<Pagination length={5} />);
    await userEvent.click(screen.getByRole('button', { name: /próxima/i }));

    expect(nav.push).toHaveBeenCalledWith('/produtos/Mimaki?pagina=3');
    expect(screen.getByText('3 de 5')).toBeInTheDocument();
  });

  it('navega para a página anterior', async () => {
    render(<Pagination length={5} />);
    await userEvent.click(screen.getByRole('button', { name: /anterior/i }));

    expect(nav.push).toHaveBeenCalledWith('/produtos/Mimaki?pagina=1');
  });

  it('desabilita "anterior" na primeira página', () => {
    nav.params = 'pagina=1';
    render(<Pagination length={5} />);
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled();
  });

  it('desabilita "próxima" na última página', () => {
    nav.params = 'pagina=5';
    render(<Pagination length={5} />);
    expect(screen.getByRole('button', { name: /próxima/i })).toBeDisabled();
  });
});
