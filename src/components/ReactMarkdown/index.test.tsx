import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RawToMarkdown } from './index';

describe('RawToMarkdown', () => {
  it('converte markdown em HTML', () => {
    render(<RawToMarkdown text={'# Título\n\nparágrafo'} />);
    expect(screen.getByRole('heading', { name: 'Título' })).toBeInTheDocument();
    expect(screen.getByText('parágrafo')).toBeInTheDocument();
  });

  it('renderiza links com o estilo customizado', () => {
    render(<RawToMarkdown text={'[ISS](https://iss.com.br)'} />);
    const link = screen.getByRole('link', { name: 'ISS' });
    expect(link).toHaveAttribute('href', 'https://iss.com.br');
    expect(link).toHaveClass('text-blue-500');
  });

  it('renderiza HTML cru via rehype-raw', () => {
    render(<RawToMarkdown text={'<span data-testid="cru">conteúdo</span>'} />);
    expect(screen.getByTestId('cru')).toHaveTextContent('conteúdo');
  });
});
