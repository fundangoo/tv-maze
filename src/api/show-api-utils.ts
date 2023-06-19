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
  retry: 1,
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  suspense: true,
};

const fetchJsonData = (url: string): Promise<any> => fetch(url).then((response) => response.json());

export const fetchShows = (): Promise<Show[]> => fetchJsonData(`${API_BASE_URL}/shows`);

export const fetchShow = (showId: string): Promise<Show> =>
  fetchJsonData(`${API_BASE_URL}/shows/${showId}`);

export const searchShows = (searchTerm: string): Promise<ShowSearchResult[]> =>
  fetchJsonData(`${API_BASE_URL}/search/shows?q=${searchTerm}`);

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
