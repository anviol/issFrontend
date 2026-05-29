import { describe, it, expect } from 'vitest';
import { buildSchema, maskByInputName } from './form-utils';
import type { TFormOptions } from '@/@types/form';

function field(
  campo: string,
  obrigatorio: boolean,
  id = 1,
): TFormOptions['data'][number] {
  return { id, attributes: { campo, obrigatorio } };
}

describe('buildSchema', () => {
  it('exige email válido', () => {
    const schema = buildSchema([]);
    expect(schema.safeParse({ email: 'invalido', message: '1234567890' }).success).toBe(
      false,
    );
    expect(
      schema.safeParse({ email: 'a@b.com', message: '1234567890' }).success,
    ).toBe(true);
  });

  it('exige mensagem entre 10 e 250 caracteres', () => {
    const schema = buildSchema([]);
    expect(schema.safeParse({ email: 'a@b.com', message: 'curta' }).success).toBe(
      false,
    );
    expect(
      schema.safeParse({ email: 'a@b.com', message: 'a'.repeat(251) }).success,
    ).toBe(false);
    expect(
      schema.safeParse({ email: 'a@b.com', message: 'a'.repeat(50) }).success,
    ).toBe(true);
  });

  it('torna campos adicionais obrigatórios conforme a flag', () => {
    const schema = buildSchema([field('Nome', true)]);
    const base = { email: 'a@b.com', message: '1234567890' };

    expect(schema.safeParse(base).success).toBe(false);
    expect(schema.safeParse({ ...base, Nome: 'Maria' }).success).toBe(true);
  });

  it('permite omitir campos opcionais', () => {
    const schema = buildSchema([field('Empresa', false)]);
    expect(
      schema.safeParse({ email: 'a@b.com', message: '1234567890' }).success,
    ).toBe(true);
  });

  it.each(['Telefone', 'Whatsapp'])(
    'valida o formato de telefone no campo %s',
    (campo) => {
      const schema = buildSchema([field(campo, true)]);
      const base = { email: 'a@b.com', message: '1234567890' };

      expect(schema.safeParse({ ...base, [campo]: '(11) 99999-9999' }).success).toBe(
        true,
      );
      expect(schema.safeParse({ ...base, [campo]: '11999999999' }).success).toBe(
        true,
      );
      expect(schema.safeParse({ ...base, [campo]: 'abc' }).success).toBe(false);
    },
  );
});

describe('maskByInputName', () => {
  it.each([
    ['Telefone', '(##) #####-####'],
    ['whatsapp', '(##) #####-####'],
    ['CPF', '###.###.###-##'],
    ['cnpj', '##.###.###/####-##'],
    ['Cep', '#####-###'],
  ])('retorna a máscara para %s', (nome, mascara) => {
    expect(maskByInputName(nome)).toBe(mascara);
  });

  it('é insensível a maiúsculas/minúsculas', () => {
    expect(maskByInputName('TELEFONE')).toBe('(##) #####-####');
  });

  it('retorna string vazia para campos sem máscara', () => {
    expect(maskByInputName('Nome')).toBe('');
    expect(maskByInputName('Email')).toBe('');
  });
});
