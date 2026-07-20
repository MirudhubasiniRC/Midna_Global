import { apiClient } from '../client';
import type { MemberProfile } from '../types';

/** GET /api/profile/me */
export function getMyProfile(signal?: AbortSignal): Promise<MemberProfile> {
  return apiClient<MemberProfile>('/api/profile/me', { signal });
}
