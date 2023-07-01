export interface IArticle {
  id: string;
  image_url: string;
  content: string;
  author_id: string;
  title: string;
  category_name: string;
  series_name: string | null;
  date_updated: string;
  date_published: string;
}
