export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client: {
        Row: {
          created_at: string
          email: string | null
          fullname: string
          id: number
          phone: string | null
          uploadlink: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          fullname: string
          id?: number
          phone?: string | null
          uploadlink?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          fullname?: string
          id?: number
          phone?: string | null
          uploadlink?: string | null
        }
        Relationships: []
      }
      clothing: {
        Row: {
          category: string
          code: string
          created_at: string
          id: number
          images: Json | null
          info: string | null
          name: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          id?: number
          images?: Json | null
          info?: string | null
          name: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          id?: number
          images?: Json | null
          info?: string | null
          name?: string
        }
        Relationships: []
      }
      foodorders: {
        Row: {
          created_at: string
          customer: string
          extrainfo: string | null
          id: number
          isdelivery: boolean
          ispaid: boolean
          orders: Json[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          customer: string
          extrainfo?: string | null
          id?: number
          isdelivery?: boolean
          ispaid?: boolean
          orders: Json[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          customer?: string
          extrainfo?: string | null
          id?: number
          isdelivery?: boolean
          ispaid?: boolean
          orders?: Json[]
          updated_at?: string | null
        }
        Relationships: []
      }
      foods: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          ispopular: boolean
          name: string
          price: number
          promotionprice: number | null
          size: Json[] | null
          todayspecial: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          ispopular?: boolean
          name: string
          price?: number
          promotionprice?: number | null
          size?: Json[] | null
          todayspecial?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          ispopular?: boolean
          name?: string
          price?: number
          promotionprice?: number | null
          size?: Json[] | null
          todayspecial?: boolean
        }
        Relationships: []
      }
      place: {
        Row: {
          address: string | null
          created_at: string
          id: number
          name: string
          taxid: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          name: string
          taxid?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          name?: string
          taxid?: string | null
        }
        Relationships: []
      }
      plot: {
        Row: {
          created_at: string
          id: string
          imagesUrl: Json | null
          location: string | null
          name: string
          owner: string
          price: number
          smartcontractid: number
        }
        Insert: {
          created_at?: string
          id?: string
          imagesUrl?: Json | null
          location?: string | null
          name: string
          owner: string
          price: number
          smartcontractid: number
        }
        Update: {
          created_at?: string
          id?: string
          imagesUrl?: Json | null
          location?: string | null
          name?: string
          owner?: string
          price?: number
          smartcontractid?: number
        }
        Relationships: []
      }
      tx28: {
        Row: {
          amount: number
          code: string | null
          created_at: string
          id: number
          image: string | null
          remark: string | null
          transfered_at: string | null
        }
        Insert: {
          amount?: number
          code?: string | null
          created_at?: string
          id?: number
          image?: string | null
          remark?: string | null
          transfered_at?: string | null
        }
        Update: {
          amount?: number
          code?: string | null
          created_at?: string
          id?: number
          image?: string | null
          remark?: string | null
          transfered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tx28_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "user28"
            referencedColumns: ["code"]
          },
        ]
      }
      user28: {
        Row: {
          code: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      usertx: {
        Row: {
          address: string
          amount: string
          created_at: string
          hash: string
          id: number
          plot: string
        }
        Insert: {
          address: string
          amount: string
          created_at?: string
          hash: string
          id?: number
          plot: string
        }
        Update: {
          address?: string
          amount?: string
          created_at?: string
          hash?: string
          id?: number
          plot?: string
        }
        Relationships: []
      }
    }
    Views: {
      tx: {
        Row: {
          amount: number | null
          code: string | null
          created_at: string | null
          id: number | null
          image: string | null
          name: string | null
          transfered_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tx28_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "user28"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
