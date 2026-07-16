import { apiClient } from '../client';
import type { HealthResponse, HelloResponse } from '../types';

/** GET /api/health */
export function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return apiClient<HealthResponse>('/api/health', { signal });
}

/** GET /api/hello */
export function getHello(signal?: AbortSignal): Promise<HelloResponse> {
  return apiClient<HelloResponse>('/api/hello', { signal });
}
