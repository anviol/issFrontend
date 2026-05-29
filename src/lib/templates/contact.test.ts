import { describe, it, expect } from 'vitest';
import { createTemplate } from './contact';

describe('createTemplate', () => {
  it('gera um documento HTML completo', () => {
    const html = createTemplate({ Nome: 'Maria' });
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<table class="table">');
    expect(html.trim().endsWith('</html>')).toBe(true);
  });

  it('cria uma linha de tabela para cada par chave/valor', () => {
    const html = createTemplate({ Nome: 'Maria', Email: 'maria@example.com' });
    expect(html).toContain('<strong>Nome:</strong>');
    expect(html).toContain('Maria');
    expect(html).toContain('<strong>Email:</strong>');
    expect(html).toContain('maria@example.com');

    const rows = html.match(/<tr>/g) ?? [];
    expect(rows).toHaveLength(2);
  });

  it('não gera linhas quando não há dados', () => {
    const html = createTemplate({});
    expect(html).not.toContain('<tr>');
  });

  it('serializa valores não-string (ex.: números)', () => {
    const html = createTemplate({ Quantidade: 3 });
    expect(html).toContain('<strong>Quantidade:</strong>');
    expect(html).toContain('>3<');
  });
});
