// API de Jikan para MyAnimeList
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

export interface AnimeSearchResult {
  mal_id: number;
  title: string;
  title_english: string | null;
  synopsis: string | null;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  episodes: number | null;
  status: string;
  genres: Array<{ name: string }>;
  score: number | null;
  year: number | null;
  type: string;
}

export interface JikanResponse {
  data: AnimeSearchResult[];
  pagination: {
    has_next_page: boolean;
    current_page: number;
    last_visible_page: number;
  };
}

// Buscar animes por nombre
export async function searchAnimes(query: string, page = 1): Promise<JikanResponse> {
  const response = await fetch(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`);
  
  if (!response.ok) {
    throw new Error('Error al buscar animes');
  }
  
  return response.json();
}

// Obtener anime por ID
export async function getAnimeById(malId: number): Promise<AnimeSearchResult> {
  const response = await fetch(`${JIKAN_BASE_URL}/anime/${malId}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener anime');
  }
  
  const data = await response.json();
  return data.data;
}

// Obtener animes populares
export async function getTopAnimes(page = 1): Promise<JikanResponse> {
  const response = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=20`);
  
  if (!response.ok) {
    throw new Error('Error al obtener animes populares');
  }
  
  return response.json();
}

// Obtener animes de temporada actual
export async function getCurrentSeasonAnimes(): Promise<JikanResponse> {
  const response = await fetch(`${JIKAN_BASE_URL}/seasons/now`);
  
  if (!response.ok) {
    throw new Error('Error al obtener animes de temporada');
  }
  
  return response.json();
}