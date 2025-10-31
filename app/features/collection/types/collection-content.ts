import type { TAgePermission, TAsset, TViewVersion } from '../../main-page/types/main-page-showcase';

export type TCollectionContentResponse = {
  oid: string;
  url: string;
  title: string;
  synopsis: string;
  age: TAgePermission;
  genres: string[];
  labels: string[];
  assets: TAsset[];
  versions: TViewVersion[];
  kind: string;
  air_year: number;
};
