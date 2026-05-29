import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationMenu } from './NavMenu';
import type { NavLinks } from './menu-links';

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

const boletos: NavLinks = { id: '5', title: 'Boletos', href: '/boletos', external: true };
const chamados: NavLinks = { id: '6', title: 'Chamados', href: '/chamados' };

describe('NavigationMenu', () => {
  it('renderiza os links fixos do menu', () => {
    render(<NavigationMenu boletosNavData={boletos} chamadosNavData={chamados} />);

    expect(screen.getByText('Sobre nós')).toBeInTheDocument();
    expect(screen.getByText('Eventos e Mídias')).toBeInTheDocument();
    expect(screen.getByText('Fale Conosco')).toBeInTheDocument();
  });

  it('renderiza os links dinâmicos de boletos e chamados', () => {
    render(<NavigationMenu boletosNavData={boletos} chamadosNavData={chamados} />);

    expect(screen.getByText('Boletos')).toBeInTheDocument();
    expect(screen.getByText('Chamados')).toBeInTheDocument();
  });

  it('exibe o gatilho do submenu de Produtos', () => {
    render(<NavigationMenu boletosNavData={boletos} chamadosNavData={chamados} />);

    expect(screen.getByText('Produtos')).toBeInTheDocument();
  });
});
