import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WarningToast } from './MessageToast';

type ToastProps = React.ComponentProps<typeof WarningToast>;

const baseData: ToastProps['data'] = {
  id: 1,
  attributes: {
    inicio: '2026-01-01',
    fim: '2026-12-31',
    titulo: 'Aviso importante',
    texto: 'Conteúdo do aviso',
  },
};

describe('WarningToast', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('exibe título e texto quando não há erro e não foi dispensado', async () => {
    render(<WarningToast data={baseData} />);

    expect(await screen.findByText('Aviso importante')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do aviso')).toBeInTheDocument();
  });

  it('não renderiza nada quando há erro', () => {
    render(
      <WarningToast
        data={baseData}
        error={{ status: 500, name: 'Error', message: 'falhou', details: {} }}
      />,
    );

    expect(screen.queryByText('Aviso importante')).not.toBeInTheDocument();
  });

  it('é dispensado ao clicar em "Entendi"', async () => {
    render(<WarningToast data={baseData} />);

    expect(await screen.findByText('Aviso importante')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Entendi' }));

    await waitFor(() =>
      expect(screen.queryByText('Aviso importante')).not.toBeInTheDocument(),
    );
  });

  it('persiste a dispensa no sessionStorage', async () => {
    window.sessionStorage.setItem('warning-message-dismissed', 'true');
    render(<WarningToast data={baseData} />);

    await waitFor(() =>
      expect(screen.queryByText('Aviso importante')).not.toBeInTheDocument(),
    );
  });
});
