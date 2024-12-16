export interface InscriptionItem {
  inscription_id: string;
  price: number;
  outpoint?: `${string}:${number}`;
  collectionSlug?: string;
}

export interface InscriptionWithMetadata {
  inscription_id: string;
  name?: string;
  order_status?: string;
  price?: number;
  collection_name?: string;
  collection_slug?: string;
  collection_icon?: string;
}
