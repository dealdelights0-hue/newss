export interface Article {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  image_url: string | null;
  source_id: string;
  category?: string; // Kept for potential manual override
}
