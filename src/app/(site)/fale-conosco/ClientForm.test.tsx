import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClientForm } from './ClientForm';
import type { TFormOptions } from '@/@types/form';

// toast.promise apenas executa a promise recebida (sem precisar do ToastContainer).
vi.mock('react-toastify', () => ({
  toast: { promise: vi.fn((p: Promise<unknown>) => p) },
}));

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({
    json: async () => ({ info: { response: '250 OK' } }),
  });
  vi.stubGlobal('fetch', fetchMock);
});

const noFields: TFormOptions['data'] = [];
const withName: TFormOptions['data'] = [
  { id: 1, attributes: { campo: 'Nome', obrigatorio: true } },
];

describe('ClientForm', () => {
  it('renderiza os campos fixos email e mensagem', () => {
    render(<ClientForm fields={noFields} product={null} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('renderiza dinamicamente os campos vindos do CMS', () => {
    render(<ClientForm fields={withName} product={null} />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });

  it('mostra o produto (somente leitura) quando informado', () => {
    render(<ClientForm fields={noFields} product="JV330" />);
    const input = screen.getByDisplayValue('JV330');
    expect(input).toBeDisabled();
  });

  it('exibe erros e não envia quando o formulário está vazio', async () => {
    render(<ClientForm fields={noFields} product={null} />);

    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // email e mensagem disparam o erro de campo obrigatório.
    expect(
      (await screen.findAllByText('campo obrigatório')).length,
    ).toBeGreaterThanOrEqual(2);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('valida o formato do email e o tamanho mínimo da mensagem', async () => {
    render(<ClientForm fields={noFields} product={null} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'invalido');
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'curta');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    expect(await screen.findByText('e-mail inválido.')).toBeInTheDocument();
    expect(
      screen.getByText('Deve conter pelo menos 10 caracteres.'),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envia o formulário para /api/send-email quando válido', async () => {
    render(<ClientForm fields={noFields} product="JV330" />);

    await userEvent.type(screen.getByLabelText(/email/i), 'cliente@example.com');
    await userEvent.type(
      screen.getByLabelText(/mensagem/i),
      'Tenho interesse neste produto.',
    );
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/send-email');
    expect((init as RequestInit).method).toBe('POST');

    const body = (init as RequestInit).body as FormData;
    expect(body.get('Produto')).toBe('JV330');
    // O email é separado e não vai no FormData; a mensagem vai.
    expect(body.get('message')).toBe('Tenho interesse neste produto.');
  });
});
