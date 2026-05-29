import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/company-api/api', () => ({ api: vi.fn() }));
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));
vi.mock('react-toastify', () => ({ toast: { promise: vi.fn() } }));

import Contact from './page';
import { api } from '@/company-api/api';

const apiMock = vi.mocked(api);

const ok = (data: unknown) => ({ data, meta: { pagination: {} } }) as never;
const fail = (status: number) =>
  ({ error: { status, name: 'E', message: 'erro', details: {} } }) as never;

describe('Contact page (server component)', () => {
  beforeEach(() => apiMock.mockReset());

  it('renderiza o formulário com os campos vindos do CMS', async () => {
    apiMock.mockResolvedValue(
      ok([{ id: 1, attributes: { campo: 'Nome', obrigatorio: true } }]),
    );

    render(await Contact({ params: {} }));

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });

  it('passa o produto da URL para o formulário (campo somente leitura)', async () => {
    apiMock.mockResolvedValue(ok([]));

    render(await Contact({ params: { product: ['JV330'] } }));

    expect(screen.getByDisplayValue('JV330')).toBeDisabled();
  });

  it('chama notFound quando a API retorna 404', async () => {
    apiMock.mockResolvedValue(fail(404));

    await expect(Contact({ params: {} })).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
