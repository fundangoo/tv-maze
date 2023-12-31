import { UseQueryOptions, useQuery } from 'react-query';

export type Show = {
  id: number;
  name: string;
  genres: string[];
  weight: number;
  image?: {
    medium: string;
    original: string;
  };
  summary: string;
};

type ShowSearchResult = {
  score: number;
  show: Show;
};

const API_BASE_URL = 'https://api.tvmaze.com';
export const QUERY_OPTIONS: UseQueryOptions<any> = {
  retry: 1, // DEBUG PURPOSE, EASIER TO SIMULATE ERRORS
  suspense: true, // TO MAKE REACT-QUERY SUSPENSE-ENABLED
  staleTime: 5 * 60 * 1000, // INCREASE STALE-TIME TO PREVENT BACKGROUND FETCHING ON EVERY RENDER
  refetchOnWindowFocus: false,
};

// BASIC FETCH-UTILITIES
const fetchJsonData = (url: string): Promise<any> => fetch(url).then((response) => response.json());

export const fetchShows = (): Promise<Show[]> => fetchJsonData(`${API_BASE_URL}/shows`);

export const fetchShow = (showId: string): Promise<Show> =>
  fetchJsonData(`${API_BASE_URL}/shows/${showId}`);

export const searchShows = (searchTerm: string): Promise<ShowSearchResult[]> =>
  fetchJsonData(`${API_BASE_URL}/search/shows?q=${searchTerm}`);

// REACT-QUERY WRAPPED HOOK-ALTERNATIVES
export const useShows = () => useQuery<Show[]>('shows', fetchShows, QUERY_OPTIONS);

export const useShow = (showId: string) =>
  useQuery<Show>(['show', showId], () => fetchShow(showId), QUERY_OPTIONS);

export const useSearch = (searchTerm: string) =>
  useQuery<Show[]>(
    ['search-results', searchTerm],
    () =>
      searchTerm
        ? searchShows(searchTerm).then((hits) => hits.map((hit) => hit.show))
        : Promise.resolve([]),
    QUERY_OPTIONS
  );
