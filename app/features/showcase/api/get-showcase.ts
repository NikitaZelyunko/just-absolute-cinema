import { useNuxtApp } from '#app';
import type { TShowCase } from '../types/showcase';

export function getShowCase({
  collectionId,
}: {
  collectionId: string;
  page: number;
  page_size: number;
}) {
  const { $api } = useNuxtApp();

  return $api<TShowCase[]>(
    `/showcases/showcases/collections/${collectionId}/content`,
    {
      method: 'GET',
    },
  );
}
