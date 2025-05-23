export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          full_name: string
          role: "santri" | "ustadz" | "admin"
          class: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          role: "santri" | "ustadz" | "admin"
          class?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          role?: "santri" | "ustadz" | "admin"
          class?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          ustadz_id: string | null
          cover_image: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          ustadz_id?: string | null
          cover_image?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          ustadz_id?: string | null
          cover_image?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          content: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          content?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          content?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          santri_id: string
          course_id: string
          progress: number
          last_accessed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          santri_id: string
          course_id: string
          progress?: number
          last_accessed?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          santri_id?: string
          course_id?: string
          progress?: number
          last_accessed?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exams: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          time_limit: number | null
          passing_score: number | null
          start_date: string | null
          end_date: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          time_limit?: number | null
          passing_score?: number | null
          start_date?: string | null
          end_date?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          time_limit?: number | null
          passing_score?: number | null
          start_date?: string | null
          end_date?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
