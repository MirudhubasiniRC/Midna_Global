import { apiClient } from '../client';
import { clearToken, setToken } from '../token';
import type { LoginRequest, LoginResponse, Member, MessageResponse } from '../types';

/** POST /api/auth/login */
export async function login(body: LoginRequest, signal?: AbortSignal): Promise<LoginResponse> {
  const result = await apiClient<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body,
    signal,
  });
  setToken(result.token);
  return result;
}

/** GET /api/auth/me */
export function getMe(signal?: AbortSignal): Promise<Member> {
  return apiClient<Member>('/api/auth/me', { signal });
}

/** POST /api/auth/logout — clears local token */
export async function logout(signal?: AbortSignal): Promise<MessageResponse> {
  try {
    return await apiClient<MessageResponse>('/api/auth/logout', {
      method: 'POST',
      signal,
    });
  } finally {
    clearToken();
  }
}
