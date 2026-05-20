type ErrorResponse = {
  status: 500 | 404 | 405 | 429 | 503;
  type: string;
  message: string;
  error: string;
  report_url: string;
};

type Prop = { day: number; month: number; year: number };

type Aired = {
  from: string;
  to: string | null;
  string: string;
  prop: { from: Prop; to: Prop };
};

type Broadcast = {
  day: null | string;
  time: null | string;
  timezone: null | string;
  string: null | string;
};

type Genre = { mal_id: number; name: string; type: string; url: string };

type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};
type Images = { jpg: Image; webp: Image };

type Theme = { mal_id: number; name: string; type: string; url: string };

type Title = { title: string; type: string };

type Trailer = {
  youtube_id: null | number;
  url: null | string;
  embed_url: string;
  images: Images;
};

export type Anime = {
  aired: Aired;
  airing: boolean;
  approved: boolean;
  background: string;
  broadcast: Broadcast;
  duration: string;
  episodes: number | null;
  favorites: number;
  genres: Genre[];
  images: Images;
  licensors: Theme[];
  mal_id: number;
  members: number;
  popularity: number;
  producers: Theme[];
  rank: number;
  rating: string;
  score: number;
  scored_by: number;
  season: null | string;
  source: string;
  status: string;
  studios: Theme[];
  synopsis: string;
  themes: Theme[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  titles: Title[];
  trailer: Trailer;
  type: string;
  url: string;
  year: number | null;
};

export type AnimeReference = {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
};

export type AnimeRecommendation = {
  mal_id: string;
  entry: AnimeReference[];
  content: string;
  date: string;
  user: {
    url: string;
    username: string;
  };
};

export type AnimeWatchEpisode = {
  mal_id: number;
  url: string;
  title: string;
  premium: boolean;
};

export type AnimeWatchFeedItem = {
  entry: AnimeReference;
  episodes: AnimeWatchEpisode[];
  region_locked: boolean;
};
