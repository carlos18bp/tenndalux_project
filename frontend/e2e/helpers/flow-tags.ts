/**
 * Flow tag constants for consistent E2E test tagging.
 *
 * Usage:
 *   import { FlowTags, RoleTags } from '../helpers/flow-tags';
 *   test('...', { tag: [...FlowTags.AUTH_LOGIN, RoleTags.GUEST] }, async ({ page }) => { ... });
 */

export const FlowTags = {
  // ── Auth ──
  AUTH_LOGIN: ['@flow:auth-login', '@module:auth', '@priority:P1'],

  // ── Public ──
  PUBLIC_HOME: ['@flow:public-home', '@module:public', '@priority:P2'],
};

export const RoleTags = {
  GUEST: '@role:guest',
  USER: '@role:user',
  ADMIN: '@role:admin',
};
