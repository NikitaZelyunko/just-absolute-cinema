import { useNuxtApp } from '#app';
import type { TLabelResponse } from '../types/label';

export function getLabelsFromApi() {
  const { $api } = useNuxtApp();

  return $api<TLabelResponse[]>('/metadata/labels/', { method: 'GET' });
}
