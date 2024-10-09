import { Database } from './';
export type AttributeCategory = Pick<Database['public']['Tables']['attribute_categories']['Row'], 'name'>;

export type Attribute = Pick<Database['public']['Tables']['attributes']['Row'], 'value' | 'value_type'> & {
  category: AttributeCategory;
};
export type Artist = Pick<Database['public']['Tables']['artists']['Row'], 'name' | 'slug'>;

export type Inscription = Pick<
  Database['public']['Tables']['inscriptions']['Row'],
  'name' | 'file_type' | 'inscription_id'
> & {
  attributes: Attribute[];
  collection: Collection;
};
export type Collection = Database['public']['Tables']['collections']['Row'] & {
  artist: Artist;
  inscriptions?: Inscription[];
};
