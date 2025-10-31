import { useNuxtApp } from '#app';
import type { TKindResponse } from '../types/kind';

export function getKindsFromApi() {
  const { $api } = useNuxtApp();

  return $api<TKindResponse[]>('/metadata/kind/', { method: 'GET' });
}
