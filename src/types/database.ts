export interface Book {
  id: string;
  title: string;
  series: string | null;
  language: string;
  formats: string[];
  synopsis: string | null;
  publish_date: string | null;
  pages: number | null;
  tags: string[];
  cover_image_url: string | null;
  amazon_paperback_url: string | null;
  amazon_kindle_url: string | null;
  audible_url: string | null;
  itunes_url: string | null;
  featured: boolean;
  is_new: boolean;
  price: string | null;
  tagline: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookImage {
  id: string;
  book_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_url: string | null;
  start_at: string;
  end_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}
