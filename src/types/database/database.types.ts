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
      allow_lists: {
        Row: {
          created_at: string | null;
          id: number;
          phase_id: number;
          remaining_allocation: number;
          taker_ordinal_address_id: number;
          total_allocation: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          phase_id: number;
          remaining_allocation: number;
          taker_ordinal_address_id: number;
          total_allocation: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          phase_id?: number;
          remaining_allocation?: number;
          taker_ordinal_address_id?: number;
          total_allocation?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_phase_id';
            columns: ['phase_id'];
            isOneToOne: false;
            referencedRelation: 'launchpad_phases';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_taker_payment_address_id';
            columns: ['taker_ordinal_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          }
        ];
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
          banner_image: string | null;
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
          banner_image?: string | null;
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
          banner_image?: string | null;
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
      edition_launchpad_orders: {
        Row: {
          backend_order_id: string;
          charge_address: string;
          charge_amount: number;
          completed_and_indexed: boolean | null;
          created_at: string | null;
          editions_number_ordered: number;
          id: string;
          launchpad_id: number;
          updated_at: string | null;
        };
        Insert: {
          backend_order_id: string;
          charge_address: string;
          charge_amount: number;
          completed_and_indexed?: boolean | null;
          created_at?: string | null;
          editions_number_ordered: number;
          id?: string;
          launchpad_id: number;
          updated_at?: string | null;
        };
        Update: {
          backend_order_id?: string;
          charge_address?: string;
          charge_amount?: number;
          completed_and_indexed?: boolean | null;
          created_at?: string | null;
          editions_number_ordered?: number;
          id?: string;
          launchpad_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_launchpad_id';
            columns: ['launchpad_id'];
            isOneToOne: false;
            referencedRelation: 'launchpads';
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
      launchpad_phases: {
        Row: {
          created_at: string | null;
          end_date: number | null;
          id: number;
          is_public: boolean | null;
          launchpad_id: number;
          name: string;
          phase_number: number;
          price: number;
          remaining_inscriptions: number;
          start_date: number;
          status: Database['public']['Enums']['launchpad_status'];
          total_inscriptions: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          end_date?: number | null;
          id?: number;
          is_public?: boolean | null;
          launchpad_id: number;
          name: string;
          phase_number: number;
          price: number;
          remaining_inscriptions: number;
          start_date: number;
          status: Database['public']['Enums']['launchpad_status'];
          total_inscriptions: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          end_date?: number | null;
          id?: number;
          is_public?: boolean | null;
          launchpad_id?: number;
          name?: string;
          phase_number?: number;
          price?: number;
          remaining_inscriptions?: number;
          start_date?: number;
          status?: Database['public']['Enums']['launchpad_status'];
          total_inscriptions?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_launchpad_id';
            columns: ['launchpad_id'];
            isOneToOne: false;
            referencedRelation: 'launchpads';
            referencedColumns: ['id'];
          }
        ];
      };
      launchpads: {
        Row: {
          collection_id: number | null;
          created_at: string | null;
          edition_inscription_id: number | null;
          id: number;
          launchpad_type: Database['public']['Enums']['launchpad_type'];
          maker_payment_address_id: number;
          marketplace_id: string | null;
          meta_data: Json | null;
          number_of_editions: number | null;
          remaining_editions: number | null;
          slug: string;
          status: Database['public']['Enums']['launchpad_status'];
          total_inscriptions: number | null;
          updated_at: string | null;
        };
        Insert: {
          collection_id?: number | null;
          created_at?: string | null;
          edition_inscription_id?: number | null;
          id?: number;
          launchpad_type?: Database['public']['Enums']['launchpad_type'];
          maker_payment_address_id: number;
          marketplace_id?: string | null;
          meta_data?: Json | null;
          number_of_editions?: number | null;
          remaining_editions?: number | null;
          slug: string;
          status: Database['public']['Enums']['launchpad_status'];
          total_inscriptions?: number | null;
          updated_at?: string | null;
        };
        Update: {
          collection_id?: number | null;
          created_at?: string | null;
          edition_inscription_id?: number | null;
          id?: number;
          launchpad_type?: Database['public']['Enums']['launchpad_type'];
          maker_payment_address_id?: number;
          marketplace_id?: string | null;
          meta_data?: Json | null;
          number_of_editions?: number | null;
          remaining_editions?: number | null;
          slug?: string;
          status?: Database['public']['Enums']['launchpad_status'];
          total_inscriptions?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_collection_id';
            columns: ['collection_id'];
            isOneToOne: false;
            referencedRelation: 'collections';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_edition_inscription_id';
            columns: ['edition_inscription_id'];
            isOneToOne: false;
            referencedRelation: 'inscriptions';
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
            foreignKeyName: 'fk_marketplace_id';
            columns: ['marketplace_id'];
            isOneToOne: false;
            referencedRelation: 'marketplaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_marketplace_id';
            columns: ['marketplace_id'];
            isOneToOne: false;
            referencedRelation: 'marketplaces_anon';
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
          batch_id: number | null;
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          is_launchpad: boolean | null;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          phase_id: number | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt_id: number;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp: string | null;
          utxo_id: number;
        };
        Insert: {
          batch_id?: number | null;
          delisted_at?: string | null;
          id?: number;
          index_in_maker_psbt: number;
          is_launchpad?: boolean | null;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          merged_psbt?: string | null;
          phase_id?: number | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee?: number;
          platform_taker_fee?: number;
          price: number;
          psbt_id: number;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp?: string | null;
          utxo_id: number;
        };
        Update: {
          batch_id?: number | null;
          delisted_at?: string | null;
          id?: number;
          index_in_maker_psbt?: number;
          is_launchpad?: boolean | null;
          maker_ordinal_address_id?: number;
          maker_output_value?: number;
          maker_payment_address_id?: number;
          marketplace_fee_btc_address_id?: number;
          marketplace_id?: string;
          marketplace_maker_fee?: number;
          marketplace_taker_fee?: number;
          merged_psbt?: string | null;
          phase_id?: number | null;
          platform_fee_btc_address_id?: number;
          platform_maker_fee?: number;
          platform_taker_fee?: number;
          price?: number;
          psbt_id?: number;
          side?: string;
          status?: Database['public']['Enums']['order_book_status'];
          timestamp?: string | null;
          utxo_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_batch_id';
            columns: ['batch_id'];
            isOneToOne: false;
            referencedRelation: 'psbt_batches';
            referencedColumns: ['id'];
          },
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
            foreignKeyName: 'fk_marketplace_id';
            columns: ['marketplace_id'];
            isOneToOne: false;
            referencedRelation: 'marketplaces_anon';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_phase_id';
            columns: ['phase_id'];
            isOneToOne: false;
            referencedRelation: 'launchpad_phases';
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
            foreignKeyName: 'fk_psbt_id';
            columns: ['psbt_id'];
            isOneToOne: false;
            referencedRelation: 'psbts';
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
      psbt_batches: {
        Row: {
          batch_number: number;
          id: number;
          inscription_count: number;
          phase_id: number;
          status: Database['public']['Enums']['phase_batch_status'];
        };
        Insert: {
          batch_number: number;
          id?: number;
          inscription_count: number;
          phase_id: number;
          status: Database['public']['Enums']['phase_batch_status'];
        };
        Update: {
          batch_number?: number;
          id?: number;
          inscription_count?: number;
          phase_id?: number;
          status?: Database['public']['Enums']['phase_batch_status'];
        };
        Relationships: [
          {
            foreignKeyName: 'fk_phase_id';
            columns: ['phase_id'];
            isOneToOne: false;
            referencedRelation: 'launchpad_phases';
            referencedColumns: ['id'];
          }
        ];
      };
      psbts: {
        Row: {
          batch_id: number | null;
          created_at: string | null;
          id: number;
          is_signed: boolean | null;
          signed_psbt: string | null;
          unsigned_psbt: string | null;
        };
        Insert: {
          batch_id?: number | null;
          created_at?: string | null;
          id?: number;
          is_signed?: boolean | null;
          signed_psbt?: string | null;
          unsigned_psbt?: string | null;
        };
        Update: {
          batch_id?: number | null;
          created_at?: string | null;
          id?: number;
          is_signed?: boolean | null;
          signed_psbt?: string | null;
          unsigned_psbt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_batch_id';
            columns: ['batch_id'];
            isOneToOne: false;
            referencedRelation: 'psbt_batches';
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
      collections_by_trading_volume_daily: {
        Row: {
          collection_id: number | null;
          slug: string | null;
          volume: number | null;
        };
        Relationships: [];
      };
      collections_by_trading_volume_weekly: {
        Row: {
          collection_id: number | null;
          slug: string | null;
          volume: number | null;
        };
        Relationships: [];
      };
      edition_launchpad_orders_anon: {
        Row: {
          charge_address: string | null;
          charge_amount: number | null;
          created_at: string | null;
          editions_number_ordered: number | null;
          id: string | null;
          launchpad_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          charge_address?: string | null;
          charge_amount?: number | null;
          created_at?: string | null;
          editions_number_ordered?: number | null;
          id?: string | null;
          launchpad_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          charge_address?: string | null;
          charge_amount?: number | null;
          created_at?: string | null;
          editions_number_ordered?: number | null;
          id?: string | null;
          launchpad_id?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_launchpad_id';
            columns: ['launchpad_id'];
            isOneToOne: false;
            referencedRelation: 'launchpads';
            referencedColumns: ['id'];
          }
        ];
      };
      marketplaces_anon: {
        Row: {
          description: string | null;
          id: string | null;
          launchpad_fee_btc_address_id: number | null;
          launchpad_maker_fee: number | null;
          launchpad_taker_fee: number | null;
          marketplace_fee_btc_address_id: number | null;
          marketplace_maker_fee: number | null;
          marketplace_taker_fee: number | null;
          name: string | null;
          rate_limit_level: number | null;
          url: string | null;
        };
        Insert: {
          description?: string | null;
          id?: string | null;
          launchpad_fee_btc_address_id?: number | null;
          launchpad_maker_fee?: number | null;
          launchpad_taker_fee?: number | null;
          marketplace_fee_btc_address_id?: number | null;
          marketplace_maker_fee?: number | null;
          marketplace_taker_fee?: number | null;
          name?: string | null;
          rate_limit_level?: number | null;
          url?: string | null;
        };
        Update: {
          description?: string | null;
          id?: string | null;
          launchpad_fee_btc_address_id?: number | null;
          launchpad_maker_fee?: number | null;
          launchpad_taker_fee?: number | null;
          marketplace_fee_btc_address_id?: number | null;
          marketplace_maker_fee?: number | null;
          marketplace_taker_fee?: number | null;
          name?: string | null;
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
    };
    Functions: {
      add_inscriptions_to_collection: {
        Args: {
          collection_id: number;
          inscription_ids: string[];
        };
        Returns: number[];
      };
      check_and_decrease_phase_allocation: {
        Args: {
          phase_id: number;
          taker_ordinal_address_id: number;
        };
        Returns: boolean;
      };
      check_insert_editions_order: {
        Args: {
          launchpad_id: number;
          backend_order_id: string;
          charge_address: string;
          charge_amount: number;
          editions_number_ordered: number;
        };
        Returns: {
          order_id: string;
          success: boolean;
          error_message: string;
        }[];
      };
      clone_utxo_and_data: {
        Args: {
          new_utxo: string;
          old_utxo: string;
        };
        Returns: {
          id: number;
          utxo: string;
          is_spent: boolean;
        }[];
      };
      create_editions_launchpad:
        | {
            Args: {
              _number_of_editions: number;
              _edition_inscription_id: string;
              _maker_payment_address: string;
              _collection_id: number;
              _meta_data?: Json;
            };
            Returns: number;
          }
        | {
            Args: {
              _slug: string;
              _number_of_editions: number;
              _edition_inscription_id: string;
              _maker_payment_address: string;
              _collection_id: number;
              _meta_data?: Json;
            };
            Returns: number;
          };
      editions_launchpad_backend_order_completed: {
        Args: {
          backend_order_id: string;
          inscription_ids: string[];
        };
        Returns: {
          success: boolean;
          error_message: string;
        }[];
      };
      fetch_activity: {
        Args: {
          want_interval?: unknown;
          want_slug?: string;
        };
        Returns: {
          inscription_id: string;
          inscription_name: string;
          maker_address: string;
          taker_address: string;
          collection_slug: string;
          collection_name: string;
          price: number;
          trade_timestamp: string;
          transaction_id: string;
        }[];
      };
      get_collection_stats: {
        Args: {
          collection_slug: string;
        };
        Returns: {
          min_price: number;
          total_volume_all_time: number;
          total_volume_all_time_including_launchpad: number;
          distinct_listings_count: number;
          total_inscriptions_count: number;
        }[];
      };
      get_collections: {
        Args: {
          search_keyword?: string;
          page_number?: number;
          page_size?: number;
        };
        Returns: {
          id: number;
          slug: string;
          name: string;
          icon: string;
          is_under_review: boolean;
          weekly_trading_volume: number;
          floor_price: number;
          total_supply: number;
          total_listings: number;
        }[];
      };
      get_collections_count: {
        Args: {
          search_keyword: string;
        };
        Returns: number;
      };
      get_collections_trading_volume: {
        Args: {
          interval_param?: unknown;
        };
        Returns: {
          volume: number;
          slug: string;
          collection_id: number;
        }[];
      };
      get_inscription_details_wallet_view: {
        Args: {
          inscription_ids: string[];
        };
        Returns: {
          inscription_id: string;
          collection_name: string;
          collection_slug: string;
          collection_id: number;
          collection_icon: string;
          orderbook_status: string;
          listed_price: number;
        }[];
      };
      get_inscriptions_with_price_by_collection_slug: {
        Args: {
          _collection_slug: string;
        };
        Returns: {
          price: number;
          order_id: number;
          order_status: string;
          inscription_id: string;
          name: string;
        }[];
      };
      get_inscriptions_without_collection: {
        Args: {
          inscription_ids: string[];
        };
        Returns: {
          id: number;
          collection_id: number;
        }[];
      };
      get_latest_fee_rate: {
        Args: Record<PropertyKey, never>;
        Returns: {
          economy_fee: number;
          fastest_fee: number;
          half_hour_fee: number;
          hour_fee: number;
          minimum_fee: number;
          ts: string;
        }[];
      };
      get_or_insert_address: {
        Args: {
          _address: string;
        };
        Returns: number;
      };
      get_or_insert_inscription: {
        Args: {
          _inscription_id: string;
        };
        Returns: number;
      };
      get_orderbook_by_address: {
        Args: {
          _address: string;
        };
        Returns: {
          batch_id: number | null;
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          is_launchpad: boolean | null;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          phase_id: number | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt_id: number;
          side: string;
          status: Database['public']['Enums']['order_book_status'];
          timestamp: string | null;
          utxo_id: number;
        }[];
      };
      get_orderbook_by_inscription_id: {
        Args: {
          _inscription_id: string;
        };
        Returns: {
          batch_id: number | null;
          delisted_at: string | null;
          id: number;
          index_in_maker_psbt: number;
          is_launchpad: boolean | null;
          maker_ordinal_address_id: number;
          maker_output_value: number;
          maker_payment_address_id: number;
          marketplace_fee_btc_address_id: number;
          marketplace_id: string;
          marketplace_maker_fee: number;
          marketplace_taker_fee: number;
          merged_psbt: string | null;
          phase_id: number | null;
          platform_fee_btc_address_id: number;
          platform_maker_fee: number;
          platform_taker_fee: number;
          price: number;
          psbt_id: number;
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
      gtrgm_compress: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      gtrgm_in: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      gtrgm_options: {
        Args: {
          '': unknown;
        };
        Returns: undefined;
      };
      gtrgm_out: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      increase_phase_and_allow_lists_allocation: {
        Args: {
          phase_id: number;
          taker_ordinal_address_id: number;
        };
        Returns: boolean;
      };
      launchpad_by_id_view: {
        Args: {
          launchpad_id_input: number;
        };
        Returns: {
          id: number;
          collection_id: number;
          edition_inscription_id: number;
          launchpad_type: string;
          maker_payment_address_id: number;
          marketplace_id: string;
          meta_data: Json;
          number_of_editions: number;
          remaining_editions: number;
          slug: string;
          status: string;
          total_inscriptions: number;
          remaining_inscriptions: number;
          created_at: string;
          updated_at: string;
        }[];
      };
      set_limit: {
        Args: {
          '': number;
        };
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: {
          '': string;
        };
        Returns: string[];
      };
      update_pending_taker_confirmation_listings: {
        Args: {
          time_seconds: number;
          trade_history_status: Database['public']['Enums']['trade_history_status'];
          orderbook_status: Database['public']['Enums']['order_book_status'];
          new_orderbook_status: Database['public']['Enums']['order_book_status'];
        };
        Returns: undefined;
      };
    };
    Enums: {
      launchpad_status: 'active' | 'pending' | 'completed';
      launchpad_type: 'psbt' | 'editions';
      order_book_status:
        | 'active'
        | 'inactive'
        | 'pending_taker_confirmation'
        | 'pending_maker_confirmation'
        | 'broadcast'
        | 'canceled';
      phase_batch_status: 'processing' | 'unsigned' | 'signed';
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
