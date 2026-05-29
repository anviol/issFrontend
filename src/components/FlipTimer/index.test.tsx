import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Countdown } from './index';

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renderiza as quatro unidades de tempo', () => {
    const target = new Date('2026-01-03T03:04:05.000Z');
    render(<Countdown target={target} />);

    expect(screen.getByText('DIAS')).toBeInTheDocument();
    expect(screen.getByText('HORAS')).toBeInTheDocument();
    expect(screen.getByText('MIN.')).toBeInTheDocument();
    expect(screen.getByText('SEG.')).toBeInTheDocument();
  });

  it('mostra a contagem regressiva correta para o alvo informado', () => {
    // 2 dias, 3 horas, 4 minutos e 5 segundos no futuro.
    const target = new Date('2026-01-03T03:04:05.000Z');
    render(<Countdown target={target} />);

    // Cada CardContainer expõe o valor formatado via atributo title (ex.: "02 DIAS").
    expect(screen.getByTitle('02 DIAS')).toBeInTheDocument();
    expect(screen.getByTitle('03 HORAS')).toBeInTheDocument();
    expect(screen.getByTitle('04 MIN.')).toBeInTheDocument();
    expect(screen.getByTitle('05 SEG.')).toBeInTheDocument();
  });

  it('exibe zeros quando o alvo já passou', () => {
    const target = new Date('2025-12-31T00:00:00.000Z');
    render(<Countdown target={target} />);

    expect(screen.getByTitle('00 DIAS')).toBeInTheDocument();
    expect(screen.getByTitle('00 SEG.')).toBeInTheDocument();
  });
});
