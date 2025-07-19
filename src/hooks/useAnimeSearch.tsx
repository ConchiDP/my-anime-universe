import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAnimes, getTopAnimes, getCurrentSeasonAnimes, AnimeSearchResult } from '@/lib/jikan-api';

export const useAnimeSearch = (query: string, type?: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce para evitar demasiadas requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ['animeSearch', debouncedQuery, type],
    queryFn: () => searchAnimes(debouncedQuery, 1, type),
    enabled: debouncedQuery.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useTopAnimes = (type?: string) => {
  return useQuery({
    queryKey: ['topAnimes', type],
    queryFn: () => getTopAnimes(1, type),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCurrentSeasonAnimes = () => {
  return useQuery({
    queryKey: ['currentSeasonAnimes'],
    queryFn: () => getCurrentSeasonAnimes(),
    staleTime: 60 * 60 * 1000, // 1 hora
  });
};