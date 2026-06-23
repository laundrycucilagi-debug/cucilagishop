export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          price: number;
          discount_percentage: number;
          selling_price: number;
          stock: number;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string;
          description: string;
          price: number;
          discount_percentage?: number;
          stock?: number;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          category?: string;
          description?: string;
          price?: number;
          discount_percentage?: number;
          stock?: number;
          image_url?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      sales: {
        Row: {
          id: string;
          sale_date: string;
          product_id: string;
          quantity: number;
          normal_price: number;
          discount_percentage: number;
          selling_price: number;
          total: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sale_date?: string;
          product_id: string;
          quantity: number;
          normal_price: number;
          discount_percentage: number;
          selling_price: number;
          total: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          sale_date?: string;
          quantity?: number;
          notes?: string | null;
        };
      };
      stock_histories: {
        Row: {
          id: string;
          product_id: string;
          stock_before: number;
          stock_change: number;
          stock_after: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          stock_before: number;
          stock_change: number;
          stock_after: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          notes?: string | null;
        };
      };
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      record_sale: {
        Args: {
          p_product_id: string;
          p_quantity: number;
          p_notes?: string | null;
          p_sale_date?: string;
        };
        Returns: string;
      };
    };
  };
};
