/**
 * Public API surface for the frontend.
 *
 * Usage from UI / features:
 *   import { getHealth, ApiError } from '../api';
 *
 * Switch backends in `backendEnv.ts` via `ACTIVE_BACKEND`.
 * Prefer endpoint helpers over talking to `fetch` directly.
 */
export { ACTIVE_BACKEND, API_BASE_URL, BACKEND_URLS } from './backendEnv';
export type { BackendEnv } from './backendEnv';
export { ApiError, isApiError } from './errors';
export * from './endpoints';
export type { HealthResponse, HelloResponse, HttpMethod, RequestOptions } from './types';
