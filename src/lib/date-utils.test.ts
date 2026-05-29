import { describe, it, expect } from 'vitest';
import { getDifference } from './date-utils';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('getDifference', () => {
  it('decompõe a diferença em dias, horas, minutos e segundos', () => {
    const base = new Date('2026-01-01T00:00:00.000Z');
    const later = new Date(
      base.getTime() + 2 * DAY + 3 * HOUR + 4 * MINUTE + 5 * SECOND,
    );

    expect(getDifference(later, base)).toEqual({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
    });
  });

  it('retorna tudo zero para datas iguais', () => {
    const d = new Date('2026-05-29T12:00:00.000Z');
    expect(getDifference(d, d)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('não transborda as horas para além de 24 (apenas resto após os dias)', () => {
    const base = new Date('2026-01-01T00:00:00.000Z');
    const later = new Date(base.getTime() + 1 * DAY + 23 * HOUR);

    expect(getDifference(later, base)).toEqual({
      days: 1,
      hours: 23,
      minutes: 0,
      seconds: 0,
    });
  });

  it('calcula corretamente apenas segundos', () => {
    const base = new Date('2026-01-01T00:00:00.000Z');
    const later = new Date(base.getTime() + 45 * SECOND);

    expect(getDifference(later, base)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 45,
    });
  });
});
