import { useNuxtApp } from '#app';
import type { TCollectionResponse } from '../types/collection';

export function getShowCaseCollection({ collectionId }: { collectionId: string }) {
  const { $api } = useNuxtApp();

  return $api<TCollectionResponse>(`/showcases/collections/${collectionId}/`, {
    method: 'GET',
  });
}
