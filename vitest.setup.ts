import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Garante DOM limpo entre os testes de componente.
afterEach(() => {
  cleanup();
});
