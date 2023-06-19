import React from 'react';
import { Show } from '../../api/show-api-utils';
import Card from '../Card';

interface IShowDetails {
  show?: Show;
}

const ShowDetails: React.FC<IShowDetails> = ({ show }): JSX.Element => {
  return (
    <div>
      {show && (
        <article className="flex flex-col py-5 flex-wrap gap-10 justify-center place-items-center">
          <Card imageUrl={show.image?.medium} imageAlt={show.name} />
          <section>
            <p className="text-5xl pb-1 font-bold text-center">{show.name}</p>
            <p className="pb-1 font-semibold text-center">{`[ ${show.genres.join(', ')} ]`}</p>
            <hr className="my-3" />
            <p className="text-justify">{show.summary}</p>
          </section>
        </article>
      )}
    </div>
  );
};

export default ShowDetails;
