import { describe, it, expect, vi, beforeEach } from 'vitest';

type ApiCall = { url: string; fetchOptions: { method: string; body: FormData } };

// Mocks tipados criados via `vi.hoisted` para uso dentro das factories de `vi.mock`.
const { apiMock, createTemplateMock } = vi.hoisted(() => {
  return {
    apiMock: vi.fn(async (_options: ApiCall) => ({
      info: { response: '250 OK' },
    })),
    createTemplateMock: vi.fn((_data: Record<string, unknown>) => '<TEMPLATE/>'),
  };
});

vi.mock('next/server', () => ({
  NextResponse: { json: (data: unknown) => ({ _json: data }) },
}));
vi.mock('@/company-api/api', () => ({ api: apiMock }));
vi.mock('@/lib/templates/contact', () => ({ createTemplate: createTemplateMock }));

import { POST } from './route';

function requestWith(entries: Record<string, string>) {
  const fd = new FormData();
  Object.entries(entries).forEach(([k, v]) => fd.append(k, v));
  return { formData: async () => fd } as unknown as Request;
}

// Lê os argumentos com que a `api` foi chamada e expõe o FormData enviado.
function lastApiCall() {
  const call = apiMock.mock.calls.at(-1)?.[0];
  if (!call) throw new Error('api não foi chamada');
  return { url: call.url, options: call.fetchOptions, body: call.fetchOptions.body };
}

function lastTemplateData() {
  const data = createTemplateMock.mock.calls.at(-1)?.[0];
  if (!data) throw new Error('createTemplate não foi chamado');
  return data;
}

describe('POST /api/send-email', () => {
  beforeEach(() => {
    process.env.EMAIL_TO = 'destino@empresa.com';
  });

  it('usa o assunto de orçamento quando há "Produto"', async () => {
    await POST(requestWith({ email: 'a@b.com', message: 'Olá', Produto: 'JV330' }));

    const { body } = lastApiCall();
    expect(String(body.get('subject'))).toContain(
      'Solicitação de Orçamento via Site',
    );
  });

  it('usa o assunto de contato quando não há "Produto"', async () => {
    await POST(requestWith({ email: 'a@b.com', message: 'Olá' }));

    const { body } = lastApiCall();
    expect(String(body.get('subject'))).toContain(
      'Solicitação de Contato via Site',
    );
  });

  it('envia para o e-mail definido em EMAIL_TO e chama o endpoint correto', async () => {
    await POST(requestWith({ email: 'a@b.com', message: 'Olá' }));

    const { url, options, body } = lastApiCall();
    expect(url).toBe('/email/send');
    expect(options.method).toBe('POST');
    expect(body.get('to')).toBe('destino@empresa.com');
  });

  it('exclui "message" do templateData e inclui "Produto" quando presente', async () => {
    await POST(
      requestWith({ email: 'a@b.com', message: 'Olá', Produto: 'JV330' }),
    );

    const templateData = lastTemplateData();
    expect(templateData).toHaveProperty('email', 'a@b.com');
    expect(templateData).toHaveProperty('Produto', 'JV330');
    expect(templateData).not.toHaveProperty('message');
  });

  it('converte o valor string "undefined" em "Não informado"', async () => {
    await POST(
      requestWith({ email: 'a@b.com', message: 'Olá', Telefone: 'undefined' }),
    );

    expect(lastTemplateData().Telefone).toBe('Não informado');
  });

  it('inclui a mensagem do usuário no corpo do e-mail', async () => {
    await POST(requestWith({ email: 'a@b.com', message: 'Minha dúvida' }));

    const { body } = lastApiCall();
    expect(String(body.get('message'))).toContain('Minha dúvida');
    expect(String(body.get('message'))).toContain('<TEMPLATE/>');
  });

  it('retorna a resposta da api via NextResponse.json', async () => {
    const resp = (await POST(
      requestWith({ email: 'a@b.com', message: 'Oi' }),
    )) as unknown as { _json: { info: { response: string } } };
    expect(resp._json).toEqual({ info: { response: '250 OK' } });
  });
});
