import React, { FocusEvent, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useQuery } from 'react-query';

interface ISearch<T> {
  searchFunction: (searchTerm: string) => Promise<T[]>;
  optionRenderer: (option: T) => React.ReactElement;
  searchKey: string;
}

function getNoOptionsMessage<T>(isError: boolean, isLoading: boolean, options: T[]) {
  const isLoadingMessage = isLoading ? 'LOADING' : '';
  const isErrorMessage = isError ? 'ERROR' : '';
  const noResultsMessage = !(isLoading || isError) && options.length === 0 ? 'NO RESULTS' : '';
  return isLoadingMessage + isErrorMessage + noResultsMessage;
}

// A GENERIC SEARCH COMPONENT THAT CAN BE FLEXIBLY REUSED (E.G. src/components/show/ShowSearchResult.tsx)
const Search = <T extends { id: string | number }>({
  searchFunction,
  optionRenderer,
  searchKey,
}: ISearch<T>): JSX.Element => {
  const [focused, setFocused] = useState<boolean>(false);
  const [search, setSearch, debouncedSearch, catchUpDebounce] = useDebounce<string>('');
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<T[]>([searchKey, debouncedSearch], () =>
    debouncedSearch ? searchFunction(debouncedSearch) : Promise.resolve([])
  );
  const selectOptions = searchResults || [];

  // SYNC DEBOUNCE ON INPUT CLEARED
  useEffect(() => {
    if (!search) {
      catchUpDebounce();
    }
  }, [search, catchUpDebounce]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // CLEAR INPUT ON 'ESCAPE'
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape':
        setSearch('');
        break;
      default:
        return;
    }
  };

  const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false);
    } else {
      // QUICK AND DIRTY, BECAUSE OF THE NATURE OF THE COMPOSITION
      // AND THE FACT, THAT 'BLUR' EVENT IS FIRED BEFORE THE 'CLICK' EVENT
      // (POSSIBLE ALTERNATIVE WOULD BE USING 'MOUSEDOWN' INSTEAD OF 'CLICK')
      // WOULD NOT LET IT INTO PROD, BUT INVEST TIME INTO FINDING BETTER APPROACH
      setTimeout(() => {
        setFocused(false);
      }, 100);
    }
  };

  const onFocus = () => {
    setFocused(true);
  };

  const noOptionsMessage =
    search === debouncedSearch ? getNoOptionsMessage(isError, isLoading, selectOptions) : '';

  return (
    <div
      className="w-1/3 min-w-[200px] relative"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {/* SEARCH INPUT */}
      <input
        value={search}
        onChange={onInputChange}
        placeholder="Search TV Shows..."
        className="border w-full px-2 rounded-md"
      />
      <span className="absolute right-1 top-[2px]">{!isLoading ? '🔍' : '⌛'}</span>
      {/* SEARCH DROPDOWN */}
      {focused && selectOptions.length ? (
        <div className="absolute w-full border border-black bg-inherit rounded-lg h-[50vh] overflow-y-auto bg-slate-100">
          {selectOptions.map((option) => (
            <div className="m-3" key={option.id}>
              {optionRenderer(option)}
            </div>
          ))}
        </div>
      ) : (
        search &&
        noOptionsMessage && (
          <div className="absolute w-full border border-black bg-inherit rounded-md text-center">
            {noOptionsMessage}
          </div>
        )
      )}
    </div>
  );
};

export default Search;
