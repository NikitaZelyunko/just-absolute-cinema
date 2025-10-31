import { useNuxtApp } from '#app';
import type { TCollectionContentResponse } from '../types/collection-content';

export function getShowCaseCollectionContent({
  collectionId,
  page,
  pageSize,
}: {
  collectionId: string;
  page: number;
  pageSize: number;
}) {
  const { $api } = useNuxtApp();

  return $api<{ has_next: boolean; results: TCollectionContentResponse[] }>(
    `/showcases/collections/${collectionId}/content?page=${page}&page_size=${pageSize}`,
    {
      method: 'GET',
    },
  );
}
