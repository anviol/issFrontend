import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectEvent } from './SelectEvent';
import type { TEvent } from '.';

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

const event = (
  titulo: string,
  inicio: string,
  fim: string,
  localizacao: string,
): TEvent => ({
  id: 1,
  attributes: {
    titulo,
    descricao: `Descrição de ${titulo}`,
    inicio,
    fim,
    horariodata: '10h',
    localizacao,
  },
});

describe('SelectEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-29T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('seleciona o evento futuro mais próximo por padrão', () => {
    const data = [
      event('Feira Passada', '2026-01-01', '2026-01-02', 'Recife'),
      event('Feira Futura', '2026-06-10', '2026-06-12', 'São Paulo'),
    ];

    render(<SelectEvent data={data} />);

    expect(screen.getByText('Feira Futura')).toBeInTheDocument();
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Descrição de Feira Futura')).toBeInTheDocument();
  });

  it('recai no primeiro evento quando não há eventos futuros', () => {
    const data = [event('Único Passado', '2025-01-01', '2025-01-02', 'Salvador')];

    render(<SelectEvent data={data} />);

    expect(screen.getByText('Único Passado')).toBeInTheDocument();
    expect(screen.getByText('Salvador')).toBeInTheDocument();
  });

  it('mostra o link "Ver todos" apontando para /eventos', () => {
    const data = [event('Feira Futura', '2026-06-10', '2026-06-12', 'São Paulo')];

    render(<SelectEvent data={data} />);

    expect(screen.getByRole('link', { name: /ver todos/i })).toHaveAttribute(
      'href',
      '/eventos',
    );
  });
});
