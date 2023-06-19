import { Link } from 'react-router-dom';
import { Show } from '../../api/show-api-utils';
import React from 'react';
import Card from '../Card';

type IShowSearchResult = {
  show: Show;
};

const ShowSearchResult: React.FC<IShowSearchResult> = ({ show }): JSX.Element => {
  return (
    <Link to={`details/${show.id}`} className="flex place-items-center flex-nowrap gap-5">
      <span className="flex-shrink-0 w-full">
        <Card imageUrl={show.image?.medium} imageAlt={show.name} />
      </span>
    </Link>
  );
};

export default ShowSearchResult;
