import { useNuxtApp } from '#app';
import type { TMainPageShowcase } from '../types/main-page-showcase';

export function getMainPageShowCases() {
  const { $api } = useNuxtApp();

  return $api<TMainPageShowcase>('/showcases/showcases/mainpage/web', {
    method: 'GET',
  });
}
