import React from 'react';
import Search from '../Search';
import { searchShows } from '../../api/show-api-utils';
import ShowSearchResult from './ShowSearchResult';

// SPECIALIZES THE GENERIC SEARCH COMPONENT TO SEARCH AND RENDER SHOWS
const ShowSearch: React.FC = (): JSX.Element => {
  return (
    <Search
      searchFunction={(searchTerm: string) =>
        searchShows(searchTerm).then((searchResults) =>
          searchResults.map((searchResult) => searchResult.show)
        )
      }
      optionRenderer={(option) => <ShowSearchResult show={option} />}
      searchKey={'search-shows'}
    />
  );
};

export default ShowSearch;
