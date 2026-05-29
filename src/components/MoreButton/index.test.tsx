import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoreButton } from './index';

// next/link é substituído por um <a> simples para não exigir o router.
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string | { pathname?: string };
  }) => (
    <a href={typeof href === 'string' ? href : (href.pathname ?? '#')} {...props}>
      {children}
    </a>
  ),
}));

describe('MoreButton', () => {
  it('usa o título padrão "Saiba mais" quando nenhum é informado', () => {
    render(<MoreButton href="/eventos" />);
    expect(
      screen.getByRole('link', { name: /saiba mais/i }),
    ).toBeInTheDocument();
  });

  it('usa o título customizado e aponta para o href', () => {
    render(<MoreButton href="/produtos" title="Ver todos" />);
    const link = screen.getByRole('link', { name: /ver todos/i });
    expect(link).toHaveAttribute('href', '/produtos');
  });

  it('mescla classes customizadas', () => {
    render(<MoreButton href="/x" title="X" className="px-0" />);
    expect(screen.getByRole('link', { name: 'X' })).toHaveClass('px-0');
  });
});
