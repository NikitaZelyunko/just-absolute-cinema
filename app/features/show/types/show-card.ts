import type { TAsset } from '../../main-page/types/main-page-showcase';

export type TShowCard = {
  id: string;
  assets: TAsset[];
  title: string;
  description: string;
  genres: string[];
  labels: string[];
  kind: string;
};
