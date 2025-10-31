import type { TCollectionResponse } from '../../collection/types/collection';

export type TMainPageCollection = TCollectionResponse & {
  kind: 'vertical' | 'horizontal';
};

export type TAgePermission = 0 | 6 | 12 | 16 | 18;

export type TAssetType = 'Banner' | 'Poster' | 'Screenshot';

export type TAsset = {
  oid: string;
  asset_type: TAssetType;
  resize_url: string;
};

export type TSlideTitle = {
  oid: string;
  title?: string;
  synopsis?: string;
  age?: TAgePermission;
  genres: string[];
  labels: string[];
  assets: TAsset[];
  url: string;
  air_year: number;
  end_year: number;
};

export type TViewVersion = {
  oid: string;
  age?: TAgePermission;
  playback_url: string;
  duration: string;
};

export type TView = {
  oid: string;
  url: string;
  versions: TViewVersion[];
};

export type TLiveBanners = {
  horiz: TView | null;
  vert: TView | null;
};

export type TSlide = {
  oid: string;
  title: TSlideTitle;
  trailer: TView;
  preview: TView;
  live_banners: TLiveBanners;
  live_banner: TView | null;
};

export type TMainPageShowcase = {
  oid: string;
  name: string;
  collections: TMainPageCollection[];
  slides: TSlide[];
};
