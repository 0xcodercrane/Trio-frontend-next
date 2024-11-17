export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string;
          id: number;
          public_key: string | null;
        };
        Insert: {
          address: string;
          id?: number;
          public_key?: string | null;
        };
        Update: {
          address?: string;
          id?: number;
          public_key?: string | null;
        };
        Relationships: [];
      };
      artists: {
        Row: {
          description: string | null;
          feature_rank: number;
          id: number;
          name: string;
          slug: string;
          twitter_url: string | null;
        };
        Insert: {
          description?: string | null;
          feature_rank?: number;
          id?: number;
          name: string;
          slug: string;
          twitter_url?: string | null;
        };
        Update: {
          description?: string | null;
          feature_rank?: number;
          id?: number;
          name?: string;
          slug?: string;
          twitter_url?: string | null;
        };
        Relationships: [];
      };
      attribute_categories: {
        Row: {
          collection_id: number;
          id: number;
          name: string;
        };
        Insert: {
          collection_id: number;
          id?: number;
          name: string;
        };
        Update: {
          collection_id?: number;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_collection_id';
            columns: ['collection_id'];
            isOneToOne: false;
            referencedRelation: 'collections';
            referencedColumns: ['id'];
          }
        ];
      };
      attributes: {
        Row: {
          category_id: number;
          inscription_id: number;
          value: string;
          value_type: string;
        };
        Insert: {
          category_id: number;
          inscription_id: number;
          value: string;
          value_type: string;
        };
        Update: {
          category_id?: number;
          inscription_id?: number;
          value?: string;
          value_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_category_id';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'attribute_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_inscription_id';
            columns: ['inscription_id'];
            isOneToOne: false;
            referencedRelation: 'inscriptions';
            referencedColumns: ['id'];
          }
        ];
      };
      brc20: {
        Row: {
          decimals: number;
          id: number;
          supply: number;
          ticker: string;
        };
        Insert: {
          decimals: number;
          id?: number;
          supply: number;
          ticker: string;
        };
        Update: {
          decimals?: number;
          id?: number;
          supply?: number;
          ticker?: string;
        };
        Relationships: [];
      };
      collections: {
        Row: {
          artist_id: number | null;
          description: string | null;
          discord_link: string | null;
          icon: string | null;
          id: number;
          inscription_icon: number | null;
          is_under_review: boolean | null;
          name: string;
          slug: string;
          twitter_link: string | null;
          website_link: string | null;
        };
        Insert: {
          artist_id?: number | null;
          description?: string | null;
          discord_link?: string | null;
          icon?: string | null;
          id?: number;
          inscription_icon?: number | null;
          is_under_review?: boolean | null;
          name: string;
          slug: string;
          twitter_link?: string | null;
          website_link?: string | null;
        };
        Update: {
          artist_id?: number | null;
          description?: string | null;
          discord_link?: string | null;
          icon?: string | null;
          id?: number;
          inscription_icon?: number | null;
          is_under_review?: boolean | null;
          name?: string;
          slug?: string;
          twitter_link?: string | null;
          website_link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_artist_id';
            columns: ['artist_id'];
            isOneToOne: false;
            referencedRelation: 'artists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_inscription_icon';
            columns: ['inscription_icon'];
            isOneToOne: false;
            referencedRelation: 'inscriptions';
            referencedColumns: ['id'];
          }
        ];
      };
      fee_rates: {
        Row: {
          economy_fee: number;
          fastest_fee: number;
          half_hour_fee: number;
          hour_fee: number;
          minimum_fee: number;
          ts: string;
        };
        Insert: {
          economy_fee: number;
          fastest_fee: number;
          half_hour_fee: number;
          hour_fee: number;
          minimum_fee: number;
          ts?: string;
        };
        Update: {
          economy_fee?: number;
          fastest_fee?: number;
          half_hour_fee?: number;
          hour_fee?: number;
          minimum_fee?: number;
          ts?: string;
        };
        Relationships: [];
      };
      inscriptions: {
        Row: {
          collection_id: number | null;
          content_url: string | null;
          file_type: string | null;
          id: number;
          inscription_id: string;
          name: string | null;
        };
        Insert: {
          collection_id?: number | null;
          content_url?: string | null;
          file_type?: string | null;
          id?: number;
          inscription_id: string;
          name?: string | null;
        };
        Update: {
          collection_id?: number | null;
          content_url?: string | null;
          file_type?: string | null;
          id?: number;
          inscription_id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_collection_id';
            columns: ['collection_id'];
            isOneToOne: false;
            referencedRelation: 'collections';
            referencedColumns: ['id'];
          }
        ];
      };
      marketplaces: {
        Row: {
          api_key: string;
          description: string | null;
          id: string;
          launchpad_fee_btc_address_id: number | null;
          launchpad_maker_fee: number;
          launchpad_taker_fee: number;
          marketplace_fee_btc_address_id: number;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          name: string;
          rate_limit_level: number | null;
          url: string | null;
        };
        Insert: {
          api_key: string;
          description?: string | null;
          id?: string;
          launchpad_fee_btc_address_id?: number | null;
          launchpad_maker_fee?: number;
          launchpad_taker_fee?: number;
          marketplace_fee_btc_address_id: number;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          name: string;
          rate_limit_level?: number | null;
          url?: string | null;
        };
        Update: {
          api_key?: string;
          description?: string | null;
          id?: string;
          launchpad_fee_btc_address_id?: number | null;
          launchpad_maker_fee?: number;
          launchpad_taker_fee?: number;
          marketplace_fee_btc_address_id?: number;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          name?: string;
          rate_limit_level?: number | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_launchpad_fee_btc_address_id';
            columns: ['launchpad_fee_btc_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_marketplace_fee_btc_address_id';
            columns: ['marketplace_fee_btc_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          }
        ];
      };
      orderbook: {
        Row: {
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt: string | null;
          relisted_at: string | null;
          relisted_price: number | null;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp: string | null;
          utxo_id: number;
        };
        Insert: {
          delisted_at?: string | null;
          id?: number;
          index_in_maker_psbt: number;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          merged_psbt?: string | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee?: number;
          platform_taker_fee?: number;
          price: number;
          psbt?: string | null;
          relisted_at?: string | null;
          relisted_price?: number | null;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp?: string | null;
          utxo_id: number;
        };
        Update: {
          delisted_at?: string | null;
          id?: number;
          index_in_maker_psbt?: number;
          maker_ordinal_address_id?: number;
          maker_output_value?: number;
          maker_payment_address_id?: number;
          marketplace_fee_btc_address_id?: number;
          marketplace_id?: string;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          merged_psbt?: string | null;
          platform_fee_btc_address_id?: number;
          platform_maker_fee?: number;
          platform_taker_fee?: number;
          price?: number;
          psbt?: string | null;
          relisted_at?: string | null;
          relisted_price?: number | null;
          side?: string;
          status?: Database['public']['Enums']['order_book_status'];
          timestamp?: string | null;
          utxo_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_maker_ordinal_address_id';
            columns: ['maker_ordinal_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_maker_payment_address_id';
            columns: ['maker_payment_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_marketplace_fee_btc_address_id';
            columns: ['marketplace_fee_btc_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_marketplace_id';
            columns: ['marketplace_id'];
            isOneToOne: false;
            referencedRelation: 'marketplaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_platform_fee_btc_address_id';
            columns: ['platform_fee_btc_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_utxo_id';
            columns: ['utxo_id'];
            isOneToOne: false;
            referencedRelation: 'utxos';
            referencedColumns: ['id'];
          }
        ];
      };
      rare_sat_ranges: {
        Row: {
          id: number;
          off: number;
          size: number;
          start: number;
          utxo: string;
        };
        Insert: {
          id?: number;
          off: number;
          size: number;
          start: number;
          utxo: string;
        };
        Update: {
          id?: number;
          off?: number;
          size?: number;
          start?: number;
          utxo?: string;
        };
        Relationships: [];
      };
      rare_sat_ranges_satributes: {
        Row: {
          range_id: number;
          satribute_id: number;
        };
        Insert: {
          range_id: number;
          satribute_id: number;
        };
        Update: {
          range_id?: number;
          satribute_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_range_id';
            columns: ['range_id'];
            isOneToOne: false;
            referencedRelation: 'rare_sat_ranges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_satribute_id';
            columns: ['satribute_id'];
            isOneToOne: false;
            referencedRelation: 'satributes';
            referencedColumns: ['id'];
          }
        ];
      };
      runes: {
        Row: {
          decimals: number;
          id: number;
          rune: string;
          supply: number;
        };
        Insert: {
          decimals: number;
          id?: number;
          rune: string;
          supply: number;
        };
        Update: {
          decimals?: number;
          id?: number;
          rune?: string;
          supply?: number;
        };
        Relationships: [];
      };
      satributes: {
        Row: {
          id: number;
          type: string;
        };
        Insert: {
          id?: number;
          type: string;
        };
        Update: {
          id?: number;
          type?: string;
        };
        Relationships: [];
      };
      token_balances: {
        Row: {
          balance: number;
          brc20_id: number | null;
          id: number;
          rune_id: number | null;
        };
        Insert: {
          balance: number;
          brc20_id?: number | null;
          id?: number;
          rune_id?: number | null;
        };
        Update: {
          balance?: number;
          brc20_id?: number | null;
          id?: number;
          rune_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_brc20_id';
            columns: ['brc20_id'];
            isOneToOne: false;
            referencedRelation: 'brc20';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_rune_id';
            columns: ['rune_id'];
            isOneToOne: false;
            referencedRelation: 'runes';
            referencedColumns: ['id'];
          }
        ];
      };
      trade_history: {
        Row: {
          fee_rate: number | null;
          id: number;
          order_id: number;
          status: Database['public']['Enums']['trade_history_status'];
          taker_ordinal_address_id: number | null;
          taker_payment_address_id: number | null;
          timestamp: string;
          transaction_id: string | null;
        };
        Insert: {
          fee_rate?: number | null;
          id?: number;
          order_id: number;
          status: Database['public']['Enums']['trade_history_status'];
          taker_ordinal_address_id?: number | null;
          taker_payment_address_id?: number | null;
          timestamp?: string;
          transaction_id?: string | null;
        };
        Update: {
          fee_rate?: number | null;
          id?: number;
          order_id?: number;
          status?: Database['public']['Enums']['trade_history_status'];
          taker_ordinal_address_id?: number | null;
          taker_payment_address_id?: number | null;
          timestamp?: string;
          transaction_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_order_id';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orderbook';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_taker_ordinal_address_id';
            columns: ['taker_ordinal_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_taker_payment_address_id';
            columns: ['taker_payment_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          }
        ];
      };
      utxo_contents: {
        Row: {
          inscription_id: number | null;
          rare_sat_range_id: number | null;
          token_balance_id: number | null;
          utxo_id: number;
        };
        Insert: {
          inscription_id?: number | null;
          rare_sat_range_id?: number | null;
          token_balance_id?: number | null;
          utxo_id: number;
        };
        Update: {
          inscription_id?: number | null;
          rare_sat_range_id?: number | null;
          token_balance_id?: number | null;
          utxo_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_inscription_id';
            columns: ['inscription_id'];
            isOneToOne: false;
            referencedRelation: 'inscriptions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_rare_sat_range_id';
            columns: ['rare_sat_range_id'];
            isOneToOne: false;
            referencedRelation: 'rare_sat_ranges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_token_balance_id';
            columns: ['token_balance_id'];
            isOneToOne: false;
            referencedRelation: 'token_balances';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_utxo_id';
            columns: ['utxo_id'];
            isOneToOne: false;
            referencedRelation: 'utxos';
            referencedColumns: ['id'];
          }
        ];
      };
      utxos: {
        Row: {
          id: number;
          is_spent: boolean;
          utxo: string;
        };
        Insert: {
          id?: number;
          is_spent?: boolean;
          utxo: string;
        };
        Update: {
          id?: number;
          is_spent?: boolean;
          utxo?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_inscriptions_without_collection: {
        Args: {
          inscription_ids: string[];
        };
        Returns: {
          id: number;
          collection_id: number;
        }[];
      };
      get_orderbook_by_address: {
        Args: {
          _address: string;
        };
        Returns: {
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt: string | null;
          relisted_at: string | null;
          relisted_price: number | null;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp: string | null;
          utxo_id: number;
        }[];
      };
      get_orderbook_by_collection_slug: {
        Args: {
          _collection_slug: string;
        };
        Returns: {
          id: number;
          utxo_id: number;
          price: number;
          psbt: string;
          side: string;
          maker_payment_address_id: number;
          maker_ordinal_address_id: number;
          merged_psbt: string;
          status: string;
          maker_output_value: number;
          index_in_maker_psbt: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          platform_fee_btc_address_id: number;
          marketplace_fee_btc_address_id: number;
          relisted_at: string;
          delisted_at: string;
          relisted_price: number;
          _timestamp: string;
          inscription_id: string;
        }[];
      };
      get_orderbook_by_inscription_id: {
        Args: {
          _inscription_id: string;
        };
        Returns: {
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt: string | null;
          relisted_at: string | null;
          relisted_price: number | null;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp: string | null;
          utxo_id: number;
        }[];
      };
      get_trade_history_by_order_id: {
        Args: {
          _order_id: number;
        };
        Returns: {
          fee_rate: number | null;
          id: number;
          order_id: number;
          status: Database['public']['Enums']['trade_history_status'];
          taker_ordinal_address_id: number | null;
          taker_payment_address_id: number | null;
          timestamp: string;
          transaction_id: string | null;
        }[];
      };
    };
    Enums: {
      order_book_status: 'active' | 'inactive' | 'pending_taker_confirmation' | 'pending_maker_confirmation' | 'broadcast';
      trade_history_status: 'mempool' | 'confirmed' | 'sniped' | 'initiated';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
