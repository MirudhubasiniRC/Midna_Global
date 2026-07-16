/**
 * Per-environment defaults (timeouts, metadata).
 * Backend host URLs are controlled in `src/api/backendEnv.ts`.
 */
export type AppEnvironment = 'development' | 'production';

export type EnvironmentConfig = {
  name: AppEnvironment;
  apiBaseUrl: string;
  apiTimeoutMs: number;
};

const DEFAULT_TIMEOUT_MS = 15_000;

export const environments: Record<AppEnvironment, EnvironmentConfig> = {
  // development — local Flask midna_backend
  development: {
    name: 'development',
    apiBaseUrl: 'http://localhost:5001',
    apiTimeoutMs: DEFAULT_TIMEOUT_MS,
  },
  // production — deployed Midna API
  production: {
    name: 'production',
    apiBaseUrl: 'https://api.example.com',
    apiTimeoutMs: DEFAULT_TIMEOUT_MS,
  },
};

export function isAppEnvironment(value: string): value is AppEnvironment {
  return value === 'development' || value === 'production';
}
