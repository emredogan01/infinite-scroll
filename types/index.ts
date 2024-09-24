export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type UrlEnds = "now_playing" | "popular" | "top_rated" | "upcoming";

export type Languages =
  | "en-US"
  | "tr-TR"
  | "es-ES"
  | "fr-FR"
  | "de-DE"
  | "it-IT"
  | "ru-RU"
  | "ja-JP"
  | "ko-KR";

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type MovieDetailProps = {
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  vote_average: number;
  vote_count: number;
  id: number;
};
