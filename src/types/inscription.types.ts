export interface InscriptionItem {
  inscription_id: string;
  price: number;
  outpoint?: `${string}:${number}`;
  collectionSlug?: string;
}
