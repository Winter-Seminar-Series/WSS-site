import { httpPost, httpPut } from '@/services/http';
import type { TokenPairResponse } from '@/types/participant.api.type';

export function signIn(email: string, password: string): Promise<TokenPairResponse> {
  return httpPost<TokenPairResponse>('/sign-in/', { email, password });
}

export function signUp(email: string, password: string): Promise<unknown> {
  return httpPost('/sign-up/', { user: { email, password } });
}

export function requestPasswordReset(email: string): Promise<unknown> {
  return httpPost('/password-reset/', { email });
}

export function confirmPasswordReset(email: string, password: string, token: string): Promise<unknown> {
  return httpPut('/password-reset/', { email, password, token });
}

export function changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
  return httpPut('/password-change/', { old_password: oldPassword, new_password: newPassword }, { auth: true });
}
